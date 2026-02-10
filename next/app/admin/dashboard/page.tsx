export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getContacts } from "@/actions/admin";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const contacts = await getContacts();
  const role = (session.user as { role: string }).role;

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
              <span className="rounded-full bg-[#012340] px-3 py-1 text-white">
                Leads
              </span>
              {role === "SUPER_ADMIN" && (
                <Link
                  href="/admin/admins"
                  className="rounded-full px-3 py-1 text-[#0a1628] transition hover:bg-[#0a1628]/10"
                >
                  Admins
                </Link>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-[#0a1628]/60 sm:block">
              {session.user.email}
              {role === "SUPER_ADMIN" && (
                <span className="ml-2 rounded bg-[#d4a84b]/20 px-1.5 py-0.5 text-xs font-semibold text-[#d4a84b]">
                  SUPER
                </span>
              )}
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
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#0a1628]">
            Contact Leads
          </h2>
          <span className="rounded-full bg-[#012340] px-3 py-1 text-sm font-medium text-white">
            {contacts.length} total
          </span>
        </div>

        {contacts.length === 0 ? (
          <div className="rounded-2xl border border-[#d1c7b1] bg-white p-12 text-center">
            <p className="text-[#0a1628]/60">No contact leads yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#d1c7b1] bg-white">
            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#d1c7b1] bg-[#f5f0e8]/50">
                    <th className="px-4 py-3 font-semibold text-[#0a1628]">
                      Name
                    </th>
                    <th className="px-4 py-3 font-semibold text-[#0a1628]">
                      Email
                    </th>
                    <th className="px-4 py-3 font-semibold text-[#0a1628]">
                      Phone
                    </th>
                    <th className="px-4 py-3 font-semibold text-[#0a1628]">
                      Message
                    </th>
                    <th className="px-4 py-3 font-semibold text-[#0a1628]">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="border-b border-[#d1c7b1]/50 last:border-0"
                    >
                      <td className="px-4 py-3 font-medium text-[#0a1628]">
                        {contact.name}
                      </td>
                      <td className="px-4 py-3 text-[#0a1628]/70">
                        {contact.email}
                      </td>
                      <td className="px-4 py-3 text-[#0a1628]/70">
                        {contact.phone || "—"}
                      </td>
                      <td className="max-w-xs truncate px-4 py-3 text-[#0a1628]/70">
                        {contact.message}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-[#0a1628]/50">
                        {new Date(contact.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="flex flex-col divide-y divide-[#d1c7b1]/50 md:hidden">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex flex-col gap-1 px-4 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#0a1628]">
                      {contact.name}
                    </span>
                    <span className="text-xs text-[#0a1628]/50">
                      {new Date(contact.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <span className="text-sm text-[#0a1628]/70">
                    {contact.email}
                  </span>
                  {contact.phone && (
                    <span className="text-sm text-[#0a1628]/70">
                      {contact.phone}
                    </span>
                  )}
                  <p className="mt-1 text-sm text-[#0a1628]/60 line-clamp-2">
                    {contact.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
