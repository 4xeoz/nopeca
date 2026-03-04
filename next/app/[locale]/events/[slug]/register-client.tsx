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
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-white px-8 py-12 text-center shadow-sm">
        {/* Checkmark */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0a1628]">You&apos;re registered!</h3>
          <p className="mt-2 text-[#0a1628]/60">
            Thank you for registering. We look forward to seeing you at the event.
          </p>
        </div>
        <p className="text-sm text-[#0a1628]/40">
          If you have any questions, contact us on WhatsApp or call{" "}
          <a href="tel:+213560409193" className="font-medium text-[#0a1628] underline-offset-2 hover:underline">
            0560 409 193
          </a>
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-[#e5e0d5] bg-[#f5f0e8]/40 px-4 py-3 text-sm text-[#0a1628] placeholder:text-[#0a1628]/35 focus:border-[#0a1628] focus:bg-white focus:outline-none transition-colors";
  const labelCls = "block mb-1.5 text-sm font-medium text-[#0a1628]";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h3 className="mb-1 text-lg font-bold text-[#0a1628]">Register to Attend</h3>
      <p className="mb-6 text-sm text-[#0a1628]/50">
        Fill in your details below and secure your spot.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Full name */}
        <div>
          <label className={labelCls}>
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className={inputCls}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelCls}>
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="e.g. 0555 123 456"
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
          <label className={labelCls}>Message <span className="text-[#0a1628]/35">(optional)</span></label>
          <textarea
            name="message"
            rows={3}
            placeholder="Any questions or notes for the organiser..."
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#d4a84b] text-base font-semibold text-white transition-opacity disabled:opacity-60 hover:opacity-90"
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
            "Confirm Registration"
          )}
        </button>
      </form>
    </div>
  );
}
