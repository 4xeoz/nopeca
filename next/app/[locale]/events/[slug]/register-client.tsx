"use client";

import { useState } from "react";
import { registerForEvent } from "@/actions/events";
import { toast } from "sonner";

interface Props {
  eventId: string;
}

export default function RegisterClient({ eventId }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await registerForEvent(eventId, formData);

    setLoading(false);

    if ("error" in result) {
      toast.error(result.error);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-50/50 px-5 py-8 text-center shadow-md border border-emerald-200/50">
        {/* Checkmark */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 shadow-lg">
          <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#0a1628]">✓ You&apos;re Registered!</h3>
          <p className="mt-2 text-[#0a1628]/70 text-xs">
            We've sent you a confirmation. See you at the event!
          </p>
        </div>

        {/* Quick contact links */}
        <div className="w-full flex flex-col gap-2 mt-2">
          <a
            href="tel:+213560409193"
            className="flex items-center justify-center gap-2 text-[#0a1628] font-medium text-xs hover:text-[#d4a84b] transition-colors"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Call Us
          </a>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-[#e5e0d5] bg-[#f5f0e8]/40 px-4 py-3 text-sm text-[#0a1628] placeholder:text-[#0a1628]/35 focus:border-[#0a1628] focus:bg-white focus:outline-none transition-colors";
  const labelCls = "block mb-1.5 text-sm font-medium text-[#0a1628]";

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#d4a84b]/15 to-[#d4a84b]/5 border-2 border-[#d4a84b]/50 p-5 shadow-lg">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-black text-[#0a1628]">Join Us! 🎓</h2>
        <p className="text-xs text-[#0a1628]/60 mt-1">
          Register now to secure your spot
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Full name */}
        <div>
          <label className="block mb-1 text-xs font-medium text-[#0a1628]">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-lg border border-[#e5e0d5] bg-[#f5f0e8]/40 px-3 py-2 text-xs text-[#0a1628] placeholder:text-[#0a1628]/35 focus:border-[#0a1628] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-xs font-medium text-[#0a1628]">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="+213 555 123 456"
            className="w-full rounded-lg border border-[#e5e0d5] bg-[#f5f0e8]/40 px-3 py-2 text-xs text-[#0a1628] placeholder:text-[#0a1628]/35 focus:border-[#0a1628] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-xs font-medium text-[#0a1628]">Email <span className="text-[#0a1628]/35">(optional)</span></label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            className="w-full rounded-lg border border-[#e5e0d5] bg-[#f5f0e8]/40 px-3 py-2 text-xs text-[#0a1628] placeholder:text-[#0a1628]/35 focus:border-[#0a1628] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#d4a84b] to-[#c49a3d] text-xs font-bold text-white hover:from-[#c49a3d] hover:to-[#b8883d] active:scale-[0.98] transition-all disabled:opacity-60 shadow-lg shadow-[#d4a84b]/30 mt-2"
        >
          {loading ? (
            <>
              <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Registering…
            </>
          ) : (
            "Register Now"
          )}
        </button>
      </form>
    </div>
  );
}
