import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/i18n.config";
import { getEventBySlug } from "@/actions/events";
import Navbar from "@/components/layout/Navbar";
import RegisterClient from "./register-client";
import type { Metadata } from "next";
import Image from "next/image";

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
      <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0d1f35] to-[#0a1628] px-4 pb-16 pt-28 md:pt-36 overflow-hidden">
        {/* Animated background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          {event.imageUrl && (
            <Image
              src={event.imageUrl}
              alt={event.name}
              fill
              className="object-cover opacity-15"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1628]/80" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          {/* Event badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4a84b]/30 bg-[#d4a84b]/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#d4a84b] animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#d4a84b]">
              Nopeca Event
            </p>
          </div>

          {/* Title */}
          <h1 className="text-balance text-3xl font-bold leading-tight text-[#f5f0e8] sm:text-4xl md:text-5xl mb-8">
            {event.name}
          </h1>

          {/* Event details cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Date card */}
            <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-3 hover:bg-white/8 transition-colors">
              <p className="text-white/50 text-xs font-medium mb-1">DATE & TIME</p>
              <div className="flex items-center gap-2 justify-center">
                <svg className="h-4 w-4 text-[#d4a84b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0121 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                </svg>
                <span className="text-white/80 text-sm font-medium">
                  {format(new Date(event.date), "MMM d, yyyy · HH:mm")}
                </span>
              </div>
            </div>

            {/* Location card with direct map link */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-3 hover:bg-[#d4a84b]/20 hover:border-[#d4a84b]/50 transition-all group cursor-pointer"
            >
              <p className="text-white/50 text-xs font-medium mb-1">LOCATION</p>
              <div className="flex items-center gap-2 justify-center">
                <svg className="h-4 w-4 text-[#d4a84b] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                  {event.location}
                </span>
              </div>
            </a>

            {/* Registrations count */}
            {event._count.registrations > 0 && (
              <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-3 hover:bg-white/8 transition-colors">
                <p className="text-white/50 text-xs font-medium mb-1">GOING</p>
                <div className="flex items-center gap-2 justify-center">
                  <svg className="h-4 w-4 text-[#d4a84b]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                  <span className="text-white/80 text-sm font-bold text-[#d4a84b]">
                    {event._count.registrations}
                  </span>
                </div>
              </div>
            )}
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

              {/* Location + Google Maps button */}
              <div className="mt-6 flex items-start justify-between gap-4 rounded-xl border border-[#e5e0d5] bg-[#f5f0e8]/60 px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a84b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-sm font-medium text-[#0a1628]">{event.location}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#0a1628] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-80"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  View on Google Maps
                </a>
              </div>
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
                  href="https://wa.me/447879003218"
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
              <div className="flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-white to-[#f5f0e8] px-8 py-12 text-center shadow-md border border-white/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a84b]/20 to-[#d4a84b]/5">
                  <svg className="h-8 w-8 text-[#d4a84b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0a1628]">Registration {isPast ? "Ended" : "Closed"}</h3>
                  <p className="mt-2 text-sm text-[#0a1628]/60">
                    {isPast ? "Thank you for your interest! This event has already taken place." : "Registration for this event is not currently open."}
                  </p>
                </div>
                <a
                  href="https://wa.me/447879003218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 h-12 px-6 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#22c55e] active:scale-[0.98] transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
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
