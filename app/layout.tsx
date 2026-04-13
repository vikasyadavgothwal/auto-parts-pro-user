import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto Parts Pro",
  description: "A comprehensive auto parts e-commerce platform built with Next.js, offering a wide range of high-quality automotive components and accessories for all types of vehicles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full bg-background antialiased"
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        {children}
      </body>
    </html>
  );
}
