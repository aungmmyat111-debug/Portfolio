import type { Metadata } from "next";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Manrope,
  Space_Grotesk,
} from "next/font/google";
import { Providers } from "@/components/Providers";
import { profile } from "@/data/profile";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moggie.dev"),
  title: "Aung Myint Myat — Software Engineer",
  description:
    "Portfolio of Aung Myint Myat — software engineer focused on building fast, scalable, and thoughtful web applications.",
  openGraph: {
    title: "Aung Myint Myat — Software Engineer",
    description:
      "Software engineer focused on building fast, scalable, and thoughtful web applications.",
    type: "website",
    url: "https://moggie.dev",
    siteName: "moggie.dev",
    images: ["/profile.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aung Myint Myat — Software Engineer",
    description:
      "Software engineer focused on building fast, scalable, and thoughtful web applications.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              url: "https://moggie.dev",
              knowsAbout: [
                "Full-Stack Development",
                "TypeScript",
                "React",
                "Node.js",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
