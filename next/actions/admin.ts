"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

async function requireSuperAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

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

  if (!email || !password || !name) {
    return { error: "All fields are required." };
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    return { error: "An admin with this email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "ADMIN",
    },
  });

  revalidatePath("/admin/admins");
  return { success: true };
}

export async function deleteAdmin(adminId: string) {
  const session = await requireSuperAdmin();

  // Prevent deleting yourself
  if (adminId === session.user.id) {
    return { error: "You cannot delete your own account." };
  }

  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) {
    return { error: "Admin not found." };
  }

  // Prevent deleting other super admins
  if (admin.role === "SUPER_ADMIN") {
    return { error: "Cannot delete a super admin." };
  }

  await prisma.admin.delete({ where: { id: adminId } });

  revalidatePath("/admin/admins");
  return { success: true };
}

export async function getContacts() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });
}
