"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, Phone, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import type { Dictionary } from "@/dictionaries";
import uni12 from "@/public/univeristy_showcase/image-gen (12).png";
import uni13 from "@/public/univeristy_showcase/image-gen (13).png";
import uni14 from "@/public/univeristy_showcase/image-gen (14).png";
import uni15 from "@/public/univeristy_showcase/image-gen (15).png";
import uni16 from "@/public/univeristy_showcase/image-gen (16).png";

const IMAGES = [uni12, uni13, uni14, uni15, uni16];

const UNIVERSITIES = [
  { id: 1,  name: "University of Oxford",           shortName: "Oxford",       country: "UK",       flag: "🇬🇧", city: "Oxford",        fields: ["Law", "Medicine", "Computer Science"],         img: 0 },
  { id: 2,  name: "Oxford Brookes University",       shortName: "Brookes",      country: "UK",       flag: "🇬🇧", city: "Oxford",        fields: ["Business", "Architecture", "Hospitality"],     img: 1 },
  { id: 3,  name: "University of Cambridge",         shortName: "Cambridge",    country: "UK",       flag: "🇬🇧", city: "Cambridge",     fields: ["Engineering", "Sciences", "Mathematics"],      img: 2 },
  { id: 4,  name: "Royal Holloway",                  shortName: "Royal Holloway", country: "UK",     flag: "🇬🇧", city: "London",        fields: ["Arts", "Business", "Psychology"],              img: 3 },
  { id: 5,  name: "University College London",       shortName: "UCL",          country: "UK",       flag: "🇬🇧", city: "London",        fields: ["Architecture", "Engineering", "Medicine"],     img: 4 },
  { id: 6,  name: "University of Manchester",        shortName: "Manchester",   country: "UK",       flag: "🇬🇧", city: "Manchester",    fields: ["Business", "Engineering", "Life Sciences"],    img: 2 },
  { id: 7,  name: "University of Edinburgh",         shortName: "Edinburgh",    country: "UK",       flag: "🇬🇧", city: "Edinburgh",     fields: ["Medicine", "Law", "Computer Science"],         img: 0 },
  { id: 8,  name: "University of Surrey",            shortName: "Surrey",       country: "UK",       flag: "🇬🇧", city: "Guildford",     fields: ["Engineering", "Business", "Health Sciences"],  img: 1 },
  { id: 9,  name: "Sorbonne University",             shortName: "Sorbonne",     country: "France",   flag: "🇫🇷", city: "Paris",         fields: ["Humanities", "Sciences", "Law"],               img: 3 },
  { id: 10, name: "Sciences Po Paris",               shortName: "Sciences Po",  country: "France",   flag: "🇫🇷", city: "Paris",         fields: ["Political Science", "International Relations", "Economics"], img: 4 },
  { id: 11, name: "University of Toronto",           shortName: "U of T",       country: "Canada",   flag: "🇨🇦", city: "Toronto",       fields: ["Medicine", "Engineering", "Business"],         img: 0 },
  { id: 12, name: "McGill University",               shortName: "McGill",       country: "Canada",   flag: "🇨🇦", city: "Montréal",      fields: ["Law", "Medicine", "Arts"],                     img: 2 },
  { id: 13, name: "Istanbul Technical University",   shortName: "ITÜ",          country: "Turkey",   flag: "🇹🇷", city: "Istanbul",      fields: ["Engineering", "Architecture", "Sciences"],     img: 1 },
  { id: 14, name: "Middle East Technical University",shortName: "METU",         country: "Turkey",   flag: "🇹🇷", city: "Ankara",        fields: ["Computer Science", "Engineering", "Economics"], img: 3 },
  { id: 15, name: "University of Malaya",            shortName: "UM",           country: "Malaysia", flag: "🇲🇾", city: "Kuala Lumpur",  fields: ["Medicine", "Engineering", "Business"],         img: 4 },
  { id: 16, name: "TU Munich",                       shortName: "TU Munich",    country: "Germany",  flag: "🇩🇪", city: "Munich",        fields: ["Engineering", "Computer Science", "Natural Sciences"], img: 0 },
];

const COUNTRY_FILTERS = ["All", "UK", "France", "Canada", "Turkey", "Malaysia", "Germany"] as const;

const WHATSAPP_URL = "https://wa.me/213561799531";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface UniShowcaseSectionProps {
  dict: Dictionary;
}

export default function UniShowcaseSection({ dict }: UniShowcaseSectionProps) {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";

  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return UNIVERSITIES.filter((uni) => {
      const matchesCountry = activeCountry === "All" || uni.country === activeCountry;
      const matchesSearch =
        !q ||
        uni.name.toLowerCase().includes(q) ||
        uni.shortName.toLowerCase().includes(q) ||
        uni.country.toLowerCase().includes(q) ||
        uni.city.toLowerCase().includes(q) ||
        uni.fields.some((f) => f.toLowerCase().includes(q));
      return matchesCountry && matchesSearch;
    });
  }, [search, activeCountry]);

  return (
    <section
      id="universities"
      className="w-full bg-[--color-brand-primary] px-4 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-10">

        {/* ── Section header ─────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a84b]/40 bg-[#d4a84b]/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#d4a84b]" />
            <span className="text-sm font-medium text-[#d4a84b]">
              {dict.universities.searchBadge}
            </span>
          </div>
          <h2 className="text-balance text-3xl font-bold text-[#f5f0e8] sm:text-4xl md:text-5xl">
            {dict.universities.searchTitle}
          </h2>
          <p className="max-w-xl text-base text-white/55 sm:text-lg">
            {dict.universities.searchSubtitle}
          </p>
        </div>

        {/* ── Search + country filters ────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dict.universities.searchPlaceholder}
              className="h-14 w-full rounded-2xl border border-white/15 bg-white/[0.08] pl-12 pr-4 text-sm text-white placeholder:text-white/35 transition-colors focus:border-[#d4a84b]/50 focus:bg-white/[0.12] focus:outline-none"
            />
          </div>

          {/* Country pills */}
          <div className="flex flex-wrap gap-2">
            {COUNTRY_FILTERS.map((country) => (
              <button
                key={country}
                type="button"
                onClick={() => setActiveCountry(country)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCountry === country
                    ? "bg-[#d4a84b] text-[#0a1628] shadow-md"
                    : "border border-white/15 bg-white/[0.07] text-white/65 hover:bg-white/[0.14] hover:text-white"
                }`}
              >
                {country === "All" ? dict.universities.filterAll : country}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results count ───────────────────────────────────────── */}
        <p className="text-sm text-white/35">
          {filtered.length} {dict.universities.resultsCount}
        </p>

        {/* ── University grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((uni) => (
                <motion.div
                  key={uni.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.22 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] transition-colors hover:bg-white/[0.09]"
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden sm:h-44">
                    <Image
                      src={IMAGES[uni.img]}
                      alt={uni.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Country badge overlay */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
                      <span className="text-sm leading-none">{uni.flag}</span>
                      <span className="text-xs font-medium text-white">{uni.country}</span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div>
                      <p className="mb-0.5 text-xs text-white/35">{uni.city}</p>
                      <h3 className="text-sm font-semibold leading-snug text-white">
                        {uni.name}
                      </h3>
                    </div>

                    {/* Field tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {uni.fields.slice(0, 2).map((field) => (
                        <span
                          key={field}
                          className="rounded-full bg-[#d4a84b]/10 px-2.5 py-0.5 text-[10px] text-[#d4a84b]/80"
                        >
                          {field}
                        </span>
                      ))}
                    </div>

                    {/* Apply CTA */}
                    <Link
                      href={`/${locale}/contact`}
                      className="mt-auto flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#d4a84b] text-sm font-semibold text-[#0a1628] transition-colors hover:bg-[#c49a3f]"
                    >
                      {dict.universities.applyNow}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full flex flex-col items-center justify-center gap-5 py-16 text-center"
              >
                <p className="text-lg text-white/60">{dict.universities.noResults}</p>
                <p className="text-sm text-white/35">{dict.universities.noResultsHelp}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    WhatsApp us
                  </a>
                  <a
                    href="tel:+213560409193"
                    className="flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-medium text-white"
                  >
                    <Phone className="h-4 w-4 text-[#d4a84b]" />
                    0560 409 193
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom conversion strip ─────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-6 sm:flex-row">
          <div>
            <h3 className="text-lg font-bold text-white">{dict.universities.ctaHeading}</h3>
            <p className="mt-1 text-sm text-white/50">{dict.universities.ctaText}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-colors hover:bg-[#22c55e]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {dict.universities.ctaWhatsApp}
            </a>
            <a
              href="tel:+213560409193"
              className="flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-medium text-white transition-colors hover:bg-white/[0.18]"
            >
              <Phone className="h-4 w-4 text-[#d4a84b]" />
              {dict.universities.ctaCall}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
