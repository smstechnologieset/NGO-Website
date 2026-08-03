import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://scwop.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SCWOP | Support for Children, Women and Older People",
    template: "%s | SCWOP NGO",
  },
  description:
    "Support for Children, Women and Older People (SCWOP) is an indigenous non-governmental organization in Addis Ababa, Ethiopia driving sustainable transformation through cash transfers, OVC educational support, elderly care, cataract surgeries, home renovation, and women's economic empowerment.",
  keywords: [
    "SCWOP",
    "Support for Children Women and Older People",
    "NGO Ethiopia",
    "NGO Addis Ababa",
    "Ethiopia charity organization",
    "Elder care Ethiopia",
    "Orphan and Vulnerable Children Ethiopia",
    "OVC Cash Transfers Ethiopia",
    "Women economic empowerment Ethiopia",
    "Cataract eye surgery Ethiopia",
    "Elderly home renovation Addis Ababa",
    "Limi kura woreda 10 Semit Fiyel Bet",
  ],
  authors: [{ name: "SCWOP NGO Ethiopia", url: siteUrl }],
  creator: "SCWOP NGO",
  publisher: "SCWOP NGO",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.ico",
    apple: "/Logo.png",
  },
  openGraph: {
    title: "SCWOP | Support for Children, Women and Older People",
    description:
      "Driving sustainable community transformation and bringing lasting solutions for children, women, and the elderly in Ethiopia.",
    url: siteUrl,
    siteName: "SCWOP NGO Ethiopia",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Logo.png",
        width: 800,
        height: 800,
        alt: "SCWOP NGO Logo",
      },
      {
        url: "/Children%20gathered%20and%20standing%20together.JPG",
        width: 1200,
        height: 630,
        alt: "SCWOP Beneficiary Children and Community Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SCWOP | Support for Children, Women and Older People",
    description:
      "Bringing lasting solutions for children, women, and the elderly through cash transfers, healthcare, and education in Ethiopia.",
    images: ["/Children%20gathered%20and%20standing%20together.JPG"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data Schema for Google Knowledge Panel
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Support for Children, Women and Older People (SCWOP)",
    alternateName: "SCWOP",
    url: siteUrl,
    logo: `${siteUrl}/Logo.png`,
    image: `${siteUrl}/Children%20gathered%20and%20standing%20together.JPG`,
    description:
      "An indigenous non-governmental organization in Addis Ababa, Ethiopia driving sustainable transformation for children, women, and older people through cash transfers, healthcare, eye care, shelter renovation, and OVC educational support.",
    foundingDate: "2001",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Subcity Limi kura woreda 10 around Semit Fiyel Bet",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.009798,
      longitude: 38.849957,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+251-11-662-8613",
      contactType: "customer service",
      email: "scwop2019@gmail.com",
      areaServed: "ET",
      availableLanguage: ["English", "Amharic"],
    },
    sameAs: [
      siteUrl,
    ],
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink font-body">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
