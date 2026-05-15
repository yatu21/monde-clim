import { Switch, Route } from "wouter";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n";

// ============================================================
// PAGE IMPORTS — Add new pages here and register a Route below
// ============================================================
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

// ============================================================
// APP ROUTER
// ============================================================
// To add a new page:
//   1. Create src/pages/MyPage.tsx
//   2. Import it above
//   3. Add <Route path="/my-page" component={MyPage} />
// ============================================================

function Router() {
  return (
    <Switch>
      {/* Main pages */}
      <Route path="/" component={Home} />
      <Route path="/produits" component={Products} />
      <Route path="/services" component={Services} />
      <Route path="/projets" component={Projects} />
      <Route path="/a-propos" component={About} />
      <Route path="/contact" component={Contact} />

      {/* 404 fallback */}
      <Route>
        <div className="min-h-screen flex items-center justify-center bg-[#0A2540] text-white text-center p-8">
          <div>
            <div className="text-7xl font-bold text-[#1E88E5] mb-4">404</div>
            <h1 className="text-2xl font-bold mb-2">Page non trouvée</h1>
            <p className="text-white/60 mb-6">La page que vous cherchez n'existe pas.</p>
            <a href="/" className="bg-[#1E88E5] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1976D2] transition-colors">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    // ThemeProvider handles dark/light mode (stored in localStorage)
    <ThemeProvider defaultTheme="system" storageKey="monde-clim-theme">
      {/* I18nProvider handles FR/AR/EN language switching with RTL support */}
      <I18nProvider>
        <Router />
      </I18nProvider>
    </ThemeProvider>
  );
}
