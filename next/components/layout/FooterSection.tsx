"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import footerLogo from "@/public/NopecaFooterLogo.png";
import footerLogoText from "@/public/NopecaFooterLogoText.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/actions/contact";

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

export default function FooterSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitContactForm(formData);
    
    if (result.success) {
      toast.success("Message sent!", {
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      toast.error("Failed to send message", {
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
                <h3 className="text-xl font-bold">Get in Touch</h3>
                <p className="text-white/70 text-sm">We would love to hear from you</p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12"
                />
              </div>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12"
              />
              <Textarea
                placeholder="Tell us about your educational goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl min-h-[120px] resize-none"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#d4a84b] hover:bg-[#c49a3f] text-[#0a1628] font-semibold rounded-full h-12 w-full sm:w-auto sm:px-8"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <p className="text-white/70 text-sm font-medium">Connect with us</p>
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
          <div className="flex flex-col gap-8 ">
            <div>
              <h3 className="text-xl font-bold mb-2">Our Location</h3>
              <p className="text-white/70 text-sm">Visit us at our office</p>
            </div>
            
            {/* Map container */}
            <div className="relative w-full h-[30dvh] md:h-full rounded-2xl overflow-hidden border border-white/10">
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
                  <p className="text-white/50 text-xs">Email</p>
                  <p className="text-white text-sm">contact@nopeca.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#d4a84b]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs">Mobile</p>
                  <p className="text-white text-sm">0560409193</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#d4a84b]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs">Mobile</p>
                  <p className="text-white text-sm">0560409195</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with copyright */}
      <div className="border-t border-white/10 ">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Nopeca. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">Terms of Service</a>
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
