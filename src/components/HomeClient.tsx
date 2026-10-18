"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { KnightFrankLogo, MakeeluChambersLogo } from "@/components/Logos";
import { RequestValuationModal, ContactModal } from "@/components/Forms";
import { DEFAULT_SITE_CONTENT, type SanitySiteContent } from "@/sanity/lib/defaultData";
import { getSiteContent } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";

export default function HomeClient({
  initialContent,
}: {
  initialContent?: SanitySiteContent;
}) {
  // CMS Content State (starts with SSR content, updates live when edited in Sanity CMS)
  const [cms, setCms] = useState<SanitySiteContent>(
    initialContent || DEFAULT_SITE_CONTENT
  );

  useEffect(() => {
    if (!isSanityConfigured) return;

    const loadCmsContent = () => {
      fetch("/api/site-content", { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data: SanitySiteContent | null) => {
          if (data && data.settings) {
            setCms(data);
          }
        })
        .catch(() => {
          getSiteContent().then((data) => {
            if (data && data.settings) {
              setCms(data);
            }
          });
        });
    };

    loadCmsContent();
    window.addEventListener("focus", loadCmsContent);
    const pollTimer = setInterval(loadCmsContent, 8000);
    return () => {
      window.removeEventListener("focus", loadCmsContent);
      clearInterval(pollTimer);
    };
  }, []);

  // Navigation & Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Carousel State
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = (cms.settings.heroImages?.length
    ? cms.settings.heroImages
    : DEFAULT_SITE_CONTENT.settings.heroImages
  ).map((image, idx) => ({
    image,
    alt: `Sunil Fernando & Associates hero architecture slide ${idx + 1}`,
  }));

  // Forms / Modals state
  const [valuationOpen, setValuationOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Explore Our Services tab state (0: Valuation, 1: Occupier, 2: Capital Markets, 3: Research)
  const [activeService, setActiveService] = useState(0);

  const openService = (idx: number) => {
    setActiveService(idx);
    scrollTo("offer");
  };

  // Auto-play Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Handle active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "offer", "newsroom", "network", "team", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-sfa-navy overflow-x-hidden">
      {/* 1. Header (Page 1) */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-sfa-grey/10 shadow-sm transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
          <div className="cursor-pointer flex items-center" onClick={() => scrollTo("home")}>
            <img
              src={cms.settings.logoUrl || "/logo.png"}
              alt="Sunil Fernando & Associates Logo"
              className="h-16 sm:h-20 py-0 block object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-sans text-sm font-semibold uppercase tracking-widest text-sfa-navy/80">
            <button
              onClick={() => scrollTo("home")}
              className={`cursor-pointer hover:text-sfa-blue transition ${activeSection === "home" ? "text-sfa-blue font-semibold" : ""}`}
            >
              HOME
            </button>
            <button
              onClick={() => scrollTo("offer")}
              className={`cursor-pointer hover:text-sfa-blue transition ${activeSection === "offer" ? "text-sfa-blue font-semibold" : ""}`}
            >
              WHAT WE OFFER
            </button>
            <button
              onClick={() => scrollTo("newsroom")}
              className={`cursor-pointer hover:text-sfa-blue transition ${activeSection === "newsroom" ? "text-sfa-blue font-semibold" : ""}`}
            >
              NEWSROOM
            </button>
            <button
              onClick={() => scrollTo("network")}
              className={`cursor-pointer hover:text-sfa-blue transition ${activeSection === "network" ? "text-sfa-blue font-semibold" : ""}`}
            >
              OUR NETWORK
            </button>
            <button
              onClick={() => scrollTo("team")}
              className={`cursor-pointer hover:text-sfa-blue transition ${activeSection === "team" ? "text-sfa-blue font-semibold" : ""}`}
            >
              OUR TEAM
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className={`cursor-pointer hover:text-sfa-blue transition ${activeSection === "contact" ? "text-sfa-blue font-semibold" : ""}`}
            >
              REACH US
            </button>
          </nav>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer p-2 text-sfa-navy hover:text-sfa-blue transition focus:outline-none"
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
                <button onClick={() => scrollTo("home")} className="cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  HOME
                </button>
                <button onClick={() => scrollTo("offer")} className="cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  WHAT WE OFFER
                </button>
                <button onClick={() => scrollTo("newsroom")} className="cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  NEWSROOM
                </button>
                <button onClick={() => scrollTo("network")} className="cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  OUR NETWORK
                </button>
                <button onClick={() => scrollTo("team")} className="cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  OUR TEAM
                </button>
                <button onClick={() => scrollTo("contact")} className="cursor-pointer text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  REACH US
                </button>
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

      {/* 2. Hero Section & Carousel (Page 1-4) */}
      <section id="home" className="relative min-h-screen w-full flex flex-col justify-between pt-16 sm:pt-20 overflow-hidden bg-black">
        {/* Background images transitioning */}
        {heroSlides.map((slide, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: idx === heroIndex ? 0.5 : 0,
              scale: idx === heroIndex ? 1 : 1.05,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Diagonal Light Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sfa-navy/85 via-sfa-navy/50 to-transparent z-10 pointer-events-none" />

        {/* Content */}
        <div className="relative z-20 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 text-white flex-1 flex flex-col justify-center py-4 sm:py-6">
          <div className="max-w-3xl self-end text-right">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-montserrat font-medium tracking-widest leading-none text-white">
                {cms.settings.heroTitleLine1}
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-montserrat font-medium tracking-widest leading-none text-white mt-1">
                {cms.settings.heroTitleLine2}
              </h1>
              <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
                <span className="block text-lg sm:text-xl lg:text-2xl font-montserrat font-normal tracking-widest text-white uppercase">
                  {cms.settings.heroSubtitle}
                </span>
                <span className="block text-base sm:text-lg lg:text-xl font-avenir font-light tracking-widest text-white/90">
                  {cms.settings.heroTagline}
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ y: 35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-sm font-avenir tracking-wide leading-relaxed font-normal text-white mt-4 sm:mt-6 max-w-xl ml-auto"
            >
              {cms.settings.heroDescription}
            </motion.p>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-5 sm:mt-6 flex justify-end gap-4"
            >
              <button
                onClick={() => setContactOpen(true)}
                className="cursor-pointer px-10 sm:px-12 py-3 sm:py-3.5 bg-[#1e4e72] hover:bg-[#153a53] text-white text-xs sm:text-sm lg:text-base font-avenir font-normal tracking-widest uppercase rounded-xl transition duration-300 shadow-md"
              >
                REQUEST A CALL BACK
              </button>
            </motion.div>
          </div>
        </div>

        {/* Regional Offices Row: Dubai, Maldives, and Sri Lanka (Semi-transparent dark tint over hero background) */}
        <div className="relative z-20 w-full bg-[#0c2340]/55 text-white py-4 sm:py-6">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24 xl:gap-36 text-center md:text-left">
            {cms.settings.regionalOffices.map((office, idx) => (
              <div key={idx} className="flex flex-col justify-start max-w-[260px] mx-auto md:mx-0">
                <div className="flex items-center justify-center md:justify-start gap-2.5 mb-1.5">
                  <Image
                    src={office.flagUrl || "/flag-lk.png"}
                    alt={`${office.country} Flag`}
                    width={28}
                    height={18}
                    className="w-6 sm:w-7 h-auto rounded-[2px] shadow-sm object-cover shrink-0"
                  />
                  <h3 className="text-sm sm:text-base font-montserrat font-bold tracking-widest uppercase text-white drop-shadow-sm">
                    {office.country}
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] font-avenir font-normal text-white/85 leading-relaxed drop-shadow-sm">
                  {office.address}
                </p>
                <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                  <span className="text-[11px] font-avenir uppercase tracking-wider text-sfa-cyan font-bold drop-shadow-sm">Tel:</span>
                  <a href={`tel:${office.phoneHref}`} className="cursor-pointer text-xs sm:text-[13px] font-avenir font-medium text-white hover:text-sfa-cyan transition drop-shadow-sm">
                    {office.phoneDisplay}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.8 Four-Column Figures / Stats Section (26+, IVSL, RARE, RICS) */}
      <section className="py-8 sm:py-10 md:py-12 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid Stats Layout with Ampersand in center */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-20 md:gap-y-16 lg:gap-x-24 lg:gap-y-20 items-center py-4 md:py-6">
            {/* Center ampersand and dividers background logo */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              {/* Horizontal dividers */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center gap-6 px-4 md:px-8">
                <div className="flex-1 h-[3px] bg-sfa-grey/10 hidden md:block" />
                <div className="w-[100px] sm:w-[150px] shrink-0 h-[3px] opacity-0" />
                <div className="flex-1 h-[3px] bg-sfa-grey/10 hidden md:block" />
              </div>

              {/* Vertical dividers & ampersand */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-0 py-0 h-full">
                <div className="w-[3px] flex-1 bg-sfa-grey/10 hidden md:block mb-[-10px] sm:mb-[-16px]" />
                <span className="font-serif text-[120px] sm:text-[180px] font-bold text-sfa-grey/10 leading-none">
                  &
                </span>
                <div className="w-[3px] flex-1 bg-sfa-grey/10 hidden md:block mt-[-10px] sm:mt-[-16px]" />
              </div>
            </div>

            {cms.settings.stats.map((stat, idx) => {
              const isLeft = idx % 2 === 0;
              const isBlue = stat.accentColor === "blue";
              const logoSrc =
                stat.logoUrl ||
                (stat.value?.trim().toUpperCase() === "RICS" ? "/logos/rics.png" : undefined);
              return (
                <div
                  key={idx}
                  className={
                    isLeft
                      ? "text-center md:text-right flex flex-col md:items-end justify-center z-10 md:pr-24 lg:pr-28"
                      : "text-center md:text-left flex flex-col md:items-start justify-center z-10 md:pl-24 lg:pl-28"
                  }
                >
                  {logoSrc ? (
                    <div
                      className={`flex items-center ${
                        isLeft ? "justify-center md:justify-end" : "justify-center md:justify-start"
                      }`}
                    >
                      <Image
                        src={logoSrc}
                        alt={stat.value || "RICS Logo"}
                        width={280}
                        height={100}
                        className="h-12 sm:h-16 md:h-20 w-auto object-contain max-w-[200px] sm:max-w-[260px]"
                      />
                    </div>
                  ) : (
                    <span
                      className={`text-5xl sm:text-7xl font-montserrat font-black tracking-tight ${
                        isBlue ? "text-sfa-blue" : "text-sfa-navy"
                      }`}
                    >
                      {stat.value}
                    </span>
                  )}
                  {stat.subtitleLine1 && (
                    <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/60 uppercase mt-2">
                      {stat.subtitleLine1}
                    </span>
                  )}
                  {stat.subtitleLine2 && (
                    <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/80 uppercase">
                      {stat.subtitleLine2}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3.1 Explore Our Services Section */}
      <section id="offer" className="bg-white relative">
        {/* Banner Bar "Explore Our Services" */}
        <div
          onClick={() => scrollTo("offer")}
          className="w-full bg-secondary cursor-pointer py-5 text-center text-white tracking-[0.4em] text-xl sm:text-2xl lg:text-3xl font-avenir font-normal uppercase transition duration-300 hover:bg-[#133852]"
        >
          EXPLORE OUR SERVICES
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header tabs row */}
          <div role="tablist" className="grid grid-cols-2 md:grid-cols-4 text-center border-b border-sfa-grey/10 md:border-b-0">
            {["VALUATION & ADVISORY", "OCCUPIER SERVICES", "CAPITAL MARKETS", "RESEARCH SERVICES"].map((tab, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={activeService === idx}
                aria-controls="service-panel"
                onClick={() => setActiveService(idx)}
                className={`py-4 font-avenir text-sm sm:text-base tracking-[0.15em] border-sfa-grey/10 cursor-pointer transition-colors duration-300 border-r-[3px] border-b-[3px] odd:border-r-[3px] even:border-r-0 md:even:border-r-[3px] md:last:border-r-0 md:border-b-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0 ${
                  activeService === idx
                    ? "bg-sfa-light-blue text-primary font-semibold"
                    : "bg-white text-primary font-medium hover:bg-sfa-light-blue/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Service Tab Panels: content of the selected tab */}
        <div id="service-panel" className="w-full grid grid-cols-1">
          {/* 7. Valuations Section (Page 9) */}
          <div
            className={`col-start-1 row-start-1 w-full h-full flex flex-col ${
              activeService === 0 ? "visible z-10" : "invisible pointer-events-none z-0"
            }`}
            aria-hidden={activeService !== 0}
          >
            <section className="relative flex-1 h-full min-h-[540px] flex items-stretch overflow-hidden bg-white">
              {/* SVG Vector Background */}
              <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block">
                <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="valuations-left-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#194866" />
                    </linearGradient>
                  </defs>

                  {/* Right Side Bright Cyan Background */}
                  <rect y="-20" width="1000" height="440" fill="#00bdf1" />

                  {/* Left Side Gradient Background */}
                  <path d="M 0,-20 L 709,-20 C 659,-20 620,30 600,80 L 494,420 L 0,420 Z" fill="url(#valuations-left-grad)" />

                  {/* White Curved Divider Line */}
                  <path d="M 709,-20 C 659,-20 620,30 600,80 L 494,420" fill="none" stroke="#ffffff" strokeWidth="16" />
                </svg>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12">
                {/* Left Column (Details) */}
                <div className="lg:col-span-7 flex flex-col justify-between py-12 px-6 sm:px-8 lg:py-16 lg:pl-0 lg:pr-24 bg-gradient-to-b from-[#e2e8f0] to-[#194866] lg:bg-none text-white">
                  <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.05] text-sfa-navy mb-6 lg:mb-0">
                    {cms.services.valuations.title}
                  </h2>

                  <div className="space-y-6 my-8 lg:my-0 lg:max-w-xl">
                    <p className="text-sm lg:text-base font-avenir leading-relaxed tracking-wider text-justify text-white/95">
                      {cms.services.valuations.paragraph1}
                    </p>
                    <p className="text-sm lg:text-base font-avenir leading-relaxed tracking-wider text-justify text-white/95">
                      {cms.services.valuations.paragraph2}
                    </p>
                  </div>

                  <button
                    onClick={() => setValuationOpen(true)}
                    className="inline-flex items-center gap-2 text-xs font-avenir font-black tracking-widest text-[#00bdf1] uppercase hover:underline cursor-pointer w-fit mt-6 lg:mt-0"
                  >
                    <span>{cms.services.valuations.ctaText} &rarr;</span>
                  </button>
                </div>

                {/* Right Column (Categories) */}
                <div className="lg:col-span-5 flex flex-col justify-center bg-tertiary lg:bg-transparent px-6 sm:px-8 py-10 lg:py-12 lg:pl-20 lg:pr-0">
                  <div className="w-full max-w-[320px] lg:max-w-[360px] mx-auto flex flex-col h-full justify-between divide-y divide-white/30 border-y border-white/30">
                    {cms.services.valuations.categories.map((category, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-start py-2.5 pl-6 sm:pl-10 lg:pl-16"
                      >
                        <span className="text-base sm:text-lg lg:text-xl font-montserrat font-bold italic text-sfa-navy tracking-wider uppercase">
                          {category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 8. Occupier Services (Page 10) */}
          <div
            className={`col-start-1 row-start-1 w-full h-full flex flex-col ${
              activeService === 1 ? "visible z-10" : "invisible pointer-events-none z-0"
            }`}
            aria-hidden={activeService !== 1}
          >
            <section className="relative flex-1 h-full min-h-[540px] flex items-stretch overflow-hidden bg-white">
              {/* Full-width building background image on desktop (clipped by overlay) */}
              <div className="absolute inset-0 z-0 hidden lg:block">
                <Image
                  src={cms.services.occupier.imageUrl}
                  alt="High-rise modern workspace architecture"
                  fill
                  className="object-cover"
                />
              </div>

              {/* SVG Vector Background */}
              <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block z-10">
                <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="occupier-left-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#194866" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                  </defs>

                  {/* Left Side Gradient Background */}
                  <path d="M 0,-20 L 512,-20 C 572,-20 610,30 630,80 L 758,420 L 0,420 Z" fill="url(#occupier-left-grad)" />

                  {/* White Curved Divider Line */}
                  <path d="M 512,-20 C 572,-20 610,30 630,80 L 758,420" fill="none" stroke="#ffffff" strokeWidth="16" />
                </svg>
              </div>

              {/* Content Overlay */}
              <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12">
                {/* Left Text Detail */}
                <div className="lg:col-span-7 flex flex-col justify-between py-12 px-6 sm:px-8 lg:py-16 lg:pl-0 lg:pr-24 bg-gradient-to-b from-[#194866] to-[#e2e8f0] lg:bg-none text-white">
                  <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.05] text-white mb-6 lg:mb-0">
                    {cms.services.occupier.titleLine1}
                    <span className="block mt-1">{cms.services.occupier.titleLine2}</span>
                  </h2>

                  <div className="space-y-4 my-8 lg:my-0 text-xs sm:text-sm lg:text-base font-avenir leading-relaxed text-justify max-w-2xl">
                    <p className="font-avenir font-semibold text-sfa-navy">
                      {cms.services.occupier.leadParagraph}
                    </p>
                    {cms.services.occupier.paragraphs.map((para, idx) => (
                      <p key={idx} className="text-sfa-navy/90">
                        {para}
                      </p>
                    ))}
                  </div>

                  <div aria-hidden="true" />
                </div>

                {/* Right Column Spacer / Mobile Image */}
                <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full">
                  <div className="absolute inset-0 lg:hidden">
                    <Image
                      src={cms.services.occupier.imageUrl}
                      alt="High-rise modern workspace architecture"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 9. Capital Markets (Page 11) */}
          <div
            className={`col-start-1 row-start-1 w-full h-full flex flex-col ${
              activeService === 2 ? "visible z-10" : "invisible pointer-events-none z-0"
            }`}
            aria-hidden={activeService !== 2}
          >
            <section className="relative flex-1 h-full min-h-[540px] flex items-stretch overflow-hidden bg-white">
              {/* SVG Vector Background */}
              <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block">
                <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="capital-left-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#194866" />
                    </linearGradient>
                    <linearGradient id="capital-divider-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="20%" stopColor="#194866" />
                      <stop offset="100%" stopColor="#194866" />
                    </linearGradient>
                  </defs>

                  {/* Right Side Solid Primary Blue Background */}
                  <rect y="-20" width="1000" height="440" fill="#2684be" />

                  {/* Left Side Gradient Background */}
                  <path d="M 0,-20 L 490,-20 C 440,-20 390,30 380,80 L 310,420 L 0,420 Z" fill="url(#capital-left-grad)" />

                  {/* Curved Divider Line (White to Secondary Navy Gradient) */}
                  <path d="M 490,-20 C 440,-20 390,30 380,80 L 310,420" fill="none" stroke="url(#capital-divider-grad)" strokeWidth="16" />
                </svg>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12">
                {/* Left Column (Details) */}
                <div className="lg:col-span-5 flex flex-col justify-between py-12 px-6 sm:px-8 lg:py-16 lg:pl-0 lg:pr-12 bg-gradient-to-b from-[#e2e8f0] to-[#194866] lg:bg-none text-white">
                  <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.05] text-sfa-navy mb-6 lg:mb-0">
                    {cms.services.capitalMarkets.titleLine1}
                    <span className="block mt-1">{cms.services.capitalMarkets.titleLine2}</span>
                  </h2>

                  <p className="text-sm lg:text-base font-avenir leading-relaxed tracking-wider text-justify text-white/95 my-8 lg:my-0 lg:max-w-[320px] uppercase">
                    {cms.services.capitalMarkets.leftSummary}
                  </p>

                  <div aria-hidden="true" />
                </div>

                {/* Right Column (Details) */}
                <div className="lg:col-span-7 flex flex-col justify-center bg-primary lg:bg-transparent px-6 sm:px-8 py-10 lg:py-12 lg:pl-20 lg:pr-0 text-white space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-sm sm:text-base lg:text-lg font-montserrat font-bold tracking-wider text-white">
                      {cms.services.capitalMarkets.rightHeading1}
                    </h3>
                    <ul className="space-y-1.5 text-xs lg:text-sm font-avenir font-normal tracking-wide text-white/90 uppercase">
                      {cms.services.capitalMarkets.clientTypes.map((ct, idx) => (
                        <li key={idx}>• {ct}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs sm:text-sm font-avenir text-white/80 leading-relaxed text-justify tracking-wide">
                    {cms.services.capitalMarkets.rightBody}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-sm sm:text-base lg:text-lg font-montserrat font-bold tracking-wider text-white">
                      {cms.services.capitalMarkets.rightHeading2}
                    </h3>
                    <ul className="space-y-1.5 text-xs lg:text-sm font-avenir font-semibold tracking-wide text-white/95 uppercase">
                      {cms.services.capitalMarkets.transactionLines.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 9.1 Research Services (Page 11.5) */}
          <div
            className={`col-start-1 row-start-1 w-full h-full flex flex-col ${
              activeService === 3 ? "visible z-10" : "invisible pointer-events-none z-0"
            }`}
            aria-hidden={activeService !== 3}
          >
            <section className="relative flex-1 h-full min-h-[540px] flex items-stretch overflow-hidden bg-white">
              {/* Full-width research workspace architecture background image on desktop (clipped by overlay) */}
              <div className="absolute inset-0 z-0 hidden lg:block">
                <Image
                  src={cms.services.research.imageUrl}
                  alt="Modern research workspace and architectural interior"
                  fill
                  className="object-cover"
                />
              </div>

              {/* SVG Vector Background */}
              <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block z-10">
                <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="research-left-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#194866" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                  </defs>

                  {/* Left Side Gradient Background */}
                  <path d="M 0,-20 L 512,-20 C 572,-20 610,30 630,80 L 758,420 L 0,420 Z" fill="url(#research-left-grad)" />

                  {/* White Curved Divider Line */}
                  <path d="M 512,-20 C 572,-20 610,30 630,80 L 758,420" fill="none" stroke="#ffffff" strokeWidth="16" />
                </svg>
              </div>

              {/* Content Overlay */}
              <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12">
                {/* Left Column (Details) */}
                <div className="lg:col-span-7 flex flex-col justify-between py-12 px-6 sm:px-8 lg:py-16 lg:pl-0 lg:pr-24 bg-gradient-to-b from-[#194866] to-[#e2e8f0] lg:bg-none text-white">
                  <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.05] text-white mb-6 lg:mb-0">
                    {cms.services.research.titleLine1}
                    <span className="block mt-1">{cms.services.research.titleLine2}</span>
                  </h2>

                  <div className="space-y-6 my-8 lg:my-0 lg:max-w-xl">
                    <p className="text-sm lg:text-base font-avenir leading-relaxed tracking-wider text-justify text-sfa-navy lg:text-sfa-navy font-medium">
                      {cms.services.research.paragraph1}
                    </p>
                    <p className="text-sm lg:text-base font-avenir leading-relaxed tracking-wider text-justify text-sfa-navy/90 lg:text-sfa-navy/90">
                      {cms.services.research.paragraph2}
                    </p>
                  </div>

                  <div aria-hidden="true" />
                </div>

                {/* Right Column Spacer / Mobile Image */}
                <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full">
                  <div className="absolute inset-0 lg:hidden">
                    <Image
                      src={cms.services.research.imageUrl}
                      alt="Modern research workspace and architectural interior"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* 4. What We Do (Page 6) */}
      <section className="relative min-h-[400px] flex items-stretch overflow-hidden bg-white">
        {/* SVG Vector Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block">
          <svg viewBox="0 0 1000 400" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              {/* Soft drop shadow cast onto the blue right-hand section */}
              <filter id="divider-shadow" x="-10%" y="-10%" width="140%" height="140%">
                <feDropShadow dx="3" dy="1" stdDeviation="3" floodColor="#0c2340" floodOpacity="0.28" />
              </filter>
            </defs>

            {/* Left Side White Background */}
            <polygon points="0,0 537,0 684,400 0,400" fill="#ffffff" />

            {/* Right Side Primary Blue Background (Top horizontal edge aligned with A graphic apex at y=50) */}
            <polygon points="537,50 1000,50 1000,400 684,400" fill="#2684be" />

            {/* 3D Semi-transparent 'A' Graphic (Apex starts strictly below banner at y=50) */}
            <image href={cms.settings.whatWeDoImageUrl || "/what-we-do-a.png"} x="366" y="50" width="313" height="350" preserveAspectRatio="none" />

            {/* Continuous Top Dark Blue Tab (#194866) and Diagonal Divider with Drop Shadow */}
            <path
              d="M 0,0 L 508,0 C 525,0 535,8 539,21 L 684,400 L 672,400 L 525,50 Q 515,50 493,50 L 0,50 Z"
              fill="#194866"
              filter="url(#divider-shadow)"
            />
          </svg>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (WHAT WE DO + End-to-End text) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white lg:bg-transparent">
            {/* Header Banner Text */}
            <div className="h-[51px] sm:h-[54px] flex items-center px-6 sm:px-8 lg:px-0 bg-secondary lg:bg-transparent">
              <span className="text-xs sm:text-sm font-avenir font-semibold tracking-[0.4em] text-white uppercase">
                WHAT WE DO
              </span>
            </div>
            
            {/* Main Left Content */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:pl-0 lg:pr-8 py-10 lg:py-12">
              <div className="w-fit flex flex-col items-center text-center">
                <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.08] text-secondary">
                  {cms.settings.whatWeDoHeadingLine1}
                  <span className="block mt-1">{cms.settings.whatWeDoHeadingLine2}</span>
                  <span className="block mt-1">{cms.settings.whatWeDoHeadingLine3}</span>
                </h2>
                <p className="text-base sm:text-lg font-avenir font-semibold tracking-[0.18em] text-[#2885bf] mt-6 uppercase text-center">
                  {cms.settings.whatWeDoSubheading}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (From Complex Portfolio Valuations...) */}
          <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-8 lg:pl-24 xl:pl-32 lg:pr-0 py-16 lg:py-24 text-white bg-primary lg:bg-transparent">
            <div className="font-avenir font-normal text-xs sm:text-sm lg:text-[13px] uppercase tracking-[0.18em] leading-[2.1] text-white lg:max-w-[400px]">
              {cms.settings.whatWeDoRightLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Insights & Reports (Page 7) */}
      <section id="newsroom" className="relative min-h-[380px] flex items-stretch overflow-hidden bg-white">
        {/* SVG Vector Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block">
          <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="insights-left-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#194866" />
              </linearGradient>
            </defs>

            {/* Right Side Bright Cyan Background (extended height to cover margins) */}
            <rect y="-20" width="1000" height="440" fill="#00bdf1" />

            {/* Left Side Gradient Background (extended beyond boundaries) */}
            <path d="M 0,-20 L 569,-20 C 519,-20 480,30 460,80 L 322,420 L 0,420 Z" fill="url(#insights-left-grad)" />

            {/* White Curved Divider Line (extended to clip flat at section edges) */}
            <path d="M 569,-20 C 519,-20 480,30 460,80 L 322,420" fill="none" stroke="#ffffff" strokeWidth="16" />
          </svg>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (INSIGHTS Header Details) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-12 px-6 sm:px-8 lg:py-16 lg:pl-0 lg:pr-12 bg-transparent">
            <span className="text-sm font-avenir font-semibold tracking-[0.2em] text-primary uppercase mb-6 lg:mb-0">
              INSIGHTS
            </span>
            
            <div className="flex-1 flex flex-col justify-center my-8 lg:my-0">
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.05] text-sfa-navy">
                MARKET
                <span className="block mt-1">INTELLIGENCE</span>
                <span className="block mt-1">FOR INFORMED</span>
                <span className="block mt-1">DECISIONS.</span>
              </h2>
            </div>

            <div className="text-sm font-avenir font-semibold tracking-[0.15em] text-primary uppercase mt-6 lg:mt-0">
              LATEST REPORT • 2026
            </div>
          </div>

          {/* Right Column (Reports & Commentaries) */}
          <div className="lg:col-span-7 flex flex-col justify-center py-12 px-6 sm:px-8 lg:py-16 lg:pl-24 lg:pr-0 bg-tertiary lg:bg-transparent text-sfa-navy">
            <div className="space-y-10 lg:space-y-12">
              {cms.reports.map((report) =>
                report.isFeatured ? (
                  <div
                    key={report._id}
                    className="space-y-3 pb-8 border-b border-sfa-navy/15 last:border-0 last:pb-0"
                  >
                    <h3 className="text-lg lg:text-xl font-avenir font-bold tracking-wide uppercase leading-snug">
                      {report.title}
                    </h3>
                    {report.summary && (
                      <p className="text-xs lg:text-sm font-avenir font-normal text-sfa-navy/80 uppercase tracking-wider leading-relaxed">
                        {report.summary}
                      </p>
                    )}
                    <button
                      onClick={() => {
                        if (report.fileUrl) {
                          window.open(report.fileUrl, "_blank", "noopener,noreferrer");
                        } else {
                          alert(`Downloading Report: ${report.title}`);
                        }
                      }}
                      className="inline-flex items-center gap-2 text-xs font-avenir font-black tracking-widest uppercase hover:underline cursor-pointer"
                    >
                      <span>DOWNLOAD REPORT &rarr;</span>
                    </button>
                  </div>
                ) : (
                  <div
                    key={report._id}
                    className="space-y-2 pb-8 border-b border-sfa-navy/15 last:border-0 last:pb-0"
                  >
                    {report.category && (
                      <span className="text-[10px] font-montserrat font-bold text-secondary uppercase tracking-widest">
                        {report.category}
                      </span>
                    )}
                    <h3 className="text-base lg:text-lg font-avenir font-bold tracking-wide uppercase leading-snug">
                      {report.title}
                    </h3>
                    {report.date && (
                      <span className="block text-xs font-avenir font-normal text-sfa-navy/70 uppercase tracking-wider">
                        {report.date}
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Case Studies (Page 8) */}
      <section className="relative overflow-hidden bg-white">
        {/* SVG Vector Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block">
          <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="case-studies-left-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#194866" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
              <linearGradient id="case-studies-right-grad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#194866" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>

            {/* Right Side Bottom-to-Top Gradient Background */}
            <rect y="-20" width="1000" height="440" fill="url(#case-studies-right-grad)" />

            {/* Left Side Gradient Background */}
            <path d="M 0,-20 L 729,-20 C 789,-20 820,30 840,80 L 1010,420 L 0,420 Z" fill="url(#case-studies-left-grad)" />

            {/* White Curved Divider Line */}
            <path d="M 729,-20 C 789,-20 820,30 840,80 L 1010,420" fill="none" stroke="#ffffff" strokeWidth="16" />
          </svg>
        </div>

        {/* Content Overlay */}
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

            {/* Horizontal line stops at 5/6 width (middle of column 3) */}
            <div className="h-[2px] w-5/6 bg-white/20 mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {cms.caseStudies.map((cs) => (
                <div
                  key={cs._id}
                  className="flex flex-col justify-between h-full space-y-6"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* 10. Clients (Page 12) */}
      <section id="clients" className="relative min-h-[450px] flex items-stretch overflow-hidden bg-white">
        {/* SVG Vector Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block">
          <svg viewBox="0 0 1024 287" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="clients-bg-grad-left" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e4663" />
                <stop offset="100%" stopColor="#dfe6eb" />
              </linearGradient>
              <linearGradient id="clients-bg-grad-right" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#295571" />
                <stop offset="100%" stopColor="#f8f9fa" />
              </linearGradient>
            </defs>

            {/* Right Side Background Gradient */}
            <rect y="-10" width="1024" height="310" fill="url(#clients-bg-grad-right)" />

            {/* Left Side Background Gradient (fills up to divider left edge) */}
            <path
              d="M 0,-15 L 315,-15 C 375,-15 422,42 448,125 L 508,300 L 0,300 Z"
              fill="url(#clients-bg-grad-left)"
            />

            {/* Exact White Solid Sweeping Curved Divider from Mockup */}
            <path
              d="M 315,-15 C 375,-15 422,42 448,125 L 508,300 L 543,300 L 483,125 C 457,42 410,-15 355,-15 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[45%_55%]">
          {/* Left Column (Details - 45%) */}
          <div className="flex flex-col justify-center py-8 px-6 sm:p-10 lg:py-16 lg:pl-0 lg:pr-10 xl:pr-14 bg-gradient-to-b from-[#194866] to-[#e2e8f0] lg:bg-none text-white">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.05] text-white">
              OUR
              <span className="block mt-1">CLIENTS</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm lg:text-[15px] font-avenir leading-relaxed text-left my-6 text-white lg:text-[#1a384c]">
              <p className="font-avenir font-normal">
                {cms.settings.clientsDescription1}
              </p>
              <p className="font-avenir font-normal">
                {cms.settings.clientsDescription2}
              </p>
            </div>
          </div>

          {/* Right Column (Logos - 55%) */}
          <div className="flex flex-col justify-center bg-[#e2e8f0] lg:bg-transparent py-10 px-6 sm:px-10 lg:py-14 lg:pl-10 xl:pl-14 lg:pr-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-8 sm:gap-y-10 items-center justify-items-center w-full">
              {cms.settings.clientLogos.map((client, idx) => (
                <div key={idx} className="flex items-center justify-center">
                  {client.imageUrl ? (
                    <Image
                      src={client.imageUrl}
                      alt={client.name}
                      width={500}
                      height={180}
                      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${client.className || "h-7 sm:h-8"}`}
                    />
                  ) : (
                    <span className="text-xs font-montserrat font-bold text-sfa-navy uppercase">
                      {client.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Partners (Page 13) */}
      <section id="network" className="relative min-h-[450px] flex items-stretch overflow-hidden bg-white">
        {/* SVG Vector Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block">
          <svg viewBox="0 0 1024 287" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              {/* Left side depth gradient: transitions from silvery-blue to deep dark blue immediately adjacent to the divider */}
              <linearGradient id="partners-left-depth" x1="0" y1="0" x2="0.75" y2="0.65">
                <stop offset="0%" stopColor="#dce4ea" />
                <stop offset="35%" stopColor="#9eb6c7" />
                <stop offset="65%" stopColor="#3b6b8c" />
                <stop offset="85%" stopColor="#194866" />
                <stop offset="100%" stopColor="#0b2438" />
              </linearGradient>

            {/* Central Divider Gradient: flows smoothly across the entire sweeping divider shape */}
            <linearGradient id="partners-divider-grad" x1="0.65" y1="0" x2="0.35" y2="1">
              <stop offset="0%" stopColor="#486d85" />
              <stop offset="25%" stopColor="#3a627c" />
              <stop offset="65%" stopColor="#224f6c" />
              <stop offset="100%" stopColor="#194866" />
            </linearGradient>

            {/* Right side gradient: clean background for partner logos */}
            <linearGradient id="partners-right-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a5773" />
              <stop offset="100%" stopColor="#f8f9fa" />
            </linearGradient>
          </defs>

          {/* Right Side Background Gradient */}
          <rect y="-10" width="1024" height="310" fill="url(#partners-right-grad)" />

          {/* Left Side with Depth Gradient (bounded strictly by divider left edge) */}
          <path
            d="M 0,-15 L 652,-15 C 597,-15 553,35 537,70 L 429,310 L 0,310 Z"
            fill="url(#partners-left-depth)"
          />

          {/* Exact Central Diagonal Divider: sweeping curve at top, perfectly straight and uniform in width downward */}
          <path
            d="M 690,-15 C 635,-15 591,35 575,70 L 467,310 L 429,310 L 537,70 C 553,35 597,-15 652,-15 Z"
            fill="url(#partners-divider-grad)"
          />
        </svg>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[45%_55%]">
        {/* Left Column (Details - 45%) */}
        <div className="flex flex-col justify-center py-8 px-6 sm:p-10 lg:py-16 lg:pl-0 lg:pr-10 xl:pr-14 bg-gradient-to-b from-[#e2e8f0] to-[#194866] lg:bg-none text-white">
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.05] text-[#133852]">
            OUR
            <span className="block mt-1">PARTNERS</span>
          </h2>

          <span className="block text-xs lg:text-sm font-montserrat font-semibold text-white/80 uppercase tracking-widest mt-6">
            {cms.settings.partnersSubtitle}
          </span>

          <p className="text-xs sm:text-sm lg:text-base font-avenir leading-relaxed text-left text-white/95 my-4">
            {cms.settings.partnersDescription}
          </p>
        </div>

        {/* Right Column (Logos - 55%, strictly contained to the right of divider boundary) */}
        <div className="flex flex-col justify-center bg-[#194866] lg:bg-transparent py-10 px-6 sm:px-10 lg:py-14 lg:pl-24 xl:pl-32 lg:pr-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 sm:gap-x-10 lg:gap-x-12 gap-y-6 sm:gap-y-8 items-center justify-items-center w-full max-w-[620px]">
            {cms.settings.partnerLogos.map((partner, idx) => (
              <div key={idx} className="flex items-center justify-center">
                {partner.imageUrl ? (
                  <Image
                    src={partner.imageUrl}
                    alt={partner.name}
                    width={500}
                    height={180}
                    className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${partner.className || "h-7 sm:h-8"}`}
                  />
                ) : partner.name === "Knight Frank" ? (
                  <KnightFrankLogo />
                ) : partner.name === "Makeelu Chambers" ? (
                  <MakeeluChambersLogo />
                ) : (
                  <span className="text-xs font-montserrat font-bold text-sfa-navy uppercase">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* 11. Leadership Team Header (Page 14) */}
      <section id="team" className="relative min-h-[450px] flex items-stretch overflow-hidden bg-white">
        {/* Background Building Image */}
        <div className="absolute top-0 bottom-0 right-0 left-0 lg:left-1/3 z-0 pointer-events-none select-none">
          <Image
            src={cms.settings.teamHeaderImageUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600"}
            alt="Office building architecture"
            fill
            className="object-cover object-center opacity-40 lg:opacity-100"
          />
        </div>

        {/* SVG Vector Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block z-10">
          <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="team-header-left-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#194866" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>

            {/* Left Side Gradient Background */}
            <path d="M 0,-20 L 530,-20 C 590,-20 620,30 640,80 L 730,420 L 0,420 Z" fill="url(#team-header-left-grad)" />

            {/* White Curved Divider Line */}
            <path d="M 530,-20 C 590,-20 620,30 640,80 L 730,420" fill="none" stroke="#ffffff" strokeWidth="16" />
          </svg>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (Details) */}
          <div className="lg:col-span-6 flex flex-col justify-center py-12 px-6 sm:px-8 lg:py-16 lg:pl-0 lg:pr-12 bg-gradient-to-b from-[#194866] to-[#e2e8f0] lg:bg-none text-white">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.05] text-white">
              OUR
              <span className="block mt-1">LEADERSHIP</span>
              <span className="block mt-1">TEAM</span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-[15px] font-avenir leading-relaxed text-justify text-white lg:text-sfa-navy my-6 max-w-xl uppercase font-semibold">
              {cms.settings.teamDescription}
            </p>
          </div>

          {/* Right Column (Spacing for desktop layout building image to show through) */}
          <div className="lg:col-span-6 lg:block hidden"></div>
        </div>
      </section>

      {/* 12. Leadership Team Profiles (Page 15) */}
      <section className="relative overflow-hidden bg-gradient-to-t from-[#194866] to-[#e2e8f0]">
        {/* Shared SVG ClipPath Definitions for the Curved-Top Parallelogram Bays & White Diagonal Ribbons */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id="team-bay-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0.305,0 C 0.252,0.02 0.222,0.09 0.202,0.22 L 0.048,1 L 0.741,1 L 0.895,0.22 C 0.915,0.09 0.945,0.02 0.998,0 Z" />
            </clipPath>
            <clipPath id="team-ribbon-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0.254,0 C 0.201,0.02 0.171,0.09 0.151,0.22 L -0.003,1 L 0.051,1 L 0.205,0.22 C 0.225,0.09 0.255,0.02 0.308,0 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center overflow-visible">
          {/* Mobile View: Clean centered vertical stack */}
          <div className="sm:hidden w-full max-w-[280px] mx-auto flex flex-col gap-4">
            {cms.teamMembers.map((director, idx) => (
              <div
                key={director._id || idx}
                className="relative h-[280px] w-full overflow-hidden rounded-lg shadow-md bg-gradient-to-br from-[#b8c7d4] via-[#4e7088] to-[#163a54]"
              >
                <div className="absolute top-0 bottom-[24%] left-0 right-0">
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[24%] bg-[#123c56] flex flex-col items-center justify-center text-center px-2">
                  <h3 className="text-white font-avenir font-medium text-xs tracking-normal leading-tight">
                    {director.name}
                  </h3>
                  <p className="text-white/80 font-avenir font-normal text-[8px] uppercase tracking-wider mt-0.5 leading-tight">
                    {director.credentials}
                  </p>
                  <p className="text-[#00aeef] font-avenir font-medium text-[10px] tracking-normal mt-0.5 leading-tight">
                    {director.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet & Desktop View: Seamless interlocking parallelogram ribbon, dynamically centered for any card count */}
          <div
            className="hidden sm:flex justify-start mx-auto overflow-visible"
            style={{
              width: `min(100%, calc((${Math.max(1, cms.teamMembers.length)} + 0.35) * 215px))`,
            }}
          >
            <div
              className="w-full grid gap-0 overflow-visible"
              style={{
                width: `calc(100% * ${Math.max(1, cms.teamMembers.length)} / (${Math.max(1, cms.teamMembers.length)} + 0.35))`,
                gridTemplateColumns: `repeat(${Math.max(1, cms.teamMembers.length)}, minmax(0, 1fr))`,
              }}
            >
              {cms.teamMembers.map((director, idx) => (
                <div
                  key={director._id || idx}
                  className="relative h-[290px] xl:h-[310px] w-full overflow-visible"
                >
                  {/* Solid White Curved-Top Diagonal Divider Ribbon (Left Side) */}
                  <div
                    className="absolute inset-y-0 left-0 w-[135%] bg-white pointer-events-none z-30 [clip-path:url(#team-ribbon-clip)]"
                  />

                  {/* Solid White Curved-Top Diagonal Divider Ribbon (Right Side of Last Card) */}
                  {idx === cms.teamMembers.length - 1 && (
                    <div
                      className="absolute inset-y-0 left-full w-[135%] bg-white pointer-events-none z-30 [clip-path:url(#team-ribbon-clip)]"
                    />
                  )}

                  {/* Curved-Top Parallelogram Card Bay (extends 135% width to interlock with next card's diagonal) */}
                  <div
                    className="absolute inset-y-0 left-0 w-[135%] h-full bg-gradient-to-br from-[#b8c7d4] via-[#4e7088] to-[#163a54] z-10 [clip-path:url(#team-bay-clip)]"
                  >
                    {/* Portrait Photo in Upper 78% of Bay */}
                    <div className="absolute top-0 bottom-[22%] left-[4.8%] w-[95.2%]">
                      <Image
                        src={director.image}
                        alt={director.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Parallelogram Bottom Text Banner */}
                    <div className="absolute bottom-0 left-0 right-0 h-[22%] bg-[#123c56] z-20 flex items-center">
                      <div className="absolute left-[9.5%] w-[64%] flex flex-col items-center justify-center text-center px-1">
                        <h3 className="text-white font-avenir font-medium text-xs xl:text-[13px] tracking-normal leading-tight w-full">
                          {director.name}
                        </h3>
                        <p className="text-white/80 font-avenir font-normal text-[7.5px] xl:text-[8px] uppercase tracking-wider mt-0.5 leading-tight w-full">
                          {director.credentials}
                        </p>
                        <p className="text-[#00aeef] font-avenir font-medium text-[9.5px] xl:text-[10.5px] tracking-normal mt-0.5 leading-tight w-full">
                          {director.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. Get In Touch Banner (Page 15) */}
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

      {/* 13. Footer & Contact Details (Page 16) */}
      {/* 13. Footer & Contact Details (Page 16) */}
      <footer className="bg-primary text-white pt-16 pb-8 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 items-start mb-12">
          {/* Column 1: SFA identity & Reg info */}
          <div className="lg:col-span-4 space-y-6 lg:pr-8">
            <h3 className="text-xl sm:text-2xl font-montserrat font-medium tracking-[0.15em] uppercase leading-tight text-white">
              SUNIL FERNANDO &
              <span className="block mt-1">ASSOCIATES</span>
            </h3>

            <p className="text-sm font-avenir tracking-wide text-white uppercase">
              Real Estate Advisory Since 1999
            </p>

            <p className="text-sm font-avenir leading-relaxed text-[#0c2340] text-justify font-medium">
              Sri Lanka&apos;s largest independent real estate consultancy delivering internationally accepted valuation and advisory services across Sri Lanka and the Maldives.
            </p>

            <div className="flex gap-2 pt-2">
              <span className="border border-white/40 px-3 py-1 text-[10px] font-barlow font-normal tracking-widest text-white">RICS</span>
              <span className="border border-white/40 px-3 py-1 text-[10px] font-barlow font-normal tracking-widest text-white">IVSL</span>
            </div>
          </div>

          {/* Column 2: Services links */}
          <div className="lg:col-span-2 lg:border-l lg:border-white/20 lg:pl-6 space-y-4">
            <h4 className="text-base font-montserrat font-medium text-white">Services</h4>
            <ul className="space-y-2 text-sm font-avenir font-medium text-[#0c2340]">
              <li>
                <button onClick={() => openService(0)} className="hover:text-white transition cursor-pointer">
                  Valuation & Advisory
                </button>
              </li>
              <li>
                <button onClick={() => openService(1)} className="hover:text-white transition cursor-pointer">
                  Occupier Services
                </button>
              </li>
              <li>
                <button onClick={() => openService(2)} className="hover:text-white transition cursor-pointer">
                  Capital Markets
                </button>
              </li>
              <li>
                <button onClick={() => openService(3)} className="hover:text-white transition cursor-pointer">
                  Research & Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Sectors */}
          <div className="lg:col-span-2 lg:border-l lg:border-white/20 lg:pl-6 space-y-4">
            <h4 className="text-base font-montserrat font-medium text-white">Sectors</h4>
            <ul className="space-y-2 text-sm font-avenir font-medium text-[#0c2340]">
              <li>Tourism & Hospitality</li>
              <li>Commercial & Office</li>
              <li>Residential</li>
              <li>Agricultural</li>
              <li>Industrial</li>
            </ul>
          </div>

          {/* Column 4: Markets */}
          <div className="lg:col-span-2 lg:border-l lg:border-white/20 lg:pl-6 space-y-4">
            <h4 className="text-base font-montserrat font-medium text-white">Markets</h4>
            <ul className="space-y-2 text-sm font-avenir font-medium text-[#0c2340]">
              <li>Sri Lanka</li>
              <li>Maldives</li>
              <li>Properties</li>
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div className="lg:col-span-2 lg:border-l lg:border-white/20 lg:pl-6 space-y-4 text-sm">
            <h4 className="text-base font-montserrat font-medium text-white">Contact</h4>
            <div className="space-y-4 font-avenir font-medium text-[#0c2340] text-left">
              <div>
                <p className="leading-relaxed">No 505, Nawala Road,</p>
                <p className="leading-relaxed">Rajagiriya</p>
              </div>
              <div>
                <p className="leading-relaxed">Level 24, One Galle Face Tower,</p>
                <p className="leading-relaxed">Colombo 02</p>
              </div>
              <div>
                <p className="leading-relaxed">Tel: 011 2887829</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-avenir font-bold tracking-widest text-[#0c2340] uppercase">
          <span>
            © 2026 SUNIL FERNANDO & ASSOCIATES (PVT) LTD. ALL RIGHTS RESERVED.
          </span>
          <span className="mt-2 sm:mt-0">
            REGULATED BY RICS & IVSL
          </span>
        </div>
      </footer>

      {/* Interactive Form Modals */}
      <RequestValuationModal isOpen={valuationOpen} onClose={() => setValuationOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
