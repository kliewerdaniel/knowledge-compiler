"use client";

import { Sidebar } from "@/components/Sidebar";
import { DataProvider } from "@/components/DataProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
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
        <TooltipProvider>
          <DataProvider>
            <div className="flex min-h-screen w-full">
              <Sidebar />
              <main className="flex-1 min-w-0 transition-all duration-200">
                {children}
              </main>
            </div>
          </DataProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
