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
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-50/50 px-8 py-12 text-center shadow-md border border-emerald-200/50">
        {/* Animated checkmark */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 shadow-lg">
          <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#0a1628]">🎉 You&apos;re All Set!</h3>
          <p className="mt-3 text-[#0a1628]/70 text-base">
            Your registration is confirmed. We can't wait to see you at the event!
          </p>
        </div>

        {/* Contact info */}
        <div className="w-full rounded-xl bg-white/60 border border-emerald-200/30 px-4 py-3 mt-2">
          <p className="text-xs text-[#0a1628]/50 font-medium mb-2">NEED HELP?</p>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://wa.me/447879003218"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#1a9f4b] font-medium hover:text-[#0d7d3a] transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="tel:+213560409193"
              className="flex items-center gap-2 text-[#0a1628]/70 font-medium hover:text-[#0a1628] transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0560 409 193
            </a>
          </div>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-[#e5e0d5] bg-[#f5f0e8]/40 px-4 py-3 text-sm text-[#0a1628] placeholder:text-[#0a1628]/35 focus:border-[#0a1628] focus:bg-white focus:outline-none transition-colors";
  const labelCls = "block mb-1.5 text-sm font-medium text-[#0a1628]";

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white via-white to-[#f5f0e8] p-6 shadow-md border border-white/60 sm:p-8">
      <div className="flex items-start gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4a84b]/15">
          <svg className="h-5 w-5 text-[#d4a84b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#0a1628]">Secure Your Spot</h3>
          <p className="text-sm text-[#0a1628]/50 mt-0.5">
            Join other interested students at this event
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full name */}
        <div>
          <label className={labelCls}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="e.g. Ahmed Mohammed"
            className={inputCls}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelCls}>
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="e.g. +213 555 123 456"
            className={inputCls}
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelCls}>Email Address <span className="text-[#0a1628]/35">(optional)</span></label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            className={inputCls}
          />
        </div>

        {/* Message */}
        <div>
          <label className={labelCls}>Questions or Notes <span className="text-[#0a1628]/35">(optional)</span></label>
          <textarea
            name="message"
            rows={3}
            placeholder="Tell us anything we should know..."
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4a84b] to-[#c49a3d] text-base font-semibold text-white hover:from-[#c49a3d] hover:to-[#b8883d] active:scale-[0.98] transition-all disabled:opacity-60 shadow-lg shadow-[#d4a84b]/25 mt-2"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Registering…
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Confirm Registration
            </>
          )}
        </button>

        {/* Trust note */}
        <p className="text-xs text-[#0a1628]/40 text-center mt-2">
          ✓ Your information is secure and won't be shared
        </p>
      </form>
    </div>
  );
}
