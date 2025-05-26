"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";
import { FaBars } from "react-icons/fa";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      if (!isLoading && isAuthenticated) {
        router.replace("/admin/dashboard");
      }
    } else {
      if (!isLoading && !isAuthenticated) {
        router.replace("/admin/login");
      }
    }
  }, [pathname, router, isAuthenticated, isLoading]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (pathname === "/admin/login" && !isAuthenticated) {
    return <>{children}</>;
  }

  if (isAuthenticated && pathname !== "/admin/login") {
    return (
      <div className="flex bg-slate-100 min-h-screen">
        <AdminSidebar
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={closeMobileMenu}
        />
        <div className="flex-1 flex flex-col">
          {/* Header Mobile dengan Tombol Hamburger */}
          <header className="md:hidden bg-slate-800 text-white p-4 flex justify-between items-center sticky top-0 z-30 shadow-md">
            <h2 className="text-xl font-semibold">HIPMI CMS</h2>
            <button onClick={toggleMobileMenu} aria-label="Toggle menu">
              <FaBars size={24} />
            </button>
          </header>
          <main className="flex-1 p-4 md:p-8 lg:p-10">{children}</main>
        </div>
      </div>
    );
  }

  return null;
}
