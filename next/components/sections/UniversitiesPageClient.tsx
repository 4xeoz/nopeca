"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Phone, GraduationCap, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import type { Dictionary } from "@/dictionaries";
import uni12 from "@/public/univeristy_showcase/image-gen (12).png";
import uni13 from "@/public/univeristy_showcase/image-gen (13).png";
import uni14 from "@/public/univeristy_showcase/image-gen (14).png";
import uni15 from "@/public/univeristy_showcase/image-gen (15).png";
import uni16 from "@/public/univeristy_showcase/image-gen (16).png";

const IMAGES = [uni12, uni13, uni14, uni15, uni16];

const WHATSAPP_URL = "https://wa.me/213561799531";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface Program {
  name: string;
  feeFrom: number;
}

interface University {
  id: number;
  name: string;
  city: string;
  ranking: string;
  img: number;
  description: string;
  programs: Program[];
  tags: string[];
}

const UK_UNIVERSITIES: University[] = [
  {
    id: 1,
    name: "University of Oxford",
    city: "Oxford",
    ranking: "QS World #3",
    img: 0,
    description:
      "One of the world's most prestigious universities, Oxford offers an incomparable academic environment built on centuries of tradition, tutorial-based learning, and groundbreaking research.",
    programs: [
      { name: "Law", feeFrom: 29012 },
      { name: "Computer Science", feeFrom: 28950 },
      { name: "Medicine", feeFrom: 33050 },
      { name: "Economics", feeFrom: 27400 },
    ],
    tags: ["Russell Group", "Top 3 World"],
  },
  {
    id: 2,
    name: "University of Cambridge",
    city: "Cambridge",
    ranking: "QS World #2",
    img: 1,
    description:
      "Consistently ranked among the world's top two universities, Cambridge is renowned for its collegiate system, exceptional faculty, and alumni who have shaped science, politics, and culture.",
    programs: [
      { name: "Engineering", feeFrom: 34176 },
      { name: "Natural Sciences", feeFrom: 30105 },
      { name: "Mathematics", feeFrom: 25000 },
      { name: "Architecture", feeFrom: 26700 },
    ],
    tags: ["Russell Group", "Nobel Laureates"],
  },
  {
    id: 3,
    name: "University College London",
    city: "London",
    ranking: "QS World #9",
    img: 2,
    description:
      "Located in the heart of London, UCL is a global powerhouse known for world-class research, a highly diverse international community, and unrivalled proximity to industry leaders.",
    programs: [
      { name: "Architecture", feeFrom: 30095 },
      { name: "Engineering", feeFrom: 28500 },
      { name: "Medicine", feeFrom: 38020 },
      { name: "Laws", feeFrom: 26140 },
    ],
    tags: ["Russell Group", "London"],
  },
  {
    id: 4,
    name: "King's College London",
    city: "London",
    ranking: "QS World #40",
    img: 3,
    description:
      "A research-led university with a rich 200-year history in the heart of London, KCL is particularly renowned for its medical, law, nursing, and social science programmes.",
    programs: [
      { name: "Law", feeFrom: 25890 },
      { name: "Nursing", feeFrom: 17100 },
      { name: "Medicine", feeFrom: 31500 },
      { name: "Business", feeFrom: 20000 },
    ],
    tags: ["Russell Group", "London"],
  },
  {
    id: 5,
    name: "University of Manchester",
    city: "Manchester",
    ranking: "QS World #32",
    img: 4,
    description:
      "With 25 Nobel laureates among its staff and alumni, Manchester blends academic excellence with a vibrant, affordable city life and some of the UK's strongest industry partnerships.",
    programs: [
      { name: "Business", feeFrom: 25500 },
      { name: "Engineering", feeFrom: 24000 },
      { name: "Computer Science", feeFrom: 25500 },
      { name: "Life Sciences", feeFrom: 22000 },
    ],
    tags: ["Russell Group", "25 Nobel Laureates"],
  },
  {
    id: 6,
    name: "University of Edinburgh",
    city: "Edinburgh",
    ranking: "QS World #27",
    img: 0,
    description:
      "Set in one of Europe's most beautiful and culturally rich cities, Edinburgh ranks consistently among the UK's top universities with outstanding research and a welcoming international community.",
    programs: [
      { name: "Medicine", feeFrom: 32500 },
      { name: "Law", feeFrom: 19700 },
      { name: "Computer Science", feeFrom: 27200 },
      { name: "Business", feeFrom: 21000 },
    ],
    tags: ["Russell Group", "Scotland"],
  },
  {
    id: 7,
    name: "University of Bristol",
    city: "Bristol",
    ranking: "QS World #54",
    img: 1,
    description:
      "A founding member of the prestigious Russell Group, Bristol is celebrated for strong graduate employability, a thriving student community, and a stunning campus in one of the UK's most liveable cities.",
    programs: [
      { name: "Engineering", feeFrom: 24700 },
      { name: "Law", feeFrom: 21700 },
      { name: "Medicine", feeFrom: 34100 },
      { name: "Economics", feeFrom: 21700 },
    ],
    tags: ["Russell Group", "Top Employability"],
  },
  {
    id: 8,
    name: "University of Birmingham",
    city: "Birmingham",
    ranking: "QS World #84",
    img: 2,
    description:
      "A founding Russell Group member with a stunning Victorian campus, Birmingham delivers world-class education backed by strong industry connections and an active alumni network of 200,000+ worldwide.",
    programs: [
      { name: "Business", feeFrom: 20020 },
      { name: "Engineering", feeFrom: 21200 },
      { name: "Computer Science", feeFrom: 20800 },
      { name: "Law", feeFrom: 19040 },
    ],
    tags: ["Russell Group", "200K+ Alumni"],
  },
  {
    id: 9,
    name: "University of Leeds",
    city: "Leeds",
    ranking: "QS World #75",
    img: 3,
    description:
      "Known for excellent facilities and strong industry links, Leeds attracts students from over 150 countries and consistently ranks highly for student satisfaction and graduate employment.",
    programs: [
      { name: "Business", feeFrom: 19250 },
      { name: "Engineering", feeFrom: 21000 },
      { name: "Medicine", feeFrom: 28500 },
      { name: "Architecture", feeFrom: 20600 },
    ],
    tags: ["Russell Group", "150+ Nationalities"],
  },
  {
    id: 10,
    name: "Oxford Brookes University",
    city: "Oxford",
    ranking: "UK Top 50",
    img: 4,
    description:
      "Located in Oxford alongside the world-famous university, Brookes is one of the UK's leading modern universities — especially strong in hospitality, business, and architecture, with more accessible entry requirements.",
    programs: [
      { name: "Business", feeFrom: 14350 },
      { name: "Architecture", feeFrom: 16050 },
      { name: "Hospitality Management", feeFrom: 14600 },
      { name: "Engineering", feeFrom: 14850 },
    ],
    tags: ["Modern University", "Oxford City"],
  },
  {
    id: 11,
    name: "Royal Holloway",
    city: "London",
    ranking: "UK Top 30",
    img: 0,
    description:
      "A stunning Victorian campus 40 minutes from central London, Royal Holloway excels in creative arts, business, and the sciences, with a close-knit campus community and excellent pastoral support.",
    programs: [
      { name: "Business", feeFrom: 17500 },
      { name: "Computer Science", feeFrom: 17500 },
      { name: "Psychology", feeFrom: 17200 },
      { name: "Media Arts", feeFrom: 17000 },
    ],
    tags: ["London Area", "Arts & Sciences"],
  },
  {
    id: 12,
    name: "University of Surrey",
    city: "Guildford",
    ranking: "QS World Top 500",
    img: 1,
    description:
      "Ranked #1 in the UK for student experience in multiple independent surveys, Surrey is especially strong in engineering, business, and health sciences, with guaranteed placement years available.",
    programs: [
      { name: "Engineering", feeFrom: 19800 },
      { name: "Business", feeFrom: 20200 },
      { name: "Health Sciences", feeFrom: 17500 },
      { name: "Computer Science", feeFrom: 19800 },
    ],
    tags: ["#1 Student Experience", "Placement Year"],
  },
];

interface Props {
  dict: Dictionary;
  locale: string;
}

function formatFee(amount: number): string {
  return `£${amount.toLocaleString("en-GB")}`;
}

export default function UniversitiesPageClient({ dict, locale }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return UK_UNIVERSITIES;
    return UK_UNIVERSITIES.filter(
      (uni) =>
        uni.name.toLowerCase().includes(q) ||
        uni.city.toLowerCase().includes(q) ||
        uni.programs.some((p) => p.name.toLowerCase().includes(q)) ||
        uni.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Navbar locale={locale} dict={dict} />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-[#0a1628] px-4 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a84b]/40 bg-[#d4a84b]/10 px-4 py-2">
            <GraduationCap className="h-4 w-4 text-[#d4a84b]" />
            <span className="text-sm font-medium text-[#d4a84b]">🇬🇧 UK Universities</span>
          </div>
          <h1 className="text-balance text-4xl font-bold leading-tight text-[#f5f0e8] sm:text-5xl md:text-6xl">
            {dict.universities.pageTitle}
          </h1>
          <p className="max-w-xl text-base text-white/55 sm:text-lg">
            {dict.universities.pageSubtitle}
          </p>

          {/* Search */}
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dict.universities.searchPlaceholder}
              className="h-14 w-full rounded-2xl border border-white/15 bg-white/[0.08] pl-12 pr-4 text-white placeholder:text-white/35 transition-colors focus:border-[#d4a84b]/50 focus:bg-white/[0.12] focus:outline-none"
            />
          </div>

          {/* Results count */}
          <p className="text-sm text-white/35">
            {filtered.length} {dict.universities.resultsCount}
          </p>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────── */}
      <div className="border-b border-[#0a1628]/10 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[
            ["500+", "Students placed"],
            ["98%", "Visa approval rate"],
            ["12+", "UK partner universities"],
            ["Free", "Expert consultation"],
          ].map(([num, label]) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xl font-black text-[#d4a84b]">{num}</span>
              <span className="text-sm text-[#0a1628]/60">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── UNIVERSITIES GRID ────────────────────────────────────── */}
      <section className="px-4 py-12 pb-32 md:py-16 md:pb-36">
        <div className="mx-auto max-w-6xl">

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="text-lg text-[#0a1628]/60">{dict.universities.noResults}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {dict.universities.ctaWhatsApp}
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((uni, index) => (
                <>
                  {/* ── Soft nudge banner every 6 cards ── */}
                  {index > 0 && index % 6 === 0 && (
                    <div
                      key={`nudge-${index}`}
                      className="col-span-full flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#d4a84b]/30 bg-[#d4a84b]/8 px-6 py-5 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-start gap-3">
                        <Star className="mt-0.5 h-5 w-5 shrink-0 text-[#d4a84b]" />
                        <div>
                          <p className="font-bold text-[#0a1628]">
                            {dict.universities.nudgeTitle}
                          </p>
                          <p className="mt-1 text-sm text-[#0a1628]/65">
                            {dict.universities.nudgeText}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/${locale}/contact`}
                        className="shrink-0 rounded-full bg-[#d4a84b] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c49a3f]"
                      >
                        {dict.universities.nudgeCta}
                      </Link>
                    </div>
                  )}

                  {/* ── University card ── */}
                  <article
                    key={uni.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[#0a1628]/10 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={IMAGES[uni.img]}
                        alt={uni.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Ranking badge */}
                      <div className="absolute right-3 top-3 rounded-full bg-[#0a1628]/80 px-3 py-1 backdrop-blur-sm">
                        <span className="text-xs font-bold text-[#d4a84b]">{uni.ranking}</span>
                      </div>
                      {/* Tags */}
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {uni.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/85 px-2.5 py-0.5 text-[10px] font-semibold text-[#0a1628] backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col gap-5 p-5">
                      {/* University info */}
                      <div>
                        <p className="mb-1 flex items-center gap-1 text-xs text-[#0a1628]/45">
                          🇬🇧 {uni.city}, United Kingdom
                        </p>
                        <h2 className="text-lg font-bold leading-snug text-[#0a1628]">
                          {uni.name}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-[#0a1628]/60">
                          {uni.description}
                        </p>
                      </div>

                      {/* Programs + fees — the soft-sell core */}
                      <div className="rounded-xl bg-[#f5f0e8] p-4">
                        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#0a1628]/40">
                          {dict.universities.programsTitle}
                        </p>
                        <ul className="flex flex-col gap-2.5">
                          {uni.programs.map((prog) => (
                            <li
                              key={prog.name}
                              className="flex items-center justify-between gap-2"
                            >
                              <span className="text-sm font-medium text-[#0a1628]">
                                {prog.name}
                              </span>
                              <span className="shrink-0 rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-[#d4a84b] shadow-sm">
                                {dict.universities.fromPrice} {formatFee(prog.feeFrom)}
                                {dict.universities.perYear}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {/* The hook — creates the need to contact */}
                        <p className="mt-3 text-[10px] leading-relaxed text-[#0a1628]/40">
                          ⓘ {dict.universities.feesNote}
                        </p>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/${locale}/contact`}
                        className="mt-auto flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0a1628] text-sm font-semibold text-white transition-colors hover:bg-[#0f1f3c]"
                      >
                        {dict.universities.getGuidance}
                        <span className="text-[#d4a84b]">→</span>
                      </Link>
                    </div>
                  </article>
                </>
              ))}
            </div>
          )}

          {/* ── Mid-page advisor block ─────────────────────────── */}
          {filtered.length > 0 && (
            <div className="mt-12 flex flex-col items-center gap-6 rounded-3xl border border-[#0a1628]/10 bg-[#0a1628] px-6 py-10 text-center md:py-14">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d4a84b]/15">
                <GraduationCap className="h-7 w-7 text-[#d4a84b]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#f5f0e8] sm:text-3xl">
                  {dict.universities.advisorBlock}
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-base text-white/55">
                  {dict.universities.advisorBlockSub}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-colors hover:bg-[#22c55e]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {dict.universities.ctaWhatsApp}
                </a>
                <Link
                  href={`/${locale}/contact`}
                  className="flex h-12 items-center gap-2 rounded-full bg-[#d4a84b] px-6 text-sm font-semibold text-[#0a1628] transition-colors hover:bg-[#c49a3f]"
                >
                  {dict.universities.advisorBlockCta}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── STICKY BOTTOM BAR ───────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a1628]/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-center text-sm font-medium text-white/80 sm:text-left sm:text-base">
            💬 {dict.universities.stickyTitle}
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-colors hover:bg-[#22c55e]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{dict.universities.ctaWhatsApp}</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
            <a
              href="tel:+213560409193"
              className="flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/[0.18]"
            >
              <Phone className="h-4 w-4 text-[#d4a84b]" />
              <span className="hidden sm:inline">{dict.universities.ctaCall}</span>
              <span className="sm:hidden">Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
