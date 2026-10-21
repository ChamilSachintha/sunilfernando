import Link from "next/link";

const SERVICES = [
  "Valuation & Advisory",
  "Occupier Services",
  "Capital Markets",
  "Research & Analytics",
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
            {SERVICES.map((label, idx) => (
              <li key={label}>
                {onServiceClick ? (
                  <button onClick={() => onServiceClick(idx)} className="hover:text-white transition cursor-pointer">
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
            <li>Tourism &amp; Hospitality</li>
            <li>Commercial &amp; Office</li>
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
          © 2026 SUNIL FERNANDO &amp; ASSOCIATES (PVT) LTD. ALL RIGHTS RESERVED.
        </span>
        <span className="mt-2 sm:mt-0">
          REGULATED BY RICS &amp; IVSL
        </span>
      </div>
    </footer>
  );
}
