import { useState, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import QuoteModal from "@/components/QuoteModal";

// ============================================================
// LAYOUT COMPONENT
// ============================================================
// Wraps every page with:
//   - Navbar (top)
//   - Page content (children)
//   - Footer (bottom)
//   - Floating WhatsApp button
//   - Quote Modal (opened via Navbar CTA)
//
// Usage in any page:
//   import Layout from "@/components/Layout";
//   export default function MyPage() {
//     return <Layout><YourContent /></Layout>;
//   }
// ============================================================

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Top Navigation ── */}
      <Navbar onQuoteOpen={() => setQuoteOpen(true)} />

      {/* ── Page Content ── */}
      <main className="flex-1">
        {children}
      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Floating WhatsApp Button ── */}
      <FloatingWhatsApp />

      {/* ── Quote Modal (triggered by Navbar CTA) ── */}
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
