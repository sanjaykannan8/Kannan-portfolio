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
        <Image className='bg' src="/portbg.jpg" alt="logo" width={600} height={600} />
        {children}
      </body>
    </html>
  );
}
