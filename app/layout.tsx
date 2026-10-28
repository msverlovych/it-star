import type { Metadata, Viewport } from "next";
import { Figtree, Geist_Mono, Syne } from "next/font/google";
import Script from "next/script";
import { SaberOverlay } from "@/components/saber-overlay";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Starfield } from "@/components/starfield";
import { ThemeProvider } from "@/components/theme-provider";
import { themeBootScript } from "@/lib/theme";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "ITstar is a curated learning hub and resource atlas for developers and people becoming developers, with roadmaps for AI, web, frontend, backend, and mobile.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000",
  ),
  title: {
    default: "ITstar — developer atlas",
    template: "%s · ITstar",
  },
  description,
  applicationName: "ITstar",
  authors: [{ name: "Maksym" }],
  keywords: [
    "learn to code",
    "developer roadmap",
    "free programming courses",
    "web development",
    "AI engineering",
    "Flutter",
    "React",
  ],
  openGraph: {
    title: "ITstar — developer atlas",
    description,
    type: "website",
    siteName: "ITstar",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e7eef8" },
    { media: "(prefers-color-scheme: dark)", color: "#14080c" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Script id="itstar-theme" strategy="beforeInteractive">
          {themeBootScript}
        </Script>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <Starfield />
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <SaberOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
