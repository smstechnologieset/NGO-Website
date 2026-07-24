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

export const metadata: Metadata = {
  title: {
    default: "SCWOP | Support for Children, Women and Older People",
    template: "%s | SCWOP NGO",
  },
  description:
    "SCWOP drives sustainable transformation and lasting solutions for children, women, and the elderly through cash transfers, healthcare, home renovation, and community empowerment.",
  keywords: [
    "NGO Ethiopia",
    "SCWOP",
    "Support for Children Women and Older People",
    "OVC Cash Transfers Ethiopia",
    "Elder Care Ethiopia",
    "Women Income Generating Activities",
    "Community Healthcare Outreach",
  ],
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.ico",
    apple: "/Logo.png",
  },
  openGraph: {
    title: "SCWOP | Support for Children, Women and Older People",
    description:
      "Driving sustainable transformation and positive community impact in Ethiopia.",
    siteName: "SCWOP NGO",
    locale: "en_US",
    type: "website",
    images: [{ url: "/Logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-body">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
