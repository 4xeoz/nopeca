"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import footerLogo from "@/public/NopecaFooterLogo.png";
import footerLogoText from "@/public/NopecaFooterLogoText.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/actions/contact";
import type { Dictionary } from "@/dictionaries";

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

// WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface FooterSectionProps {
  dict: Dictionary;
}

export default function FooterSection({ dict }: FooterSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    studyField: "",
    country: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitContactForm(formData);

    if (result.success) {
      toast.success(dict.footer.messageSent, {
        description: dict.footer.messageSentDesc,
      });
      setFormData({ name: "", phone: "", studyField: "", country: "", email: "", message: "" });
    } else {
      toast.error(dict.footer.messageFailed, {
        description: result.message,
      });
    }

    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: WhatsAppIcon, href: "https://wa.me/213561799531", label: "WhatsApp" },
    { icon: Mail, href: "mailto:contact@nopeca.com", label: "Email" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const inputClass =
    "bg-white/[0.12] border-white/25 text-white placeholder:text-white/45 rounded-xl h-12 focus:bg-white/[0.16] focus:border-white/40 transition-colors";

  const selectClass =
    "w-full h-12 rounded-xl border border-white/25 bg-white/[0.12] px-4 text-sm text-white placeholder:text-white/45 focus:bg-white/[0.16] focus:border-white/40 focus:outline-none transition-colors appearance-none cursor-pointer";

  return (
    <footer id="contact" className="w-full bg-[#0a1628] text-white">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Contact info and form */}
          <div className="flex flex-col gap-8">
            {/* Logo and tagline */}
            <div className="flex items-center gap-4">
              <Image
                src={footerLogo}
                alt="Nopeca Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold">{dict.footer.getInTouch}</h3>
                <p className="text-white/70 text-sm">{dict.footer.weWouldLove}</p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder={dict.footer.yourName}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={inputClass}
                />
                <Input
                  type="tel"
                  placeholder={dict.footer.phoneNumber}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>

              {/* Row 2: Study field */}
              <div className="relative">
                <select
                  value={formData.studyField}
                  onChange={(e) => setFormData({ ...formData, studyField: e.target.value })}
                  required
                  className={`${selectClass} ${!formData.studyField ? "text-white/45" : "text-white"}`}
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

              {/* Row 3: Country */}
              <div className="relative">
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                  className={`${selectClass} ${!formData.country ? "text-white/45" : "text-white"}`}
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

              {/* Row 4: Email (optional) */}
              <Input
                type="email"
                placeholder={dict.footer.emailAddress}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
              />

              {/* Row 5: Message (optional) */}
              <Textarea
                placeholder={dict.footer.tellUs}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/[0.12] border-white/25 text-white placeholder:text-white/45 rounded-xl min-h-[100px] resize-none focus:bg-white/[0.16] focus:border-white/40 transition-colors"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#d4a84b] hover:bg-[#c49a3f] text-[#0a1628] font-semibold rounded-full h-12 w-full sm:w-auto sm:px-8"
              >
                {isSubmitting ? dict.footer.sending : dict.footer.sendMessage}
              </Button>
            </form>

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <p className="text-white/70 text-sm font-medium">{dict.footer.connectWithUs}</p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#d4a84b] flex items-center justify-center transition-colors duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-white group-hover:text-[#0a1628] transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Map */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">{dict.footer.ourLocation}</h3>
              <p className="text-white/70 text-sm">{dict.footer.visitUs}</p>
            </div>

            {/* Map container */}
            <div className="relative w-full h-[30dvh] md:h-72 rounded-2xl overflow-hidden border border-white/10">
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

            {/* Contact details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#d4a84b]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs">{dict.footer.email}</p>
                  <a
                    href="mailto:contact@nopeca.com"
                    className="text-white text-sm hover:text-[#d4a84b] transition-colors"
                  >
                    contact@nopeca.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#d4a84b]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs">{dict.footer.mobile}</p>
                  <a
                    href="tel:+213560409193"
                    className="text-white text-sm hover:text-[#d4a84b] transition-colors"
                  >
                    0560409193
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#d4a84b]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs">{dict.footer.mobile}</p>
                  <a
                    href="tel:+213560409195"
                    className="text-white text-sm hover:text-[#d4a84b] transition-colors"
                  >
                    0560409195
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with copyright + admin */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-white/50 hover:text-white transition-colors">{dict.footer.privacy}</a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">{dict.footer.terms}</a>
            <Link
              href="/admin/login"
              className="text-white/25 hover:text-white/50 transition-colors text-xs"
            >
              {dict.footer.adminLogin}
            </Link>
          </div>
        </div>
      </div>

      {/* Full-width text logo */}
      <div className="w-full px-4 py-8 md:py-12">
        <Image
          src={footerLogoText}
          alt="Nopeca"
          width={1920}
          height={200}
          className="w-full h-auto opacity-10"
          priority
        />
      </div>
    </footer>
  );
}
