"use client";

import Link from "next/link";
import { NewsletterSignup } from "@/components/Forms";

const SERVICES = [
  { label: "Valuation & Advisory", href: "/services/valuation-advisory" },
  { label: "Occupier Services", href: "/services/occupier-services" },
  { label: "Capital Markets", href: "/services/capital-markets" },
  { label: "Research Services", href: "/services/research-services" },
];

const SECTORS = [
  "Tourism & Hospitality",
  "Commercial & Office",
  "Residential",
  "Agricultural",
  "Industrial",
];

const MARKETS = [
  { label: "United Arab Emirates", href: "/markets/uae" },
  { label: "Maldives", href: "/markets/maldives" },
  { label: "Sri Lanka", href: "/markets/sri-lanka" },
];

const CONTACT_OFFICES: Array<{
  country: string;
  addressLines: string[];
  branches?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  emailHref?: string;
}> = [
  {
    country: "UAE",
    addressLines: [
      "Office #1029, Building B-2, Level 1,",
      "Dubai CommerCity, Umm Ramool, Dubai",
    ],
    phone: "Tel: +971 4 894 2444",
    phoneHref: "tel:+97148942444",
    email: "Email: enquiries@sunilfernando.com",
    emailHref: "mailto:enquiries@sunilfernando.com",
  },
  {
    country: "Maldives",
    addressLines: [
      "Sunil Fernando & Associates Maldives Pvt Ltd,",
      "Malé City, Republic of Maldives",
    ],
    email: "Email: info@sunilfernando.com",
    emailHref: "mailto:info@sunilfernando.com",
  },
  {
    country: "Sri Lanka",
    addressLines: [
      "No. 505, Nawala Road,",
      "Rajagiriya, Sri Lanka",
    ],
    branches: "Matara, Kandy, Negombo & Wennappuwa",
    phone: "Tel: 011 2887829",
    phoneHref: "tel:+94112887829",
    email: "Email: info@sunilfernando.com",
    emailHref: "mailto:info@sunilfernando.com",
  },
];

/**
 * Shared site footer used on the home page and the newsroom page.
 * When `onServiceClick` is provided (home page), service links open the matching
 * service tab in place; otherwise they link back to the home page services section.
 */
export default function SiteFooter(_props: {
  onServiceClick?: (idx: number) => void;
}) {
  void _props;
  return (
    <footer className="bg-primary text-white pt-14 sm:pt-16 pb-8 border-t border-white/10">
      {/* Newsletter Card inside Footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="bg-white text-sfa-navy border border-slate-200/90 border-l-4 border-l-[#00bdf1] shadow-sm p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2.5 text-center lg:text-left">
            <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/15 text-[11px] font-montserrat font-bold tracking-[0.2em] text-secondary uppercase">
              MARKET INTELLIGENCE NEWSLETTER
            </span>
            <h3 className="text-2xl sm:text-3xl font-montserrat font-normal tracking-tight text-sfa-navy">
              Stay informed on Sri Lanka, Maldives &amp; UAE property markets.
            </h3>
            <p className="text-sm sm:text-base font-avenir text-sfa-navy/75 leading-relaxed">
              Receive upcoming research reports, valuation commentary, and regional real estate outlooks directly in your inbox.
            </p>
          </div>
          <div className="lg:col-span-6">
            <NewsletterSignup />
            <p className="text-xs font-avenir text-sfa-navy/50 mt-3 text-center lg:text-left">
              Quarterly market intelligence from Sunil Fernando &amp; Associates. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 items-start mb-12 text-center md:text-left">
        {/* Column 1: SFA identity & Reg info */}
        <div className="lg:col-span-3 space-y-6 lg:pr-6 flex flex-col items-center md:items-start">
          <h3 className="text-xl sm:text-2xl font-montserrat font-medium tracking-[0.15em] uppercase leading-tight text-white">
            SUNIL FERNANDO &amp;
            <span className="block mt-1">ASSOCIATES</span>
          </h3>

          <p className="text-sm font-avenir tracking-wide text-white uppercase">
            Real Estate Advisory Since 1999
          </p>

          <p className="text-sm font-avenir leading-relaxed text-[#0c2340] text-center md:text-left md:text-justify font-medium max-w-md md:max-w-none">
            Sri Lanka&apos;s largest independent real estate consultancy delivering internationally accepted valuation and advisory services across Sri Lanka, the Maldives, and the UAE.
          </p>

          <div className="flex justify-center md:justify-start gap-2 pt-2">
            <span className="border border-white/40 px-3 py-1 text-[10px] font-barlow font-normal tracking-widest text-white">RICS</span>
            <span className="border border-white/40 px-3 py-1 text-[10px] font-barlow font-normal tracking-widest text-white">IVSL</span>
          </div>

          <div className="pt-1">
            <a
              href="https://www.linkedin.com/company/sunil-fernando-associates/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sunil Fernando & Associates on LinkedIn"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0c2340] hover:bg-[#0A66C2] text-white text-[11px] font-montserrat font-semibold tracking-wider uppercase transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>Follow on LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Column 2: Services links */}
        <div className="lg:col-span-2 lg:border-l lg:border-white/20 lg:pl-6 space-y-4">
          <h4 className="text-base font-montserrat font-medium text-white">Services</h4>
          <ul className="space-y-2 text-sm font-avenir font-medium text-[#0c2340]">
            {SERVICES.map((service) => (
              <li key={service.href}>
                <Link href={service.href} className="hover:text-white transition cursor-pointer">
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Sectors */}
        <div className="lg:col-span-2 lg:border-l lg:border-white/20 lg:pl-6 space-y-4">
          <h4 className="text-base font-montserrat font-medium text-white">Sectors</h4>
          <ul className="space-y-2 text-sm font-avenir font-medium text-[#0c2340]">
            {SECTORS.map((sector) => (
              <li key={sector}>{sector}</li>
            ))}
          </ul>
        </div>

        {/* Column 4: Markets */}
        <div className="lg:col-span-2 lg:border-l lg:border-white/20 lg:pl-6 space-y-4">
          <h4 className="text-base font-montserrat font-medium text-white">Markets</h4>
          <ul className="space-y-2 text-sm font-avenir font-medium text-[#0c2340]">
            {MARKETS.map((market) => (
              <li key={market.href}>
                <Link href={market.href} className="hover:text-white transition cursor-pointer">
                  {market.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: Contact Info */}
        <div className="lg:col-span-3 lg:border-l lg:border-white/20 lg:pl-6 space-y-4 text-xs sm:text-sm">
          <h4 className="text-base font-montserrat font-medium text-white">Contact</h4>
          <div className="space-y-4 font-avenir font-medium text-[#0c2340] text-center md:text-left">
            {CONTACT_OFFICES.map((office) => (
              <div key={office.country} className="space-y-0.5">
                <p className="font-montserrat font-semibold text-white text-xs tracking-wider uppercase">
                  {office.country}
                </p>
                {office.addressLines.map((line) => (
                  <p key={line} className="leading-snug">
                    {line}
                  </p>
                ))}
                {office.branches && (
                  <p className="leading-snug pt-0.5">
                    Branches: {office.branches}
                  </p>
                )}
                {office.phone && office.phoneHref && (
                  <a
                    href={office.phoneHref}
                    className="leading-snug hover:text-white transition block pt-0.5"
                  >
                    {office.phone}
                  </a>
                )}
                {office.email && office.emailHref && (
                  <a
                    href={office.emailHref}
                    className="leading-snug hover:text-white transition block pt-0.5"
                  >
                    {office.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-avenir font-bold tracking-widest text-[#0c2340] uppercase text-center sm:text-left">
        <span>
          © 2026 SUNIL FERNANDO &amp; ASSOCIATES (PVT) LTD. ALL RIGHTS RESERVED.
        </span>
        <span className="mt-2 sm:mt-0">
          REGULATED BY RICS &amp; IVSL
        </span>
      </div>
    </footer>
  );
}
