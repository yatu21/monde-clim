import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ============================================================
// INTERNATIONALIZATION (i18n)
// ============================================================
// Supports: French (fr), Arabic (ar), English (en)
// Arabic automatically switches the page to RTL layout.
//
// To ADD a new translation key:
//   1. Add the key + French text in the `fr` section
//   2. Add Arabic translation in `ar`
//   3. Add English translation in `en`
//   4. Use it in any component: const { t } = useI18n(); t("my.key")
//
// To ADD a new language:
//   1. Add it to the Language type
//   2. Add a full translations block for it below
//   3. Add it to the language switcher in Navbar.tsx
// ============================================================

type Language = "fr" | "ar" | "en";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// ============================================================
// TRANSLATIONS — Edit text here for each language
// ============================================================
const translations: Record<Language, Record<string, string>> = {
  // French (default)
  fr: {
    "nav.home":        "Accueil",
    "nav.products":    "Produits",
    "nav.services":    "Services",
    "nav.projects":    "Projets",
    "nav.about":       "À Propos",
    "nav.contact":     "Contact",
    "hero.slogan":     "Votre confort, notre expertise",
    "hero.tagline":    "Experts en Climatisation au Maroc",
    "hero.cta":        "Demander un devis",
    "hero.secondaryCta": "Nos Produits",
  },
  // Arabic (RTL)
  ar: {
    "nav.home":        "الرئيسية",
    "nav.products":    "المنتجات",
    "nav.services":    "الخدمات",
    "nav.projects":    "المشاريع",
    "nav.about":       "من نحن",
    "nav.contact":     "اتصل بنا",
    "hero.slogan":     "راحتك، خبرتنا",
    "hero.tagline":    "خبراء التكييف في المغرب",
    "hero.cta":        "اطلب تسعيرة",
    "hero.secondaryCta": "منتجاتنا",
  },
  // English
  en: {
    "nav.home":        "Home",
    "nav.products":    "Products",
    "nav.services":    "Services",
    "nav.projects":    "Projects",
    "nav.about":       "About",
    "nav.contact":     "Contact",
    "hero.slogan":     "Your comfort, our expertise",
    "hero.tagline":    "HVAC Experts in Morocco",
    "hero.cta":        "Get a Quote",
    "hero.secondaryCta": "Our Products",
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Restore last selected language from localStorage
    const saved = localStorage.getItem("monde-clim-language");
    return (saved as Language) || "fr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("monde-clim-language", lang);
  };

  useEffect(() => {
    // Toggle RTL direction for Arabic
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    // Falls back to French if key is missing in current language
    return translations[language]?.[key] || translations.fr[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook to use i18n in any component
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
