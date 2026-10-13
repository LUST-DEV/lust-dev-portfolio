import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      if (typeof window === "undefined") return defaultTheme;
      const previewTheme = new URLSearchParams(window.location.search).get("theme");
      if (previewTheme === "light" || previewTheme === "dark") return previewTheme;
      try {
        const stored = window.localStorage.getItem("lust-dev-theme");
        if (stored === "light" || stored === "dark") return stored;
      } catch {
        // Keep the site usable when browser storage is unavailable.
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("theme-dark", theme === "dark");
    root.style.colorScheme = theme;

    if (switchable) {
      try {
        window.localStorage.setItem("lust-dev-theme", theme);
      } catch {
        // Theme still works for the current page when storage is unavailable.
      }
    }
  }, [theme, switchable]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
