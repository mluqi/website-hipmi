"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`py-5 xl:py-6 text-secondary w-full fixed top-0 z-50 bg-secondary/70 backdrop-blur-md shadow-md border-b border-accenttransition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-secondary/70 backdrop-blur-md shadow-md border-b border-accent"
          : "py-5 xl:py-8  text-white w-full top-0 z-50 bg-secondary/50 backdrop-blur-md shadow-md border-b border-accent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={500}
            height={500}
            className="w-20 xl:w-44 h-auto object-contain z"
            priority
          />
        </Link>

        <div className="hidden xl:flex gap-8">
          <Nav />
        </div>

        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
