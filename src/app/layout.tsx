import type { Metadata } from "next";
import { Montserrat, Barlow, Poppins } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "900"],
  style: ["normal", "italic"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sunilfernando.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sunil Fernando & Associates | Real Estate Advisory & Valuation",
    template: "%s | Sunil Fernando & Associates",
  },
  description:
    "RICS & IVSL compliant valuation and advisory services across Sri Lanka, the Maldives, and the UAE. Independent real estate intelligence, asset valuation, occupier services, and capital markets.",
  keywords: [
    "Sunil Fernando & Associates",
    "Real Estate Advisory Sri Lanka",
    "RICS Valuation Colombo",
    "Property Valuation Sri Lanka",
    "Maldives Resort Valuation",
    "IVSL Valuers Sri Lanka",
    "Plant and Machinery Valuation",
    "Capital Markets Advisory",
    "Occupier Services",
    "Commercial Property Valuation",
    "Real Estate Intelligence",
  ],
  authors: [{ name: "Sunil Fernando & Associates", url: siteUrl }],
  creator: "Sunil Fernando & Associates",
  publisher: "Sunil Fernando & Associates",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sunil Fernando & Associates",
    title: "Sunil Fernando & Associates | Real Estate Advisory & Valuation",
    description:
      "RICS & IVSL compliant valuation and advisory services across Sri Lanka, the Maldives, and the UAE. Over 25 years of excellence.",
    images: [
      {
        url: "/hero-skyline.jpg",
        width: 1200,
        height: 630,
        alt: "Sunil Fernando & Associates — Real Estate Advisory & Valuation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunil Fernando & Associates | Real Estate Advisory & Valuation",
    description:
      "RICS & IVSL compliant valuation and advisory services across Sri Lanka, the Maldives, and the UAE.",
    images: ["/hero-skyline.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Sunil Fernando & Associates",
  "alternateName": "SFA Real Estate Advisory",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`,
  "image": `${siteUrl}/hero-skyline.jpg`,
  "description":
    "RICS & IVSL compliant valuation and advisory services across Sri Lanka, the Maldives, and the UAE.",
  "telephone": "+94112887829",
  "priceRange": "$$",
  "founder": {
    "@type": "Person",
    "name": "Sunil Fernando",
    "jobTitle": "Founder & Chairman",
  },
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "No. 505, Nawala Road, Rajagiriya / Level 24, One Galle Face Tower",
      "addressLocality": "Colombo",
      "addressCountry": "LK",
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Malé City",
      "addressLocality": "Malé",
      "addressCountry": "MV",
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Level 14, Boulevard Plaza Tower 1, Downtown Dubai",
      "addressLocality": "Dubai",
      "addressCountry": "AE",
    },
  ],
  "areaServed": ["Sri Lanka", "Maldives", "United Arab Emirates"],
  "knowsAbout": [
    "Real Estate Valuation",
    "RICS Standards",
    "IVSL Standards",
    "Commercial Asset Valuation",
    "Hospitality and Resort Valuation",
    "Plant and Machinery Valuation",
    "Capital Markets",
    "Occupier Services",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${barlow.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
