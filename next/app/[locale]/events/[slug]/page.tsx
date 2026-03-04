import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/i18n.config";
import { getEventBySlug } from "@/actions/events";
import Navbar from "@/components/layout/Navbar";
import RegisterClient from "./register-client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: `${event.name} — Nopeca`,
    description: event.description,
  };
}

export default async function EventPage({ params }: Props) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const isPast = new Date(event.date) < new Date();

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Navbar locale={locale} dict={dict} />

      {/* ── Event hero ──────────────────────────────────────────── */}
      <section className="bg-[#0a1628] px-4 pb-16 pt-28 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#d4a84b]">
            Nopeca Event
          </p>
          <h1 className="text-balance text-3xl font-bold leading-tight text-[#f5f0e8] sm:text-4xl md:text-5xl">
            {event.name}
          </h1>

          {/* Meta badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/60">
            {/* Date */}
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#d4a84b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
              </svg>
              {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
            </span>

            <span className="text-white/20">·</span>

            {/* Time */}
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#d4a84b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {format(new Date(event.date), "HH:mm")}
            </span>

            <span className="text-white/20">·</span>

            {/* Location */}
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#d4a84b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {event.location}
            </span>
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────── */}
      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_400px]">

          {/* Event description */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-4 text-lg font-bold text-[#0a1628]">About This Event</h2>
              <p className="whitespace-pre-wrap leading-relaxed text-[#0a1628]/70">
                {event.description}
              </p>
            </div>

            {/* Registration count social proof */}
            {event._count.registrations > 0 && (
              <div className="flex items-center gap-3 rounded-2xl border border-[#d4a84b]/30 bg-[#d4a84b]/8 px-5 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4a84b]/20 text-lg">
                  🎓
                </div>
                <p className="text-sm font-medium text-[#0a1628]">
                  <span className="font-bold text-[#d4a84b]">{event._count.registrations}</span>{" "}
                  {event._count.registrations === 1 ? "person has" : "people have"} already registered for this event.
                </p>
              </div>
            )}

            {/* Hosted by Nopeca */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[#0a1628]/35">Organised by</p>
              <p className="mt-1 text-base font-semibold text-[#0a1628]">Nopeca</p>
              <p className="mt-0.5 text-sm text-[#0a1628]/55">
                Helping Algerian students study at the world&apos;s best universities.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <a
                  href="https://wa.me/213561799531"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-[#25D366]/10 px-3 py-1.5 font-medium text-[#1a9f4b] hover:bg-[#25D366]/20 transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href="tel:+213560409193"
                  className="flex items-center gap-1.5 rounded-lg bg-[#0a1628]/5 px-3 py-1.5 font-medium text-[#0a1628] hover:bg-[#0a1628]/10 transition-colors"
                >
                  0560 409 193
                </a>
              </div>
            </div>
          </div>

          {/* Registration form or closed/past state */}
          <div>
            {isPast || !event.isActive ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-12 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0a1628]/5">
                  <svg className="h-7 w-7 text-[#0a1628]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#0a1628]">Registration Closed</h3>
                  <p className="mt-2 text-sm text-[#0a1628]/55">
                    {isPast ? "This event has already taken place." : "Registration for this event is currently closed."}
                  </p>
                </div>
                <a
                  href="https://wa.me/213561799531"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white"
                >
                  Contact Us on WhatsApp
                </a>
              </div>
            ) : (
              <RegisterClient eventId={event.id} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
