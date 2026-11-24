"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { RequestValuationModal, ContactModal } from "@/components/Forms";
import SiteFooter from "@/components/SiteFooter";
import type { SanitySiteContent } from "@/sanity/lib/defaultData";

export type ServiceSlug =
  | "valuation-advisory"
  | "occupier-services"
  | "capital-markets"
  | "research-services";

const SERVICE_LINKS: Array<{ slug: ServiceSlug; label: string; href: string }> = [
  { slug: "valuation-advisory", label: "Valuation & Advisory", href: "/services/valuation-advisory" },
  { slug: "occupier-services", label: "Occupier Services", href: "/services/occupier-services" },
  { slug: "capital-markets", label: "Capital Markets", href: "/services/capital-markets" },
  { slug: "research-services", label: "Research Services", href: "/services/research-services" },
];

const MARKET_LINKS = [
  { label: "United Arab Emirates", href: "/markets/uae" },
  { label: "Maldives", href: "/markets/maldives" },
  { label: "Sri Lanka", href: "/markets/sri-lanka" },
];

interface ServicePageClientProps {
  slug: ServiceSlug;
  content: SanitySiteContent;
  eyebrow: string;
  titleLine1: string;
  titleLine2?: string;
  lead: string;
  paragraphs: string[];
  highlightsHeading: string;
  highlights: string[];
  secondaryHeading?: string;
  secondaryItems?: string[];
  imageUrl?: string;
  imageAlt?: string;
  ctaLabel: string;
  ctaAction: "valuation" | "contact";
}

export default function ServicePageClient({
  slug,
  content,
  eyebrow,
  titleLine1,
  titleLine2,
  lead,
  paragraphs,
  highlightsHeading,
  highlights,
  secondaryHeading,
  secondaryItems,
  imageUrl,
  imageAlt,
  ctaLabel,
  ctaAction,
}: ServicePageClientProps) {
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
          <nav className="hidden lg:flex items-center gap-7 font-sans text-sm font-semibold uppercase tracking-widest text-sfa-navy/80">
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
                onClick={() => navigateToHomeSection("markets")}
                className="cursor-pointer inline-flex items-center gap-1 hover:text-sfa-blue transition uppercase tracking-widest"
              >
                <span>MARKETS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-56 bg-white border border-sfa-grey/15 shadow-lg py-2 flex flex-col">
                  {MARKET_LINKS.map((item) => (
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

            <div className="relative group py-2">
              <button
                type="button"
                onClick={() => navigateToHomeSection("offer")}
                className="cursor-pointer inline-flex items-center gap-1 text-sfa-blue font-semibold transition uppercase tracking-widest"
              >
                <span>WHAT WE OFFER</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-60 bg-white border border-sfa-grey/15 shadow-lg py-2 flex flex-col">
                  {SERVICE_LINKS.map((item) => (
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

            <Link
              href="/newsroom"
              className="cursor-pointer hover:text-sfa-blue transition uppercase tracking-widest"
            >
              NEWSROOM
            </Link>

            <button
              type="button"
              onClick={() => navigateToHomeSection("clients")}
              className="cursor-pointer hover:text-sfa-blue transition uppercase tracking-widest"
            >
              OUR NETWORK
            </button>

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
                <div className="py-1 border-b border-sfa-grey/5">
                  <span className="block text-[11px] font-montserrat font-bold text-primary tracking-[0.2em] mb-2">
                    MARKETS
                  </span>
                  <div className="pl-3 space-y-2 flex flex-col">
                    {MARKET_LINKS.map((item) => (
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

      {/* Service Switcher Sub-nav */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-sfa-grey/15 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar">
          {SERVICE_LINKS.map((item) => (
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
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0c2340] via-[#194866] to-[#2684be] text-white overflow-hidden">
          {imageUrl && (
            <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
              <Image
                src={imageUrl}
                alt={imageAlt || titleLine1}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-4xl space-y-5">
              <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-[#00bdf1] text-[11px] font-montserrat font-bold uppercase tracking-[0.2em]">
                {eyebrow}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-normal tracking-tight uppercase leading-[1.08] text-white">
                {titleLine1}
                {titleLine2 && <span className="block mt-1 text-[#00bdf1]">{titleLine2}</span>}
              </h1>
              <p className="text-base sm:text-lg font-avenir text-white/90 leading-relaxed max-w-3xl">
                {lead}
              </p>
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    ctaAction === "valuation" ? setValuationOpen(true) : setContactOpen(true)
                  }
                  className="cursor-pointer inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#00bdf1] hover:bg-[#00a6d6] text-[#0c2340] text-xs font-montserrat font-bold tracking-widest uppercase transition shadow-md"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="cursor-pointer inline-flex items-center gap-2 px-6 py-3.5 border border-white/40 hover:bg-white/10 text-white text-xs font-montserrat font-bold tracking-widest uppercase transition"
                >
                  <span>SPEAK WITH OUR TEAM</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview & Core Capabilities */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-avenir font-bold tracking-[0.2em] text-[#00bdf1] uppercase">
                SERVICE OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-3xl font-montserrat font-medium text-sfa-navy uppercase tracking-tight">
                INDEPENDENT, RICS &amp; IVSL COMPLIANT ADVISORY
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
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
                <span className="block text-xs font-montserrat font-bold tracking-[0.2em] text-secondary uppercase">
                  {highlightsHeading}
                </span>
                <ul className="space-y-3">
                  {highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm font-avenir font-medium text-sfa-navy"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00bdf1] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {secondaryHeading && secondaryItems && secondaryItems.length > 0 && (
                <div className="bg-secondary text-white p-6 sm:p-8 space-y-4">
                  <span className="block text-xs font-montserrat font-bold tracking-[0.2em] text-[#00bdf1] uppercase">
                    {secondaryHeading}
                  </span>
                  <ul className="space-y-2.5 text-sm font-avenir text-white/90">
                    {secondaryItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#00bdf1] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Regional Coverage Strip */}
        <section className="bg-white border-y border-slate-200 py-14">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-avenir font-bold tracking-[0.2em] text-[#00bdf1] uppercase">
                  REGIONAL COVERAGE
                </span>
                <h2 className="text-2xl sm:text-3xl font-montserrat font-medium text-sfa-navy uppercase tracking-tight">
                  MARKETS WE SERVE
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MARKET_LINKS.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="group p-6 bg-[#f8fafc] border border-slate-200 hover:border-primary transition flex items-center justify-between"
                >
                  <span className="text-sm font-montserrat font-semibold text-sfa-navy uppercase tracking-wider group-hover:text-primary transition">
                    {m.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
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
            <p className="text-sm sm:text-base font-avenir font-normal text-white/85 max-w-3xl mx-auto leading-relaxed pt-2">
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
