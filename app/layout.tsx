import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { BodyScrollUnlock } from "@/components/ui/BodyScrollUnlock";
import { OpticSparkles } from "@/components/ui/OpticSparkles";
import { ThemeScript } from "@/components/ThemeScript";
import { brand } from "@/lib/data/brand";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} — Ver el mundo con precisión`,
  description:
    "Centro óptico de salud visual en Ovalle. Exámenes clínicos, armazones, cristales, FONASA y particular. Coquimbo #177.",
  openGraph: {
    title: brand.name,
    description: "Ver el mundo con precisión.",
    type: "website",
  },
  metadataBase: new URL(brand.siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={sans.variable}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeScript />
        <BodyScrollUnlock />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-cta focus:px-4 focus:py-2 focus:text-cta-fg"
        >
          Saltar al contenido
        </a>
        <OpticSparkles />
        <LenisProvider>
          <ScrollProgressBar />
          <div className="relative z-10">
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </div>
          <WhatsAppFab />
        </LenisProvider>
      </body>
    </html>
  );
}
