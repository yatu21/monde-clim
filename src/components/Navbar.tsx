import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useI18n } from "@/lib/i18n";
import { useCompany } from "@/hooks/useCompany";

// ============================================================
// NAVBAR COMPONENT
// ============================================================
// - Fixed top navbar with scroll-aware background
// - Language switcher (FR / AR / EN)
// - Dark/light mode toggle
// - Mobile hamburger menu
// - "Demander un devis" CTA button
//
// To change navigation links, edit the `navLinks` array below.
// To change the logo text or colors, search for "MONDE" / "CLIM".
// ============================================================

// Navigation links — edit href and key to add/remove pages
const navLinks = [
  { key: "nav.home",     href: "/" },
  { key: "nav.products", href: "/produits" },
  { key: "nav.services", href: "/services" },
  { key: "nav.projects", href: "/projets" },
  { key: "nav.about",    href: "/a-propos" },
  { key: "nav.contact",  href: "/contact" },
];

interface NavbarProps {
  onQuoteOpen: () => void;
}

export default function Navbar({ onQuoteOpen }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();
  const company = useCompany();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Show solid background after scrolling 20px
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const langLabels: Record<string, string> = { fr: "FR", ar: "ع", en: "EN" };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A2540]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#1E88E5] rounded-sm flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22" />
                <path d="M8 6l4-4 4 4" /><path d="M8 18l4 4 4-4" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M6 8l-4 4 4 4" /><path d="M18 8l4 4-4 4" />
              </svg>
            </div>
            <div>
              {/* Edit company name parts here */}
              <span className="text-white font-display font-bold text-lg leading-none tracking-wide">
                {company.name.split(" ")[0]}
              </span>
              <span className="text-[#1E88E5] font-display font-bold text-lg leading-none tracking-wide">
                {" "}{company.name.split(" ")[1]}
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location === link.href
                    ? "text-[#1E88E5]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden lg:flex items-center gap-2">

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-white/80 hover:text-white rounded-md border border-white/20 hover:border-white/40 transition-colors"
              >
                {langLabels[language]}
                <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full mt-1 right-0 bg-[#0A2540] border border-white/10 rounded-lg shadow-xl overflow-hidden min-w-[130px]"
                  >
                    {(["fr", "ar", "en"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setLangOpen(false); }}
                        className={`block w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors ${language === lang ? "text-[#1E88E5]" : "text-white"}`}
                      >
                        {lang === "fr" ? "Français" : lang === "ar" ? "العربية" : "English"}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors"
              title="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Quote CTA Button */}
            <button
              onClick={onQuoteOpen}
              className="bg-[#1E88E5] hover:bg-[#1976D2] text-white text-sm font-semibold px-5 py-2 rounded-md transition-colors"
            >
              {t("hero.cta")}
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-white rounded-md hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A2540]/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    location === link.href
                      ? "text-[#1E88E5] bg-white/5"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="flex items-center gap-3 px-3 pt-3 border-t border-white/10 mt-3">
                <div className="flex gap-1">
                  {(["fr", "ar", "en"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                        language === lang
                          ? "border-[#1E88E5] text-[#1E88E5]"
                          : "border-white/20 text-white/60 hover:text-white"
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button onClick={toggleTheme} className="p-1.5 text-white/70 hover:text-white ml-auto">
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
              <button
                onClick={() => { onQuoteOpen(); setMenuOpen(false); }}
                className="w-full mt-2 bg-[#1E88E5] hover:bg-[#1976D2] text-white font-semibold px-4 py-2.5 rounded-md text-sm transition-colors"
              >
                {t("hero.cta")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
