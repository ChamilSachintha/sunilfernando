"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { RequestValuationModal, ContactModal } from "@/components/Forms";
import SiteFooter from "@/components/SiteFooter";
import type { SanitySiteContent } from "@/sanity/lib/defaultData";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "WHAT WE OFFER", href: "/#offer" },
  { label: "NEWSROOM", href: "/newsroom", active: true },
  { label: "OUR NETWORK", href: "/#network" },
  { label: "OUR TEAM", href: "/#team" },
  { label: "REACH US", href: "/#contact" },
];

export default function NewsroomClient({ content }: { content: SanitySiteContent }) {
  const cms = content;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [valuationOpen, setValuationOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-white text-sfa-navy overflow-x-hidden">
      {/* Header (same as home page) */}
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`cursor-pointer hover:text-sfa-blue transition ${link.active ? "text-sfa-blue font-semibold" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer p-2 text-sfa-navy hover:text-sfa-blue transition focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-sfa-grey/10 bg-white"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col font-sans text-sm font-semibold uppercase tracking-widest text-sfa-navy">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue ${link.active ? "text-sfa-blue" : ""}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
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

      <main className="pt-16 sm:pt-20">
        {/* Page title banner (matches the "Explore Our Services" bar) */}
        <div className="w-full bg-secondary py-5 text-center text-white tracking-[0.4em] text-xl sm:text-2xl lg:text-3xl font-avenir font-normal uppercase">
          <h1>NEWSROOM</h1>
        </div>

        {/* Section switcher */}
        <div className="w-full bg-white border-b border-sfa-grey/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-10 sm:gap-16 py-4 text-xs sm:text-sm font-avenir font-semibold tracking-[0.2em] uppercase text-sfa-navy/70">
            <button onClick={() => scrollTo("insights")} className="cursor-pointer hover:text-sfa-blue transition">
              INSIGHTS
            </button>
            <button onClick={() => scrollTo("case-studies")} className="cursor-pointer hover:text-sfa-blue transition">
              CASE STUDIES
            </button>
          </div>
        </div>

        {/* Insights — all reports */}
        <section id="insights" className="relative flex items-stretch overflow-hidden bg-white scroll-mt-16 sm:scroll-mt-20">
          {/* SVG Vector Background (same as home Insights section) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block">
            <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="newsroom-insights-left-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#194866" />
                </linearGradient>
              </defs>
              <rect y="-20" width="1000" height="440" fill="#00bdf1" />
              <path d="M 0,-20 L 569,-20 C 519,-20 480,30 460,80 L 322,420 L 0,420 Z" fill="url(#newsroom-insights-left-grad)" />
              <path d="M 569,-20 C 519,-20 480,30 460,80 L 322,420" fill="none" stroke="#ffffff" strokeWidth="16" />
            </svg>
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column (INSIGHTS header) */}
            <div className="lg:col-span-5 py-12 px-6 sm:px-8 lg:py-16 lg:pl-0 lg:pr-12">
              <div className="lg:sticky lg:top-32 space-y-8">
                <span className="block text-sm font-avenir font-semibold tracking-[0.2em] text-primary uppercase">
                  INSIGHTS
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.05] text-sfa-navy">
                  MARKET
                  <span className="block mt-1">INTELLIGENCE</span>
                  <span className="block mt-1">FOR INFORMED</span>
                  <span className="block mt-1">DECISIONS.</span>
                </h2>
                <div className="text-sm font-avenir font-semibold tracking-[0.15em] text-primary uppercase">
                  {cms.reports.length} {cms.reports.length === 1 ? "REPORT" : "REPORTS"} &amp; COMMENTARIES
                </div>
              </div>
            </div>

            {/* Right Column (all reports & commentaries) */}
            <div className="lg:col-span-7 py-12 px-6 sm:px-8 lg:py-16 lg:pl-24 lg:pr-0 bg-tertiary lg:bg-transparent text-sfa-navy">
              <div className="space-y-10 lg:space-y-12">
                {cms.reports.map((report) => (
                  <article
                    key={report._id}
                    id={`insight-${report._id}`}
                    className="space-y-3 pb-10 border-b border-sfa-navy/15 last:border-0 last:pb-0 scroll-mt-28 sm:scroll-mt-32"
                  >
                    {report.category && (
                      <span className="block text-[10px] font-montserrat font-bold text-secondary uppercase tracking-widest">
                        {report.category}
                      </span>
                    )}
                    <h3 className="text-lg lg:text-xl font-avenir font-bold tracking-wide uppercase leading-snug">
                      {report.title}
                    </h3>
                    {report.date && (
                      <span className="block text-xs font-avenir font-normal text-sfa-navy/70 uppercase tracking-wider">
                        {report.date}
                      </span>
                    )}
                    {report.summary && (
                      <p className="text-xs lg:text-sm font-avenir font-normal text-sfa-navy/80 uppercase tracking-wider leading-relaxed">
                        {report.summary}
                      </p>
                    )}
                    {report.fileUrl && (
                      <a
                        href={report.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-avenir font-black tracking-widest uppercase hover:underline"
                      >
                        DOWNLOAD REPORT &rarr;
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies — all case studies */}
        <section id="case-studies" className="relative overflow-hidden bg-white scroll-mt-16 sm:scroll-mt-20">
          {/* SVG Vector Background (same as home Case Studies section) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block">
            <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="newsroom-case-studies-left-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#194866" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <linearGradient id="newsroom-case-studies-right-grad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#194866" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
              </defs>
              <rect y="-20" width="1000" height="440" fill="url(#newsroom-case-studies-right-grad)" />
              <path d="M 0,-20 L 729,-20 C 789,-20 820,30 840,80 L 1010,420 L 0,420 Z" fill="url(#newsroom-case-studies-left-grad)" />
              <path d="M 729,-20 C 789,-20 820,30 840,80 L 1010,420" fill="none" stroke="#ffffff" strokeWidth="16" />
            </svg>
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#194866] to-[#e2e8f0] lg:bg-none">
            <div className="max-w-[1050px]">
              <div className="pb-6 mb-8 space-y-4">
                <span className="text-sm font-avenir font-semibold tracking-[0.2em] text-[#00bdf1] uppercase">
                  CASE STUDIES
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.1] text-white">
                  WHAT WE&apos;VE DELIVERED.
                  <span className="block mt-2">HOW IT HELPED.</span>
                </h2>
              </div>

              <div className="h-[2px] w-5/6 bg-white/20 mb-12" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                {cms.caseStudies.map((cs) => (
                  <article
                    key={cs._id}
                    id={`case-study-${cs._id}`}
                    className="flex flex-col justify-between h-full space-y-6 scroll-mt-28 sm:scroll-mt-32"
                  >
                    <div className="space-y-4">
                      <span className="text-[10px] font-montserrat font-bold tracking-widest text-[#194866] uppercase block">
                        {cs.categoryTag}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-montserrat font-normal tracking-tight text-sfa-navy uppercase leading-tight">
                        {cs.titleLines.map((line, lIdx) => (
                          <span key={lIdx} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>
                      <p className="text-xs lg:text-sm font-avenir font-normal text-sfa-navy/80 tracking-wider leading-relaxed text-justify uppercase">
                        {cs.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-sfa-navy/10 lg:border-t-0 lg:pt-0">
                      <span className="text-[10px] font-avenir font-black italic tracking-wide text-sfa-navy/90 uppercase block leading-relaxed">
                        {cs.outcomeFootnote}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact band (same as home page) */}
        <section className="bg-secondary text-white py-16 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-montserrat font-normal tracking-[0.3em] uppercase leading-tight text-white">
              {cms.settings.contactTitle}
            </h2>
            <div className="text-sm sm:text-base lg:text-lg font-montserrat font-medium tracking-[0.15em] uppercase text-white/90">
              {cms.settings.contactSubtitle}
            </div>
            <p className="text-xs sm:text-sm lg:text-[15px] font-avenir text-white/90 leading-relaxed max-w-2xl mx-auto">
              {cms.settings.contactDescription}
            </p>
            <div className="pt-6 flex justify-center">
              <button
                onClick={() => setContactOpen(true)}
                className="cursor-pointer px-10 py-2.5 border border-[#2684be] text-white text-sm sm:text-[15px] font-avenir font-medium tracking-wide transition duration-300 bg-transparent hover:bg-white/10"
              >
                REQUEST A CALL BACK
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Interactive Form Modals */}
      <RequestValuationModal isOpen={valuationOpen} onClose={() => setValuationOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
