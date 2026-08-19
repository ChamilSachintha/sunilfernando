"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Download, Phone, Mail, MapPin, ChevronRight, Award } from "lucide-react";
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
      image: "https://images.unsplash.com/photo-1479839672679-a76a1868f72a?q=80&w=1600",
      alt: "Modern facade architecture with orange lighting grid",
    },
    {
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600",
      alt: "White modern geometric structure angles",
    },
    {
      image: "https://images.unsplash.com/photo-1448697517562-baf581858f73?q=80&w=1600",
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => scrollTo("home")}>
            <SfaLogo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-sans text-xs font-bold uppercase tracking-widest text-sfa-navy/80">
            <button
              onClick={() => scrollTo("home")}
              className={`hover:text-sfa-blue transition ${activeSection === "home" ? "text-sfa-blue font-black" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("offer")}
              className={`hover:text-sfa-blue transition ${activeSection === "offer" ? "text-sfa-blue font-black" : ""}`}
            >
              What We Offer
            </button>
            <button
              onClick={() => scrollTo("network")}
              className={`hover:text-sfa-blue transition ${activeSection === "network" ? "text-sfa-blue font-black" : ""}`}
            >
              Our Network
            </button>
            <button
              onClick={() => scrollTo("team")}
              className={`hover:text-sfa-blue transition ${activeSection === "team" ? "text-sfa-blue font-black" : ""}`}
            >
              Our Team
            </button>
            <button
              onClick={() => scrollTo("newsroom")}
              className={`hover:text-sfa-blue transition ${activeSection === "newsroom" ? "text-sfa-blue font-black" : ""}`}
            >
              Newsroom
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className={`hover:text-sfa-blue transition ${activeSection === "contact" ? "text-sfa-blue font-black" : ""}`}
            >
              Reach Us
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
              <div className="px-4 py-6 space-y-4 flex flex-col font-sans text-xs font-bold uppercase tracking-widest text-sfa-navy">
                <button onClick={() => scrollTo("home")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  Home
                </button>
                <button onClick={() => scrollTo("offer")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  What We Offer
                </button>
                <button onClick={() => scrollTo("network")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  Our Network
                </button>
                <button onClick={() => scrollTo("team")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  Our Team
                </button>
                <button onClick={() => scrollTo("newsroom")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  Newsroom
                </button>
                <button onClick={() => scrollTo("contact")} className="text-left py-2 border-b border-sfa-grey/5 hover:text-sfa-blue">
                  Reach Us
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setValuationOpen(true);
                  }}
                  className="w-full text-center py-3 bg-sfa-navy text-white hover:bg-sfa-blue transition"
                >
                  Request a Valuation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section & Carousel (Page 1-4) */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center pt-20 overflow-hidden bg-black">
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
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-white h-full flex flex-col justify-center">
          <div className="max-w-3xl self-end text-right pr-4 lg:pr-12 md:pr-8">
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
                <span className="block text-lg sm:text-xl font-avenir font-medium tracking-widest text-white/90">
                  SINCE 1999
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ y: 35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-sm font-avenir tracking-wide leading-relaxed font-light text-white/90 mt-8 max-w-xl ml-auto"
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
                className="px-8 py-3 bg-sfa-blue hover:bg-sfa-navy border border-sfa-blue hover:border-white text-xs font-avenir font-medium tracking-widest uppercase transition-all duration-300"
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
          className="absolute bottom-0 left-0 right-0 z-20 bg-sfa-navy border-t border-white/10 hover:bg-sfa-blue cursor-pointer py-5 text-center text-white tracking-widest text-xs font-avenir font-medium uppercase transition duration-300"
        >
          EXPLORE OUR SERVICES
        </div>
      </section>

      {/* 3. Stats & Columns (Page 5) */}
      <section id="offer" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header tabs row */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-sfa-navy/10 text-center mb-16">
            {["VALUATION ADVISORY", "OCCUPIER SERVICES", "CAPITAL MARKETS", "RESEARCH SERVICES"].map((tab, idx) => (
              <div
                key={idx}
                className="py-4 font-avenir text-xs font-medium tracking-widest border-r border-sfa-navy/10 last:border-0 hover:bg-slate-50 transition cursor-pointer text-sfa-navy/80"
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Grid Stats Layout with Ampersand in center */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-24 md:gap-y-16 items-center">
            {/* Center ampersand background logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="font-serif text-[180px] sm:text-[320px] font-bold text-sfa-grey/10 leading-none">
                &
              </span>
            </div>

            {/* Stat 1 */}
            <div className="text-center md:text-right flex flex-col md:items-end justify-center z-10">
              <span className="text-5xl sm:text-7xl font-montserrat font-black tracking-tight text-sfa-blue">25+</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/60 uppercase mt-2">Years of Advisory</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/80 uppercase">Excellence</span>
            </div>

            {/* Stat 2 */}
            <div className="text-center md:text-left flex flex-col md:items-start justify-center z-10">
              <span className="text-5xl sm:text-7xl font-montserrat font-black tracking-tight text-sfa-navy">9</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/60 uppercase mt-2">Asset Classes</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/80 uppercase">Covered</span>
            </div>

            {/* Separator line */}
            <div className="col-span-full h-[1px] bg-sfa-grey/20 hidden md:block" />

            {/* Stat 3 */}
            <div className="text-center md:text-right flex flex-col md:items-end justify-center z-10">
              <span className="text-5xl sm:text-7xl font-montserrat font-black tracking-tight text-sfa-navy">3</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/60 uppercase mt-2">Countries</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/80 uppercase">Sri Lanka, Maldives & UAE</span>
            </div>

            {/* Stat 4 */}
            <div className="text-center md:text-left flex flex-col md:items-start justify-center z-10">
              <span className="text-5xl sm:text-7xl font-montserrat font-black tracking-tight text-sfa-blue">RICS</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/60 uppercase mt-2">& IVSL</span>
              <span className="text-xs font-poppins font-normal tracking-widest text-sfa-navy/80 uppercase">Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What We Do (Page 6) */}
      <section className="relative bg-sfa-navy text-white min-h-[400px] flex items-stretch overflow-hidden">
        {/* Slanted wedge divider grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
          {/* Left panel - white background */}
          <div className="lg:col-span-5 bg-white text-sfa-navy p-12 lg:p-24 flex flex-col justify-center relative">
            <span className="text-xs font-avenir font-medium tracking-widest text-sfa-grey uppercase mb-2">WHAT WE DO</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black tracking-tight uppercase leading-none">
              END-TO-END
            </h2>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black tracking-tight uppercase text-sfa-blue leading-none mt-1">
              REAL ESTATE
            </h2>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black tracking-tight uppercase leading-none mt-1">
              ADVISORY
            </h2>
            <p className="text-xs font-avenir font-medium tracking-widest text-sfa-blue mt-4 uppercase">BUILT FOR INSTITUTIONS</p>

            {/* Slanted wedge absolute overlay */}
            <div className="hidden lg:block absolute top-0 bottom-0 right-[-80px] w-[80px] bg-white z-10" style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }} />
          </div>

          {/* Right panel - blue background */}
          <div className="lg:col-span-7 bg-[#1d3d63] p-12 lg:p-24 flex flex-col justify-center">
            <p className="text-base sm:text-lg lg:text-xl font-avenir leading-relaxed tracking-wider font-light text-white/90 text-justify">
              FROM COMPLEX PORTFOLIO VALUATIONS TO STRATEGIC OCCUPIER DECISIONS, EVERY SERVICE AT SFA IS DELIVERED TO INTERNATIONAL STANDARDS ACCEPTED BY BANKS, AUDIT FIRMS, AND LAW FIRMS ACROSS THE GLOBE.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Valuations Section (Page 9) */}
      <section className="py-24 bg-[#eaeff5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side text details */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-montserrat font-black tracking-tight uppercase text-sfa-navy">
                VALUATIONS
              </h2>
              <div className="h-[2px] w-24 bg-sfa-cyan" />
              <p className="text-sm font-avenir text-sfa-navy/80 leading-relaxed text-justify">
                Comprehensive valuation across commercial, residential, agricultural, leisure, industrial, retail, warehousing, plant & machinery, and vessels conducted in strict conformity with RICS and IVSL standards.
              </p>
              <p className="text-sm font-avenir text-sfa-navy/80 leading-relaxed text-justify">
                We serve financial institutions, private equity funds, property companies, and individuals — delivering reports that stand up to international scrutiny.
              </p>
              <button
                onClick={() => setValuationOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-avenir font-medium tracking-widest text-sfa-blue uppercase hover:text-sfa-navy transition-all duration-300 mt-4 group"
              >
                <span>EXPLORE VALUATION SERVICES</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right side slanted categories list */}
            <div className="lg:col-span-6 flex flex-col gap-2">
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
                  className="bg-sfa-cyan text-white hover:bg-sfa-navy py-3 px-6 text-sm font-avenir font-semibold tracking-wider uppercase transition-all duration-300 transform hover:-translate-x-2 flex justify-between items-center cursor-pointer shadow-sm"
                  style={{
                    clipPath: "polygon(0 0, 95% 0, 100% 100%, 0% 100%)",
                    marginLeft: `${idx * 12}px`,
                    marginRight: `${(8 - idx) * 12}px`,
                  }}
                  onClick={() => setValuationOpen(true)}
                >
                  <span>{category}</span>
                  <ChevronRight className="w-4 h-4 opacity-50 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Occupier Services (Page 10) */}
      <section className="relative bg-white min-h-[500px] flex items-stretch overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
          {/* Left Text Detail */}
          <div className="lg:col-span-7 p-12 lg:p-24 flex flex-col justify-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-montserrat font-black tracking-tight uppercase text-sfa-navy">
              OCCUPIER SERVICES
            </h2>
            <div className="h-[2px] w-24 bg-sfa-blue" />

            <div className="space-y-4 text-xs sm:text-sm font-avenir text-sfa-navy/80 leading-relaxed text-justify">
              <p className="font-avenir font-semibold text-sfa-navy">
                Strategic advisory for organisations leasing, expanding, or relocating space aligned with your operational and financial goals.
              </p>
              <p>
                Whatever property you may need, our team will be able to provide you just the right assistance you need to move into optimum space.
              </p>
              <p>
                Through a wide range of consultancy and transactional services, we are able to understand the critical success factors for our clients’ benefit.
              </p>
              <p>
                Our dedicated team of experienced professionals with the right balance of local and international knowledge will match varying client requirements, leverage our relationship with occupiers and decision makers, empower clients to attain their desired goals by creating value, addressing trends and superseding the competition.
              </p>
            </div>

            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-avenir font-medium tracking-widest text-sfa-blue uppercase hover:text-sfa-navy transition-all duration-300 mt-4 group"
            >
              <span>LEARN MORE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Building Image with curved/slanted overlay */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
              alt="High-rise modern workspace architecture"
              fill
              className="object-cover"
            />
            {/* Custom overlay curved shape */}
            <div
              className="absolute inset-y-0 left-0 w-24 bg-white hidden lg:block"
              style={{
                clipPath: "polygon(0 0, 0 100%, 100% 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* 7. Capital Markets (Page 11) */}
      <section className="relative bg-[#0d2a4a] text-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side summary */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-montserrat font-black tracking-tight uppercase leading-none">
                CAPITAL
              </h2>
              <h2 className="text-4xl sm:text-5xl font-montserrat font-black tracking-tight uppercase text-sfa-cyan leading-none mt-1">
                MARKETS
              </h2>
              <div className="h-[2px] w-24 bg-sfa-cyan" />
              <p className="text-sm font-avenir text-white/80 leading-relaxed text-justify">
                Expert support for property acquisitions, disposals, and investment transactions in evolving market.
              </p>
              <button
                onClick={() => setValuationOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-avenir font-medium tracking-widest text-sfa-cyan uppercase hover:text-white transition"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right side details (Bullet groups and description) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="border-l-2 border-sfa-cyan pl-6 space-y-4">
                <h3 className="text-xs font-montserrat font-medium tracking-widest text-sfa-cyan uppercase">
                  WE FOCUS ON PROVIDING UNIQUE AND PERSONALIZED ADVICE TO
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs font-avenir font-medium tracking-wider text-white/95 uppercase">
                  <li>• INSTITUTIONAL FUNDS</li>
                  <li>• PRIVATE EQUITY</li>
                  <li>• STATE & PUBLIC SECTOR ENTITIES</li>
                  <li>• PROPERTY COMPANIES & DEVELOPERS</li>
                  <li>• CORPORATES</li>
                  <li>• FAMILY OFFICES</li>
                  <li>• PRIVATE INDIVIDUALS</li>
                </ul>
              </div>

              <p className="text-xs sm:text-sm font-avenir text-white/80 leading-relaxed text-justify">
                We focus on providing unique and personalized advice, adding value through a combination of unparalleled access to capital, financing expertise, real estate market intelligence and thought leadership. Our services are solidified with real estate expertise together with innovative capital solutions.
              </p>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <h3 className="text-xs font-montserrat font-medium tracking-widest text-sfa-cyan uppercase">
                  OUR SERVICES EXTEND ACROSS A RANGE OF STRATEGIC TRANSACTIONS INCLUDING
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold tracking-widest text-white/90 uppercase">
                  <span>• DEBT ADVISORY</span>
                  <span>• CAPITAL RAISING</span>
                  <span>• JOINT VENTURES</span>
                  <span>• M&A SOLUTIONS</span>
                  <span>• SALES & LEASEBACKS</span>
                  <span>• RESTRUCTURING</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Insights & Reports (Page 7) */}
      <section id="newsroom" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left side headers */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-avenir font-medium tracking-widest text-sfa-blue uppercase">INSIGHTS</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black tracking-tight text-sfa-navy leading-none uppercase">
                MARKET
              </h2>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black tracking-tight text-sfa-navy leading-none uppercase">
                INTELLIGENCE
              </h2>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black tracking-tight text-sfa-navy leading-none uppercase">
                FOR INFORMED
              </h2>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black tracking-tight text-sfa-navy leading-none uppercase">
                DECISIONS.
              </h2>
              <div className="inline-block mt-4 px-4 py-2 border border-sfa-blue text-xs font-avenir font-medium tracking-widest text-sfa-blue uppercase">
                LATEST REPORT • 2026
              </div>
            </div>

            {/* Right side Reports List */}
            <div className="lg:col-span-7 space-y-12">
              {/* Report 1 */}
              <div className="border-b border-sfa-grey/15 pb-8 space-y-3">
                <h3 className="text-lg font-avenir font-bold text-sfa-navy tracking-wide">
                  SRI LANKA REAL ESTATE MARKET OUTLOOK 2026
                </h3>
                <p className="text-xs font-barlow font-normal text-sfa-grey uppercase tracking-widest">
                  AN INDEPENDENT ASSESSMENT OF SRI LANKA&apos;S COMMERCIAL, RESIDENTIAL, AND LEISURE PROPERTY MARKETS — WITH A FOCUS ON COLOMBO, PORT CITY, AND THE RECOVERING TOURISM CORRIDOR.
                </p>
                <button
                  onClick={() => alert("Downloading Report: Sri Lanka Real Estate Market Outlook 2026 (Mock File)")}
                  className="inline-flex items-center gap-2 text-xs font-avenir font-bold tracking-widest text-sfa-blue uppercase hover:underline"
                >
                  <span>DOWNLOAD REPORT</span>
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Report 2 */}
              <div className="border-b border-sfa-grey/15 pb-8 space-y-2">
                <span className="text-[10px] font-montserrat font-bold text-sfa-blue uppercase tracking-widest">MARKET COMMENTARY</span>
                <h3 className="text-base font-avenir font-bold text-sfa-navy tracking-wide">
                  PORT CITY COLOMBO: WHAT THE FIRST WAVE OF COMPLETIONS MEANS FOR COMMERCIAL VALUES
                </h3>
                <span className="block text-xs font-barlow font-normal text-sfa-grey uppercase tracking-wider">APRIL 2026</span>
              </div>

              {/* Report 3 */}
              <div className="border-b border-sfa-grey/15 pb-8 space-y-2">
                <span className="text-[10px] font-montserrat font-bold text-sfa-blue uppercase tracking-widest">MALDIVES</span>
                <h3 className="text-base font-avenir font-bold text-sfa-navy tracking-wide">
                  RESORT ASSET VALUATIONS IN THE MALDIVES: KEY METHODOLOGIES AND LENDER REQUIREMENTS
                </h3>
                <span className="block text-xs font-barlow font-normal text-sfa-grey uppercase tracking-wider">MARCH 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Case Studies (Page 8) */}
      <section className="py-24 bg-[#0a2340] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-white/10 pb-8 mb-16 space-y-4">
            <span className="text-xs font-avenir font-medium tracking-widest text-sfa-cyan uppercase">CASE STUDIES</span>
            <h2 className="text-4xl sm:text-5xl font-montserrat font-black tracking-tight uppercase leading-none">
              WHAT WE&apos;VE DELIVERED.
            </h2>
            <h2 className="text-4xl sm:text-5xl font-montserrat font-black tracking-tight text-sfa-cyan uppercase leading-none mt-1">
              HOW IT HELPED.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Case 1 */}
            <div className="space-y-6 flex flex-col justify-between h-full bg-[#113156] p-8 border border-white/5 shadow-md">
              <div className="space-y-4">
                <span className="text-[9px] font-montserrat font-bold tracking-widest text-sfa-cyan uppercase block">
                  FINANCIAL INSTITUTION • PORTFOLIO VALUATION
                </span>
                <h3 className="text-lg font-avenir font-bold tracking-wide uppercase leading-tight">
                  LARGE-SCALE BANK COLLATERAL PORTFOLIO
                </h3>
                <p className="text-xs font-avenir text-white/80 leading-relaxed text-justify">
                  A LEADING SRI LANKAN COMMERCIAL BANK REQUIRED INDEPENDENT RICS-COMPLIANT VALUATIONS ACROSS A MIXED COMMERCIAL AND RESIDENTIAL PORTFOLIO FOR INTERNAL RISK ASSESSMENT AND REGULATORY REPORTING.
                </p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <span className="text-[9px] font-barlow font-normal tracking-wider text-sfa-cyan block">
                  47 ASSETS VALUED • 30-DAY DELIVERY • REPORTS ACCEPTED BY INTERNATIONAL AUDIT PARTNER
                </span>
              </div>
            </div>

            {/* Case 2 */}
            <div className="space-y-6 flex flex-col justify-between h-full bg-[#113156] p-8 border border-white/5 shadow-md">
              <div className="space-y-4">
                <span className="text-[9px] font-montserrat font-bold tracking-widest text-sfa-cyan uppercase block">
                  HOSPITALITY • MALDIVES • CROSS-BORDER FINANCING
                </span>
                <h3 className="text-lg font-avenir font-bold tracking-wide uppercase leading-tight">
                  MALDIVES RESORT ISLAND REFINANCING
                </h3>
                <p className="text-xs font-avenir text-white/80 leading-relaxed text-justify">
                  AN INTERNATIONAL HOSPITALITY GROUP SOUGHT INDEPENDENT VALUATION OF A MALDIVES RESORT FOR REFINANCING WITH A EUROPEAN LENDER REQUIRING RICS-COMPLIANT METHODOLOGY AND INTERNATIONAL HOTEL VALUATION STANDARDS.
                </p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <span className="text-[9px] font-barlow font-normal tracking-wider text-sfa-cyan block">
                  RICS HOTEL VALUATION METHODOLOGY • ACCEPTED BY EUROPEAN FINANCIAL INSTITUTION
                </span>
              </div>
            </div>

            {/* Case 3 */}
            <div className="space-y-6 flex flex-col justify-between h-full bg-[#113156] p-8 border border-white/5 shadow-md">
              <div className="space-y-4">
                <span className="text-[9px] font-montserrat font-bold tracking-widest text-sfa-cyan uppercase block">
                  AGRICULTURAL • ESTATE SETTLEMENT • LEGAL
                </span>
                <h3 className="text-lg font-avenir font-bold tracking-wide uppercase leading-tight">
                  HILL COUNTRY TEA ESTATE VALUATION
                </h3>
                <p className="text-xs font-avenir text-white/80 leading-relaxed text-justify">
                  A FAMILY REQUIRED INDEPENDENT VALUATION OF A 250-ACRE TEA ESTATE IN SRI LANKA&apos;S HILL COUNTRY FOR ESTATE SETTLEMENT AND INHERITANCE PROCEEDINGS, INCORPORATING LAND, CROP VALUE, AND INFRASTRUCTURE.
                </p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <span className="text-[9px] font-barlow font-normal tracking-wider text-sfa-cyan block">
                  ACCEPTED IN FORMAL LEGAL PROCEEDINGS • EXPERT WITNESS SUPPORT PROVIDED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Clients & Partners (Page 12-13) */}
      <section id="network" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Clients block (Page 12) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-montserrat font-black tracking-tight uppercase text-sfa-navy leading-none">
                OUR CLIENTS
              </h2>
              <div className="h-[2px] w-24 bg-sfa-blue" />
              <p className="text-sm font-avenir text-sfa-navy/80 leading-relaxed text-justify">
                Our diverse client portfolio, spanning individuals to multinational corporations, is a testament to our success.
              </p>
              <p className="text-sm font-avenir text-sfa-navy/80 leading-relaxed text-justify">
                Each year, we complete thousands of valuation assignments across various sectors. With tailored methodologies and deep expertise, we consistently meet client needs and deliver exceptional value.
              </p>
            </div>

            {/* Right Logos Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
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

          <div className="h-[1px] bg-sfa-grey/10 w-full" />

          {/* Partners block (Page 13) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-montserrat font-black tracking-tight uppercase text-sfa-navy leading-none">
                OUR PARTNERS
              </h2>
              <span className="block text-xs font-montserrat font-medium text-sfa-blue uppercase tracking-widest">
                A GLOBAL NETWORK. • A LOCAL ADVANTAGE.
              </span>
              <div className="h-[2px] w-24 bg-sfa-blue" />
              <p className="text-sm font-avenir text-sfa-navy/80 leading-relaxed text-justify">
                Our partnerships extend local expertise through a network of world-class professional organisations — so every report meets the rigour international clients require.
              </p>
              <button
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-avenir font-medium tracking-widest text-sfa-blue uppercase hover:text-sfa-navy transition-all duration-300"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Logos Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
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

      {/* 11. Leadership Team Section (Page 14-15) */}
      <section id="team" className="bg-slate-50 border-t border-b border-sfa-grey/10 overflow-hidden">
        {/* Intro Banner (Page 14) */}
        <div className="bg-[#112d4e] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <span className="text-xs font-avenir font-medium tracking-widest text-sfa-cyan uppercase">LEADERSHIP</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black tracking-tight uppercase leading-none mt-1">
                OUR TEAM
              </h2>
            </div>
            <div className="lg:col-span-8 border-l border-white/20 pl-6">
              <p className="text-xs sm:text-sm font-avenir tracking-wide leading-relaxed font-light text-white/80 uppercase">
                SFA EMPLOYS PROFESSIONALS WITH SPECIALIZED EXPERTISE IN VARIOUS REAL ESTATE SECTORS. BASED ON THE NATURE AND SCOPE OF EACH ASSIGNMENT, THE APPROPRIATE EXPERTS ARE INTEGRATED INTO THE LEADERSHIP TEAM.
              </p>
            </div>
          </div>
        </div>

        {/* Profiles Section (Page 15) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sunil Fernando",
                designation: "Founder/Chairman",
                credentials: "FIV(SL), FRICS",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
              },
              {
                name: "Manju Fernando",
                designation: "Group Managing Director",
                credentials: "M B A (Edin), MRICS",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
              },
              {
                name: "Dilshan Perera",
                designation: "Director Valuation & Advisory",
                credentials: "M B A (Syd)",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
              },
              {
                name: "Vicks Vickneswaran",
                designation: "Director UAE",
                credentials: "MSc(GLOUC), FCMA, FCCA, FCMI",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400",
              },
              {
                name: "Nalin Seneviratne",
                designation: "Director / Advisor",
                credentials: "BSc LLB FRICS",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
              },
              {
                name: "Mohamed Hilmy",
                designation: "Director - Maldives",
                credentials: "LLB(Hons), LLM",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
              },
            ].map((director, idx) => (
              <div
                key={idx}
                className="bg-white border border-sfa-grey/15 shadow-sm p-6 flex flex-col items-center text-center space-y-4 hover:shadow-md transition duration-300 relative group overflow-hidden"
              >
                {/* Diagonal Slate Card overlay on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-sfa-navy/5 rounded-bl-full transition-all duration-300 group-hover:scale-110 pointer-events-none" />

                {/* Profile Image with Slate Oval Border */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-sfa-navy/10 group-hover:border-sfa-blue transition duration-300 shadow-inner">
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-montserrat font-bold text-sfa-navy tracking-wide">
                    {director.name}
                  </h3>
                  <p className="text-[10px] font-avenir font-medium text-sfa-blue uppercase tracking-widest">
                    {director.credentials}
                  </p>
                  <div className="h-[1px] w-12 bg-sfa-grey/20 mx-auto my-2" />
                  <p className="text-xs font-poppins font-normal text-sfa-grey uppercase tracking-widest leading-relaxed">
                    {director.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Get In Touch Banner (Page 15) */}
      <section id="contact" className="bg-sfa-navy text-white py-20 text-center relative overflow-hidden">
        {/* Ampersand watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <span className="font-serif text-[400px] font-bold">&</span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-avenir font-medium tracking-widest text-sfa-cyan uppercase">GET IN TOUCH</span>
          <h2 className="text-4xl sm:text-5xl font-montserrat font-black tracking-tight uppercase">
            READY TO START?
          </h2>
          <p className="text-sm sm:text-base font-avenir text-white/80 leading-relaxed max-w-xl mx-auto">
            Whether for a financial transaction, an acquisition, IFRS reporting, or legal proceedings. Our valuation team is ready to help.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setValuationOpen(true)}
              className="px-8 py-3 bg-sfa-cyan text-white text-xs font-avenir font-medium tracking-widest uppercase hover:bg-white hover:text-sfa-navy border border-sfa-cyan transition duration-300"
            >
              Request a Valuation
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="px-8 py-3 border border-white hover:border-sfa-cyan hover:text-sfa-cyan text-white text-xs font-avenir font-medium tracking-widest uppercase transition duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* 13. Footer & Contact Details (Page 16) */}
      <footer className="bg-[#1d70b8] text-white pt-16 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-12">
          {/* Column 1: SFA identity & Reg info */}
          <div className="lg:col-span-4 space-y-6">
            <SfaLogo className="h-12 brightness-0 invert" />

            <p className="text-xs font-avenir tracking-wide text-white/80 uppercase">
              Real Estate Advisory Since 1999
            </p>

            <p className="text-xs font-avenir leading-relaxed text-white/90 text-justify">
              Sri Lanka&apos;s largest independent real estate consultancy delivering internationally accepted valuation and advisory services across Sri Lanka and the Maldives.
            </p>

            <div className="flex gap-2 pt-2">
              <span className="border border-white/30 px-3 py-1 text-[10px] font-barlow font-normal tracking-widest">RICS</span>
              <span className="border border-white/30 px-3 py-1 text-[10px] font-barlow font-normal tracking-widest">IVSL</span>
            </div>
          </div>

          {/* Column 2: Services links */}
          <div className="lg:col-span-2 lg:col-start-6 space-y-4">
            <h4 className="text-xs font-montserrat font-medium tracking-widest text-white/70 uppercase">Services</h4>
            <ul className="space-y-2 text-xs font-avenir font-medium text-white/90 uppercase tracking-wide">
              <li>
                <button onClick={() => scrollTo("offer")} className="hover:text-sfa-navy transition">
                  Valuation & Advisory
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("offer")} className="hover:text-sfa-navy transition">
                  Occupier Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("offer")} className="hover:text-sfa-navy transition">
                  Capital Markets
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("offer")} className="hover:text-sfa-navy transition">
                  Research & Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Sectors */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-montserrat font-medium tracking-widest text-white/70 uppercase">Sectors</h4>
            <ul className="space-y-2 text-xs font-avenir font-medium text-white/90 uppercase tracking-wide">
              <li>• Tourism & Hospitality</li>
              <li>• Commercial & Office</li>
              <li>• Residential</li>
              <li>• Agricultural</li>
              <li>• Industrial</li>
            </ul>
          </div>

          {/* Column 4: Markets */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-montserrat font-medium tracking-widest text-white/70 uppercase">Markets</h4>
            <ul className="space-y-2 text-xs font-avenir font-medium text-white/90 uppercase tracking-wide">
              <li>• Sri Lanka</li>
              <li>• Maldives</li>
              <li>• Properties</li>
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div className="lg:col-span-2 space-y-4 text-xs">
            <h4 className="text-xs font-montserrat font-medium tracking-widest text-white/70 uppercase">Contact</h4>
            <div className="space-y-3 font-avenir text-white/90 text-left">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  No 505, Nawala Road, Rajagiriya
                </p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Level 24, One Galle Face Tower, Colombo 02
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Tel: 011 2887829</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-avenir font-medium tracking-widest text-white/70 uppercase">
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
