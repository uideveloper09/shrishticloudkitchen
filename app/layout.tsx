import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { imgPath } from "@/lib/utils";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Shrishti Cloud Kitchen – Homemade Paratha Delivery",
  description:
    "Order fresh homemade parathas online. Aloo, Paneer, Sattu and more.",
  icons: {
    icon: imgPath("@/images/logo.png"),
    apple: imgPath("@/images/logo.png"),
  },
  openGraph: {
    title: "Shrishti Cloud Kitchen – Homemade Paratha Delivery",
    description:
      "Order fresh homemade parathas online. Aloo, Paneer, Sattu and more.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`min-h-full ${playfair.variable} ${lato.variable}`}>
      <body className="min-h-screen flex flex-col bg-secondary text-accent font-sans" style={{ backgroundColor: "#f5efe6", color: "#5c3a21" }}>
        <Providers>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <ScrollToTop />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
