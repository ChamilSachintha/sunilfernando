import Link from "next/link";

const SERVICES = [
  "Valuation & Advisory",
  "Occupier Services",
  "Capital Markets",
  "Research Services",
];

const SECTORS = [
  "Tourism & Hospitality",
  "Commercial & Office",
  "Residential",
  "Agricultural",
  "Industrial",
];

const MARKETS = [
  "United Arab Emirates",
  "Maldives",
  "Sri Lanka",
];

const CONTACT_OFFICES: Array<{
  country: string;
  addressLines: string[];
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
export default function SiteFooter({
  onServiceClick,
}: {
  onServiceClick?: (idx: number) => void;
}) {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-white/10">
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
        </div>

        {/* Column 2: Services links */}
        <div className="lg:col-span-2 lg:border-l lg:border-white/20 lg:pl-6 space-y-4">
          <h4 className="text-base font-montserrat font-medium text-white">Services</h4>
          <ul className="space-y-2 text-sm font-avenir font-medium text-[#0c2340]">
            {SERVICES.map((label, idx) => (
              <li key={label}>
                {onServiceClick ? (
                  <button onClick={() => onServiceClick(idx)} className="hover:text-white transition cursor-pointer text-center md:text-left">
                    {label}
                  </button>
                ) : (
                  <Link href="/#offer" className="hover:text-white transition cursor-pointer">
                    {label}
                  </Link>
                )}
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
              <li key={market}>
                <Link href="/#markets" className="hover:text-white transition cursor-pointer">
                  {market}
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
