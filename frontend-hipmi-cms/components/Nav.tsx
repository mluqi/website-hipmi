"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const links = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Keanggotaan",
        path: "/keanggotaan"
    },
    {
        name: "Berita dan Kegiatan",
        path: "/berita-dan-kegiatan"
    },
    {
        name: "Sejarah",
        path: "/sejarah"
    },
    {
        name: "Kontak",
        path: "/kontak"
    }
]

const Nav = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      links.forEach((link) => {
        if (link.path.startsWith("#")) {
          const targetElement = document.querySelector(link.path);
          if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const navbarHeight =
              document.getElementById("navbar")?.offsetHeight || 0;
            if (
              rect.top <= navbarHeight + 10 &&
              rect.bottom > navbarHeight + 10
            ) {
              setActiveLink(link.path);
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (
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
      // Jika sudah di halaman utama, cegah navigasi default dan scroll ke atas
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav id="navbar" className="flex items-center gap-8">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.path}
          onClick={(e) => handleClick(e, link.path)}
          className={`
            uppercase text-accent transition-all
            ${
              (link.path.startsWith("#") && activeLink === link.path) || 
              (!link.path.startsWith("#") && pathname === link.path)    
                ? "font-medium border-b-2 border-accent" 
                : "font-light" 
            }
             hover:border-b-2 hover:border-accent 
          `}
        >
          {link.name}
        </a>
      ))}
    </nav>
  );
};

export default Nav