"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/actions/contact";
import {
  trackContactFormSubmit,
  trackPhoneCall,
  trackEmailClick,
  trackWhatsAppClick,
} from "@/lib/gtag";
import Navbar from "@/components/layout/Navbar";
import type { Dictionary } from "@/dictionaries";
import footerLogo from "@/public/NopecaFooterLogo.png";

const STUDY_FIELDS = [
  "Computer Science & IT",
  "Business Administration",
  "Engineering (General)",
  "Medicine & Healthcare",
  "Law & Legal Studies",
  "Finance & Accounting",
  "Architecture & Urban Planning",
  "Psychology",
  "Nursing & Midwifery",
  "Data Science & Artificial Intelligence",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Economics",
  "Marketing & Communications",
  "Pharmacy & Pharmaceutical Sciences",
  "Biology & Life Sciences",
  "Mathematics & Statistics",
  "Education & Teaching",
  "International Relations & Political Science",
];

const COUNTRIES = [
  "United Kingdom",
  "France",
  "Canada",
  "Germany",
  "United States",
  "Australia",
  "Turkey",
  "Malaysia",
  "Spain",
  "Italy",
  "Poland",
  "Czech Republic",
  "China",
  "Japan",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Hungary",
  "Romania",
  "Other",
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface Props {
  dict: Dictionary;
  locale: string;
}

const WHATSAPP_URL = "https://wa.me/213561799531";

const inputClass =
  "bg-white/[0.12] border-white/25 text-white placeholder:text-white/45 rounded-xl h-12 focus:bg-white/[0.16] focus:border-white/40 transition-colors";

const selectClass =
  "w-full h-12 rounded-xl border border-white/25 bg-white/[0.12] px-4 text-sm text-white placeholder:text-white/45 focus:bg-white/[0.16] focus:border-white/40 focus:outline-none transition-colors appearance-none cursor-pointer";

export default function ContactPageClient({ dict, locale }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    studyField: "",
    country: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitContactForm(formData);

    if (result.success) {
      trackContactFormSubmit(formData.studyField, formData.country);
      setSubmitted(true);
      toast.success(dict.footer.messageSent, {
        description: dict.footer.messageSentDesc,
      });
      setFormData({
        name: "",
        phone: "",
        studyField: "",
        country: "",
        email: "",
        message: "",
      });
    } else {
      toast.error(dict.footer.messageFailed, {
        description: result.message,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white flex flex-col">
      <Navbar locale={locale} dict={dict} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">

          {/* ── LEFT: Form ───────────────────────────────────────────── */}
          <div className="order-2 lg:order-1">

            {/* Mobile-only heading */}
            <div className="lg:hidden mb-6">
              <h1 className="text-2xl font-bold text-white">
                {dict.footer.getInTouch}
              </h1>
              <p className="text-white/60 text-sm mt-1">
                {dict.footer.weWouldLove}
              </p>
            </div>

            {/* Quick-contact buttons — mobile only, above the form */}
            <div className="lg:hidden flex flex-col gap-3 mb-8">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("contact")}
                className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-[#25D366] text-white font-semibold text-base active:scale-[0.98] transition-transform shadow-lg shadow-[#25D366]/25"
              >
                <WhatsAppIcon className="w-6 h-6" />
                WhatsApp us now
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+213560409193"
                  onClick={() => trackPhoneCall("0560409193")}
                  className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-white/10 border border-white/15 font-medium text-sm active:scale-[0.98] transition-transform"
                >
                  <Phone className="w-4 h-4 text-[#d4a84b]" />
                  0560409193
                </a>
                <a
                  href="tel:+213560409195"
                  onClick={() => trackPhoneCall("0560409195")}
                  className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-white/10 border border-white/15 font-medium text-sm active:scale-[0.98] transition-transform"
                >
                  <Phone className="w-4 h-4 text-[#d4a84b]" />
                  0560409195
                </a>
              </div>
              <div className="relative flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/30 text-xs font-medium">or send us a message</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
            </div>

            {/* ── Contact form ── */}
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle className="w-16 h-16 text-[#d4a84b]" />
                <h2 className="text-2xl font-bold">{dict.footer.messageSent}</h2>
                <p className="text-white/60 max-w-xs">{dict.footer.messageSentDesc}</p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 rounded-full bg-[#d4a84b] hover:bg-[#c49a3f] text-[#0a1628] font-semibold h-11 px-8"
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder={dict.footer.yourName}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className={inputClass}
                  />
                  <Input
                    type="tel"
                    placeholder={dict.footer.phoneNumber}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className={inputClass}
                  />
                </div>

                {/* Study Field */}
                <div className="relative">
                  <select
                    value={formData.studyField}
                    onChange={(e) =>
                      setFormData({ ...formData, studyField: e.target.value })
                    }
                    required
                    className={`${selectClass} ${
                      !formData.studyField ? "text-white/45" : "text-white"
                    }`}
                  >
                    <option value="" disabled className="bg-[#0a1628] text-white/60">
                      {dict.footer.studyFieldPlaceholder}
                    </option>
                    {STUDY_FIELDS.map((field) => (
                      <option key={field} value={field} className="bg-[#0a1628] text-white">
                        {field}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="h-4 w-4 text-white/45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Country */}
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    required
                    className={`${selectClass} ${
                      !formData.country ? "text-white/45" : "text-white"
                    }`}
                  >
                    <option value="" disabled className="bg-[#0a1628] text-white/60">
                      {dict.footer.countryPlaceholder}
                    </option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country} className="bg-[#0a1628] text-white">
                        {country}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="h-4 w-4 text-white/45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Email (optional) */}
                <Input
                  type="email"
                  placeholder={dict.footer.emailAddress}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={inputClass}
                />

                {/* Message (optional) */}
                <Textarea
                  placeholder={dict.footer.tellUs}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-white/[0.12] border-white/25 text-white placeholder:text-white/45 rounded-xl min-h-[90px] resize-none focus:bg-white/[0.16] focus:border-white/40 transition-colors"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 rounded-full bg-[#d4a84b] hover:bg-[#c49a3f] text-[#0a1628] font-bold text-base w-full transition-colors shadow-lg shadow-[#d4a84b]/20 mt-1"
                >
                  {isSubmitting ? dict.footer.sending : dict.footer.sendMessage}
                </Button>
              </form>
            )}
          </div>

          {/* ── RIGHT: Contact details ────────────────────────────────── */}
          <div className="order-1 lg:order-2 flex flex-col gap-8">

            {/* Desktop-only heading */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={footerLogo}
                  alt="Nopeca"
                  width={52}
                  height={52}
                  className="rounded-xl"
                />
                <div>
                  <h1 className="text-2xl font-bold leading-tight">{dict.footer.getInTouch}</h1>
                  <p className="text-white/55 text-sm mt-0.5">{dict.footer.weWouldLove}</p>
                </div>
              </div>
              <p className="text-white/45 text-sm leading-relaxed">
                Fill the form and we&apos;ll reach back to you quickly, or use one of the direct channels below.
              </p>
            </div>

            {/* Desktop quick-contact buttons */}
            <div className="hidden lg:flex flex-col gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("contact")}
                className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-[#25D366] text-white font-semibold text-base hover:bg-[#22c55e] transition-colors shadow-lg shadow-[#25D366]/20"
              >
                <WhatsAppIcon className="w-6 h-6" />
                WhatsApp us now
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+213560409193"
                  onClick={() => trackPhoneCall("0560409193")}
                  className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white/10 border border-white/15 text-sm font-medium hover:bg-white/[0.18] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#d4a84b]" />
                  0560409193
                </a>
                <a
                  href="tel:+213560409195"
                  onClick={() => trackPhoneCall("0560409195")}
                  className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white/10 border border-white/15 text-sm font-medium hover:bg-white/[0.18] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#d4a84b]" />
                  0560409195
                </a>
              </div>
            </div>

            {/* Contact details strip */}
            <div className="flex flex-col gap-4">
              <a
                href="mailto:contact@nopeca.com"
                onClick={() => trackEmailClick()}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#d4a84b]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#d4a84b]" />
                </div>
                <div>
                  <p className="text-white/40 text-xs">{dict.footer.email}</p>
                  <p className="text-white text-sm group-hover:text-[#d4a84b] transition-colors">
                    contact@nopeca.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#d4a84b]" />
                </div>
                <div>
                  <p className="text-white/40 text-xs">{dict.footer.ourLocation}</p>
                  <p className="text-white text-sm">Boumerdes, Algeria</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10" style={{ height: "220px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d427.66889595582217!2d3.4671492643391923!3d36.75950375007293!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e690441301233%3A0xff44c2ce1a7779a!2sAdvanced%20Pathways%20Global%20Boumerdes!5e1!3m2!1sen!2suk!4v1770573585913!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
                className="grayscale contrast-125"
              />
            </div>
          </div>

        </div>
      </main>

      {/* Slim footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-white/35">
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-5">
            <Link href={`/${locale}`} className="text-white/35 hover:text-white/70 transition-colors">
              {dict.nav.home}
            </Link>
            <Link href="/admin/login" className="text-white/20 hover:text-white/40 transition-colors text-xs">
              {dict.footer.adminLogin}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
