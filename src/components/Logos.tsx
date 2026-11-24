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

export const KpmgLogo: React.FC<{ className?: string }> = ({ className = "h-7 sm:h-8" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/kpmg.png"
      alt="KPMG"
      width={256}
      height={104}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const KnightFrankLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-10" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/knight-frank.png"
      alt="Knight Frank"
      width={366}
      height={137}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const KrestonLogo: React.FC<{ className?: string }> = ({ className = "h-7 sm:h-8" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/kreston.png"
      alt="Kreston"
      width={385}
      height={168}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const BdoLogo: React.FC<{ className?: string }> = ({ className = "h-7 sm:h-8" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/bdo.png"
      alt="BDO"
      width={659}
      height={254}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
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

export const BakerTillyLogo: React.FC<{ className?: string }> = ({ className = "h-7 sm:h-8" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/baker-tilly.png"
      alt="Baker Tilly"
      width={829}
      height={217}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const WarrenVicksLogo: React.FC<{ className?: string }> = ({ className = "h-11 sm:h-12" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/warren-vicks.png"
      alt="Warren Vicks Management Consultancies LLC"
      width={661}
      height={536}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const DesignAdvocacyLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/design-advocacy.png"
      alt="Design Advocacy"
      width={456}
      height={189}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const AcquestLogo: React.FC<{ className?: string }> = ({ className = "h-6 sm:h-7" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/acquest.png"
      alt="Acquest"
      width={395}
      height={77}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const NdbLogo: React.FC<{ className?: string }> = ({ className = "h-7 sm:h-8" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/ndb.png"
      alt="NDB Investment Bank"
      width={496}
      height={144}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const CoenergiLogo: React.FC<{ className?: string }> = ({ className = "h-10 sm:h-12" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/coenergi.png"
      alt="Coenergi"
      width={319}
      height={208}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);

export const SudathPereraLogo: React.FC<{ className?: string }> = ({ className = "h-11 sm:h-12" }) => (
  <div className="flex items-center justify-center">
    <Image
      src="/logos/sudath-perera.png"
      alt="Sudath Perera Associates"
      width={438}
      height={454}
      className={`w-auto object-contain hover:scale-105 transition-transform duration-200 ${className}`}
    />
  </div>
);
