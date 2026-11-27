import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (from @fontsource-variable): Bodoni Moda with optical sizing, Manrope variable.
const bodoni = localFont({
  variable: "--font-bodoni",
  src: [
    { path: "./fonts/bodoni-moda-latin-opsz-normal.woff2", style: "normal", weight: "400 900" },
    { path: "./fonts/bodoni-moda-latin-opsz-italic.woff2", style: "italic", weight: "400 900" },
  ],
  display: "swap",
});

const manrope = localFont({
  variable: "--font-manrope",
  src: [{ path: "./fonts/manrope-latin-wght-normal.woff2", style: "normal", weight: "200 800" }],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Barbie Shah — IT, UI/UX & Project Coordination",
  description:
    "Portfolio of Barbie Shah, an IT student from Pokhara with experience in software development, databases and UI/UX, moving into project coordination.",
  authors: [{ name: "Barbie Shah" }],
  openGraph: {
    title: "Barbie Shah — Portfolio",
    description: "Tidy plans, thoughtful products. IT, UI/UX and project coordination from Pokhara, Nepal.",
    type: "profile",
    images: ["/images/barbie-mirror.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Adds `motion` to <html> before paint so reveal pre-states apply without a flash.
// A safety timer removes it if the animation script never starts.
const motionBoot = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},4000)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body className="grain antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
