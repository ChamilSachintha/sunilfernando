"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import {
  SfaLogo,
  HsbcLogo,
  StandardCharteredLogo,
  DeloitteLogo,
  CbiLogo,
  CinnamonLogo,
  LoadstarLogo,
  ShangriLaLogo,
  HiltonLogo,
  KpmgLogo,
  KnightFrankLogo,
  KrestonLogo,
  BdoLogo,
  MakeeluChambersLogo,
  BakerTillyLogo,
  WarrenVicksLogo,
  DesignAdvocacyLogo,
  AcquestLogo,
  NdbLogo,
  CoenergiLogo,
  SudathPereraLogo,
} from "@/components/Logos";
import { RequestValuationModal, ContactModal } from "@/components/Forms";

export default function NewSitePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [heroIndex, setHeroIndex] = useState(0);
  const [valuationOpen, setValuationOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600",
      alt: "Corporate modern glass building",
    },
    {
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600",
      alt: "Modern facade architecture",
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

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

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

  const openService = (idx: number) => {
    setActiveService(idx);
    scrollTo("offer");
  };

  const valuationCategories = [
    "Commercial",
    "Residential",
    "Agriculture",
    "Leisure",
    "Retail",
    "Industrial",
    "Warehousing",
    "Plant & Machinery",
    "Vessels",
  ];

  const capitalClients = [
    "Institutional Funds",
    "Private Equity",
    "State & Public Sector Entities",
    "Property Companies & Developers",
    "Corporates",
    "Family Offices",
    "Private Individuals",
  ];

  const capitalTransactions = [
    "Debt Advisory",
    "Capital Raising",
    "Joint Ventures",
    "M&A Solutions",
    "Sales & Leasebacks",
    "Restructuring",
  ];

  const directors = [
    {
      name: "Sunil Fernando",
      designation: "Founder / Chairman",
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
  ];

  return (
    <div className="min-h-screen bg-white text-[#0c2340] font-avenir selection:bg-[#1d70b8] selection:text-white">
      {/* 1. Minimalist Institutional Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
          <div className="cursor-pointer flex items-center" onClick={() => scrollTo("home")}>
            <SfaLogo className="h-14 sm:h-16 py-0 block object-contain" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-montserrat font-medium uppercase tracking-[0.16em] text-slate-600">
            <Link
              href="/"
              className="cursor-pointer hover:text-[#0c2340] transition"
            >
              Classic Site
            </Link>
            <button
              onClick={() => scrollTo("home")}
              className={`cursor-pointer hover:text-[#1d70b8] transition ${
                activeSection === "home" ? "text-[#0c2340] font-semibold" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("offer")}
              className={`cursor-pointer hover:text-[#1d70b8] transition ${
                activeSection === "offer" ? "text-[#0c2340] font-semibold" : ""
              }`}
            >
              What We Offer
            </button>
            <button
              onClick={() => scrollTo("newsroom")}
              className={`cursor-pointer hover:text-[#1d70b8] transition ${
                activeSection === "newsroom" ? "text-[#0c2340] font-semibold" : ""
              }`}
            >
              Newsroom
            </button>
            <button
              onClick={() => scrollTo("network")}
              className={`cursor-pointer hover:text-[#1d70b8] transition ${
                activeSection === "network" ? "text-[#0c2340] font-semibold" : ""
              }`}
            >
              Our Network
            </button>
            <button
              onClick={() => scrollTo("team")}
              className={`cursor-pointer hover:text-[#1d70b8] transition ${
                activeSection === "team" ? "text-[#0c2340] font-semibold" : ""
              }`}
            >
              Our Team
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className={`cursor-pointer hover:text-[#1d70b8] transition ${
                activeSection === "contact" ? "text-[#0c2340] font-semibold" : ""
              }`}
            >
              Reach Us
            </button>
            <Link
              href="/new-site"
              className="cursor-pointer px-3.5 py-1.5 rounded-full bg-[#0c2340] text-white text-[11px] font-semibold tracking-[0.16em] uppercase"
            >
              New Site
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer p-2 text-[#0c2340] hover:text-[#1d70b8] transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-200 bg-white"
            >
              <div className="px-4 py-6 space-y-3 flex flex-col font-montserrat text-xs font-semibold uppercase tracking-[0.16em] text-[#0c2340]">
                <Link href="/" className="py-2 border-b border-slate-100 text-slate-500">
                  Classic Site
                </Link>
                <button onClick={() => scrollTo("home")} className="text-left py-2 border-b border-slate-100">
                  Home
                </button>
                <button onClick={() => scrollTo("offer")} className="text-left py-2 border-b border-slate-100">
                  What We Offer
                </button>
                <button onClick={() => scrollTo("newsroom")} className="text-left py-2 border-b border-slate-100">
                  Newsroom
                </button>
                <button onClick={() => scrollTo("network")} className="text-left py-2 border-b border-slate-100">
                  Our Network
                </button>
                <button onClick={() => scrollTo("team")} className="text-left py-2 border-b border-slate-100">
                  Our Team
                </button>
                <button onClick={() => scrollTo("contact")} className="text-left py-2 border-b border-slate-100">
                  Reach Us
                </button>
                <Link href="/new-site" className="py-2 text-[#1d70b8]">
                  New Site (Active)
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setValuationOpen(true);
                  }}
                  className="w-full text-center py-3 bg-[#0c2340] text-white font-semibold tracking-widest mt-2"
                >
                  Request a Valuation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Minimalist Executive Hero Section with Bottom Regional Bar */}
      <section
        id="home"
        className="relative min-h-screen w-full flex flex-col justify-between pt-16 sm:pt-20 overflow-hidden bg-[#08172b]"
      >
        {heroSlides.map((slide, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{
              opacity: idx === heroIndex ? 0.38 : 0,
              scale: idx === heroIndex ? 1 : 1.04,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <Image src={slide.image} alt={slide.alt} fill className="object-cover" priority={idx === 0} />
          </motion.div>
        ))}

        {/* Clean Architectural Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08172b]/95 via-[#0c2340]/80 to-[#0c2340]/40 z-10 pointer-events-none" />

        {/* Hero Main Content */}
        <div className="relative z-20 max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center py-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00aeef]" />
              <span className="text-[11px] font-montserrat font-medium tracking-[0.22em] text-white/90 uppercase">
                Informed Decisions · Since 1999
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[64px] font-montserrat font-light tracking-tight leading-[1.06] text-white"
            >
              Trusted{" "}
              <span className="font-semibold text-white">Valuations.</span>
            </motion.h1>

            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-[17px] text-slate-200/90 leading-relaxed font-normal mt-6 max-w-xl"
            >
              Sunil Fernando &amp; Associates delivers internationally accepted valuation and real estate advisory services across Sri Lanka, the Maldives, and the UAE — backed by over 25 years of expertise, RICS compliance, and a global partner network.
            </motion.p>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => setValuationOpen(true)}
                className="cursor-pointer inline-flex items-center gap-3 px-7 py-3.5 bg-[#1d70b8] hover:bg-[#165a96] text-white text-xs sm:text-sm font-montserrat font-medium tracking-[0.14em] uppercase rounded-md transition shadow-sm"
              >
                <span>Request a Valuation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("offer")}
                className="cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 text-xs sm:text-sm font-montserrat font-medium tracking-[0.14em] uppercase rounded-md transition"
              >
                <span>Explore Our Services</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Regional Offices Bar (Visible at Bottom of Initial Viewport) */}
        <div className="relative z-20 w-full bg-[#08172b]/70 backdrop-blur-md border-t border-white/10 text-white py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-20">
            {/* Dubai */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Image
                    src="/flag-ae.png"
                    alt="UAE Flag"
                    width={24}
                    height={16}
                    className="w-5 h-auto rounded-[2px] object-cover shrink-0"
                  />
                  <h3 className="text-xs font-montserrat font-semibold tracking-[0.2em] uppercase text-white">
                    Dubai, UAE
                  </h3>
                </div>
                <p className="text-xs text-slate-300/85 leading-relaxed max-w-[280px]">
                  Office #1029, Building B-2, Level 1, Dubai CommerCity, Umm Ramool, Dubai
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="text-[10px] font-montserrat uppercase tracking-wider text-[#00aeef] font-semibold">
                  Tel:
                </span>
                <a href="tel:+97148942444" className="text-slate-200 hover:text-white transition">
                  +971 4 894 2444
                </a>
              </div>
            </div>

            {/* Maldives */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Image
                    src="/flag-mv.png"
                    alt="Maldives Flag"
                    width={24}
                    height={16}
                    className="w-5 h-auto rounded-[2px] object-cover shrink-0"
                  />
                  <h3 className="text-xs font-montserrat font-semibold tracking-[0.2em] uppercase text-white">
                    Maldives
                  </h3>
                </div>
                <p className="text-xs text-slate-300/85 leading-relaxed max-w-[280px]">
                  Sunil Fernando &amp; Associates Maldives Pvt Ltd, Malé City, Republic of Maldives
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="text-[10px] font-montserrat uppercase tracking-wider text-[#00aeef] font-semibold">
                  Tel:
                </span>
                <a href="tel:+9603308829" className="text-slate-200 hover:text-white transition">
                  +960 330 8829 / +94 11 2887829
                </a>
              </div>
            </div>

            {/* Sri Lanka */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Image
                    src="/flag-lk.png"
                    alt="Sri Lanka Flag"
                    width={24}
                    height={16}
                    className="w-5 h-auto rounded-[2px] object-cover shrink-0"
                  />
                  <h3 className="text-xs font-montserrat font-semibold tracking-[0.2em] uppercase text-white">
                    Sri Lanka
                  </h3>
                </div>
                <p className="text-xs text-slate-300/85 leading-relaxed max-w-[290px]">
                  No. 505, Nawala Road, Rajagiriya / Level 24, One Galle Face Tower, Colombo 02
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="text-[10px] font-montserrat uppercase tracking-wider text-[#00aeef] font-semibold">
                  Tel:
                </span>
                <a href="tel:+94112887829" className="text-slate-200 hover:text-white transition">
                  +94 11 2887829
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Minimalist Credentials & Figures Strip (26+, IVSL, RARE, RICS) */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 border border-slate-200/80 rounded-lg bg-slate-50/40">
            <div className="p-8 lg:p-10 flex flex-col justify-center items-center text-center">
              <span className="text-4xl sm:text-5xl font-montserrat font-bold tracking-tight text-[#1d70b8]">
                26+
              </span>
              <span className="text-[11px] font-montserrat font-medium tracking-[0.18em] text-slate-500 uppercase mt-2">
                Years of Advisory Excellence
              </span>
            </div>

            <div className="p-8 lg:p-10 flex flex-col justify-center items-center text-center">
              <span className="text-4xl sm:text-5xl font-montserrat font-bold tracking-tight text-[#0c2340]">
                IVSL
              </span>
              <span className="text-[11px] font-montserrat font-medium tracking-[0.18em] text-slate-500 uppercase mt-2">
                Institute of Valuers of Sri Lanka
              </span>
            </div>

            <div className="p-8 lg:p-10 flex flex-col justify-center items-center text-center">
              <span className="text-4xl sm:text-5xl font-montserrat font-bold tracking-tight text-[#0c2340]">
                RARE
              </span>
              <span className="text-[11px] font-montserrat font-medium tracking-[0.18em] text-slate-500 uppercase mt-2">
                Regulated Real Estate Practice
              </span>
            </div>

            <div className="p-8 lg:p-10 flex flex-col justify-center items-center text-center">
              <span className="text-4xl sm:text-5xl font-montserrat font-bold tracking-tight text-[#1d70b8]">
                RICS
              </span>
              <span className="text-[11px] font-montserrat font-medium tracking-[0.18em] text-slate-500 uppercase mt-2">
                International Standards Compliant
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Explore Our Services (Tabbed Minimalist Interface) */}
      <section id="offer" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[11px] font-montserrat font-semibold tracking-[0.22em] text-[#1d70b8] uppercase block mb-3">
                Explore Our Services
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-montserrat font-light tracking-tight text-[#0c2340] leading-tight">
                Comprehensive Real Estate{" "}
                <span className="font-semibold">Advisory</span>
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Independent, RICS and IVSL compliant advisory tailored for financial institutions, corporates, developers, and private investors.
            </p>
          </div>

          {/* Minimalist Service Tabs */}
          <div
            role="tablist"
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-slate-100 rounded-lg mb-10"
          >
            {[
              "Valuation & Advisory",
              "Occupier Services",
              "Capital Markets",
              "Research Services",
            ].map((tab, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={activeService === idx}
                onClick={() => setActiveService(idx)}
                className={`cursor-pointer py-3.5 px-4 rounded-md font-montserrat text-xs sm:text-[13px] tracking-[0.1em] uppercase transition-all ${
                  activeService === idx
                    ? "bg-white text-[#0c2340] font-semibold shadow-xs"
                    : "text-slate-600 hover:text-[#0c2340] font-medium"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Uniform-Height Service Tab Panels */}
          <div className="w-full grid grid-cols-1">
            {/* Tab 0: Valuations */}
            <div
              className={`col-start-1 row-start-1 w-full h-full flex flex-col ${
                activeService === 0 ? "visible z-10" : "invisible pointer-events-none z-0"
              }`}
              aria-hidden={activeService !== 0}
            >
              <div className="flex-1 min-h-[480px] rounded-xl border border-slate-200/90 bg-slate-50/50 p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <span className="inline-block text-[11px] font-montserrat font-semibold tracking-[0.2em] text-[#1d70b8] uppercase">
                      01 · Valuation &amp; Advisory
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-montserrat font-semibold tracking-tight text-[#0c2340]">
                      Valuations
                    </h3>
                  </div>

                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                    <p>
                      Comprehensive valuation across commercial, residential, agricultural, leisure, industrial, retail, warehousing, plant &amp; machinery, and vessels conducted in strict conformity with RICS and IVSL standards.
                    </p>
                    <p>
                      We serve financial institutions, private equity funds, property companies, and individuals — delivering reports that stand up to international scrutiny.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setValuationOpen(true)}
                      className="cursor-pointer inline-flex items-center gap-2 text-xs font-montserrat font-semibold tracking-[0.16em] text-[#1d70b8] hover:text-[#0c2340] uppercase transition"
                    >
                      <span>Explore Valuation Services</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-white rounded-lg border border-slate-200/80 p-6 sm:p-8 shadow-2xs">
                    <h4 className="text-xs font-montserrat font-semibold tracking-[0.18em] text-slate-400 uppercase mb-4">
                      Asset Classes Covered
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {valuationCategories.map((category, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 py-2 px-3 rounded-md bg-slate-50 border border-slate-100 text-xs sm:text-[13px] font-montserrat font-medium text-[#0c2340]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1d70b8] shrink-0" />
                          <span>{category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab 1: Occupier Services */}
            <div
              className={`col-start-1 row-start-1 w-full h-full flex flex-col ${
                activeService === 1 ? "visible z-10" : "invisible pointer-events-none z-0"
              }`}
              aria-hidden={activeService !== 1}
            >
              <div className="flex-1 min-h-[480px] rounded-xl border border-slate-200/90 bg-slate-50/50 p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <span className="inline-block text-[11px] font-montserrat font-semibold tracking-[0.2em] text-[#1d70b8] uppercase">
                      02 · Occupier Advisory
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-montserrat font-semibold tracking-tight text-[#0c2340]">
                      Occupier Services
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-2xl">
                    <p className="font-medium text-[#0c2340]">
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

                  <div className="pt-2">
                    <button
                      onClick={() => setContactOpen(true)}
                      className="cursor-pointer inline-flex items-center gap-2 text-xs font-montserrat font-semibold tracking-[0.16em] text-[#1d70b8] hover:text-[#0c2340] uppercase transition"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 h-full min-h-[300px] relative rounded-lg overflow-hidden border border-slate-200/80">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
                    alt="High-rise modern workspace architecture"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Tab 2: Capital Markets */}
            <div
              className={`col-start-1 row-start-1 w-full h-full flex flex-col ${
                activeService === 2 ? "visible z-10" : "invisible pointer-events-none z-0"
              }`}
              aria-hidden={activeService !== 2}
            >
              <div className="flex-1 min-h-[480px] rounded-xl border border-slate-200/90 bg-slate-50/50 p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <span className="inline-block text-[11px] font-montserrat font-semibold tracking-[0.2em] text-[#1d70b8] uppercase">
                      03 · Investment Advisory
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-montserrat font-semibold tracking-tight text-[#0c2340]">
                      Capital Markets
                    </h3>
                  </div>

                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <p className="font-medium text-[#0c2340]">
                      Expert support for property acquisitions, disposals, and investment transactions in evolving markets.
                    </p>
                    <p className="text-sm">
                      We focus on providing unique and personalized advice, adding value through a combination of unparalleled access to capital, financing expertise, real estate market intelligence and thought leadership. Our services are solidified with real estate expertise together with innovative capital solutions.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setContactOpen(true)}
                      className="cursor-pointer inline-flex items-center gap-2 text-xs font-montserrat font-semibold tracking-[0.16em] text-[#1d70b8] hover:text-[#0c2340] uppercase transition"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-slate-200/80 p-6 shadow-2xs">
                    <h4 className="text-xs font-montserrat font-semibold tracking-[0.15em] text-[#0c2340] uppercase mb-4">
                      Personalized Advice To
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-[13px] text-slate-600">
                      {capitalClients.map((client, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1d70b8] shrink-0" />
                          <span>{client}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg border border-slate-200/80 p-6 shadow-2xs">
                    <h4 className="text-xs font-montserrat font-semibold tracking-[0.15em] text-[#0c2340] uppercase mb-4">
                      Strategic Transactions
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-[13px] text-slate-600">
                      {capitalTransactions.map((tx, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00aeef] shrink-0" />
                          <span>{tx}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab 3: Research Services */}
            <div
              className={`col-start-1 row-start-1 w-full h-full flex flex-col ${
                activeService === 3 ? "visible z-10" : "invisible pointer-events-none z-0"
              }`}
              aria-hidden={activeService !== 3}
            >
              <div className="flex-1 min-h-[480px] rounded-xl border border-slate-200/90 bg-slate-50/50 p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <span className="inline-block text-[11px] font-montserrat font-semibold tracking-[0.2em] text-[#1d70b8] uppercase">
                      04 · Market Intelligence
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-montserrat font-semibold tracking-tight text-[#0c2340]">
                      Research Services
                    </h3>
                  </div>

                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                    <p className="font-medium text-[#0c2340]">
                      We offer comprehensive local and regional market intelligence on real estate trends as well as tailored publications addressing the specific requirements of our clients.
                    </p>
                    <p>
                      Our research team collaborates with all sectors of our organization, leveraging over 21 years of Sunil Fernando &amp; Associates real estate intelligence.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setContactOpen(true)}
                      className="cursor-pointer inline-flex items-center gap-2 text-xs font-montserrat font-semibold tracking-[0.16em] text-[#1d70b8] hover:text-[#0c2340] uppercase transition"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 h-full min-h-[300px] relative rounded-lg overflow-hidden border border-slate-200/80">
                  <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200"
                    alt="Modern research workspace and architectural interior"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What We Do (Executive Institutional Banner) */}
      <section className="py-20 lg:py-24 bg-[#0c2340] text-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-montserrat font-semibold tracking-[0.24em] text-[#00aeef] uppercase block">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-light tracking-tight leading-[1.12]">
                End-to-End Real Estate Advisory{" "}
                <span className="font-semibold text-white block mt-1">
                  Built for Institutions.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-10">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                From complex portfolio valuations to strategic occupier decisions, every service at SFA is delivered to international standards accepted by banks, audit firms, and law firms across the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Insights & Reports (Newsroom) */}
      <section id="newsroom" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Intro Column */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
              <span className="text-[11px] font-montserrat font-semibold tracking-[0.22em] text-[#1d70b8] uppercase block">
                Insights · Latest Report 2026
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-montserrat font-light tracking-tight text-[#0c2340] leading-[1.12]">
                Market Intelligence for{" "}
                <span className="font-semibold">Informed Decisions.</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed pt-2 max-w-md">
                Authoritative sector research, quarterly market outlooks, and valuation methodology commentaries across Sri Lanka and the Maldives.
              </p>
            </div>

            {/* Right Reports Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Featured Report */}
              <div className="bg-white rounded-xl border border-slate-200/90 p-8 shadow-2xs hover:border-[#1d70b8]/40 transition">
                <span className="inline-block px-2.5 py-1 rounded bg-[#e0f2fe] text-[#1d70b8] text-[10px] font-montserrat font-semibold tracking-[0.16em] uppercase mb-4">
                  Flagship Outlook · 2026
                </span>
                <h3 className="text-xl sm:text-2xl font-montserrat font-semibold text-[#0c2340] leading-snug">
                  Sri Lanka Real Estate Market Outlook 2026
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  An independent assessment of Sri Lanka&apos;s commercial, residential, and leisure property markets — with a focus on Colombo, Port City, and the recovering tourism corridor.
                </p>
                <button
                  onClick={() =>
                    alert("Downloading Report: Sri Lanka Real Estate Market Outlook 2026 (Mock File)")
                  }
                  className="cursor-pointer mt-6 inline-flex items-center gap-2 text-xs font-montserrat font-semibold tracking-[0.16em] text-[#1d70b8] hover:text-[#0c2340] uppercase transition"
                >
                  <span>Download Report</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Secondary Commentaries Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-2xs">
                  <div>
                    <span className="text-[10px] font-montserrat font-semibold text-[#1d70b8] uppercase tracking-[0.18em]">
                      Market Commentary
                    </span>
                    <h4 className="text-base font-montserrat font-semibold text-[#0c2340] leading-snug mt-2">
                      Port City Colombo: What the First Wave of Completions Means for Commercial Values
                    </h4>
                  </div>
                  <span className="block text-xs text-slate-400 font-montserrat uppercase tracking-wider mt-6">
                    April 2026
                  </span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-2xs">
                  <div>
                    <span className="text-[10px] font-montserrat font-semibold text-[#1d70b8] uppercase tracking-[0.18em]">
                      Maldives
                    </span>
                    <h4 className="text-base font-montserrat font-semibold text-[#0c2340] leading-snug mt-2">
                      Resort Asset Valuations in the Maldives: Key Methodologies and Lender Requirements
                    </h4>
                  </div>
                  <span className="block text-xs text-slate-400 font-montserrat uppercase tracking-wider mt-6">
                    March 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Case Studies */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] font-montserrat font-semibold tracking-[0.22em] text-[#1d70b8] uppercase block mb-3">
              Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-montserrat font-light tracking-tight text-[#0c2340] leading-tight">
              What We&apos;ve Delivered.{" "}
              <span className="font-semibold">How It Helped.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-montserrat font-semibold tracking-[0.16em] text-[#1d70b8] uppercase block">
                  Financial Institution · Portfolio Valuation
                </span>
                <h3 className="text-xl font-montserrat font-semibold text-[#0c2340] leading-snug">
                  Large-Scale Bank Collateral Portfolio
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A leading Sri Lankan commercial bank required independent RICS-compliant valuations across a mixed commercial and residential portfolio for internal risk assessment and regulatory reporting.
                </p>
              </div>
              <div className="pt-6 mt-8 border-t border-slate-200/80">
                <span className="text-[11px] font-montserrat font-semibold text-[#0c2340] uppercase tracking-wider block leading-relaxed">
                  47 Assets Valued · 30-Day Delivery · Reports Accepted by International Audit Partner
                </span>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-montserrat font-semibold tracking-[0.16em] text-[#1d70b8] uppercase block">
                  Hospitality · Maldives · Cross-Border Financing
                </span>
                <h3 className="text-xl font-montserrat font-semibold text-[#0c2340] leading-snug">
                  Maldives Resort Island Refinancing
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  An international hospitality group sought independent valuation of a Maldives resort for refinancing with a European lender requiring RICS-compliant methodology and international hotel valuation standards.
                </p>
              </div>
              <div className="pt-6 mt-8 border-t border-slate-200/80">
                <span className="text-[11px] font-montserrat font-semibold text-[#0c2340] uppercase tracking-wider block leading-relaxed">
                  RICS Hotel Valuation Methodology · Accepted by European Financial Institution
                </span>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-montserrat font-semibold tracking-[0.16em] text-[#1d70b8] uppercase block">
                  Agricultural · Estate Settlement · Legal
                </span>
                <h3 className="text-xl font-montserrat font-semibold text-[#0c2340] leading-snug">
                  Hill Country Tea Estate Valuation
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A family required independent valuation of a 250-acre tea estate in Sri Lanka&apos;s hill country for estate settlement and inheritance proceedings, incorporating land, crop value, and infrastructure.
                </p>
              </div>
              <div className="pt-6 mt-8 border-t border-slate-200/80">
                <span className="text-[11px] font-montserrat font-semibold text-[#0c2340] uppercase tracking-wider block leading-relaxed">
                  Accepted in Formal Legal Proceedings · Expert Witness Support Provided
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Our Clients & Our Partners (Network) */}
      <section id="network" className="py-20 lg:py-28 bg-slate-50/60 border-b border-slate-200/80 space-y-24">
        {/* Our Clients */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-montserrat font-semibold tracking-[0.22em] text-[#1d70b8] uppercase block">
                Client Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-montserrat font-light tracking-tight text-[#0c2340]">
                Our <span className="font-semibold">Clients</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our diverse client portfolio, spanning individuals to multinational corporations, is a testament to our success.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Each year, we complete thousands of valuation assignments across various sectors. With tailored methodologies and deep expertise, we consistently meet client needs and deliver exceptional value.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-center justify-items-center bg-white p-8 sm:p-10 rounded-xl border border-slate-200/80 shadow-2xs">
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
        </div>

        {/* Our Partners */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-montserrat font-semibold tracking-[0.22em] text-[#1d70b8] uppercase block">
                A Global Network · A Local Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-montserrat font-light tracking-tight text-[#0c2340]">
                Our <span className="font-semibold">Partners</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our partnerships extend local expertise through a network of world-class professional organisations — so every report meets the rigour international clients require.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setContactOpen(true)}
                  className="cursor-pointer inline-flex items-center gap-2 text-xs font-montserrat font-semibold tracking-[0.16em] text-[#1d70b8] hover:text-[#0c2340] uppercase transition"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center justify-items-center bg-[#194866] p-8 sm:p-10 rounded-xl shadow-xs">
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
        </div>
      </section>

      {/* 9. Our Leadership Team */}
      <section id="team" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-6">
              <span className="text-[11px] font-montserrat font-semibold tracking-[0.22em] text-[#1d70b8] uppercase block mb-3">
                Executive Governance
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-montserrat font-light tracking-tight text-[#0c2340] leading-tight">
                Our Leadership <span className="font-semibold">Team</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                SFA employs professionals with specialized expertise in various real estate sectors. Based on the nature and scope of each assignment, the appropriate experts are integrated into the leadership team.
              </p>
            </div>
          </div>

          {/* Minimalist Executive Portrait Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {directors.map((director, idx) => (
              <div
                key={idx}
                className="group rounded-xl overflow-hidden border border-slate-200/80 bg-white flex flex-col justify-between transition hover:shadow-md hover:border-slate-300"
              >
                <div className="relative h-[240px] w-full bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden">
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover object-top group-hover:scale-103 transition duration-500"
                  />
                </div>
                <div className="p-4 bg-[#0c2340] text-center flex-1 flex flex-col justify-center min-h-[96px]">
                  <h3 className="text-white font-montserrat font-semibold text-xs sm:text-[13px] leading-snug">
                    {director.name}
                  </h3>
                  <p className="text-slate-300 font-avenir text-[9px] uppercase tracking-wider mt-1">
                    {director.credentials}
                  </p>
                  <p className="text-[#00aeef] font-avenir font-medium text-[11px] mt-1 leading-tight">
                    {director.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Get In Touch CTA Banner */}
      <section id="contact" className="py-20 bg-[#0c2340] text-white border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="text-[11px] font-montserrat font-semibold tracking-[0.24em] text-[#00aeef] uppercase block">
            Ready to Start?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-montserrat font-light tracking-tight">
            Get In <span className="font-semibold">Touch</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            Whether for a financial transaction, an acquisition, IFRS reporting, or legal proceedings, our valuation team is ready to help.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setValuationOpen(true)}
              className="cursor-pointer px-8 py-3.5 bg-[#1d70b8] hover:bg-[#165a96] text-white text-xs font-montserrat font-semibold tracking-[0.16em] uppercase rounded-md transition"
            >
              Request a Valuation
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="cursor-pointer px-8 py-3.5 border border-white/25 hover:bg-white/10 text-white text-xs font-montserrat font-semibold tracking-[0.16em] uppercase rounded-md transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* 11. Minimalist Institutional Footer */}
      <footer className="bg-[#08172b] text-slate-300 pt-16 pb-10 border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Column 1 */}
          <div className="lg:col-span-4 space-y-4 lg:pr-8">
            <h3 className="text-lg font-montserrat font-semibold tracking-[0.14em] uppercase text-white">
              Sunil Fernando &amp; Associates
            </h3>
            <p className="text-xs font-montserrat tracking-[0.16em] text-[#00aeef] uppercase">
              Real Estate Advisory Since 1999
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sri Lanka&apos;s largest independent real estate consultancy delivering internationally accepted valuation and advisory services across Sri Lanka, the Maldives, and the UAE.
            </p>
            <div className="flex gap-2 pt-2">
              <span className="border border-white/20 px-3 py-1 text-[10px] font-montserrat tracking-widest text-white rounded-xs">
                RICS
              </span>
              <span className="border border-white/20 px-3 py-1 text-[10px] font-montserrat tracking-widest text-white rounded-xs">
                IVSL
              </span>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-montserrat font-semibold uppercase tracking-[0.16em] text-white">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => openService(0)} className="cursor-pointer hover:text-white transition">
                  Valuation &amp; Advisory
                </button>
              </li>
              <li>
                <button onClick={() => openService(1)} className="cursor-pointer hover:text-white transition">
                  Occupier Services
                </button>
              </li>
              <li>
                <button onClick={() => openService(2)} className="cursor-pointer hover:text-white transition">
                  Capital Markets
                </button>
              </li>
              <li>
                <button onClick={() => openService(3)} className="cursor-pointer hover:text-white transition">
                  Research &amp; Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Sectors */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-montserrat font-semibold uppercase tracking-[0.16em] text-white">
              Sectors
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Tourism &amp; Hospitality</li>
              <li>Commercial &amp; Office</li>
              <li>Residential</li>
              <li>Agricultural</li>
              <li>Industrial</li>
            </ul>
          </div>

          {/* Column 4: Markets */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-montserrat font-semibold uppercase tracking-[0.16em] text-white">
              Markets
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Sri Lanka</li>
              <li>Maldives</li>
              <li>UAE</li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="text-xs font-montserrat font-semibold uppercase tracking-[0.16em] text-white">
              Contact
            </h4>
            <div className="space-y-3 text-slate-400">
              <p className="leading-relaxed">No 505, Nawala Road, Rajagiriya</p>
              <p className="leading-relaxed">Level 24, One Galle Face Tower, Colombo 02</p>
              <p className="leading-relaxed text-white">Tel: 011 2887829</p>
            </div>
          </div>
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 tracking-wider uppercase">
          <span>© 2026 Sunil Fernando &amp; Associates (Pvt) Ltd. All rights reserved.</span>
          <span className="mt-2 sm:mt-0 text-slate-300">Regulated by RICS &amp; IVSL</span>
        </div>
      </footer>

      {/* Modals */}
      <RequestValuationModal isOpen={valuationOpen} onClose={() => setValuationOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
