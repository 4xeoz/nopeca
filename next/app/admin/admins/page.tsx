export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAdmins } from "@/actions/admin";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import AdminList from "./admin-list";
import AddAdminForm from "./add-admin-form";

export default async function AdminsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const role = (session.user as { role: string }).role;
  if (role !== "SUPER_ADMIN") redirect("/admin/dashboard");

  const admins = await getAdmins();

  return (
    <div className="min-h-dvh bg-[#f5f0e8]">
      {/* Top bar */}
      <header className="border-b border-[#d1c7b1] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-[#0a1628]">
              Nopeca Admin
            </h1>
            <nav className="flex items-center gap-3 text-sm font-medium">
              <Link
                href="/admin/dashboard"
                className="rounded-full px-3 py-1 text-[#0a1628] transition hover:bg-[#0a1628]/10"
              >
                Leads
              </Link>
              <span className="rounded-full bg-[#012340] px-3 py-1 text-white">
                Admins
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-[#0a1628]/60 sm:block">
              {session.user.email}
              <span className="ml-2 rounded bg-[#d4a84b]/20 px-1.5 py-0.5 text-xs font-semibold text-[#d4a84b]">
                SUPER
              </span>
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-[#d1c7b1] px-4 py-1.5 text-sm font-medium text-[#0a1628] transition hover:bg-red-50 hover:border-red-200 hover:text-red-700"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Admin list */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0a1628]">
                Admin Accounts
              </h2>
              <span className="rounded-full bg-[#012340] px-3 py-1 text-sm font-medium text-white">
                {admins.length} total
              </span>
            </div>
            <AdminList admins={admins} currentUserId={session.user.id} />
          </div>

          {/* Add admin form */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#0a1628]">
              Add New Admin
            </h3>
            <AddAdminForm />
          </div>
        </div>
      </main>
    </div>
  );
}
