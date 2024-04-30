import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Decoration from "./components/Decoration";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Crypto Clinic",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex gap-2 p-2 h-screen">
          <Decoration />
          <div className="flex-1 flex flex-col gap-6 justify-between items-center p-3 pt-8 pb-8 bg-[#f1f0e7] rounded-3xl shadow-[0_0_0_1px_#d2d0c9]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}