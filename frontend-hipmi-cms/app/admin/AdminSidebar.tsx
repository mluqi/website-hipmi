"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaNewspaper,
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
  FaUserEdit,
  FaTimes,
  FaChair,
  FaLandmark,
  FaRegNewspaper,
  FaPhoneAlt,
  FaLayerGroup,
  FaEnvelope,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  isDesktopHidden: boolean;
  toggleDesktopSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isMobileOpen,
  onCloseMobile,
  isDesktopHidden,
  toggleDesktopSidebar,
}) => {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    alert("Anda telah logout");
    window.location.href = "/admin/login";
  };

  const navGroups = [
    {
      name: "Umum",
      items: [
        { href: "/admin/dashboard", label: "Dashboard", icon: MdDashboard },
        { href: "/admin/sejarah", label: "Sejarah", icon: FaRegNewspaper },
        { href: "/admin/kontak", label: "Kontak", icon: FaPhoneAlt },
      ],
    },
    {
      name: "Konten",
      items: [
        { href: "/admin/berita", label: "Berita", icon: FaNewspaper },
        { href: "/admin/kegiatan", label: "Kegiatan", icon: FaCalendarAlt },
        { href: "/admin/anggota", label: "Anggota", icon: FaUsers },
      ],
    },
    {
      name: "Master Data",
      items: [
        { href: "/admin/jabatan", label: "List Jabatan", icon: FaChair },
        { href: "/admin/bidang", label: "List Bidang", icon: FaLandmark },
        { href: "/admin/kategori", label: "List Kategori", icon: FaLayerGroup },
        { href: "/admin/pesan", label: "Pesan", icon: FaEnvelope },
      ],
    },
  ];

  const sidebarBaseClasses =
    "bg-slate-800 text-slate-100 flex flex-col h-full z-40 transition-transform duration-300 ease-in-out";
  let sidebarContainerClasses = sidebarBaseClasses;

  if (isMobileOpen) {
    sidebarContainerClasses += " fixed w-64 translate-x-0 md:hidden";
  } else {
    sidebarContainerClasses +=
      " fixed -translate-x-full md:translate-x-0 md:relative";
    if (isDesktopHidden) {
      sidebarContainerClasses += " md:w-16";
    } else {
      sidebarContainerClasses += " md:w-64";
    }
  }

  const fullSidebarContent = (
    <>
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">HIPMI CMS</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onCloseMobile}
            className="md:hidden text-slate-300 hover:text-white"
            aria-label="Close sidebar"
          >
            <FaTimes size={24} />
          </button>
          {!isDesktopHidden && (
            <button
              onClick={toggleDesktopSidebar}
              className="hidden md:block text-slate-300 hover:text-white"
              aria-label="Hide sidebar"
            >
              <FaChevronLeft size={20} />
            </button>
          )}
        </div>
      </div>

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

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navGroups.map((group, groupIndex) => (
          <div key={group.name} className="mb-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
              {group.name}
            </h3>
            <div className="flex flex-col space-y-1">
              {group.items.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
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
            </div>
            {groupIndex < navGroups.length - 1 && (
              <hr className="my-4 border-slate-700" />
            )}
          </div>
        ))}
        <Link
          href="/admin/setting"
          className={`flex items-center gap-3 px-4 rounded-lg transition-colors
                ${
                  pathname === "/admin/setting"
                    ? "bg-white/15 text-white shadow-md"
                    : "hover:bg-slate-700 hover:text-white"
                }`}
          onClick={onCloseMobile}
        >
          <FaUserEdit className="text-lg" />
          Settings
        </Link>
      </nav>

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
    </>
  );

  const miniSidebarContent = (
    <div className="flex flex-col items-center h-full w-16 py-4 space-y-4">
      <button
        onClick={toggleDesktopSidebar}
        className="text-white p-2 rounded-full hover:bg-slate-700"
        aria-label="Show sidebar"
      >
        <FaChevronRight />
      </button>

      {navGroups.map((group) => (
        <div
          key={group.name}
          className="flex flex-col items-center space-y-2 w-full"
        >
          {group.items.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`p-3 rounded-lg transition-colors w-full flex justify-center
                    ${
                      pathname === item.href
                        ? "bg-white/15 text-white"
                        : "hover:bg-slate-700 text-slate-300 hover:text-white"
                    }`}
              title={item.label}
            >
              <item.icon className="text-lg" />
            </Link>
          ))}
        </div>
      ))}

      <Link
        href="/admin/setting"
        className={`p-3 rounded-lg transition-colors w-full flex justify-center
              ${
                pathname === "/admin/setting"
                  ? "bg-white/15 text-white"
                  : "hover:bg-slate-700 text-slate-300 hover:text-white"
              }`}
        title="Settings"
      >
        <FaUserEdit className="text-lg" />
      </Link>

      <div className="mt-auto w-full">
        <button
          onClick={handleLogout}
          className="p-3 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white w-full flex justify-center"
          title="Logout"
        >
          <FaSignOutAlt className="text-lg" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Main sidebar container */}
      <div className={sidebarContainerClasses}>
        {/* Mobile View Content: Always full content when open */}
        <div className="md:hidden h-full flex flex-col">
          {isMobileOpen && fullSidebarContent}
        </div>

        {/* Desktop View Content: Mini or Full content */}
        <div className="hidden md:flex flex-col h-full">
          {isDesktopHidden ? miniSidebarContent : fullSidebarContent}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
