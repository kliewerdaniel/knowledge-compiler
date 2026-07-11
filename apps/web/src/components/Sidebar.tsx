"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  Home,
  Network,
  GitGraph,
  Layers,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/graph", label: "Knowledge Graph", icon: Network },
  { href: "/concepts", label: "Concept Map", icon: GitGraph },
  { href: "/clusters", label: "Clusters", icon: Layers },
  { href: "/search", label: "Search", icon: Search },
];

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const activePage = useStore((s) => s.activePage);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-64 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] flex flex-col transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-[var(--border-color)]">
          <Link href="/" className="flex items-center gap-2">
            <Network className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="font-semibold text-[var(--text-primary)]">
              Knowledge Compiler
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded-md hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              activePage === item.label.toLowerCase().replace(" ", "") ||
              pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-[var(--border-color)]">
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
