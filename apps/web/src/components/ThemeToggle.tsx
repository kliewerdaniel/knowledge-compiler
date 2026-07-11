"use client";

import { useStore } from "@/lib/store";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)] transition-all duration-150 w-full"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 text-[var(--warning)]" />
        ) : (
          <Moon className="w-4 h-4 text-[var(--color-primary)]" />
        )}
      </motion.div>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
