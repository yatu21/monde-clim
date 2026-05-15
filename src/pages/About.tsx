import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Award, Users, Clock, Globe, CheckCircle2 } from "lucide-react";
import { useCompany } from "@/hooks/useCompany";
import Layout from "@/components/Layout";

// ============================================================
// ABOUT PAGE
// ============================================================
// Sections:
//   1. Header — page title
//   2. Story — company description + animated stat counters
//   3. Values — 4 key value propositions
//   4. Timeline — company milestones
//   5. Certifications — brand partnerships
//
// Stats and certifications are pulled from src/config/company.json
// Timeline milestones are defined in the `milestones` array below
// ============================================================

// Animated counter component — counts up when scrolled into view
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

// ── Timeline milestones — edit here ─────────────────────────
const milestones = [
  { year: "2016", title: "Fondation",             desc: "MONDE CLIM est créée à Casablanca avec une équipe de 3 techniciens passionnés." },
  { year: "2018", title: "Expansion régionale",   desc: "Ouverture de points de service à Rabat et Marrakech. Premier contrat commercial majeur." },
  { year: "2020", title: "Partenariats marques",  desc: "Signature de partenariats officiels avec Gree, Daikin et Carrier au Maroc." },
  { year: "2022", title: "Certification VRV/VRF", desc: "Obtention des certifications pour l'installation de systèmes VRV haute capacité." },
  { year: "2024", title: "+1200 installations",   desc: "Franchissement du cap des 1200 installations réussies. Expansion vers Fès et Tanger." },
];

// ── Values cards — edit here ─────────────────────────────────
const values = [
  { icon: <Award size={24} />,  title: "Excellence technique", desc: "Nos techniciens suivent des formations continues auprès des constructeurs." },
  { icon: <Users size={24} />,  title: "Service client",       desc: "Un interlocuteur dédié pour chaque projet, du devis à la mise en service." },
  { icon: <Clock size={24} />,  title: "Réactivité",           desc: "Intervention sous 24h pour les urgences, 7 jours sur 7." },
  { icon: <Globe size={24} />,  title: "Couverture nationale", desc: "Présents dans les 12 principales villes du Maroc." },
];
// ─────────────────────────────────────────────────────────────

export default function About() {
  const company = useCompany();

  return (
    <Layout>
      {/* ── Page Header ── */}
      <div className="bg-[#0A2540] pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Notre histoire</p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">À Propos de {company.name}</h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Depuis {company.founded}, nous accompagnons les particuliers et les entreprises dans leurs projets de climatisation avec expertise et professionnalisme.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Story + Stats ── */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Text column */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Qui sommes-nous</p>
              <h2 className="text-3xl font-display font-bold text-foreground mb-5">L'expertise HVAC au service de votre confort</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {company.name} est une entreprise marocaine spécialisée dans la vente, l'installation, la maintenance et le dépannage de systèmes de climatisation. Fondée en {company.founded}, nous avons rapidement gagné la confiance de nos clients grâce à notre sérieux et notre expertise.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nous travaillons avec les plus grandes marques mondiales — {company.brands.join(", ")} — pour vous offrir les solutions les plus performantes et économes en énergie du marché.
              </p>
              <ul className="space-y-2.5">
                {["Équipe de 25+ techniciens qualifiés", "Intervention dans 12 villes marocaines", "Service après-vente réactif", "Stock de pièces détachées d'origine"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-[#1E88E5] flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Animated stat counters */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {company.stats.map((stat) => (
                <div key={stat.label} className="bg-[#0A2540] rounded-2xl p-6 text-center">
                  <div className="text-3xl font-display font-bold text-[#1E88E5] mb-1">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Ce qui nous distingue</p>
            <h2 className="text-3xl font-display font-bold text-foreground">Nos valeurs</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-[#1E88E5]/40 transition-colors"
              >
                <div className="w-12 h-12 bg-[#1E88E5]/10 rounded-xl flex items-center justify-center text-[#1E88E5] mb-4">{v.icon}</div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Notre parcours</p>
            <h2 className="text-3xl font-display font-bold text-foreground">Moments clés</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={m.year}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-5 pl-14 relative"
                >
                  <div className="absolute left-0 w-12 h-12 bg-[#0A2540] border-2 border-[#1E88E5] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1E88E5] text-xs font-bold">{m.year.slice(2)}</span>
                  </div>
                  <div>
                    <div className="text-[#1E88E5] text-xs font-bold mb-1">{m.year}</div>
                    <h4 className="font-bold text-foreground mb-1">{m.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-16 bg-[#0A2540]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Qualifications</p>
            <h2 className="text-3xl font-display font-bold text-white">Certifications & Partenariats</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {company.certifications.map((cert, i) => (
              <motion.div key={cert}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4"
              >
                <Award size={18} className="text-[#1E88E5] flex-shrink-0" />
                <span className="text-white/80 text-sm font-medium">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
