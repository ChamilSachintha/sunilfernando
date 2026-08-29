import React from "react";
import Image from "next/image";

// SFA Logo: Renders the official corporate logo image
export const SfaLogo: React.FC<{ className?: string }> = ({ className = "h-12" }) => {
  return (
    <img
      src="/logo.png"
      alt="Sunil Fernando & Associates Logo"
      className={`object-contain ${className}`}
    />
  );
};

// --- CLIENT LOGOS ---

export const HsbcLogo: React.FC<{ className?: string }> = ({ className = "h-7 sm:h-8" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/hsbc.png"
      alt="HSBC"
      width={1011}
      height={274}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const StandardCharteredLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/standard-chartered.png"
      alt="Standard Chartered"
      width={463}
      height={183}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const DeloitteLogo: React.FC<{ className?: string }> = ({ className = "h-6 sm:h-7" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/deloitte.png"
      alt="Deloitte"
      width={516}
      height={98}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const CbiLogo: React.FC<{ className?: string }> = ({ className = "h-9 sm:h-11" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/cbi.png"
      alt="Commercial Bank International"
      width={607}
      height={334}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const CinnamonLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/cinnamon.png"
      alt="Cinnamon Hotels & Resorts"
      width={404}
      height={123}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const LoadstarLogo: React.FC<{ className?: string }> = ({ className = "h-6 sm:h-7" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/loadstar.png"
      alt="Loadstar"
      width={767}
      height={88}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const ShangriLaLogo: React.FC<{ className?: string }> = ({ className = "h-9 sm:h-11" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/shangri-la.png"
      alt="Shangri-La Hotels and Resorts"
      width={866}
      height={436}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const HiltonLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/hilton.png"
      alt="Hilton"
      width={902}
      height={336}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

// --- PARTNER LOGOS ---

export const KpmgLogo = () => (
  <div className="font-sans font-black text-2xl italic tracking-tighter text-sfa-blue">
    KPMG
  </div>
);

export const KnightFrankLogo = () => (
  <div className="flex items-center gap-1.5 font-sans font-extrabold text-sm tracking-tight text-sfa-navy">
    <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center text-white text-[10px] font-black">KF</div>
    <div className="flex flex-col leading-none text-left">
      <span>Knight</span>
      <span>Frank</span>
    </div>
  </div>
);

export const KrestonLogo = () => (
  <div className="font-sans font-black text-lg italic tracking-widest text-[#006699] flex items-center gap-1">
    <span className="text-lg">K</span>
    <span className="text-xs uppercase font-normal tracking-wide text-sfa-grey mt-1">Kreston</span>
  </div>
);

export const BdoLogo = () => (
  <div className="font-sans font-black text-2xl tracking-wide text-[#e31b23] border-b-2 border-[#e31b23] leading-none pb-0.5">
    BDO
  </div>
);

export const MakeeluChambersLogo = () => (
  <div className="flex items-center gap-1 font-serif text-sm font-bold text-sfa-navy leading-none">
    <span className="text-lg">M</span>
    <div className="flex flex-col text-left">
      <span>Makeelu</span>
      <span className="text-[8px] uppercase tracking-wider text-sfa-grey">Chambers</span>
    </div>
  </div>
);

export const BakerTillyLogo = () => (
  <div className="flex flex-col items-start leading-none font-sans">
    <span className="text-lg font-extrabold text-sfa-navy">bakertilly</span>
  </div>
);

export const WarrenVicksLogo = () => (
  <div className="flex flex-col items-center leading-none font-sans">
    <span className="text-sm font-bold text-sfa-navy tracking-widest">WARREN VICKS</span>
    <span className="text-[6px] tracking-wider text-sfa-grey">MANAGEMENT CONSULTANCIES LLC</span>
  </div>
);

export const DesignAdvocacyLogo = () => (
  <div className="border border-dashed border-sfa-grey px-2 py-1 font-sans text-xs font-bold text-sfa-navy uppercase tracking-widest">
    Design Advocacy
  </div>
);

export const AcquestLogo = () => (
  <div className="font-sans font-black text-lg text-red-600 tracking-widest uppercase">
    ACQUEST
  </div>
);

export const NdbLogo = () => (
  <div className="flex items-center gap-1 font-sans font-bold text-sm text-sfa-navy">
    <div className="w-3 h-3 bg-red-600 rotate-45" />
    <div className="flex flex-col leading-none text-left">
      <span className="font-black text-red-600 text-xs">NDB</span>
      <span className="text-[6px] tracking-wider font-light uppercase">Investment Bank</span>
    </div>
  </div>
);

export const CoenergiLogo = () => (
  <div className="flex flex-col items-center leading-none text-purple-700 font-sans font-light">
    <span className="text-base font-bold">coenergi</span>
  </div>
);

export const SudathPereraLogo = () => (
  <div className="border border-sfa-grey/30 rounded-full px-3 py-1 font-sans text-[9px] font-bold text-sfa-navy text-center leading-tight">
    <div>SUDATH PERERA</div>
    <div className="text-[7px] text-sfa-grey">ASSOCIATES</div>
  </div>
);
