import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daly Games - Descubra Jogos incrível para se divertir.",
  description: "Mais de 10 mil jogos separados e organizados.",
  keywords: ["games", "jogos", "game", "daly games","steam"],
  authors: [{ name: "Daly Games" }, {name: "Breno Klywer" }],
  openGraph:{ images: [`${process.env.PROJECT_URL}/preview.png`]},
  robots:{ index: true, follow: true, nocache: true, googleBot: { index: true, follow: true, noimageindex: true } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
