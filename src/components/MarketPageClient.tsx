"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, MapPin, Phone, Mail, CheckCircle2, ChevronDown } from "lucide-react";
import { RequestValuationModal, ContactModal } from "@/components/Forms";
import SiteFooter from "@/components/SiteFooter";
import type { SanitySiteContent } from "@/sanity/lib/defaultData";

export type MarketSlug = "uae" | "maldives" | "sri-lanka";

const SERVICE_LINKS = [
  { label: "Valuation & Advisory", href: "/services/valuation-advisory" },
  { label: "Occupier Services", href: "/services/occupier-services" },
  { label: "Capital Markets", href: "/services/capital-markets" },
  { label: "Research Services", href: "/services/research-services" },
];

const MARKET_LINKS: Array<{ slug: MarketSlug; label: string; href: string }> = [
  { slug: "uae", label: "United Arab Emirates", href: "/markets/uae" },
  { slug: "maldives", label: "Maldives", href: "/markets/maldives" },
  { slug: "sri-lanka", label: "Sri Lanka", href: "/markets/sri-lanka" },
];

interface MarketPageClientProps {
  slug: MarketSlug;
  content: SanitySiteContent;
  countryTitle: string;
  eyebrow: string;
  flagUrl: string;
  lead: string;
  paragraphs: string[];
  focusHeading: string;
  focusAreas: string[];
  officeAddress: string;
  phoneDisplay?: string;
  phoneHref?: string;
  email: string;
  accreditations: string[];
}

export default function MarketPageClient({
  slug,
  content,
  countryTitle,
  eyebrow,
  flagUrl,
  lead,
  paragraphs,
  focusHeading,
  focusAreas,
  officeAddress,
  phoneDisplay,
  phoneHref,
  email,
  accreditations,
}: MarketPageClientProps) {
  const cms = content;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [valuationOpen, setValuationOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const navigateToHomeSection = (section: string) => {
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("sfa_scroll_target", section);
      } catch {
        // Ignore storage errors
      }
      window.location.assign("/");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-sfa-navy overflow-x-hidden">
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-sfa-grey/10 shadow-sm transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
          <Link href="/" className="cursor-pointer flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cms.settings.logoUrl || "/logo.png"}
              alt="Sunil Fernando & Associates Logo"
              className="h-16 sm:h-20 py-0 block object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-sans text-sm font-semibold uppercase tracking-widest text-sfa-navy/80">
            <button
              type="button"
              onClick={() => navigateToHomeSection("home")}
              className="cursor-pointer hover:text-sfa-blue transition uppercase tracking-widest"
            >
              HOME
            </button>

            <div className="relative group py-2">
              <button
                type="button"
                onClick={() => navigateToHomeSection("offer")}
                className="cursor-pointer inline-flex items-center gap-1 hover:text-sfa-blue transition uppercase tracking-widest"
              >
                <span>WHAT WE OFFER</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-60 bg-white border border-sfa-grey/15 shadow-lg py-2 flex flex-col">
                  {SERVICE_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-2.5 text-xs font-avenir font-semibold tracking-wider uppercase text-sfa-navy/80 hover:bg-sfa-light-blue/50 hover:text-sfa-blue transition"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/newsroom"
              className="cursor-pointer hover:text-sfa-blue transition uppercase tracking-widest"
            >
              NEWSROOM
            </Link>

            <div className="relative group py-2">
              <button
                type="button"
                onClick={() => navigateToHomeSection("clients")}
                className="cursor-pointer inline-flex items-center gap-1 text-sfa-blue font-semibold transition uppercase tracking-widest"
              >
                <span>OUR NETWORK</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-56 bg-white border border-sfa-grey/15 shadow-lg py-2 flex flex-col">
                  {MARKET_LINKS.map((item) => (
                    <Link
                      key={item.slug}
                      href={item.href}
                      className={`px-4 py-2.5 text-xs font-avenir font-semibold tracking-wider uppercase transition ${
                        item.slug === slug
                          ? "bg-sfa-light-blue text-primary"
                          : "text-sfa-navy/80 hover:bg-sfa-light-blue/50 hover:text-sfa-blue"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateToHomeSection("team")}
              className="cursor-pointer hover:text-sfa-blue transition uppercase tracking-widest"
            >
              OUR TEAM
            </button>
            <button
              type="button"
              onClick={() => navigateToHomeSection("contact")}
              className="cursor-pointer hover:text-sfa-blue transition uppercase tracking-widest"
            >
              REACH US
            </button>
          </nav>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="cursor-pointer p-2 text-sfa-navy hover:text-sfa-blue transition focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="lg:hidden absolute top-full left-0 right-0 z-50 border-t border-sfa-grey/10 bg-white shadow-lg max-h-[80vh] overflow-y-auto"
            >
              <div className="px-4 py-6 space-y-3 flex flex-col font-sans text-sm font-semibold uppercase tracking-widest text-sfa-navy">
                <button
                  type="button"
                  onClick={() => navigateToHomeSection("home")}
                  className="cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue uppercase tracking-widest"
                >
                  HOME
                </button>
                <div className="py-1 border-b border-sfa-grey/5">
                  <span className="block text-[11px] font-montserrat font-bold text-primary tracking-[0.2em] mb-2">
                    SERVICES
                  </span>
                  <div className="pl-3 space-y-2 flex flex-col">
                    {SERVICE_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs py-1 text-sfa-navy/80 hover:text-sfa-blue"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="py-1 border-b border-sfa-grey/5">
                  <span className="block text-[11px] font-montserrat font-bold text-primary tracking-[0.2em] mb-2">
                    MARKETS
                  </span>
                  <div className="pl-3 space-y-2 flex flex-col">
                    {MARKET_LINKS.map((item) => (
                      <Link
                        key={item.slug}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-xs py-1 ${
                          item.slug === slug ? "text-sfa-blue font-bold" : "text-sfa-navy/80 hover:text-sfa-blue"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  href="/newsroom"
                  onClick={() => setMobileMenuOpen(false)}
                  className="cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue"
                >
                  NEWSROOM
                </Link>
                <button
                  type="button"
                  onClick={() => navigateToHomeSection("team")}
                  className="cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue uppercase tracking-widest"
                >
                  OUR TEAM
                </button>
                <button
                  type="button"
                  onClick={() => navigateToHomeSection("contact")}
                  className="cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue uppercase tracking-widest"
                >
                  REACH US
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setValuationOpen(true);
                  }}
                  className="cursor-pointer w-full text-center py-3 bg-sfa-navy text-white hover:bg-sfa-blue transition font-bold"
                >
                  REQUEST A VALUATION
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Market Switcher Sub-nav */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-sfa-grey/15 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar">
          {MARKET_LINKS.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className={`shrink-0 text-[11px] sm:text-xs font-avenir font-semibold tracking-[0.18em] uppercase py-3 border-b-2 transition ${
                item.slug === slug
                  ? "border-sfa-blue text-sfa-blue font-bold"
                  : "border-transparent text-sfa-navy/70 hover:text-sfa-blue"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <main className="pt-28 sm:pt-32">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0c2340] via-[#194866] to-[#2684be] text-white overflow-hidden">
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-4xl space-y-5">
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/10 border border-white/20 text-[#00bdf1] text-[11px] font-montserrat font-bold uppercase tracking-[0.2em]">
                <Image
                  src={flagUrl}
                  alt={`${countryTitle} Flag`}
                  width={24}
                  height={16}
                  className="w-5 h-auto rounded-[2px] object-cover"
                />
                <span>{eyebrow}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-normal tracking-tight uppercase leading-[1.08] text-white">
                REAL ESTATE ADVISORY IN
                <span className="block mt-1 text-[#00bdf1]">{countryTitle}</span>
              </h1>
              <p className="text-base sm:text-lg font-avenir text-white/90 leading-relaxed max-w-3xl">
                {lead}
              </p>
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setValuationOpen(true)}
                  className="cursor-pointer inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#00bdf1] hover:bg-[#00a6d6] text-[#0c2340] text-xs font-montserrat font-bold tracking-widest uppercase transition shadow-md"
                >
                  <span>REQUEST A VALUATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="cursor-pointer inline-flex items-center gap-2 px-6 py-3.5 border border-white/40 hover:bg-white/10 text-white text-xs font-montserrat font-bold tracking-widest uppercase transition"
                >
                  <span>CONTACT OFFICE</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Market Overview & Office Details */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-avenir font-bold tracking-[0.2em] text-[#00bdf1] uppercase">
                MARKET EXPERTISE
              </span>
              <h2 className="text-2xl sm:text-3xl font-montserrat font-medium text-sfa-navy uppercase tracking-tight">
                VALUATION &amp; ADVISORY ACROSS {countryTitle}
              </h2>
              <div className="space-y-4">
                {paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base font-avenir text-sfa-navy/85 leading-relaxed text-justify"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="pt-4">
                <span className="block text-xs font-montserrat font-bold tracking-[0.2em] text-secondary uppercase mb-4">
                  {focusHeading}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {focusAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3.5 bg-white border border-slate-200 text-sm font-avenir font-medium text-sfa-navy"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00bdf1] shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <Image
                    src={flagUrl}
                    alt={`${countryTitle} Flag`}
                    width={32}
                    height={20}
                    className="w-7 h-auto rounded-[2px] shadow-sm object-cover"
                  />
                  <div>
                    <span className="block text-[10px] font-montserrat font-bold tracking-[0.2em] text-[#00bdf1] uppercase">
                      REGIONAL OFFICE
                    </span>
                    <h3 className="text-lg font-montserrat font-semibold text-sfa-navy uppercase">
                      {countryTitle}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 text-sm font-avenir text-sfa-navy/85">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>{officeAddress}</span>
                  </div>
                  {phoneDisplay && phoneHref && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <a href={`tel:${phoneHref}`} className="hover:text-primary transition font-medium">
                        {phoneDisplay}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <a href={`mailto:${email}`} className="hover:text-primary transition font-medium">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  {accreditations.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-[11px] font-montserrat font-bold tracking-widest uppercase"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-secondary text-white p-6 sm:p-8 space-y-4">
                <span className="block text-xs font-montserrat font-bold tracking-[0.2em] text-[#00bdf1] uppercase">
                  CORE SERVICES AVAILABLE
                </span>
                <div className="space-y-2.5">
                  {SERVICE_LINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="group flex items-center justify-between py-2 border-b border-white/15 last:border-0 text-sm font-avenir text-white/90 hover:text-[#00bdf1] transition"
                    >
                      <span>{s.label}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get In Touch Banner */}
        <section className="bg-secondary text-white py-16 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-montserrat font-normal tracking-[0.3em] uppercase leading-tight text-white">
              {cms.settings.contactTitle}
            </h2>
            <div className="text-sm sm:text-base lg:text-lg font-montserrat font-medium tracking-[0.15em] uppercase text-white/90">
              {cms.settings.contactSubtitle}
            </div>
            <p className="text-xs sm:text-sm font-avenir font-medium text-white/80 max-w-3xl mx-auto leading-relaxed uppercase tracking-wider pt-2">
              {cms.settings.contactDescription}
            </p>
            <div className="pt-6">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="cursor-pointer px-10 py-3.5 bg-white text-secondary hover:bg-sfa-light-blue text-xs font-montserrat font-bold tracking-widest uppercase transition shadow-md"
              >
                CONTACT OUR TEAM
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <RequestValuationModal isOpen={valuationOpen} onClose={() => setValuationOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
