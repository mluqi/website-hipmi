"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaNewspaper,
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
  FaUserCircle,
  FaTachometerAlt,
  FaTimes,
  FaChair,
  FaLandmark,
  FaRegNewspaper,
  FaPhoneAlt,
} from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isMobileOpen,
  onCloseMobile,
}) => {
  const { logout, user } = useAuth();
  const router = useRouter();

  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
    { href: "/admin/sejarah", label: "Sejarah", icon: FaRegNewspaper },
    { href: "/admin/kontak", label: "Kontak", icon: FaPhoneAlt },
    { href: "/admin/berita", label: "Berita", icon: FaNewspaper },
    { href: "/admin/kegiatan", label: "Kegiatan", icon: FaCalendarAlt },
    { href: "/admin/anggota", label: "Anggota", icon: FaUsers },
    { href: "/admin/jabatan", label: "List Jabatan", icon: FaChair },
    { href: "/admin/bidang", label: "List Bidang", icon: FaLandmark },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    alert("Anda telah logout");
    window.location.href = "/admin/login";
  };

  const baseClasses =
    "bg-slate-800 text-slate-100 flex flex-col min-h-screen transition-transform duration-300 ease-in-out";
  const mobileClasses = `fixed inset-y-0 left-0 z-50 w-64 transform ${
    isMobileOpen ? "translate-x-0" : "-translate-x-full"
  }`;
  const desktopClasses = "md:static md:translate-x-0 md:w-64 md:flex-shrink-0";

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`${baseClasses} ${mobileClasses} ${desktopClasses}`}>
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">HIPMI CMS</h2>
          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="md:hidden text-slate-300 hover:text-white"
            aria-label="Close sidebar"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="p-4 mt-auto border-t border-slate-700">
          <button
            onClick={() => {
              handleLogout();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-3 px-2 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {/* User Info (Optional) */}
          {user && (
            <div className="px-4 py-3 mb-4 border-b border-slate-700">
              <p className="text-sm font-medium text-white truncate">
                {user.name || "Admin User"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user.email || "admin@example.com"}
              </p>
            </div>
          )}
          {/* Sidebar items */}
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
                ${
                  pathname === item.href
                    ? "bg-white/15 text-white shadow-md"
                    : "hover:bg-slate-700 hover:text-white"
                }`}
              onClick={onCloseMobile}
            >
              <item.icon className="text-lg" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
