"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Zap,
  LayoutDashboard,
  Wand2,
  Calendar,
  BarChart2,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "대시보드" },
  { href: "/dashboard/generate", icon: Wand2, label: "콘텐츠 생성" },
  { href: "/dashboard/calendar", icon: Calendar, label: "콘텐츠 캘린더" },
  { href: "/dashboard/analytics", icon: BarChart2, label: "성과 분석" },
  { href: "/dashboard/settings", icon: Settings, label: "설정" },
];

export default function DashboardHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const currentPage = navItems.find((item) => item.href === pathname);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      {/* Top header bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Mobile: Hamburger + Logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" fill="white" />
            </div>
            <span className="font-bold text-sm text-gray-900">
              AutoPost <span className="text-blue-600">Korea</span>
            </span>
          </Link>
        </div>

        {/* Desktop: Page title */}
        <div className="hidden lg:block">
          <h1 className="text-lg font-semibold text-gray-900">
            {currentPage?.label || "대시보드"}
          </h1>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
          </button>
          <Link
            href="/dashboard/generate"
            className="hidden sm:flex btn-primary text-sm py-2 px-4 rounded-lg"
          >
            + 콘텐츠 생성
          </Link>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <span className="font-bold text-base text-gray-900">
                  AutoPost <span className="text-blue-600">Korea</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : ""}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <LogOut className="w-5 h-5" />
                로그아웃
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
