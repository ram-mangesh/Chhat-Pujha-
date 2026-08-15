import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chhath Vibes - Chhath Songs on repeat.",
  description: "Classic Chhath Puja banger that plays during Chhath Puja. Full Cultural Vibes.",
  applicationName: "Chhath Vibes - Chhath Songs on repeat.",
  author: "Chhath Vibes - Chhath Songs on repeat.",
  keywords: ["Chhath Puja songs", "chhath puja playlist", "chhath playlist", "sharda sinha chhath songs"],
  robots: "index, follow",
  openGraph: {
    title: "Chhath Vibes - Chhath Songs on repeat.",
    description: "Classic Chhath Puja banger that plays during Chhath Puja. Full Cultural Vibes.",
    url: "https://www.chhathvibes.in",
    siteName: "Chhath Vibes - Chhath Songs on repeat.",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://music-bts.s3.ap-south-1.amazonaws.com/music-bts/chhath-song/media/chhth-puja-bg.webp",
        width: 1200,
        height: 628,
        alt: "Chhath Vibes - Chhath Songs on repeat.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chhath Vibes - Chhath Songs on repeat.",
    description: "Classic Chhath Puja banger that plays during Chhath Puja. Full Cultural Vibes.",
    images: ["https://music-bts.s3.ap-south-1.amazonaws.com/music-bts/chhath-song/media/chhth-puja-bg.webp"],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased h-dvh`}>
        {children}
        <script src="https://www.youtube.com/iframe_api" async />
      </body>
    </html>
  );
}
