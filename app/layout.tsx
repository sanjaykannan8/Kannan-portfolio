import type { Metadata } from "next";
import "./globals.css";

import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio-Kannan",
  description: "Design by Kannan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <img className='bg' src="/bg-kannan.png" alt="logo" />
        {children}
      </body>
    </html>
  );
}
