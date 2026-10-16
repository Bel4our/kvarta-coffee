import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Кварта — обжарка спешелти кофе в Минске",
  description:
    "Обжариваем небольшими партиями по 5 кг по четвергам. Доставляем по Минску на 1–3 день после ростера. Свежесть в каждой чашке.",
  metadataBase: new URL("https://kvarta-coffee.by"), 
  openGraph: {
    title: "Обжарка кофе «Кварта» | Минск",
    description: "Свежеобжаренный кофе по 5 кг с доставкой на следующий день после ростера.",
    type: "website",
    locale: "ru_BY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru-BY" className={`${sansFont.variable} ${serifFont.variable}`}>
      <body className="font-sans bg-craft-bg text-craft-text antialiased selection:bg-craft-accent/20 selection:text-craft-accent">
        {children}
      </body>
    </html>
  );
}