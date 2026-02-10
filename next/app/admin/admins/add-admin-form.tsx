"use client";

import { useActionState } from "react";
import { createAdmin } from "@/actions/admin";

export default function AddAdminForm() {
  const [state, formAction, isPending] = useActionState(
    async (
      _prev: { error?: string; success?: boolean } | undefined,
      formData: FormData
    ) => {
      return await createAdmin(formData);
    },
    undefined
  );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-2xl border border-[#d1c7b1] bg-white p-5"
    >
      {state?.error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          Admin added successfully.
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-[#0a1628]"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="h-10 w-full rounded-xl border border-[#d1c7b1] bg-white px-3 text-sm text-[#0a1628] outline-none focus:border-[#012340] focus:ring-2 focus:ring-[#012340]/20"
        />
      </div>

      <div>
        <label
          htmlFor="admin-email"
          className="mb-1 block text-sm font-medium text-[#0a1628]"
        >
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          required
          className="h-10 w-full rounded-xl border border-[#d1c7b1] bg-white px-3 text-sm text-[#0a1628] outline-none focus:border-[#012340] focus:ring-2 focus:ring-[#012340]/20"
        />
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="mb-1 block text-sm font-medium text-[#0a1628]"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          minLength={6}
          className="h-10 w-full rounded-xl border border-[#d1c7b1] bg-white px-3 text-sm text-[#0a1628] outline-none focus:border-[#012340] focus:ring-2 focus:ring-[#012340]/20"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="h-10 w-full rounded-full bg-[#012340] text-sm font-semibold text-white transition hover:bg-[#012340]/90 disabled:opacity-50"
      >
        {isPending ? "Adding..." : "Add Admin"}
      </button>
    </form>
  );
}
