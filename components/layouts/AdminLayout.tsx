"use client";

import { useAuthStore } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_LINKS } from "../constants";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        {/* Logo Admin */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link
            href="/admin"
            className="font-bold text-xl text-red-600 tracking-tight"
          >
            CINEBOOK ADMIN
          </Link>
        </div>

        {/* Danh sách Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {ADMIN_NAV_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                        isActive
                          ? "bg-red-50 text-red-600"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Admin (Topbar) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
          <h2 className="text-lg font-semibold text-gray-800">
            System Management
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              Welcome, {user?.userName || "Admin"}
            </span>
            <img
              src={user?.avatarUrl || "/default-avatar.png"}
              alt="Admin"
              className="w-9 h-9 rounded-full object-cover border"
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
