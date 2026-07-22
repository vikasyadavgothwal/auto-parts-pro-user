"use client"; // Required for useState

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Make sure lucide-react is installed
import { BrandLogo } from "@/components/site/shared/brand-logo";
import { Button } from "@/components/ui/button";

export const BusinessHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-brand-surface/80 backdrop-blur-md">
      <div className="site-container-wide">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-12">
            <BrandLogo href="/" />
            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 md:flex">
              <Link href="/search" className="text-brand-muted transition-colors hover:text-white">Browse Parts</Link>
              <Link href="/rfq" className="text-brand-muted transition-colors hover:text-white">Request Quote</Link>
              <Link href="/business" className="font-medium text-[#DC2626]">For Business</Link>
            </nav>
          </div>
          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" className="text-brand-muted hover:text-white">Sign in</Button>
            <Button className="rounded-xl text-white hover:bg-brand-primary-hover">Get Started</Button>
          </div>
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-brand-muted" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <nav className="md:hidden border-b border-border bg-brand-surface p-6 flex flex-col gap-4">
          <Link href="/search" className="text-brand-muted hover:text-white">Browse Parts</Link>
          <Link href="/rfq" className="text-brand-muted hover:text-white">Request Quote</Link>
          <Link href="/business" className="font-medium text-[#DC2626]">For Business</Link>
          <hr className="border-border" />
          <Button variant="ghost" className="justify-start">Sign in</Button>
          <Button>Get Started</Button>
        </nav>
      )}
    </header>
  );
};
