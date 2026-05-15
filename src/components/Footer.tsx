import { Link } from "wouter";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCompany } from "@/hooks/useCompany";

// ============================================================
// FOOTER COMPONENT
// ============================================================
// 4-column layout: Brand | Navigation | Services | Contact
// All contact info is pulled from src/config/company.json
// To edit: phone, email, address → update company.json
// ============================================================

export default function Footer() {
  const { t } = useI18n();
  const company = useCompany();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#071A2E] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand Column ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#1E88E5] rounded-sm flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <path d="M8 6l4-4 4 4" /><path d="M8 18l4 4 4-4" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M6 8l-4 4 4 4" /><path d="M18 8l4 4-4 4" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg">
                <span className="text-white">{company.name.split(" ")[0]}</span>
                <span className="text-[#1E88E5]"> {company.name.split(" ")[1]}</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              {company.tagline} — {company.description}
            </p>
            {/* WhatsApp quick link */}
            <a
              href={`https://wa.me/${company.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>

          {/* ── Navigation Column ── */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: t("nav.home"),     href: "/" },
                { label: t("nav.products"), href: "/produits" },
                { label: t("nav.services"), href: "/services" },
                { label: t("nav.projects"), href: "/projets" },
                { label: t("nav.about"),    href: "/a-propos" },
                { label: t("nav.contact"),  href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services Column ── */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2.5">
              {/* Edit this list to match your actual services */}
              {["Installation", "Maintenance", "Réparation", "Recharge gaz", "Nettoyage", "Diagnostics", "Projets commerciaux"].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-white/60 hover:text-white text-sm transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Column ── */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${company.contact.phone}`} className="flex items-start gap-3 text-white/60 hover:text-white text-sm transition-colors group">
                  <Phone size={15} className="mt-0.5 flex-shrink-0 text-[#1E88E5]" />
                  {company.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.contact.email}`} className="flex items-start gap-3 text-white/60 hover:text-white text-sm transition-colors">
                  <Mail size={15} className="mt-0.5 flex-shrink-0 text-[#1E88E5]" />
                  {company.contact.email}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-white/60 text-sm">
                  <MapPin size={15} className="mt-0.5 flex-shrink-0 text-[#1E88E5]" />
                  {company.address.city}, {company.address.country}
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Couverture</h4>
              <p className="text-white/50 text-xs leading-relaxed">
                {company.coverage.slice(0, 7).join(" · ")}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {year} {company.name}. Tous droits réservés.
          </p>
          <p className="text-white/20 text-xs">
            Solutions HVAC professionnelles au Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
