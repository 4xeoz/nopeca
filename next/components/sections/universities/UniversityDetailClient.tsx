"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Phone, GraduationCap, TrendingUp, Users, Calendar, Globe, ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import type { University } from "@/lib/data/universities";
import type { Dictionary } from "@/dictionaries";
import { formatFee } from "@/lib/utils/filterUtils";



interface Props {
  university: University;
  locale: string;
  dict: Dictionary;
}

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-800",
  Business: "bg-green-100 text-green-800",
  Medicine: "bg-red-100 text-red-800",
  Law: "bg-purple-100 text-purple-800",
  Sciences: "bg-teal-100 text-teal-800",
  "Computer Science": "bg-indigo-100 text-indigo-800",
  Arts: "bg-orange-100 text-orange-800",
  Humanities: "bg-yellow-100 text-yellow-800",
};

export default function UniversityDetailClient({ university, locale, dict }: Props) {
  const minFee = Math.min(...university.programs.map((p) => p.feeFrom));

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Navbar locale={locale} dict={dict} />

      {/* ── HERO IMAGE ───────────────────────────────────────────────── */}
      <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src={university.image}
          alt={university.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-[#0a1628]/20 to-transparent" />

        {/* Back button */}
        <div className="absolute left-4 top-20 sm:left-8 sm:top-24">
          <Link
            href={`/${locale}/universities`}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white hover:bg-white/25 transition-colors border border-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            All Universities
          </Link>
        </div>

        {/* Headline overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 sm:px-8 sm:pb-10">
          <div className="mx-auto max-w-5xl">
            {/* Ranking badge */}
            <div className="mb-3 flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d4a84b] px-3 py-1 text-xs font-bold text-[#0a1628]">
                <TrendingUp className="h-3.5 w-3.5" />
                {university.ranking.tier}
                {university.ranking.qs && ` · QS #${university.ranking.qs}`}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white border border-white/20">
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                {university.rating.toFixed(1)} · {university.reviewCount.toLocaleString()} reviews
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl drop-shadow-lg">
              {university.name}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-white/80">
              <MapPin className="h-4 w-4" />
              {university.location.city}, United Kingdom
              <span className="ml-2 text-[#d4a84b] font-semibold">From {formatFee(minFee)}/yr</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8 pb-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* ── LEFT COLUMN (main info) ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Acceptance Rate", value: `${university.acceptanceRate}%`, icon: CheckCircle, color: "text-green-600" },
                { label: "International", value: `${university.internationalStudents}%`, icon: Globe, color: "text-blue-600" },
                { label: "Satisfaction", value: `${university.studentSatisfaction}%`, icon: Users, color: "text-[#d4a84b]" },
                { label: "Established", value: university.established.toString(), icon: Calendar, color: "text-[#0a1628]/60" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex flex-col items-center gap-2 rounded-2xl border border-[#0a1628]/10 bg-white p-4 text-center shadow-sm">
                  <Icon className={`h-5 w-5 ${color}`} />
                  <div className="text-xl font-bold text-[#0a1628]">{value}</div>
                  <div className="text-xs text-[#0a1628]/50 leading-tight">{label}</div>
                </div>
              ))}
            </div>

            {/* About */}
            <div className="rounded-2xl border border-[#0a1628]/10 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#0a1628]">
                <GraduationCap className="h-5 w-5 text-[#d4a84b]" />
                About {university.name}
              </h2>
              <p className="text-[#0a1628]/70 leading-relaxed">{university.description}</p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {university.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#0a1628]/15 px-3 py-1 text-xs font-medium text-[#0a1628]/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Programs & Fees */}
            <div className="rounded-2xl border border-[#0a1628]/10 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-[#0a1628]">Programs & Tuition Fees</h2>
              <div className="space-y-3">
                {university.programs.map((prog) => (
                  <div
                    key={prog.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#0a1628]/8 bg-[#f5f0e8] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${CATEGORY_COLORS[prog.category] || "bg-gray-100 text-gray-700"}`}>
                        {prog.category}
                      </span>
                      <span className="font-medium text-[#0a1628]">{prog.name}</span>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-sm font-bold text-[#d4a84b]">{formatFee(prog.feeFrom)}</div>
                      <div className="text-[10px] text-[#0a1628]/50">per year</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#0a1628]/40 leading-relaxed">
                ⓘ Fees shown are indicative international student fees. Actual costs may vary by programme and year of entry. Contact our advisors for the latest confirmed rates.
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN (sticky CTA) ── */}
          <div className="space-y-4 lg:col-span-1">
            <div className="sticky top-24 space-y-4">

              {/* Primary CTA card */}
              <div className="rounded-2xl border border-[#d4a84b]/30 bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-[#0a1628]">{university.rating.toFixed(1)}</span>
                  <span className="text-sm text-[#0a1628]/50">({university.reviewCount.toLocaleString()} reviews)</span>
                </div>

                <div className="mb-4 pb-4 border-b border-[#0a1628]/10">
                  <div className="text-xs text-[#0a1628]/50 uppercase tracking-wider mb-1">Starting from</div>
                  <div className="text-2xl font-bold text-[#0a1628]">{formatFee(minFee)}<span className="text-sm font-normal text-[#0a1628]/50">/year</span></div>
                </div>

                <p className="mb-5 text-sm text-[#0a1628]/60 leading-relaxed">
                  Get personalised guidance on applications, visa, scholarships, and accommodation for {university.name}.
                </p>

                <div className="space-y-3">
                  <Link
                    href={`/${locale}/contact`}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#d4a84b] font-semibold text-[#0a1628] transition-all hover:bg-[#c49a3f] hover:shadow-md active:scale-95"
                  >
                    Get Free Guidance →
                  </Link>
                  <a
                    href="tel:+213560409193"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#0a1628]/20 bg-white font-medium text-[#0a1628] transition-all hover:bg-gray-50"
                  >
                    <Phone className="h-4 w-4 text-[#d4a84b]" />
                    Call Us
                  </a>
                </div>
              </div>

              {/* Why Nopeca box */}
              <div className="rounded-2xl border border-[#0a1628]/10 bg-[#0a1628] p-5">
                <h3 className="mb-3 font-bold text-[#f5f0e8]">Why apply through Nopeca?</h3>
                <ul className="space-y-2">
                  {[
                    "Free expert consultation",
                    "98% visa approval rate",
                    "End-to-end application support",
                    "Accommodation assistance",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a84b]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Universities link */}
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/universities`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0a1628]/60 hover:text-[#d4a84b] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Explore more UK universities
          </Link>
        </div>
      </div>

      {/* ── STICKY BOTTOM BAR ───────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a1628]/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-white">{university.name}</p>
            <p className="text-xs text-white/50">Get expert guidance — it's free</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href="tel:+213560409193"
              className="flex h-10 items-center gap-2 rounded-full bg-[#0a1628] px-4 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#0d1f35]"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
            <Link
              href={`/${locale}/contact`}
              className="flex h-10 items-center gap-2 rounded-full bg-[#d4a84b] px-4 text-sm font-semibold text-[#0a1628] transition-colors hover:bg-[#c49a3f]"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
