import { Playfair_Display, Oswald, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Garage 910 | Reparação Automotiva",
  description:
    "Oficina especializada em pintura, lanternagem e recuperação de parachoque. Qualidade e confiança em cada serviço.",
  openGraph: {
    title: "Garage 910 | Reparação Automotiva",
    description:
      "Pintura, lanternagem e recuperação de parachoque em geral.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-garage-black text-garage-white">
        {children}
      </body>
    </html>
  );
}
