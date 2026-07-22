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
    "SCWOP is a non-profit organization dedicated to empowering and improving the lives of children, women, and older people through intergenerational care, community advocacy, and essential support services.",
  keywords: [
    "NGO",
    "SCWOP",
    "Support for Children",
    "Women Empowerment",
    "Older People Care",
    "Intergenerational Support",
    "Community Advocacy",
  ],
  openGraph: {
    title: "SCWOP | Support for Children, Women and Older People",
    description:
      "Empowering generations through community care, education, and advocacy.",
    siteName: "SCWOP NGO",
    locale: "en_US",
    type: "website",
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
