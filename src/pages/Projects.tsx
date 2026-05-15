import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Layout from "@/components/Layout";

// ============================================================
// PROJECTS PAGE — Portfolio of completed installations
// ============================================================
// To add a new project: add an entry to the `projects` array below.
// Required fields: id, title, category, city, units, desc, image
// Images go in: public/images/projects/
// ============================================================

// ── Filter categories ────────────────────────────────────────
const categories = ["Tous", "Villas", "Appartements", "Bureaux", "Hôpitaux", "Commerces", "Gouvernemental"];

// ── Project data — edit here to add/remove projects ─────────
const projects = [
  {
    id: "1",
    title: "Villa Résidentielle de Luxe",
    category: "Villas",
    city: "Casablanca",
    units: 6,
    desc: "Installation de 6 unités split inverter dans une villa de luxe. Système multi-split centralisé avec contrôle domotique.",
    image: "/images/projects/villa-install.jpg",
  },
  {
    id: "2",
    title: "Tour de Bureaux Moderne",
    category: "Bureaux",
    city: "Rabat",
    units: 42,
    desc: "Projet VRV Daikin de 42 unités pour un immeuble de bureaux de 8 étages. Solution centralisée avec gestion BMS.",
    image: "/images/projects/office-install.jpg",
  },
  {
    id: "3",
    title: "Clinique Médicale Spécialisée",
    category: "Hôpitaux",
    city: "Marrakech",
    units: 18,
    desc: "Climatisation de salles d'opération, urgences et chambres avec filtration HEPA et contrôle de pression.",
    image: "/images/projects/hospital-install.jpg",
  },
  {
    id: "4",
    title: "Résidence Appartements Haut Standing",
    category: "Appartements",
    city: "Casablanca",
    units: 24,
    desc: "Équipement de 24 appartements en split inverter Gree avec maintenance contrat annuel inclus.",
    image: "/images/projects/residential-install.jpg",
  },
  {
    id: "5",
    title: "Centre Commercial & Boutiques",
    category: "Commerces",
    city: "Fès",
    units: 80,
    desc: "Système de climatisation centrale pour un mall de 15,000 m². Cassettes et systèmes gainables Carrier.",
    image: "/images/projects/commercial-install.jpg",
  },
  {
    id: "6",
    title: "Siège Gouvernemental",
    category: "Gouvernemental",
    city: "Rabat",
    units: 35,
    desc: "Installation dans un bâtiment administratif avec exigences de sécurité et de fiabilité maximales.",
    image: "/images/projects/government-install.jpg",
  },
  {
    id: "7",
    title: "Boutique Retail Premium",
    category: "Commerces",
    city: "Agadir",
    units: 8,
    desc: "Climatisation discrète et silencieuse pour une boutique de luxe. Cassettes plafond invisibles, confort optimal.",
    image: "/images/projects/shop-install.jpg",
  },
  {
    id: "8",
    title: "Villa de Prestige Marrakech",
    category: "Villas",
    city: "Marrakech",
    units: 8,
    desc: "Solution Mitsubishi haut de gamme avec contrôle par smartphone pour une villa de 800 m².",
    image: "/images/projects/villa-install.jpg",
  },
  {
    id: "9",
    title: "Installation Professionnelle",
    category: "Bureaux",
    city: "Casablanca",
    units: 12,
    desc: "Nos techniciens certifiés en action — installation propre et rapide selon les normes internationales.",
    image: "/images/projects/technician-install.jpg",
  },
];
// ─────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filtered = projects.filter(
    (p) => activeCategory === "Tous" || p.category === activeCategory
  );

  return (
    <Layout>
      {/* ── Page Header ── */}
      <div className="bg-[#0A2540] pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Portfolio</p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">Nos Réalisations</h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Découvrez quelques-uns de nos projets d'installation HVAC à travers le Maroc.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ── Category Tabs ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-[#1E88E5] border-[#1E88E5] text-white shadow-lg shadow-[#1E88E5]/25"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-[#1E88E5]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div key={project.id} layout
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-[#1E88E5]/50 hover:shadow-xl transition-all duration-300"
            >
              {/* Project photo */}
              <div className="h-52 relative overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="bg-[#1E88E5] text-white text-xs font-bold px-2.5 py-1 rounded-lg">{project.units} unités</div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">{project.category}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-foreground text-lg mb-1">{project.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
                  <MapPin size={12} /> {project.city}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">Aucun projet dans cette catégorie.</div>
        )}
      </div>

      {/* ── Technician Gallery Strip ── */}
      <section className="py-16 bg-[#0A2540]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Nos équipes</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Techniciens certifiés en action</h2>
          </motion.div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { src: "/images/projects/technician-install.jpg", label: "Installation" },
              { src: "/images/projects/technician-work.jpg",    label: "Mise en service" },
              { src: "/images/projects/technician-repair.jpg",  label: "Maintenance" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative rounded-xl overflow-hidden aspect-[4/3] group"
              >
                <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-white text-sm font-semibold">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">Votre projet est notre priorité</h2>
            <p className="text-muted-foreground mb-8">Parlez-nous de votre projet. Nous vous proposons une étude gratuite et un devis personnalisé.</p>
            <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1E88E5] hover:bg-[#1976D2] text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              Discuter de mon projet
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
