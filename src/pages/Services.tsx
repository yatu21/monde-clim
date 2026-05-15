import { motion } from "framer-motion";
import { Wrench, Settings, Zap, Wind, Thermometer, BarChart3, Building2, Phone } from "lucide-react";
import { useCompany } from "@/hooks/useCompany";
import Layout from "@/components/Layout";

// ============================================================
// SERVICES PAGE
// ============================================================
// To add/remove a service: edit the `services` array below.
// To change process steps: edit the steps inside the "Process" section.
// Contact info is pulled from src/config/company.json.
// ============================================================

// ── Service cards data — edit here ──────────────────────────
const services = [
  {
    icon: <Settings size={28} />,
    title: "Installation",
    subtitle: "Mise en service complète",
    desc: "Installation professionnelle de tous types de climatiseurs — split, cassette, gainable, VRV/VRF. Nos techniciens certifiés garantissent une installation conforme aux normes constructeurs.",
    features: ["Raccordement frigorifique", "Liaison électrique", "Test de fonctionnement", "Formation utilisateur"],
    delay: 0,
  },
  {
    icon: <Wrench size={28} />,
    title: "Maintenance",
    subtitle: "Contrats d'entretien préventif",
    desc: "Protégez votre investissement avec nos contrats de maintenance préventive. Visites régulières, nettoyage, vérification et remplacement des pièces d'usure.",
    features: ["Nettoyage des filtres", "Vérification des pressions", "Contrôle des performances", "Rapport d'intervention"],
    delay: 0.1,
  },
  {
    icon: <Thermometer size={28} />,
    title: "Réparation",
    subtitle: "Dépannage 24h/7j",
    desc: "Panne de climatiseur ? Nos techniciens interviennent sous 24h pour diagnostiquer et réparer votre installation. Pièces détachées d'origine disponibles.",
    features: ["Diagnostic précis", "Devis avant intervention", "Pièces d'origine", "Garantie sur réparation"],
    delay: 0.2,
  },
  {
    icon: <Wind size={28} />,
    title: "Recharge gaz",
    subtitle: "Fluides frigorigènes certifiés",
    desc: "Votre climatiseur ne refroidit plus suffisamment ? Nos techniciens détectent les fuites et rechargent votre système avec le fluide frigorigène approprié (R32, R410A).",
    features: ["Détection de fuites", "Fluides certifiés", "Récupération réglementaire", "Contrôle de pression"],
    delay: 0.3,
  },
  {
    icon: <Zap size={28} />,
    title: "Nettoyage",
    subtitle: "Désinfection professionnelle",
    desc: "Un climatiseur propre consomme moins et diffuse un air sain. Notre service de nettoyage professionnel inclut démontage, lavage à haute pression et désinfection bactérienne.",
    features: ["Nettoyage haute pression", "Désinfection bactéricide", "Traitement anti-moisissures", "Filtre lavable"],
    delay: 0.4,
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Diagnostics",
    subtitle: "Analyse complète du système",
    desc: "Évaluation technique approfondie de votre installation HVAC. Nous identifions les anomalies, mesurons les performances et établissons un plan d'optimisation.",
    features: ["Analyse thermodynamique", "Mesure de consommation", "Bilan d'efficacité", "Rapport détaillé"],
    delay: 0.5,
  },
  {
    icon: <Building2 size={28} />,
    title: "Projets commerciaux",
    subtitle: "Solutions sur mesure",
    desc: "Hôtels, bureaux, centres commerciaux, hôpitaux — nous concevons et installons des systèmes HVAC centralisés adaptés aux exigences des grands espaces.",
    features: ["Étude thermique", "Conception sur mesure", "Installation multi-unités", "Maintenance contrat"],
    delay: 0.6,
  },
];
// ─────────────────────────────────────────────────────────────

export default function Services() {
  const company = useCompany();

  return (
    <Layout>
      {/* ── Page Header ── */}
      <div className="bg-[#0A2540] pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Expertise</p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">Nos Services</h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Des solutions complètes pour votre confort thermique — installation, entretien, réparation et bien plus.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div key={service.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: service.delay }}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-[#1E88E5]/50 hover:shadow-xl hover:shadow-[#1E88E5]/8 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#1E88E5]/10 rounded-2xl flex items-center justify-center text-[#1E88E5] mb-5 group-hover:bg-[#1E88E5] group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <div className="mb-4">
                  <h3 className="font-display font-bold text-foreground text-xl mb-1">{service.title}</h3>
                  <p className="text-[#1E88E5] text-sm font-medium">{service.subtitle}</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-[#1E88E5] rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Comment ça marche</p>
            <h2 className="text-3xl font-display font-bold text-foreground">Notre processus d'intervention</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
            {/* Connecting line between steps (desktop only) */}
            <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E88E5]/30 to-transparent hidden sm:block" />
            {[
              { step: "01", label: "Contact",     desc: "Appelez ou WhatsApp — nous répondons en moins d'1h." },
              { step: "02", label: "Diagnostic",  desc: "Un technicien analyse votre besoin sur place ou à distance." },
              { step: "03", label: "Devis",       desc: "Devis gratuit, transparent et sans engagement." },
              { step: "04", label: "Intervention",desc: "Notre équipe intervient dans les délais convenus." },
            ].map((item, i) => (
              <motion.div key={item.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-[#0A2540] dark:bg-[#1E3A5A] border-2 border-[#1E88E5] rounded-full flex items-center justify-center text-[#1E88E5] font-display font-bold text-xl mx-auto mb-4 relative z-10">
                  {item.step}
                </div>
                <h4 className="font-bold text-foreground mb-2">{item.label}</h4>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#0A2540]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Besoin d'un service urgent ?</h2>
            <p className="text-white/60 mb-8">Nous sommes disponibles 7j/7 pour vos urgences climatisation.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${company.contact.phone}`}
                className="inline-flex items-center gap-2 bg-white text-[#0A2540] font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors"
              >
                <Phone size={20} /> {company.contact.phoneDisplay}
              </a>
              <a href={`https://wa.me/${company.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#1EBE57] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
