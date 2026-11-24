import type { PortableTextBlock } from "next-sanity";

export interface RegionalOffice {
  country: string;
  flagUrl: string;
  address: string;
  branches?: string;
  phoneDisplay?: string;
  phoneHref?: string;
  email?: string;
}

export interface StatItem {
  value: string;
  subtitleLine1?: string;
  subtitleLine2?: string;
  accentColor?: "blue" | "navy";
  logoUrl?: string;
}

/** Built-in accreditation logos used when a stat has no uploaded logo in the CMS. */
export function getBuiltInStatLogo(value?: string): string | undefined {
  switch (value?.trim().toUpperCase()) {
    case "RICS":
      return "/logos/rics.png";
    case "RERA":
    case "RARE":
      return "/logos/rera.png";
    case "IVSL":
      return "/logos/ivsl.jpg";
    default:
      return undefined;
  }
}

export interface LogoItem {
  name: string;
  imageUrl?: string;
  className?: string;
}

export interface SiteSettingsData {
  logoUrl: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroTagline: string;
  heroDescription: string;
  heroImages: string[];
  regionalOffices: RegionalOffice[];
  stats: StatItem[];
  whatWeDoHeadingLine1: string;
  whatWeDoHeadingLine2: string;
  whatWeDoHeadingLine3: string;
  whatWeDoSubheading: string;
  whatWeDoRightLines: string[];
  whatWeDoImageUrl: string;
  clientsDescription1: string;
  clientsDescription2: string;
  clientLogos: LogoItem[];
  partnersSubtitle: string;
  partnersDescription: string;
  partnerLogosPart1?: LogoItem[];
  partnerLogosPart2?: LogoItem[];
  partnerLogos: LogoItem[];
  teamDescription: string;
  teamHeaderImageUrl: string;
  companyLinkedinUrl?: string;
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
}

export interface ReportItem {
  _id: string;
  title: string;
  category?: string;
  date?: string;
  summary?: string;
  /** Full rich-text article shown on the newsroom page */
  body?: PortableTextBlock[];
  isFeatured?: boolean;
  fileUrl?: string;
  order: number;
}

export interface CaseStudyItem {
  _id: string;
  categoryTag: string;
  titleLines: string[];
  description: string;
  outcomeFootnote: string;
  /** Full rich-text case study shown on the newsroom page */
  body?: PortableTextBlock[];
  order: number;
}

export interface TeamMemberItem {
  _id: string;
  name: string;
  designation: string;
  credentials: string;
  image: string;
  linkedinUrl?: string;
  order: number;
}

export interface ServiceContentData {
  valuations: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    ctaText: string;
    categories: string[];
  };
  occupier: {
    titleLine1: string;
    titleLine2: string;
    leadParagraph: string;
    paragraphs: string[];
    imageUrl: string;
  };
  capitalMarkets: {
    titleLine1: string;
    titleLine2: string;
    leftSummary: string;
    rightHeading1: string;
    clientTypes: string[];
    rightBody: string;
    rightHeading2: string;
    transactionLines: string[];
  };
  research: {
    titleLine1: string;
    titleLine2: string;
    paragraph1: string;
    paragraph2: string;
    imageUrl: string;
  };
}

export interface SanitySiteContent {
  settings: SiteSettingsData;
  services: ServiceContentData;
  reports: ReportItem[];
  caseStudies: CaseStudyItem[];
  teamMembers: TeamMemberItem[];
}

export const DEFAULT_SITE_CONTENT: SanitySiteContent = {
  settings: {
    logoUrl: "/logo.png",
    heroTitleLine1: "TRUSTED",
    heroTitleLine2: "VALUATIONS",
    heroSubtitle: "INFORMED DECISIONS",
    heroTagline: "SINCE 1999",
    heroDescription:
      "Sunil Fernando & Associates delivers internationally accepted valuation and real estate advisory services across Sri Lanka, the Maldives, and the UAE, backed by 25 years of expertise, RICS compliance, and a global partner network.",
    heroImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1600",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600",
    ],
    regionalOffices: [
      {
        country: "DUBAI, UAE",
        flagUrl: "/flag-ae.png",
        address:
          "Office #1029, Building B-2, Level 1, Dubai CommerCity, Umm Ramool, Dubai",
        phoneDisplay: "+971 508947837",
        phoneHref: "+971508947837",
        email: "enquiries@sunilfernando.com",
      },
      {
        country: "MALDIVES",
        flagUrl: "/flag-mv.png",
        address:
          "Sunil Fernando & Associates Maldives Pvt Ltd, Malé City, Republic of Maldives",
        email: "info@sunilfernando.com",
      },
      {
        country: "SRI LANKA",
        flagUrl: "/flag-lk.png",
        address:
          "No. 505, Nawala Road, Rajagiriya, Sri Lanka",
        branches: "Matara, Kandy, Negombo & Wennappuwa",
        phoneDisplay: "+94 11 2887829",
        phoneHref: "+94112887829",
        email: "info@sunilfernando.com",
      },
    ],
    stats: [
      {
        value: "RICS",
        logoUrl: "/logos/rics.png",
        accentColor: "blue",
      },
      {
        value: "RERA",
        logoUrl: "/logos/rera.png",
        accentColor: "navy",
      },
      {
        value: "IVSL",
        logoUrl: "/logos/ivsl.jpg",
        accentColor: "navy",
      },
      {
        value: "26+",
        subtitleLine1: "Years of Advisory",
        subtitleLine2: "Excellence",
        accentColor: "blue",
      },
    ],
    whatWeDoHeadingLine1: "END-TO-END",
    whatWeDoHeadingLine2: "REAL ESTATE",
    whatWeDoHeadingLine3: "ADVISORY",
    whatWeDoSubheading: "BUILT FOR INSTITUTIONS",
    whatWeDoRightLines: [
      "From complex portfolio",
      "valuations to strategic",
      "occupier decisions, every",
      "service at SFA is delivered",
      "to international standards",
      "accepted by banks, audit",
      "firms, and law firms across",
      "the globe.",
    ],
    whatWeDoImageUrl: "/what-we-do-a.png",
    clientsDescription1:
      "Our diverse client portfolio, spanning individuals to multinational corporations, is a testament to our success.",
    clientsDescription2:
      "Each year, we complete thousands of valuation assignments across various sectors. With tailored methodologies and deep expertise, we consistently meet client needs and deliver exceptional value.",
    clientLogos: [
      { name: "SMIB", imageUrl: "/logos/smib.png", className: "h-10 sm:h-12" },
      { name: "Bank of Ceylon", imageUrl: "/logos/boc.png", className: "h-9 sm:h-11" },
      { name: "Housing Development Corporation", imageUrl: "/logos/hdc.png", className: "h-8 sm:h-10" },
      { name: "Port City Colombo", imageUrl: "/logos/port-city-colombo.png", className: "h-10 sm:h-12" },
      { name: "Cinnamon Hotels & Resorts", imageUrl: "/logos/cinnamon.png", className: "h-8 sm:h-9" },
      { name: "Loadstar", imageUrl: "/logos/loadstar.png", className: "h-6 sm:h-7" },
      { name: "Shangri-La Hotels and Resorts", imageUrl: "/logos/shangri-la.png", className: "h-9 sm:h-11" },
      { name: "Hilton", imageUrl: "/logos/hilton.png", className: "h-8 sm:h-9" },
    ],
    partnersSubtitle: "A GLOBAL NETWORK. • A LOCAL ADVANTAGE.",
    partnersDescription:
      "Our partnerships extend local expertise through a network of world-class professional organisations — so every report meets the rigour international clients require.",
    partnerLogosPart1: [
      { name: "HSBC", imageUrl: "/logos/hsbc.png", className: "h-7 sm:h-8" },
      { name: "Standard Chartered", imageUrl: "/logos/standard-chartered.png", className: "h-9 sm:h-11" },
      { name: "Commercial Bank of Ceylon", imageUrl: "/logos/commercial-bank.png", className: "h-7 sm:h-8" },
      { name: "Hatton National Bank (HNB)", imageUrl: "/logos/hnb.png", className: "h-10 sm:h-12" },
      { name: "Commercial Bank International", imageUrl: "/logos/cbi.png", className: "h-10 sm:h-12" },
    ],
    partnerLogosPart2: [
      { name: "Knight Frank", imageUrl: "/logos/knight-frank.png", className: "h-8 sm:h-10" },
      { name: "Deloitte", imageUrl: "/logos/deloitte.png", className: "h-5 sm:h-6" },
      { name: "KPMG", imageUrl: "/logos/kpmg.png", className: "h-8 sm:h-10" },
      { name: "Baker Tilly", imageUrl: "/logos/baker-tilly.png", className: "h-7 sm:h-8" },
      { name: "BDO", imageUrl: "/logos/bdo.png", className: "h-8 sm:h-9" },
      { name: "Kreston", imageUrl: "/logos/kreston.png", className: "h-9 sm:h-10" },
      { name: "NDB Investment Bank", imageUrl: "/logos/ndb.png", className: "h-8 sm:h-9" },
      { name: "Eurostar", imageUrl: "/logos/eurostar.png", className: "h-7 sm:h-8" },
      { name: "Azizi Developments", imageUrl: "/logos/azizi.png", className: "h-9 sm:h-11" },
    ],
    partnerLogos: [
      { name: "HSBC", imageUrl: "/logos/hsbc.png", className: "h-7 sm:h-8" },
      { name: "Standard Chartered", imageUrl: "/logos/standard-chartered.png", className: "h-9 sm:h-11" },
      { name: "Commercial Bank of Ceylon", imageUrl: "/logos/commercial-bank.png", className: "h-7 sm:h-8" },
      { name: "Hatton National Bank (HNB)", imageUrl: "/logos/hnb.png", className: "h-10 sm:h-12" },
      { name: "Commercial Bank International", imageUrl: "/logos/cbi.png", className: "h-10 sm:h-12" },
      { name: "Knight Frank", imageUrl: "/logos/knight-frank.png", className: "h-8 sm:h-10" },
      { name: "Deloitte", imageUrl: "/logos/deloitte.png", className: "h-5 sm:h-6" },
      { name: "KPMG", imageUrl: "/logos/kpmg.png", className: "h-8 sm:h-10" },
      { name: "Baker Tilly", imageUrl: "/logos/baker-tilly.png", className: "h-7 sm:h-8" },
      { name: "BDO", imageUrl: "/logos/bdo.png", className: "h-8 sm:h-9" },
      { name: "Kreston", imageUrl: "/logos/kreston.png", className: "h-9 sm:h-10" },
      { name: "NDB Investment Bank", imageUrl: "/logos/ndb.png", className: "h-8 sm:h-9" },
      { name: "Eurostar", imageUrl: "/logos/eurostar.png", className: "h-7 sm:h-8" },
      { name: "Azizi Developments", imageUrl: "/logos/azizi.png", className: "h-9 sm:h-11" },
    ],
    teamDescription:
      "SFA employs professionals with specialized expertise in various real estate sectors. Based on the nature and scope of each assignment, the appropriate experts are integrated into the leadership team.",
    teamHeaderImageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600",
    companyLinkedinUrl:
      "https://www.linkedin.com/company/sunil-fernando-associates/",
    contactTitle: "GET IN TOUCH",
    contactSubtitle: "READY TO START?",
    contactDescription:
      "Whether for a financial transaction, an acquisition, IFRS reporting, or legal proceedings. Our valuation team is ready to help.",
  },
  services: {
    valuations: {
      title: "VALUATIONS",
      paragraph1:
        "Comprehensive valuation across commercial, residential, agricultural, leisure, industrial, retail, warehousing, plant & machinery, and vessels conducted in strict conformity with RICS and IVSL standards.",
      paragraph2:
        "We serve financial institutions, private equity funds, property companies, and individuals — delivering reports that stand up to international scrutiny.",
      ctaText: "EXPLORE VALUATION SERVICES",
      categories: [
        "Commercial",
        "Residential",
        "Agriculture",
        "Leisure",
        "Retail",
        "Industrial",
        "Warehousing",
        "Plant & Machinery",
        "Vessels",
      ],
    },
    occupier: {
      titleLine1: "OCCUPIER",
      titleLine2: "SERVICES",
      leadParagraph:
        "Strategic advisory for organisations leasing, expanding, or relocating space aligned with your operational and financial goals.",
      paragraphs: [
        "Whatever property you may need, our team will be able to provide you just the right assistance you need to move into optimum space.",
        "Through a wide range of consultancy and transactional services, we are able to understand the critical success factors for our clients’ benefit.",
        "Our dedicated team of experienced professionals with the right balance of local and international knowledge will match varying client requirements, leverage our relationship with occupiers and decision makers, empower clients to attain their desired goals by creating value, addressing trends and superseding the competition.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600",
    },
    capitalMarkets: {
      titleLine1: "CAPITAL",
      titleLine2: "MARKETS",
      leftSummary:
        "Expert support for property acquisitions, disposals, and investment transactions in evolving market.",
      rightHeading1:
        "WE FOCUS ON PROVIDING UNIQUE AND PERSONALIZED ADVICE TO",
      clientTypes: [
        "Institutional Funds",
        "Private Equity",
        "State & Public Sector Entities",
        "Property Companies & Developers",
        "Corporates",
        "Family Offices",
        "Private Individuals",
      ],
      rightBody:
        "We focus on providing unique and personalized advice, adding value through a combination of unparalleled access to capital, financing expertise, real estate market intelligence and thought leadership. Our services are solidified with real estate expertise together with innovative capital solutions.",
      rightHeading2:
        "OUR SERVICES EXTEND ACROSS A RANGE OF STRATEGIC TRANSACTIONS INCLUDING",
      transactionLines: [
        "• Debt Advisory • Capital Raising • Joint Ventures",
        "• M&A Solutions • Sales & Leasebacks • Restructuring",
      ],
    },
    research: {
      titleLine1: "RESEARCH",
      titleLine2: "SERVICES",
      paragraph1:
        "We offer comprehensive local and regional market intelligence on real estate trends as well as tailored publications addressing the specific requirements of our clients.",
      paragraph2:
        "Our research team collaborates with all sectors of our organization, leveraging over 21 years of Sunil Fernando & Associates real estate intelligence.",
      imageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600",
    },
  },
  reports: [
    {
      _id: "report-1",
      title: "SRI LANKA REAL ESTATE MARKET OUTLOOK 2026",
      summary:
        "AN INDEPENDENT ASSESSMENT OF SRI LANKA'S COMMERCIAL, RESIDENTIAL, AND LEISURE PROPERTY MARKETS — WITH A FOCUS ON COLOMBO, PORT CITY, AND THE RECOVERING TOURISM CORRIDOR.",
      isFeatured: true,
      order: 1,
    },
    {
      _id: "report-2",
      category: "MARKET COMMENTARY",
      title:
        "PORT CITY COLOMBO: WHAT THE FIRST WAVE OF COMPLETIONS MEANS FOR COMMERCIAL VALUES",
      date: "APRIL 2026",
      isFeatured: false,
      order: 2,
    },
    {
      _id: "report-3",
      category: "MALDIVES",
      title:
        "RESORT ASSET VALUATIONS IN THE MALDIVES: KEY METHODOLOGIES AND LENDER REQUIREMENTS",
      date: "MARCH 2026",
      isFeatured: false,
      order: 3,
    },
  ],
  caseStudies: [
    {
      _id: "case-study-1",
      categoryTag: "FINANCIAL INSTITUTION · PORTFOLIO VALUATION",
      titleLines: ["LARGE-SCALE", "BANK COLLATERAL", "PORTFOLIO"],
      description:
        "A LEADING SRI LANKAN COMMERCIAL BANK REQUIRED INDEPENDENT RICS-COMPLIANT VALUATIONS ACROSS A MIXED COMMERCIAL AND RESIDENTIAL PORTFOLIO FOR INTERNAL RISK ASSESSMENT AND REGULATORY REPORTING.",
      outcomeFootnote:
        "47 ASSETS VALUED · 30-DAY DELIVERY · REPORTS ACCEPTED BY INTERNATIONAL AUDIT PARTNER",
      order: 1,
    },
    {
      _id: "case-study-2",
      categoryTag: "HOSPITALITY · MALDIVES · CROSS-BORDER FINANCING",
      titleLines: ["MALDIVES RESORT", "ISLAND REFINANCING"],
      description:
        "AN INTERNATIONAL HOSPITALITY GROUP SOUGHT INDEPENDENT VALUATION OF A MALDIVES RESORT FOR REFINANCING WITH A EUROPEAN LENDER REQUIRING RICS-COMPLIANT METHODOLOGY AND INTERNATIONAL HOTEL VALUATION STANDARDS.",
      outcomeFootnote:
        "RICS HOTEL VALUATION METHODOLOGY · ACCEPTED BY EUROPEAN FINANCIAL INSTITUTION",
      order: 2,
    },
    {
      _id: "case-study-3",
      categoryTag: "AGRICULTURAL · ESTATE SETTLEMENT · LEGAL",
      titleLines: ["HILL COUNTRY TEA", "ESTATE VALUATION"],
      description:
        "A FAMILY REQUIRED INDEPENDENT VALUATION OF A 250-ACRE TEA ESTATE IN SRI LANKA'S HILL COUNTRY FOR ESTATE SETTLEMENT AND INHERITANCE PROCEEDINGS, INCORPORATING LAND, CROP VALUE, AND INFRASTRUCTURE.",
      outcomeFootnote:
        "ACCEPTED IN FORMAL LEGAL PROCEEDINGS · EXPERT WITNESS SUPPORT PROVIDED",
      order: 3,
    },
  ],
  teamMembers: [
    {
      _id: "team-1",
      name: "Mr. Sunil Fernando",
      designation: "Founder & Chairman",
      credentials: "FIV(SL), FRICS",
      image: "/sunil-fernando.png",
      linkedinUrl:
        "https://www.linkedin.com/in/sunil-fernando-frics-uk-fiv-sl-miv-rsa-b2318522/",
      order: 1,
    },
    {
      _id: "team-2",
      name: "Manju Fernando",
      designation: "Co-Founder & Managing Director",
      credentials: "MBA (Edin), MRICS",
      image: "/manju-fernando.png",
      linkedinUrl: "https://www.linkedin.com/in/manjufernando/",
      order: 2,
    },
    {
      _id: "team-3",
      name: "Dilshan Perera",
      designation: "Executive Director",
      credentials: "MBA (WSU)",
      image: "/dilshan-perera.png",
      order: 3,
    },
    {
      _id: "team-5",
      name: "Nalin Seneviratne",
      designation: "Director",
      credentials: "BSc LLB, FRICS",
      image: "/nalin-seneviratne.png",
      linkedinUrl: "https://www.linkedin.com/in/nalin-seneviratne-53babb18/",
      order: 4,
    },
    {
      _id: "team-6",
      name: "Mohamed Hilmy",
      designation: "Director - Maldives",
      credentials: "LLB(Hons), LLM",
      image: "/mohamed-hilmy.png",
      order: 5,
    },
  ],
};
