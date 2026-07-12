"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Network,
  GitGraph,
  Layers,
  Search,
  FileText,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/graph", label: "Knowledge Graph", icon: Network },
  { href: "/concepts", label: "Concept Map", icon: GitGraph },
  { href: "/clusters", label: "Clusters", icon: Layers },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/search", label: "Search", icon: Search },
];

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] flex flex-col transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-auto"
        )}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-[var(--border-color)]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20 transition-colors">
              <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
                Knowledge
              </span>
              <span className="text-[10px] text-[var(--text-muted)] leading-tight">
                Compiler
              </span>
            </div>
          </Link>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 rounded-md hover:bg-[var(--hover-bg)] text-[var(--text-secondary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]"
                )}
              >
                <Icon className={cn(
                  "w-4 h-4 transition-transform duration-150",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )} />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="ml-auto w-1 h-4 rounded-full bg-[var(--color-primary)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-3 border-t border-[var(--border-color)] space-y-1">
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
