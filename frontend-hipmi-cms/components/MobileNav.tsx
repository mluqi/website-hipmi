"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CiMenuBurger } from "react-icons/ci";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Keanggotaan",
    path: "/keanggotaan",
  },
  {
    name: "Berita dan Kegiatan",
    path: "/berita-dan-kegiatan",
  },
  {
    name: "Sejarah",
    path: "/sejarah",
  },
  {
    name: "Kontak",
    path: "/kontak",
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted state after initial render for portal

    const handleHashChange = () => {
      setActiveHash(window.location.hash || "/");
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    // Handle click outside to close menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(path);
      const navbarHeight = document.getElementById("navbar")?.offsetHeight || 0;
      const additionalOffset = 85;
      if (targetElement) {
        window.scrollTo({
          top:
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            additionalOffset,
          behavior: "smooth",
        });
      }
    } else if (path === "/") {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Tombol menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center z-[60]"
        aria-label="Toggle menu"
      >
        <CiMenuBurger className="text-[32px] text-accent" />
      </button>

      {isMounted &&
        isOpen &&
        createPortal(
          // Overlay dengan blur effect
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />,
          document.body
        )}

      {isMounted &&
        isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className={`fixed top-0 right-0 h-full w-64 bg-secondary/90 backdrop-blur-lg text-white transition-all shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="flex justify-end p-4 items-right absolute top-0 right-0 hover:cursor-pointer hover:text-accent"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
            <div className="p-6 h-full flex flex-col">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-6 mt-10">
                {links.map((link, index) => (
                  <a
                    href={link.path}
                    key={index}
                    onClick={(e) => handleScroll(e, link.path)}
                    className="text-white border-b-2 border-white/20 capitalize text-lg hover:text-accent transition-all"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default MobileNav;
