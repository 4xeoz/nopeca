"use client";

import { useState } from "react";
import { deleteAdmin } from "@/actions/admin";

interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}

export default function AdminList({
  admins,
  currentUserId,
}: {
  admins: Admin[];
  currentUserId: string;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(adminId: string) {
    if (!confirm("Are you sure you want to remove this admin?")) return;

    setDeletingId(adminId);
    setError(null);
    const result = await deleteAdmin(adminId);
    if (result?.error) {
      setError(result.error);
    }
    setDeletingId(null);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#d1c7b1] bg-white">
      {error && (
        <div className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="flex flex-col divide-y divide-[#d1c7b1]/50">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="flex items-center justify-between px-4 py-4"
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#0a1628]">
                  {admin.name}
                </span>
                {admin.role === "SUPER_ADMIN" && (
                  <span className="rounded bg-[#d4a84b]/20 px-1.5 py-0.5 text-xs font-semibold text-[#d4a84b]">
                    SUPER
                  </span>
                )}
                {admin.id === currentUserId && (
                  <span className="rounded bg-[#012340]/10 px-1.5 py-0.5 text-xs font-medium text-[#012340]">
                    You
                  </span>
                )}
              </div>
              <span className="text-sm text-[#0a1628]/60">{admin.email}</span>
            </div>

            {admin.role !== "SUPER_ADMIN" && admin.id !== currentUserId && (
              <button
                type="button"
                onClick={() => handleDelete(admin.id)}
                disabled={deletingId === admin.id}
                className="rounded-full border border-red-200 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                {deletingId === admin.id ? "..." : "Remove"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
