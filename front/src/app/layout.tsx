"use client";

import { AuthProvider } from "@/app/contexts/authContext";
import { CartProvider } from "@/app/contexts/cartContext";
import { FavoriteProvider } from "@/app/contexts/favoriteContext";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Category from "./Category";



const primaryFont = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--primary-font",
});

const secondaryFont = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--secondary-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={secondaryFont.className}>
      <body
        className={`${primaryFont.variable} ${secondaryFont.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <CartProvider>
            <FavoriteProvider>
              <Navbar />
              <Category />
              <main className="flex-grow container">{children}</main>
              <Footer />
            </FavoriteProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
