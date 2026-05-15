import { createContext, useContext, useEffect, useState } from "react";

// ============================================================
// THEME PROVIDER — Dark / Light / System mode
// ============================================================
// The selected theme is stored in localStorage under `storageKey`.
// The `.dark` CSS class is toggled on <html> to trigger dark mode styles.
//
// Usage in any component:
//   const { theme, setTheme } = useTheme();
//   setTheme("dark");   // or "light" or "system"
// ============================================================

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => null,
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "monde-clim-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      {...props}
      value={{
        theme,
        setTheme: (newTheme: Theme) => {
          localStorage.setItem(storageKey, newTheme);
          setTheme(newTheme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
