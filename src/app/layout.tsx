import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GSAPProvider from "@/components/GSAPProvider";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Great Britain Publishers | Academic Publishing & Author Services",
  description:
    "Great Britain Publishers brings together extraordinary clinicians, research scientists, and academicians. We manage scientific journals, provide author services, and organize conferences.",
  keywords: [
    "academic publishing",
    "scientific journals",
    "author services",
    "UK publisher",
    "research publication",
    "allied health sciences",
    "peer review",
    "open access",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${raleway.variable} antialiased bg-gray-50 overflow-x-hidden`}>
        <ScrollToTop />
        <GSAPProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  );
}
