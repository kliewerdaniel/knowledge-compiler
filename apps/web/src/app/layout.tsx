"use client";

import { Sidebar } from "@/components/Sidebar";
import { useStore } from "@/lib/store";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useStore((s) => s.theme);

  return (
    <html lang="en" className={theme === "light" ? "light" : ""}>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Sidebar />
        <main
          className={`lg:ml-64 min-h-screen transition-all duration-200 ${
            useStore.getState().sidebarOpen ? "lg:ml-64" : ""
          }`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
