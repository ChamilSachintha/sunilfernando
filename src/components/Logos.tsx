import React from "react";

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

export const HsbcLogo = () => (
  <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition duration-300">
    <svg viewBox="0 0 100 100" className="w-10 h-10">
      <polygon points="50,15 15,50 50,85" fill="#db1b24" />
      <polygon points="50,15 85,50 50,85" fill="#db1b24" />
      <polygon points="50,15 50,85 15,50" fill="#ffffff" />
      <polygon points="50,15 50,85 85,50" fill="#ffffff" />
      <polygon points="15,50 35,50 50,35" fill="#db1b24" />
      <polygon points="85,50 65,50 50,35" fill="#db1b24" />
    </svg>
    <span className="font-sans text-xl font-black tracking-tight text-sfa-navy">HSBC</span>
  </div>
);

export const StandardCharteredLogo = () => (
  <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition duration-300">
    <svg viewBox="0 0 100 100" className="w-9 h-9">
      <path d="M25,20 C10,35 10,65 25,80 C30,85 45,85 55,75 L45,65 C40,70 35,70 32,68" fill="#00b4d8" />
      <path d="M75,80 C90,65 90,35 75,20 C70,15 55,15 45,25 L55,35 C60,30 65,30 68,32" fill="#00f5d4" />
      <path d="M35,45 C45,55 55,45 65,55" stroke="#00b4d8" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M45,35 C55,45 45,55 55,65" stroke="#00f5d4" strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
    <div className="flex flex-col leading-none font-sans text-left">
      <span className="text-[12px] font-bold text-sfa-navy tracking-tight">standard</span>
      <span className="text-[12px] font-bold text-sfa-navy tracking-tight">chartered</span>
    </div>
  </div>
);

export const DeloitteLogo = () => (
  <div className="flex items-baseline grayscale hover:grayscale-0 transition duration-300 font-sans font-black text-2xl tracking-tighter text-sfa-navy">
    <span>Deloitte</span>
    <span className="text-green-500 text-3xl leading-none">.</span>
  </div>
);

export const CbiLogo = () => (
  <div className="flex flex-col items-center leading-none grayscale hover:grayscale-0 transition duration-300">
    <div className="flex items-center gap-1 font-sans font-black text-2xl tracking-tighter text-sfa-navy">
      <span className="text-[#db1b24]">✴</span>
      <span>CBI</span>
    </div>
    <span className="text-[8px] text-sfa-grey font-medium">البنك التجاري الدولي</span>
  </div>
);

export const CinnamonLogo = () => (
  <div className="flex flex-col items-center leading-none text-purple-800 font-serif italic font-extrabold text-lg">
    <span>Cinnamon</span>
    <span className="text-[7px] tracking-widest uppercase font-sans font-bold text-sfa-grey mt-0.5">Hotels & Resorts</span>
  </div>
);

export const LoadstarLogo = () => (
  <div className="font-sans font-black text-xl italic tracking-wider text-sfa-blue flex items-center gap-1">
    <span className="text-red-500">★</span>
    <span>LOADSTAR</span>
  </div>
);

export const ShangriLaLogo = () => (
  <div className="flex flex-col items-center leading-none font-sans text-center">
    <span className="text-amber-500 text-lg">⚜</span>
    <span className="text-sm font-bold tracking-widest text-sfa-navy">SHANGRI-LA</span>
    <span className="text-[6px] tracking-widest text-sfa-grey mt-0.5 uppercase">Hotels and Resorts</span>
  </div>
);

export const HiltonLogo = () => (
  <div className="border border-sfa-navy px-3 py-1 font-serif text-xl font-bold tracking-wider text-sfa-navy">
    Hilton
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
