"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// --------------- Auth helpers ---------------

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

async function requireAdminOrAbove() {
  const session = await requireAuth();
  const role = (session.user as { role: string }).role;
  if (role === "OPERATOR") throw new Error("Unauthorized");
  return session;
}

async function requireSuperAdmin() {
  const session = await requireAuth();
  const role = (session.user as { role: string }).role;
  if (role !== "SUPER_ADMIN") throw new Error("Unauthorized");
  return session;
}

// --------------- Leads ---------------

export async function getLeads() {
  const session = await requireAuth();
  const role = (session.user as { role: string }).role;

  // Operators only see their own assigned leads
  if (role === "OPERATOR") {
    return prisma.contact.findMany({
      where: { assignedToId: session.user.id },
      include: { assignedTo: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  // Admin / Super Admin see all leads
  return prisma.contact.findMany({
    include: { assignedTo: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function assignLeads(leadIds: string[], operatorId: string) {
  await requireAdminOrAbove();

  await prisma.contact.updateMany({
    where: { id: { in: leadIds } },
    data: { assignedToId: operatorId },
  });

  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function unassignLeads(leadIds: string[]) {
  await requireAdminOrAbove();

  await prisma.contact.updateMany({
    where: { id: { in: leadIds } },
    data: { assignedToId: null },
  });

  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function updateLeadStatus(leadId: string, status: string) {
  await requireAuth();

  await prisma.contact.update({
    where: { id: leadId },
    data: { status: status as "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "LOST" },
  });

  revalidatePath("/admin/dashboard");
  return { success: true };
}

// --------------- Operators ---------------

export async function getOperators() {
  await requireAuth();
  return prisma.admin.findMany({
    where: { role: "OPERATOR" },
    select: {
      id: true,
      name: true,
      email: true,
      _count: { select: { assignedLeads: true } },
    },
    orderBy: { name: "asc" },
  });
}

// --------------- User management (SUPER_ADMIN only) ---------------

export async function getAdmins() {
  await requireSuperAdmin();
  return prisma.admin.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createAdmin(formData: FormData) {
  await requireSuperAdmin();

  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const name = (formData.get("name") as string)?.trim();
  const role = formData.get("role") as string;

  if (!email || !password || !name || !role) {
    return { error: "All fields are required." };
  }

  if (!["ADMIN", "OPERATOR", "SUPER_ADMIN"].includes(role)) {
    return { error: "Invalid role." };
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    return { error: "A user with this email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: role as "SUPER_ADMIN" | "ADMIN" | "OPERATOR",
    },
  });

  revalidatePath("/admin/admins");
  return { success: true };
}

export async function deleteAdmin(adminId: string) {
  const session = await requireSuperAdmin();

  if (adminId === session.user.id) {
    return { error: "You cannot delete your own account." };
  }

  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) {
    return { error: "User not found." };
  }

  if (admin.role === "SUPER_ADMIN") {
    return { error: "Cannot delete a super admin." };
  }

  // Unassign any leads before deleting
  await prisma.contact.updateMany({
    where: { assignedToId: adminId },
    data: { assignedToId: null },
  });

  await prisma.admin.delete({ where: { id: adminId } });

  revalidatePath("/admin/admins");
  revalidatePath("/admin/dashboard");
  return { success: true };
}
