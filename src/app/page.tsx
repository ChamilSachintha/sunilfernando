"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SfaLogo, HsbcLogo, StandardCharteredLogo, DeloitteLogo, CbiLogo, CinnamonLogo, LoadstarLogo, ShangriLaLogo, HiltonLogo, KpmgLogo, KnightFrankLogo, KrestonLogo, BdoLogo, MakeeluChambersLogo, BakerTillyLogo, WarrenVicksLogo, DesignAdvocacyLogo, AcquestLogo, NdbLogo, CoenergiLogo, SudathPereraLogo } from "@/components/Logos";
import { RequestValuationModal, ContactModal } from "@/components/Forms";

export default function Home() {
  // Navigation & Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Carousel State
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600",
      alt: "Corporate modern glass building",
    },
    {
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600",
      alt: "Modern facade architecture with orange lighting grid",
    },
    {
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600",
      alt: "White modern geometric structure angles",
    },
    {
      image: "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?q=80&w=1600",
      alt: "Curved metal abstract architecture details",
    },
  ];

  // Forms / Modals state
  const [valuationOpen, setValuationOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

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
      const sections = ["home", "offer", "network", "team", "newsroom", "contact"];
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
            <SfaLogo className="h-16 sm:h-20 py-0 block object-contain" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-sans text-sm font-semibold uppercase tracking-widest text-sfa-navy/80">
            <button
              onClick={() => scrollTo("home")}
              className={`hover:text-sfa-blue transition ${activeSection === "home" ? "text-sfa-blue font-semibold" : ""}`}
            >
              HOME
            </button>
            <button
              onClick={() => scrollTo("offer")}
              className={`hover:text-sfa-blue transition ${activeSection === "offer" ? "text-sfa-blue font-semibold" : ""}`}
            >
              WHAT WE OFFER
            </button>
            <button
              onClick={() => scrollTo("network")}
              className={`hover:text-sfa-blue transition ${activeSection === "network" ? "text-sfa-blue font-semibold" : ""}`}
            >
              OUR NETWORK
            </button>
            <button
              onClick={() => scrollTo("team")}
              className={`hover:text-sfa-blue transition ${activeSection === "team" ? "text-sfa-blue font-semibold" : ""}`}
            >
              OUR TEAM
            </button>
            <button
              onClick={() => scrollTo("newsroom")}
              className={`hover:text-sfa-blue transition ${activeSection === "newsroom" ? "text-sfa-blue font-semibold" : ""}`}
            >
              NEWSROOM
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className={`hover:text-sfa-blue transition ${activeSection === "contact" ? "text-sfa-blue font-semibold" : ""}`}
            >
              REACH US
            </button>
          </nav>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-sfa-navy hover:text-sfa-blue transition focus:outline-none"
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
                <button onClick={() => scrollTo("home")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  HOME
                </button>
                <button onClick={() => scrollTo("offer")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  WHAT WE OFFER
                </button>
                <button onClick={() => scrollTo("network")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  OUR NETWORK
                </button>
                <button onClick={() => scrollTo("team")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  OUR TEAM
                </button>
                <button onClick={() => scrollTo("newsroom")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  NEWSROOM
                </button>
                <button onClick={() => scrollTo("contact")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  REACH US
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setValuationOpen(true);
                  }}
                  className="w-full text-center py-3 bg-sfa-navy text-white hover:bg-sfa-blue transition font-bold"
                >
                  REQUEST A VALUATION
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section & Carousel (Page 1-4) */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center pt-16 sm:pt-20 overflow-hidden bg-black">
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
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Diagonal Light Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sfa-navy/85 via-sfa-navy/50 to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 text-white h-full flex flex-col justify-center">
          <div className="max-w-3xl self-end text-right">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-montserrat font-medium tracking-widest leading-none text-white">
                TRUSTED
              </h1>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-montserrat font-medium tracking-widest leading-none text-white mt-1">
                VALUATIONS
              </h1>
              <div className="mt-4 space-y-2">
                <span className="block text-xl sm:text-2xl font-montserrat font-light tracking-widest text-white uppercase">
                  INFORMED DECISIONS
                </span>
                 <span className="block text-lg sm:text-xl font-avenir font-light tracking-widest text-white/90">
                  SINCE 1999
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ y: 35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-sm font-avenir tracking-wide leading-relaxed font-normal text-white mt-8 max-w-xl ml-auto"
            >
              SUNIL FERNANDO & ASSOCIATES DELIVERS INTERNATIONALLY ACCEPTED VALUATION AND REAL ESTATE ADVISORY SERVICES ACROSS SRI LANKA AND THE MALDIVES, BACKED BY 25 YEARS OF EXPERTISE, RICS COMPLIANCE, AND A GLOBAL PARTNER NETWORK.
            </motion.p>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex justify-end gap-4"
            >
              <button
                onClick={() => setValuationOpen(true)}
                className="px-12 py-3.5 bg-[#1e4e72] hover:bg-[#153a53] text-white text-sm sm:text-base font-avenir font-normal tracking-widest uppercase rounded-xl transition duration-300 shadow-md"
              >
                Request a Valuation
              </button>
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`h-2 transition-all rounded-full ${i === heroIndex ? "w-8 bg-sfa-cyan" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Banner Bar "Explore Services" */}
        <div
          onClick={() => scrollTo("offer")}
          className="absolute bottom-0 left-0 right-0 z-20 bg-secondary border-t border-white/10 cursor-pointer py-5 text-center text-white tracking-[0.4em] text-2xl sm:text-3xl font-avenir font-light uppercase transition duration-300"
        >
          EXPLORE OUR SERVICES
        </div>
      </section>

      {/* 3. Stats & Columns (Page 5) */}
      <section id="offer" className="pt-0 pb-24 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header tabs row */}
          <div className="grid grid-cols-2 md:grid-cols-4 text-center mb-16 border-b border-sfa-grey/10 md:border-b-0">
            {["VALUATION ADVISORY", "OCCUPIER SERVICES", "CAPITAL MARKETS", "RESEARCH SERVICES"].map((tab, idx) => (
              <div
                key={idx}
                className="py-4 font-avenir text-sm sm:text-base font-medium tracking-[0.15em] border-sfa-grey/10 cursor-pointer text-primary border-r-[3px] border-b-[3px] odd:border-r-[3px] even:border-r-0 md:even:border-r-[3px] md:last:border-r-0 md:border-b-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0"
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Grid Stats Layout with Ampersand in center */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-24 md:gap-y-32 items-center md:py-16">
            {/* Center ampersand and dividers background logo */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              {/* Horizontal dividers */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center gap-6 px-4 md:px-8">
                <div className="flex-1 h-[3px] bg-sfa-grey/10 hidden md:block" />
                <div className="w-[100px] sm:w-[170px] shrink-0 h-[3px] opacity-0" />
                <div className="flex-1 h-[3px] bg-sfa-grey/10 hidden md:block" />
              </div>
              
              {/* Vertical dividers & ampersand */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-0 py-0 h-full">
                <div className="w-[3px] flex-1 bg-sfa-grey/10 hidden md:block mb-[-12px] sm:mb-[-22px]" />
                <span className="font-serif text-[150px] sm:text-[250px] font-bold text-sfa-grey/10 leading-none">
                  &
                </span>
                <div className="w-[3px] flex-1 bg-sfa-grey/10 hidden md:block mt-[-12px] sm:mt-[-22px]" />
              </div>
            </div>

            {/* Stat 1 */}
            <div className="text-center md:text-right flex flex-col md:items-end justify-center z-10 md:pr-24 lg:pr-28">
              <span className="text-5xl sm:text-7xl font-montserrat font-black tracking-tight text-sfa-blue">25+</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/60 uppercase mt-2">Years of Advisory</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/80 uppercase">Excellence</span>
            </div>

            {/* Stat 2 */}
            <div className="text-center md:text-left flex flex-col md:items-start justify-center z-10 md:pl-24 lg:pl-28">
              <span className="text-5xl sm:text-7xl font-montserrat font-black tracking-tight text-sfa-navy">9</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/60 uppercase mt-2">Asset Classes</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/80 uppercase">Covered</span>
            </div>

            {/* Stat 3 */}
            <div className="text-center md:text-right flex flex-col md:items-end justify-center z-10 md:pr-24 lg:pr-28">
              <span className="text-5xl sm:text-7xl font-montserrat font-black tracking-tight text-sfa-navy">3</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/60 uppercase mt-2">Countries</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/80 uppercase">Sri Lanka, Maldives & UAE</span>
            </div>

            {/* Stat 4 */}
            <div className="text-center md:text-left flex flex-col md:items-start justify-center z-10 md:pl-24 lg:pl-28">
              <span className="text-5xl sm:text-7xl font-montserrat font-black tracking-tight text-sfa-blue">RICS</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/60 uppercase mt-2">& IVSL</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/80 uppercase">Compliant</span>
            </div>
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
            <image href="/what-we-do-a.png" x="366" y="50" width="313" height="350" preserveAspectRatio="none" />

            {/* Continuous Top Dark Blue Tab (#194866) and Diagonal Divider with Drop Shadow */}
            <path
              d="M 0,0 L 508,0 C 525,0 535,8 539,21 L 684,400 L 672,400 L 525,50 Q 515,50 493,50 L 0,50 Z"
              fill="#194866"
              filter="url(#divider-shadow)"
            />
          </svg>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (WHAT WE DO + End-to-End text) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white lg:bg-transparent">
            {/* Header Banner Text */}
            <div className="h-[51px] sm:h-[54px] flex items-center pl-8 sm:pl-12 lg:pl-16 bg-secondary lg:bg-transparent">
              <span className="text-xs sm:text-sm font-avenir font-semibold tracking-[0.4em] text-white uppercase">
                WHAT WE DO
              </span>
            </div>
            
            {/* Main Left Content */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:pl-16 lg:pr-8 py-10 lg:py-12">
              <div className="w-fit flex flex-col items-center text-center">
                <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-normal tracking-tight uppercase leading-[1.08] text-secondary">
                  END-TO-END
                  <span className="block mt-1">REAL ESTATE</span>
                  <span className="block mt-1">ADVISORY</span>
                </h2>
                <p className="text-base sm:text-lg font-avenir font-semibold tracking-[0.18em] text-[#2885bf] mt-6 uppercase text-center">
                  BUILT FOR INSTITUTIONS
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (From Complex Portfolio Valuations...) */}
          <div className="lg:col-span-5 flex flex-col justify-center px-8 sm:px-12 lg:pl-32 xl:pl-40 lg:pr-8 py-16 lg:py-24 text-white bg-primary lg:bg-transparent">
            <div className="font-avenir font-normal text-xs sm:text-sm lg:text-[13px] uppercase tracking-[0.18em] leading-[2.1] text-white lg:max-w-[400px]">
              <span className="block">FROM COMPLEX PORTFOLIO</span>
              <span className="block">VALUATIONS TO STRATEGIC</span>
              <span className="block">OCCUPIER DECISIONS, EVERY</span>
              <span className="block">SERVICE AT SFA IS DELIVERED</span>
              <span className="block">TO INTERNATIONAL STANDARDS</span>
              <span className="block">ACCEPTED BY BANKS, AUDIT</span>
              <span className="block">FIRMS, AND LAW FIRMS ACROSS</span>
              <span className="block">THE GLOBE.</span>
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
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (INSIGHTS Header Details) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-12 lg:py-16 lg:pl-24 lg:pr-12 bg-transparent">
            <span className="text-sm font-avenir font-semibold tracking-[0.2em] text-primary uppercase mb-6 lg:mb-0">
              INSIGHTS
            </span>
            
            <div className="flex-1 flex flex-col justify-center my-8 lg:my-0">
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-light tracking-tight uppercase leading-[1.05] text-sfa-navy">
                MARKET
              </h2>
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-light tracking-tight uppercase leading-[1.05] text-sfa-navy">
                INTELLIGENCE
              </h2>
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-light tracking-tight uppercase leading-[1.05] text-sfa-navy">
                FOR INFORMED
              </h2>
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-light tracking-tight uppercase leading-[1.05] text-sfa-navy">
                DECISIONS.
              </h2>
            </div>

            <div className="text-sm font-avenir font-semibold tracking-[0.15em] text-primary uppercase mt-6 lg:mt-0">
              LATEST REPORT • 2026
            </div>
          </div>

          {/* Right Column (Reports & Commentaries) */}
          <div className="lg:col-span-7 flex flex-col justify-center p-12 lg:py-16 lg:pl-32 lg:pr-24 bg-tertiary lg:bg-transparent text-sfa-navy">
            <div className="space-y-10 lg:space-y-12">
              {/* Report 1 */}
              <div className="space-y-3 pb-8 border-b border-sfa-navy/15 last:border-0 last:pb-0">
                <h3 className="text-lg lg:text-xl font-avenir font-bold tracking-wide uppercase leading-snug">
                  SRI LANKA REAL ESTATE MARKET OUTLOOK 2026
                </h3>
                <p className="text-xs lg:text-sm font-avenir font-normal text-sfa-navy/80 uppercase tracking-wider leading-relaxed">
                  AN INDEPENDENT ASSESSMENT OF SRI LANKA&apos;S COMMERCIAL, RESIDENTIAL, AND LEISURE PROPERTY MARKETS — WITH A FOCUS ON COLOMBO, PORT CITY, AND THE RECOVERING TOURISM CORRIDOR.
                </p>
                <button
                  onClick={() => alert("Downloading Report: Sri Lanka Real Estate Market Outlook 2026 (Mock File)")}
                  className="inline-flex items-center gap-2 text-xs font-avenir font-black tracking-widest uppercase hover:underline cursor-pointer"
                >
                  <span>DOWNLOAD REPORT &rarr;</span>
                </button>
              </div>

              {/* Report 2 */}
              <div className="space-y-2 pb-8 border-b border-sfa-navy/15 last:border-0 last:pb-0">
                <span className="text-[10px] font-montserrat font-bold text-secondary uppercase tracking-widest">
                  MARKET COMMENTARY
                </span>
                <h3 className="text-base lg:text-lg font-avenir font-bold tracking-wide uppercase leading-snug">
                  PORT CITY COLOMBO: WHAT THE FIRST WAVE OF COMPLETIONS MEANS FOR COMMERCIAL VALUES
                </h3>
                <span className="block text-xs font-avenir font-normal text-sfa-navy/70 uppercase tracking-wider">
                  APRIL 2026
                </span>
              </div>

              {/* Report 3 */}
              <div className="space-y-2">
                <span className="text-[10px] font-montserrat font-bold text-secondary uppercase tracking-widest">
                  MALDIVES
                </span>
                <h3 className="text-base lg:text-lg font-avenir font-bold tracking-wide uppercase leading-snug">
                  RESORT ASSET VALUATIONS IN THE MALDIVES: KEY METHODOLOGIES AND LENDER REQUIREMENTS
                </h3>
                <span className="block text-xs font-avenir font-normal text-sfa-navy/70 uppercase tracking-wider">
                  MARCH 2026
                </span>
              </div>
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
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-light tracking-tight uppercase leading-[1.1] text-white">
                WHAT WE&apos;VE DELIVERED.
                <span className="block mt-2">HOW IT HELPED.</span>
              </h2>
            </div>

            {/* Horizontal line stops at 5/6 width (middle of column 3) */}
            <div className="h-[2px] w-5/6 bg-white/20 mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {/* Column 1 */}
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] font-montserrat font-bold tracking-widest text-[#194866] uppercase block">
                    FINANCIAL INSTITUTION · PORTFOLIO VALUATION
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-montserrat font-light tracking-tight text-sfa-navy uppercase leading-tight">
                    LARGE-SCALE
                    <span className="block">BANK COLLATERAL</span>
                    <span className="block">PORTFOLIO</span>
                  </h3>
                  <p className="text-xs lg:text-sm font-avenir font-normal text-sfa-navy/80 tracking-wider leading-relaxed text-justify uppercase">
                    A LEADING SRI LANKAN COMMERCIAL BANK REQUIRED INDEPENDENT RICS-COMPLIANT VALUATIONS ACROSS A MIXED COMMERCIAL AND RESIDENTIAL PORTFOLIO FOR INTERNAL RISK ASSESSMENT AND REGULATORY REPORTING.
                  </p>
                </div>
                <div className="pt-4 border-t border-sfa-navy/10 lg:border-t-0 lg:pt-0">
                  <span className="text-[10px] font-avenir font-black italic tracking-wide text-sfa-navy/90 uppercase block leading-relaxed">
                    47 ASSETS VALUED · 30-DAY DELIVERY · REPORTS ACCEPTED BY INTERNATIONAL AUDIT PARTNER
                  </span>
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] font-montserrat font-bold tracking-widest text-[#194866] uppercase block">
                    HOSPITALITY · MALDIVES · CROSS-BORDER FINANCING
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-montserrat font-light tracking-tight text-sfa-navy uppercase leading-tight">
                    MALDIVES RESORT
                    <span className="block">ISLAND REFINANCING</span>
                  </h3>
                  <p className="text-xs lg:text-sm font-avenir font-normal text-sfa-navy/80 tracking-wider leading-relaxed text-justify uppercase">
                    AN INTERNATIONAL HOSPITALITY GROUP SOUGHT INDEPENDENT VALUATION OF A MALDIVES RESORT FOR REFINANCING WITH A EUROPEAN LENDER REQUIRING RICS-COMPLIANT METHODOLOGY AND INTERNATIONAL HOTEL VALUATION STANDARDS.
                  </p>
                </div>
                <div className="pt-4 border-t border-sfa-navy/10 lg:border-t-0 lg:pt-0">
                  <span className="text-[10px] font-avenir font-black italic tracking-wide text-sfa-navy/90 uppercase block leading-relaxed">
                    RICS HOTEL VALUATION METHODOLOGY · ACCEPTED BY EUROPEAN FINANCIAL INSTITUTION
                  </span>
                </div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] font-montserrat font-bold tracking-widest text-[#194866] uppercase block">
                    AGRICULTURAL · ESTATE SETTLEMENT · LEGAL
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-montserrat font-light tracking-tight text-sfa-navy uppercase leading-tight">
                    HILL COUNTRY TEA
                    <span className="block">ESTATE VALUATION</span>
                  </h3>
                  <p className="text-xs lg:text-sm font-avenir font-normal text-sfa-navy/80 tracking-wider leading-relaxed text-justify uppercase">
                    A FAMILY REQUIRED INDEPENDENT VALUATION OF A 250-ACRE TEA ESTATE IN SRI LANKA&apos;S HILL COUNTRY FOR ESTATE SETTLEMENT AND INHERITANCE PROCEEDINGS, INCORPORATING LAND, CROP VALUE, AND INFRASTRUCTURE.
                  </p>
                </div>
                <div className="pt-4 border-t border-sfa-navy/10 lg:border-t-0 lg:pt-0">
                  <span className="text-[10px] font-avenir font-black italic tracking-wide text-sfa-navy/90 uppercase block leading-relaxed">
                    ACCEPTED IN FORMAL LEGAL PROCEEDINGS · EXPERT WITNESS SUPPORT PROVIDED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Valuations Section (Page 9) */}
      <section className="relative min-h-[450px] flex items-stretch overflow-hidden bg-white">
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
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 max-w-[1400px] mx-auto">
          {/* Left Column (Details) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-12 lg:py-16 lg:pl-16 lg:pr-24 bg-gradient-to-b from-[#e2e8f0] to-[#194866] lg:bg-none text-white">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-light tracking-tight uppercase leading-[1.05] text-sfa-navy mb-6 lg:mb-0">
              VALUATIONS
            </h2>

            <div className="space-y-6 my-8 lg:my-0 lg:max-w-xl">
              <p className="text-sm lg:text-base font-avenir leading-relaxed tracking-wider text-justify text-white/95">
                Comprehensive valuation across commercial, residential, agricultural, leisure, industrial, retail, warehousing, plant & machinery, and vessels conducted in strict conformity with RICS and IVSL standards.
              </p>
              <p className="text-sm lg:text-base font-avenir leading-relaxed tracking-wider text-justify text-white/95">
                We serve financial institutions, private equity funds, property companies, and individuals — delivering reports that stand up to international scrutiny.
              </p>
            </div>

            <button
              onClick={() => setValuationOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-avenir font-black tracking-widest text-[#00bdf1] uppercase hover:underline cursor-pointer w-fit mt-6 lg:mt-0"
            >
              <span>EXPLORE VALUATION SERVICES &rarr;</span>
            </button>
          </div>

          {/* Right Column (Categories) */}
          <div className="lg:col-span-5 flex flex-col justify-center bg-tertiary lg:bg-transparent px-8 py-10 lg:py-12 lg:pl-20 lg:pr-16">
            <div className="w-full max-w-[320px] lg:max-w-[360px] mx-auto flex flex-col h-full justify-between divide-y divide-white/30 border-y border-white/30">
              {[
                "Commercial",
                "Residential",
                "Agriculture",
                "Leisure",
                "Retail",
                "Industrial",
                "Warehousing",
                "Plant & Machinery",
                "Vessels",
              ].map((category, idx) => (
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

      {/* 8. Occupier Services (Page 10) */}
      <section className="relative min-h-[500px] flex items-stretch overflow-hidden bg-white">
        {/* Full-width building background image on desktop (clipped by overlay) */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600"
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
        <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left Text Detail */}
          <div className="lg:col-span-7 py-12 lg:py-16 lg:pr-24 flex flex-col justify-center space-y-6 bg-gradient-to-b from-[#194866] to-[#e2e8f0] lg:bg-none text-white">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-light tracking-tight uppercase leading-[1.05] text-white">
              OCCUPIER
              <span className="block mt-1">SERVICES</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm lg:text-base font-avenir leading-relaxed text-justify max-w-2xl">
              <p className="font-avenir font-semibold text-sfa-navy">
                Strategic advisory for organisations leasing, expanding, or relocating space aligned with your operational and financial goals.
              </p>
              <p className="text-sfa-navy/90">
                Whatever property you may need, our team will be able to provide you just the right assistance you need to move into optimum space.
              </p>
              <p className="text-sfa-navy/90">
                Through a wide range of consultancy and transactional services, we are able to understand the critical success factors for our clients’ benefit.
              </p>
              <p className="text-sfa-navy/90">
                Our dedicated team of experienced professionals with the right balance of local and international knowledge will match varying client requirements, leverage our relationship with occupiers and decision makers, empower clients to attain their desired goals by creating value, addressing trends and superseding the competition.
              </p>
            </div>

            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-avenir font-bold tracking-widest text-[#2684be] uppercase hover:underline cursor-pointer w-fit"
            >
              <span>LEARN MORE &rarr;</span>
            </button>
          </div>

          {/* Right Column Spacer / Mobile Image */}
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full">
            <div className="absolute inset-0 lg:hidden">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
                alt="High-rise modern workspace architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Capital Markets (Page 11) */}
      <section className="relative min-h-[450px] flex items-stretch overflow-hidden bg-white">
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
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 max-w-[1400px] mx-auto">
          {/* Left Column (Details) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-12 lg:py-16 lg:pl-16 lg:pr-12 bg-gradient-to-b from-[#e2e8f0] to-[#194866] lg:bg-none text-white">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-light tracking-tight uppercase leading-[1.05] text-sfa-navy mb-6 lg:mb-0">
              CAPITAL
              <span className="block mt-1">MARKETS</span>
            </h2>

            <p className="text-sm lg:text-base font-avenir leading-relaxed tracking-wider text-justify text-white/95 my-8 lg:my-0 lg:max-w-[320px] uppercase">
              Expert support for property acquisitions, disposals, and investment transactions in evolving market.
            </p>

            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-avenir font-black tracking-widest text-white uppercase hover:underline cursor-pointer w-fit mt-6 lg:mt-0"
            >
              <span>LEARN MORE &rarr;</span>
            </button>
          </div>

          {/* Right Column (Details) */}
          <div className="lg:col-span-7 flex flex-col justify-center bg-primary lg:bg-transparent px-8 py-10 lg:py-12 lg:pl-20 lg:pr-16 text-white space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base lg:text-lg font-montserrat font-bold tracking-wider text-white">
                WE FOCUS ON PROVIDING UNIQUE AND PERSONALIZED ADVICE TO
              </h3>
              <ul className="space-y-1.5 text-xs lg:text-sm font-avenir font-normal tracking-wide text-white/90 uppercase">
                <li>• INSTITUTIONAL FUNDS</li>
                <li>• PRIVATE EQUITY</li>
                <li>• STATE & PUBLIC SECTOR ENTITIES</li>
                <li>• PROPERTY COMPANIES & DEVELOPERS</li>
                <li>• CORPORATES</li>
                <li>• FAMILY OFFICES</li>
                <li>• PRIVATE INDIVIDUALS</li>
              </ul>
            </div>

            <p className="text-xs sm:text-sm font-avenir text-white/80 leading-relaxed text-justify tracking-wide">
              We focus on providing unique and personalized advice, adding value through a combination of unparalleled access to capital, financing expertise, real estate market intelligence and thought leadership. Our services are solidified with real estate expertise together with innovative capital solutions.
            </p>

            <div className="space-y-4">
              <h3 className="text-sm sm:text-base lg:text-lg font-montserrat font-bold tracking-wider text-white">
                OUR SERVICES EXTEND ACROSS A RANGE OF STRATEGIC TRANSACTIONS INCLUDING
              </h3>
              <ul className="space-y-1.5 text-xs lg:text-sm font-avenir font-semibold tracking-wide text-white/95 uppercase">
                <li>• DEBT ADVISORY • CAPITAL RAISING • JOINT VENTURES</li>
                <li>• M&A SOLUTIONS • SALES & LEASEBACKS • RESTRUCTURING</li>
              </ul>
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
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[45%_55%] max-w-[1440px] mx-auto">
          {/* Left Column (Details - 45%) */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:py-16 lg:pl-16 lg:pr-10 xl:pl-20 xl:pr-14 bg-gradient-to-b from-[#194866] to-[#e2e8f0] lg:bg-none text-white">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-light tracking-tight uppercase leading-[1.05] text-white">
              OUR
              <span className="block mt-1">CLIENTS</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm lg:text-[15px] font-avenir leading-relaxed text-left my-6 text-white lg:text-[#1a384c]">
              <p className="font-avenir font-normal">
                Our diverse client portfolio, spanning individuals to multinational corporations, is a testament to our success.
              </p>
              <p className="font-avenir font-normal">
                Each year, we complete thousands of valuation assignments across various sectors. With tailored methodologies and deep expertise, we consistently meet client needs and deliver exceptional value.
              </p>
            </div>
          </div>

          {/* Right Column (Logos - 55%) */}
          <div className="flex flex-col justify-center bg-[#e2e8f0] lg:bg-transparent px-6 sm:px-10 lg:py-14 lg:pl-10 lg:pr-12 xl:pl-14 xl:pr-20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-8 sm:gap-y-10 items-center justify-items-center w-full">
              <HsbcLogo />
              <StandardCharteredLogo />
              <DeloitteLogo />
              <CbiLogo />
              <CinnamonLogo />
              <LoadstarLogo />
              <ShangriLaLogo />
              <HiltonLogo />
            </div>
          </div>
        </div>
      </section>

      {/* 11. Partners (Page 13) */}
      <section id="network" className="relative min-h-[450px] flex items-stretch overflow-hidden bg-white">
        {/* SVG Vector Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none hidden lg:block">
          <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="partners-bg-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#194866" />
              </linearGradient>
            </defs>

            {/* Full Background Vertical Gradient */}
            <rect y="-20" width="1000" height="440" fill="url(#partners-bg-grad)" />

            {/* White Curved Divider Line */}
            <path d="M 709,-20 C 659,-20 620,30 600,80 L 445,420" fill="none" stroke="#ffffff" strokeWidth="16" />
          </svg>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 max-w-[1400px] mx-auto">
          {/* Left Column (Details) */}
          <div className="lg:col-span-6 flex flex-col justify-center p-12 lg:py-16 lg:pl-16 lg:pr-12 bg-gradient-to-b from-[#e2e8f0] to-[#194866] lg:bg-none text-white">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-light tracking-tight uppercase leading-[1.05] text-sfa-navy">
              OUR
              <span className="block mt-1">PARTNERS</span>
            </h2>

            <span className="block text-xs lg:text-sm font-montserrat font-semibold text-white/70 uppercase tracking-widest mt-6">
              A GLOBAL NETWORK. • A LOCAL ADVANTAGE.
            </span>

            <p className="text-xs sm:text-sm lg:text-base font-avenir leading-relaxed text-justify text-white/95 my-4 max-w-xl">
              Our partnerships extend local expertise through a network of world-class professional organisations — so every report meets the rigour international clients require.
            </p>

            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-avenir font-bold tracking-widest text-[#2684be] uppercase hover:underline cursor-pointer w-fit mt-2"
            >
              <span>LEARN MORE &rarr;</span>
            </button>
          </div>

          {/* Right Column (Logos) */}
          <div className="lg:col-span-6 flex flex-col justify-center bg-[#194866] lg:bg-transparent px-8 py-10 lg:py-12 lg:pl-20 lg:pr-16">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8 items-center justify-items-center">
              <KpmgLogo />
              <KnightFrankLogo />
              <KrestonLogo />
              <BdoLogo />
              <MakeeluChambersLogo />
              <BakerTillyLogo />
              <WarrenVicksLogo />
              <DesignAdvocacyLogo />
              <AcquestLogo />
              <NdbLogo />
              <CoenergiLogo />
              <SudathPereraLogo />
            </div>
          </div>
        </div>
      </section>

      {/* 11. Leadership Team Header (Page 14) */}
      <section id="team" className="relative min-h-[450px] flex items-stretch overflow-hidden bg-white">
        {/* Background Building Image */}
        <div className="absolute top-0 bottom-0 right-0 left-0 lg:left-1/3 z-0 pointer-events-none select-none">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
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
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 max-w-[1400px] mx-auto">
          {/* Left Column (Details) */}
          <div className="lg:col-span-6 flex flex-col justify-center p-12 lg:py-16 lg:pl-16 lg:pr-12 bg-gradient-to-b from-[#194866] to-[#e2e8f0] lg:bg-none text-white">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-montserrat font-light tracking-tight uppercase leading-[1.05] text-white">
              OUR
              <span className="block mt-1">LEADERSHIP</span>
              <span className="block mt-1">TEAM</span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-[15px] font-avenir leading-relaxed text-justify text-white lg:text-sfa-navy my-6 max-w-xl uppercase font-semibold">
              SFA EMPLOYS PROFESSIONALS WITH SPECIALIZED EXPERTISE IN VARIOUS REAL ESTATE SECTORS. BASED ON THE NATURE AND SCOPE OF EACH ASSIGNMENT, THE APPROPRIATE EXPERTS ARE INTEGRATED INTO THE LEADERSHIP TEAM.
            </p>
          </div>

          {/* Right Column (Spacing for desktop layout building image to show through) */}
          <div className="lg:col-span-6 lg:block hidden"></div>
        </div>
      </section>

      {/* 12. Leadership Team Profiles (Page 15) */}
      <section className="relative overflow-hidden bg-gradient-to-t from-[#194866] to-[#e2e8f0] py-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border-t lg:border-t-0 border-sfa-grey/10">
            {[
              {
                name: "Sunil Fernando",
                designation: "Founder/Chairman",
                credentials: "FIV(SL), FRICS",
                image: "/sunil-fernando.png",
              },
              {
                name: "Manju Fernando",
                designation: "Group Managing Director",
                credentials: "M.B.A.(Aus), MRICS",
                image: "/manju-fernando.png",
              },
              {
                name: "Dilshan Perera",
                designation: "Director Valuation & Advisory",
                credentials: "M.B.A.(Aus)",
                image: "/dilshan-perera.png",
              },
              {
                name: "Vicks Vickneswaran",
                designation: "Director UAE",
                credentials: "M.B.A.(UK), MRICS, FCMA, FCCA, FCIM",
                image: "/vicks-vickneswaran.png",
              },
              {
                name: "Nalin Seneviratne",
                designation: "Director / Advisor",
                credentials: "BSc.LM, FRICS",
                image: "/nalin-seneviratne.png",
              },
              {
                name: "Mohamed Hilmy",
                designation: "Director - Maldives",
                credentials: "L.B.M.(Mal), A.I.V",
                image: "/avatar-placeholder.svg",
              },
            ].map((director, idx) => (
              <div
                key={idx}
                className="relative group overflow-hidden h-[360px] w-full bg-transparent"
              >
                {/* SVG Divider & Clip Definition */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 hidden lg:block" viewBox="0 0 200 400" preserveAspectRatio="none">
                  <defs>
                    <clipPath id={`team-clip-${idx}`} clipPathUnits="objectBoundingBox">
                      <path d="M 0.3,-0.05 C 0.2,-0.05 0.1,0.075 0.075,0.2 L -0.125,1.05 L 1.25,1.05 L 1.25,-0.05 Z" />
                    </clipPath>
                  </defs>
                  {/* White Curved Divider Stroke */}
                  <path d="M 60,-20 C 40,-20 20,30 15,80 L -25,420" fill="none" stroke="#ffffff" strokeWidth="8" />
                </svg>

                {/* Clipped Photo */}
                <div 
                  className={`absolute inset-0 w-full h-full [clip-path:none] lg:[clip-path:url(#team-clip-${idx})]`}
                >
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Bottom Text Banner */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0c2340]/90 text-center py-4 px-2 z-30 min-h-[90px] flex flex-col justify-center">
                  <h3 className="text-white font-montserrat font-bold text-xs sm:text-[13px] tracking-wide uppercase leading-tight">
                    {director.name}
                  </h3>
                  <p className="text-[#00bdf1] font-avenir font-black text-[9px] uppercase tracking-wider mt-1">
                    {director.credentials}
                  </p>
                  <p className="text-white/80 font-avenir font-medium text-[9px] sm:text-[10px] uppercase tracking-wide mt-0.5 leading-tight">
                    {director.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Get In Touch Banner (Page 15) */}
      <section id="contact" className="bg-secondary text-white py-16 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-montserrat font-light tracking-[0.3em] uppercase leading-tight text-white">
            GET IN TOUCH
          </h2>
          <div className="text-sm sm:text-base lg:text-lg font-montserrat font-medium tracking-[0.15em] uppercase text-white/90">
            READY TO START?
          </div>
          <p className="text-xs sm:text-sm lg:text-[15px] font-avenir text-white/90 leading-relaxed max-w-2xl mx-auto">
            Whether for a financial transaction, an acquisition, IFRS reporting, or legal proceedings. Our valuation team is ready to help.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => setValuationOpen(true)}
              className="px-10 py-2.5 border border-[#2684be] text-white text-sm sm:text-[15px] font-avenir font-medium tracking-wide transition duration-300 bg-transparent hover:bg-white/10"
            >
              Request a Valuation
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="px-10 py-2.5 border border-[#2684be] text-white text-sm sm:text-[15px] font-avenir font-medium tracking-wide transition duration-300 bg-transparent hover:bg-white/10"
            >
              Contact Us
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
                <button onClick={() => scrollTo("offer")} className="hover:text-white transition cursor-pointer">
                  Valuation & Advisory
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("offer")} className="hover:text-white transition cursor-pointer">
                  Occupier Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("offer")} className="hover:text-white transition cursor-pointer">
                  Capital Markets
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("offer")} className="hover:text-white transition cursor-pointer">
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
