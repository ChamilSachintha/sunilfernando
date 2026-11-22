"use client";

import React, { useState, useEffect } from "react";
// import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  FileText,
  // Download,
  // Calendar,
  Briefcase,
  // CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
// import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { RequestValuationModal, ContactModal } from "@/components/Forms";
import SiteFooter from "@/components/SiteFooter";
import type {
  SanitySiteContent,
} from "@/sanity/lib/defaultData";

const NAV_LINKS = [
  { label: "HOME", section: "home" },
  { label: "WHAT WE OFFER", section: "offer" },
  { label: "NEWSROOM", section: "newsroom", active: true },
  { label: "OUR NETWORK", section: "clients" },
  { label: "OUR TEAM", section: "team" },
  { label: "REACH US", section: "contact" },
];

/*
// Fallback comprehensive article content when body is not yet populated via Sanity CMS
const FALLBACK_REPORT_ARTICLES: Record<string, { paragraphs: string[]; keyTakeaways?: string[] }> = {
  "report-1": {
    paragraphs: [
      "Sri Lanka’s property landscape enters 2026 amidst sustained economic recalibration, currency stabilization, and renewed foreign direct investment interest. Across the Western Province, commercial office prime yields have stabilized, driven by increasing occupier requirements from global technology firms, business process management centers, and multilateral agencies.",
      "In the hospitality domain, tourist arrivals continuing their upward trajectory have triggered notable asset-repositioning exercises across the southern coast and Central Highlands. Investors are increasingly seeking institutional-grade advisory to assess debt restructuring, refurbishment capital expenditure, and asset-backing valuations in compliance with RICS Red Book standards.",
      "Meanwhile, Port City Colombo represents a distinctive sub-market operating under an independent regulatory framework. As the first commercial mixed-use parcels move toward completion, early leasing indicators demonstrate premium yields relative to mainland prime CBD stock, attracting cross-border capital particularly from India, the UAE, and Singapore.",
    ],
    keyTakeaways: [
      "Commercial prime yields stabilized at 8.5% – 10.2% across Grade-A Colombo CBD office space.",
      "Hospitality sector valuations are shifting toward multi-year DCF models with normalized REVPAR benchmarks.",
      "Port City Colombo commercial land and early residential towers demand a 15% – 25% premium over traditional Colombo 01/02 benchmarks.",
    ],
  },
  "report-2": {
    paragraphs: [
      "The handover of initial retail and commercial parcels in Port City Colombo marks a structural milestone for South Asian commercial property. Operating under the Colombo Port City Economic Commission Act, the special economic zone introduces dollarized leasing, offshore enterprise exemptions, and streamlined title registrations.",
      "For corporate occupiers, Port City offers purpose-built Grade-A space adhering strictly to international sustainability and wellness standards. This infrastructure contrast with older mainland commercial assets has established a dual-tier commercial pricing structure, accelerating flight-to-quality tenant relocations.",
      "From a valuation perspective, assessing Port City assets requires careful calibration of offshore cashflow modeling, 99-year statutory leasehold structures, and regional tax incentives against long-term development phasing risks.",
    ],
    keyTakeaways: [
      "Statutory leasehold terms require nuanced Discounted Cash Flow (DCF) modeling factoring reversionary tenure.",
      "Flight-to-quality occupier migration is exerting downward rental pressure on secondary Colombo commercial stock.",
      "Institutional investors are factoring foreign currency repatriation guarantees into their risk discount rates.",
    ],
  },
  "report-3": {
    paragraphs: [
      "The Maldivian resort market remains one of the world's most unique hospitality asset classes, characterized by ultra-luxury private island developments and long-term sovereign head-leases granted by the Ministry of Tourism (MOT).",
      "When securing debt facilities from European, Middle Eastern, and regional commercial banks, resort appraisals must adhere rigorously to RICS Red Book standards. Lenders place significant emphasis on the remaining unexpired leasehold term, statutory lease extension costs under Maldivian law, and historical EBITDA conversions against seasonal monsoon patterns.",
      "Our valuation methodology synthesizes ten-year multi-currency cash flow forecasts, guest source-market diversification metrics, and capital maintenance reserves, providing financial institutions with an uncompromised assessment of collateral risk.",
    ],
    keyTakeaways: [
      "Head-lease extensions under the 99-year framework require precise amortization in the terminal asset valuation.",
      "Lenders mandate stress-testing against airline seat capacity and source-market currency fluctuations.",
      "Environmental and marine coastal asset protection expenditures are increasingly classified as core valuation adjustments.",
    ],
  },
};

const FALLBACK_CASE_STUDIES: Record<
  string,
  {
    challenge: string;
    approach: string;
    results: string;
  }
> = {
  "case-study-1": {
    challenge:
      "A leading Sri Lankan commercial bank required a portfolio-wide independent valuation of 47 distressed and performing collateral assets comprising industrial warehousing, shopping arcades, and mixed residential developments. The mandate was driven by stringent Central Bank regulatory timelines and year-end IFRS 9 impairment audits.",
    approach:
      "SFA mobilized four dedicated valuation taskforces across nine provinces within 48 hours. Valuers executed verified on-site boundary surveys, municipal zoning verifications, and market comparable analyses, standardizing data collection using RICS and IVSL accredited methodologies.",
    results:
      "All 47 comprehensive valuation reports were delivered within the strict 30-day statutory window. The assessments were accepted without exception by the bank's international Big Four audit partner and regulatory risk committee.",
  },
  "case-study-2": {
    challenge:
      "An international luxury hospitality conglomerate sought an $85M cross-border refinancing package for a 120-villa five-star resort in the North Malé Atoll. The European syndication lead required a fully independent, RICS-compliant appraisal reconciling Maldivian land tenure law with international banking covenants.",
    approach:
      "Our cross-border team conducted extensive on-island property inspections, physical plant & machinery reviews, and forensic ten-year DCF modeling. The analysis incorporated sovereign head-lease amortization, seasonal ADR trends, and capital reinvestment cycles.",
    results:
      "The comprehensive valuation dossier was cleared by the lead arranger's credit committee without restructuring clauses, facilitating successful debt closing at competitive institutional margins.",
  },
  "case-study-3": {
    challenge:
      "In a high-profile multi-generational family estate settlement and legal dispute, independent valuation was mandated for a contiguous 250-acre operational tea plantation, including tea factory machinery, hydroelectric generation assets, and colonial heritage estate bungalows.",
    approach:
      "SFA deployed specialized agricultural and plant & machinery valuers alongside chartered real estate appraisers. Valuations were segregated into arable crop yield values, machinery replacement costs, and heritage architectural premiums, strictly adhering to IVSL and judicial evidentiary criteria.",
    results:
      "The valuation report was admitted into formal legal proceedings as definitive expert testimony. Supported by our senior partners' expert witness representation, the parties achieved an equitable, binding amicable settlement.",
  },
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm sm:text-base text-sfa-navy/80 leading-relaxed font-avenir mb-4">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-secondary uppercase tracking-tight mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg sm:text-xl font-montserrat font-medium text-sfa-navy uppercase tracking-tight mt-4 mb-2">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-secondary pl-4 my-4 italic text-sfa-navy/90 font-serif">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 mb-4 space-y-1 text-sm sm:text-base text-sfa-navy/80 font-avenir">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 mb-4 space-y-1 text-sm sm:text-base text-sfa-navy/80 font-avenir">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-sfa-navy">{children}</strong>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sfa-blue underline hover:text-secondary"
      >
        {children}
      </a>
    ),
  },
};
*/

export default function NewsroomClient({ content }: { content: SanitySiteContent }) {
  const cms = content;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [valuationOpen, setValuationOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"insights" | "case-studies">("insights");

  // Handle URL hash anchor tab selection & scrolling smoothly after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash.toLowerCase();
        if (hash.includes("case-study")) {
          setActiveTab("case-studies");
        } else if (hash.includes("insight")) {
          setActiveTab("insights");
        }
        const id = window.location.hash.replace("#", "");
        if (id) {
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 150);
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const navigateToSection = (section: string) => {
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("sfa_scroll_target", section);
      } catch {
        // Ignore storage errors
      }
      window.location.href = "/";
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-sfa-navy overflow-x-hidden">
      {/* 1. Main Header (identical to Homepage navbar) */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-sfa-grey/10 shadow-sm transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
          <a href="/" className="cursor-pointer flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cms.settings.logoUrl || "/logo.png"}
              alt="Sunil Fernando & Associates Logo"
              className="h-16 sm:h-20 py-0 block object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-sans text-sm font-semibold uppercase tracking-widest text-sfa-navy/80">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => navigateToSection(link.section)}
                className={`cursor-pointer hover:text-sfa-blue transition uppercase tracking-widest ${
                  link.active ? "text-sfa-blue font-semibold" : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger menu */}
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
              className="lg:hidden absolute top-full left-0 right-0 z-50 border-t border-sfa-grey/10 bg-white shadow-lg"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col font-sans text-sm font-semibold uppercase tracking-widest text-sfa-navy">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => navigateToSection(link.section)}
                    className={`cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue uppercase tracking-widest ${
                      link.active ? "text-sfa-blue font-semibold" : ""
                    }`}
                  >
                    {link.label}
                  </button>
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

      {/* 2. Sub Navbar behaving as interactive tabs */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-sfa-grey/15 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-8 sm:gap-12 text-xs sm:text-sm font-avenir font-semibold tracking-[0.2em] uppercase">
            <button
              onClick={() => setActiveTab("insights")}
              className={`cursor-pointer transition flex items-center gap-2 py-3 border-b-2 ${
                activeTab === "insights"
                  ? "border-sfa-blue text-sfa-blue font-bold"
                  : "border-transparent text-sfa-navy/70 hover:text-sfa-blue"
              }`}
            >
              <span>INSIGHTS</span>
              {/* <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans transition ${
                activeTab === "insights" ? "bg-sfa-blue/10 text-sfa-blue" : "bg-slate-100 text-sfa-navy/70"
              }`}>
                {cms.reports.length}
              </span> */}
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans transition ${
                activeTab === "insights" ? "bg-sfa-blue/10 text-sfa-blue" : "bg-slate-100 text-sfa-navy/70"
              }`}>
                SOON
              </span>
            </button>
            <button
              onClick={() => setActiveTab("case-studies")}
              className={`cursor-pointer transition flex items-center gap-2 py-3 border-b-2 ${
                activeTab === "case-studies"
                  ? "border-sfa-blue text-sfa-blue font-bold"
                  : "border-transparent text-sfa-navy/70 hover:text-sfa-blue"
              }`}
            >
              <span>CASE STUDIES</span>
              {/* <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans transition ${
                activeTab === "case-studies" ? "bg-sfa-blue/10 text-sfa-blue" : "bg-slate-100 text-sfa-navy/70"
              }`}>
                {cms.caseStudies.length}
              </span> */}
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans transition ${
                activeTab === "case-studies" ? "bg-sfa-blue/10 text-sfa-blue" : "bg-slate-100 text-sfa-navy/70"
              }`}>
                SOON
              </span>
            </button>
          </div>
        </div>
      </div>

      <main className="pt-28 sm:pt-32 pb-0">
        {/* Editorial Newsroom Hero */}
        <section className="bg-gradient-to-b from-white via-white to-[#f1f5f9] border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-[11px] font-montserrat font-bold uppercase tracking-widest">
                <span>{activeTab === "insights" ? "MARKET INSIGHTS & REPORTS" : "ADVISORY CASE STUDIES"}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-normal tracking-tight uppercase text-sfa-navy leading-[1.1]">
                NEWSROOM &amp;
                <span className="block font-medium text-secondary">
                  {activeTab === "insights" ? "MARKET INTELLIGENCE" : "CASE ARCHIVES"}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-sfa-navy/70 font-avenir leading-relaxed max-w-3xl pt-2">
                {activeTab === "insights"
                  ? "Independent real estate intelligence, technical valuation commentary, and macroeconomic property outlooks across Sri Lanka, the Maldives, and the UAE."
                  : "Verified institutional transactions, bank collateral appraisals, and cross-border resort valuation outcomes delivered by Sunil Fernando & Associates."}
              </p>
            </div>
          </div>
        </section>

        <div id="newsroom-content" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 scroll-mt-36">
          <AnimatePresence mode="wait">
            {activeTab === "insights" ? (
              <motion.div
                key="tab-insights"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {/* TAB 1: MARKET INSIGHTS & REPORTS */}
                <section id="insights" className="space-y-8 scroll-mt-36">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-secondary pb-4 gap-2">
                    <div>
                      <span className="text-xs font-avenir font-bold tracking-[0.2em] text-[#00bdf1] uppercase">
                        RESEARCH PUBLICATIONS
                      </span>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-medium text-sfa-navy uppercase tracking-tight">
                        MARKET INSIGHTS &amp; REPORTS
                      </h2>
                    </div>
                    {/* <span className="text-xs font-montserrat font-bold text-sfa-navy/60 uppercase tracking-widest">
                      {cms.reports.length} {cms.reports.length === 1 ? "ARTICLE" : "ARTICLES"}
                    </span> */}
                    <span className="text-xs font-montserrat font-bold text-sfa-navy/60 uppercase tracking-widest">
                      COMING SOON
                    </span>
                  </div>

                  {/* Coming Soon State */}
                  <div className="bg-white border border-slate-200 shadow-sm p-8 sm:p-12 lg:p-16 text-left space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-[11px] font-montserrat font-bold uppercase tracking-widest">
                      <FileText className="w-3.5 h-3.5" />
                      <span>UPDATING SOON</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-normal text-sfa-navy uppercase tracking-tight leading-tight">
                      MARKET INSIGHTS &amp; RESEARCH REPORTS COMING SOON.
                    </h3>
                    <p className="text-sm sm:text-base font-avenir text-sfa-navy/75 leading-relaxed max-w-2xl">
                      We are currently preparing our upcoming market intelligence publications, technical valuation commentaries, and regional property outlooks across Sri Lanka, the Maldives, and the UAE. Please check back soon for our latest reports.
                    </p>
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <button
                        onClick={() => setContactOpen(true)}
                        className="cursor-pointer inline-flex items-center gap-2.5 px-6 py-3 bg-secondary text-white text-xs font-montserrat font-bold tracking-widest uppercase hover:bg-[#133852] transition shadow-sm"
                      >
                        <span>REQUEST MARKET BRIEFING</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <span className="text-[11px] font-avenir text-sfa-navy/50 uppercase tracking-widest">
                        SUNIL FERNANDO &amp; ASSOCIATES REAL ESTATE INTELLIGENCE
                      </span>
                    </div>
                  </div>

                  {/* Full Article Entries */}
                  {/* <div className="space-y-12">
                    {cms.reports.map((report) => {
                      const fallback = FALLBACK_REPORT_ARTICLES[report._id];
                      return (
                        <article
                          key={report._id}
                          id={`insight-${report._id}`}
                          className="bg-white border border-slate-200 shadow-sm p-6 sm:p-10 lg:p-12 scroll-mt-36 transition hover:border-secondary/40"
                        >
                          // Meta header
                          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                            <div className="flex flex-wrap items-center gap-3">
                              {report.category ? (
                                <span className="px-3 py-1 bg-secondary/10 text-secondary text-[11px] font-montserrat font-bold tracking-widest uppercase">
                                  {report.category}
                                </span>
                              ) : (
                                <span className="px-3 py-1 bg-secondary/10 text-secondary text-[11px] font-montserrat font-bold tracking-widest uppercase">
                                  MARKET REPORT
                                </span>
                              )}
                              {report.isFeatured && (
                                <span className="px-3 py-1 bg-[#00bdf1]/15 text-[#008db5] text-[11px] font-montserrat font-bold tracking-widest uppercase">
                                  FEATURED PUBLICATION
                                </span>
                              )}
                            </div>

                            {report.date && (
                              <div className="flex items-center gap-1.5 text-xs font-avenir font-semibold text-sfa-navy/60 uppercase tracking-wider">
                                <Calendar className="w-4 h-4 text-secondary" />
                                <span>{report.date}</span>
                              </div>
                            )}
                          </div>

                          // Title
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-normal text-sfa-navy uppercase tracking-tight leading-tight mt-6 mb-6">
                            {report.title}
                          </h3>

                          // Primary Executive Summary
                          {report.summary && (
                            <div className="p-5 sm:p-6 bg-slate-50 border-l-4 border-secondary my-6">
                              <span className="block text-[11px] font-montserrat font-bold tracking-widest uppercase text-secondary mb-1">
                                EXECUTIVE SUMMARY
                              </span>
                              <p className="text-sm sm:text-base font-avenir text-sfa-navy/90 leading-relaxed uppercase tracking-wide">
                                {report.summary}
                              </p>
                            </div>
                          )}

                          // Full Article Body (PortableText from Sanity or fallback detailed analysis)
                          <div className="prose max-w-none text-sfa-navy/80 pt-2 pb-6">
                            {report.body && Array.isArray(report.body) && report.body.length > 0 ? (
                              <PortableText value={report.body} components={portableTextComponents} />
                            ) : fallback ? (
                              <div className="space-y-4">
                                {fallback.paragraphs.map((p, pIdx) => (
                                  <p
                                    key={pIdx}
                                    className="text-sm sm:text-base text-sfa-navy/80 leading-relaxed font-avenir"
                                  >
                                    {p}
                                  </p>
                                ))}

                                {fallback.keyTakeaways && fallback.keyTakeaways.length > 0 && (
                                  <div className="mt-6 pt-6 border-t border-slate-100">
                                    <h4 className="text-xs font-montserrat font-bold text-secondary uppercase tracking-widest mb-3">
                                      KEY STRATEGIC TAKEAWAYS
                                    </h4>
                                    <ul className="space-y-2">
                                      {fallback.keyTakeaways.map((point, kIdx) => (
                                        <li
                                          key={kIdx}
                                          className="flex items-start gap-2.5 text-xs sm:text-sm text-sfa-navy/85 font-avenir"
                                        >
                                          <CheckCircle2 className="w-4 h-4 text-[#00bdf1] shrink-0 mt-0.5" />
                                          <span>{point}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ) : null}
                          </div>

                          // Footer Actions / Download Button
                          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                            {report.fileUrl ? (
                              <a
                                href={report.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-6 py-3 bg-secondary text-white text-xs font-montserrat font-bold tracking-widest uppercase hover:bg-[#133852] transition shadow-sm"
                              >
                                <Download className="w-4 h-4" />
                                <span>DOWNLOAD FULL REPORT (PDF)</span>
                              </a>
                            ) : (
                              <button
                                onClick={() => setContactOpen(true)}
                                className="inline-flex items-center gap-2.5 px-6 py-3 bg-secondary text-white text-xs font-montserrat font-bold tracking-widest uppercase hover:bg-[#133852] transition shadow-sm"
                              >
                                <FileText className="w-4 h-4" />
                                <span>REQUEST CUSTOM RESEARCH REPORT</span>
                              </button>
                            )}

                            <span className="text-[11px] font-avenir text-sfa-navy/50 uppercase tracking-widest">
                              SUNIL FERNANDO &amp; ASSOCIATES REAL ESTATE INTELLIGENCE
                            </span>
                          </div>
                        </article>
                      );
                    })}
                  </div> */}
                </section>
              </motion.div>
            ) : (
              <motion.div
                key="tab-case-studies"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {/* TAB 2: ADVISORY CASE STUDIES */}
                <section id="case-studies" className="space-y-8 scroll-mt-36">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-secondary pb-4 gap-2">
                    <div>
                      <span className="text-xs font-avenir font-bold tracking-[0.2em] text-[#00bdf1] uppercase">
                        PROVEN INSTITUTIONAL RESULTS
                      </span>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-medium text-sfa-navy uppercase tracking-tight">
                        ADVISORY CASE STUDIES
                      </h2>
                    </div>
                    {/* <span className="text-xs font-montserrat font-bold text-sfa-navy/60 uppercase tracking-widest">
                      {cms.caseStudies.length} {cms.caseStudies.length === 1 ? "MANDATE" : "MANDATES"}
                    </span> */}
                    <span className="text-xs font-montserrat font-bold text-sfa-navy/60 uppercase tracking-widest">
                      COMING SOON
                    </span>
                  </div>

                  {/* Coming Soon State */}
                  <div className="bg-white border border-slate-200 shadow-sm p-8 sm:p-12 lg:p-16 text-left space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-[11px] font-montserrat font-bold uppercase tracking-widest">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>UPDATING SOON</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-normal text-sfa-navy uppercase tracking-tight leading-tight">
                      ADVISORY CASE STUDIES COMING SOON.
                    </h3>
                    <p className="text-sm sm:text-base font-avenir text-sfa-navy/75 leading-relaxed max-w-2xl">
                      We are currently curating our featured institutional valuations, bank collateral appraisals, and cross-border advisory mandates. Detailed case studies and transaction outcomes will be published here soon.
                    </p>
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <button
                        onClick={() => setValuationOpen(true)}
                        className="cursor-pointer inline-flex items-center gap-2.5 px-6 py-3 bg-secondary text-white text-xs font-montserrat font-bold tracking-widest uppercase hover:bg-[#133852] transition shadow-sm"
                      >
                        <span>DISCUSS A MANDATE WITH US</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <span className="text-[11px] font-avenir text-sfa-navy/50 uppercase tracking-widest">
                        VALUATION &amp; TRANSACTION ADVISORY
                      </span>
                    </div>
                  </div>

                  {/* Full Case Study Cards */}
                  {/* <div className="space-y-12">
                    {cms.caseStudies.map((cs) => {
                      const fallback = FALLBACK_CASE_STUDIES[cs._id];
                      return (
                        <article
                          key={cs._id}
                          id={`case-study-${cs._id}`}
                          className="bg-white border border-slate-200 shadow-sm p-6 sm:p-10 lg:p-12 scroll-mt-36 transition hover:border-secondary/40"
                        >
                          // Meta header
                          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                            <div className="flex items-center gap-2 text-secondary">
                              <Briefcase className="w-4 h-4" />
                              <span className="text-xs font-montserrat font-bold tracking-widest uppercase">
                                {cs.categoryTag}
                              </span>
                            </div>
                            <span className="text-[11px] font-avenir font-bold text-sfa-navy/50 uppercase tracking-widest">
                              VALUATION &amp; TRANSACTION ADVISORY
                            </span>
                          </div>

                          // Title
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-montserrat font-normal text-sfa-navy uppercase tracking-tight leading-tight my-6">
                            {cs.titleLines.map((line, lIdx) => (
                              <span key={lIdx} className="block">
                                {line}
                              </span>
                            ))}
                          </h3>

                          // Case Study Details Grid
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                            <div className="space-y-2 p-6 bg-slate-50 border border-slate-100">
                              <span className="text-xs font-montserrat font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                                <span>01. THE MANDATE &amp; CHALLENGE</span>
                              </span>
                              <p className="text-sm font-avenir text-sfa-navy/85 leading-relaxed pt-2">
                                {fallback?.challenge || cs.description}
                              </p>
                            </div>

                            <div className="space-y-2 p-6 bg-slate-50 border border-slate-100">
                              <span className="text-xs font-montserrat font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                                <span>02. ADVISORY APPROACH &amp; EXECUTION</span>
                              </span>
                              <p className="text-sm font-avenir text-sfa-navy/85 leading-relaxed pt-2">
                                {fallback?.approach ||
                                  "Leveraged certified RICS & IVSL methodology, specialized market data, and proprietary transactional comps to establish rigorous, lender-compliant asset values."}
                              </p>
                            </div>
                          </div>

                          // Full Case Study Body (PortableText if set in Sanity)
                          {cs.body && Array.isArray(cs.body) && cs.body.length > 0 && (
                            <div className="prose max-w-none text-sfa-navy/80 py-4">
                              <PortableText value={cs.body} components={portableTextComponents} />
                            </div>
                          )}

                          // Outcome Footnote Banner
                          <div className="p-6 bg-gradient-to-r from-secondary to-[#133852] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
                            <div className="space-y-1">
                              <span className="text-[10px] font-montserrat font-bold tracking-widest uppercase text-[#00bdf1]">
                                QUANTIFIED INSTITUTIONAL OUTCOME
                              </span>
                              <p className="text-sm sm:text-base font-avenir font-semibold tracking-wide uppercase">
                                {cs.outcomeFootnote}
                              </p>
                            </div>
                            <button
                              onClick={() => setValuationOpen(true)}
                              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-secondary text-xs font-montserrat font-bold tracking-widest uppercase hover:bg-slate-100 transition"
                            >
                              <span>DISCUSS SIMILAR MANDATE</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div> */}
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Get In Touch Section (identical to Homepage) */}
        <section id="contact" className="bg-secondary text-white py-16 text-center relative overflow-hidden">
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

      {/* Shared Site Footer */}
      <SiteFooter />

      {/* Interactive Form Modals */}
      <RequestValuationModal isOpen={valuationOpen} onClose={() => setValuationOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
