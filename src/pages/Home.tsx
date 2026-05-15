import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ChevronRight, Star, CheckCircle2, Shield, Zap, Award, Phone, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCompany } from "@/hooks/useCompany";
import productsData from "@/data/products.json";
import Layout from "@/components/Layout";

// ============================================================
// HOME PAGE
// ============================================================
// Sections:
//   1. Hero — full-screen with background photo + animated text
//   2. Stats — animated counters (from company.json)
//   3. Featured Products — first 4 products from products.json
//   4. Installation Showcase — project photo grid
//   5. Why Choose Us — 4 value propositions
//   6. Testimonials — auto-rotating slider
//   7. Coverage — city tags
//   8. CTA Banner — WhatsApp + phone CTAs
//
// To edit stats: update src/config/company.json > stats
// To edit testimonials: update the `testimonials` array below
// To edit "Why us" cards: update the `whyUs` array below
// ============================================================

// Animated number counter — triggers when scrolled into view
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
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

  return <span ref={ref}>{count.toLocaleString("fr-FR")}{suffix}</span>;
}

// Framer Motion variants
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

// ── Edit testimonials here ─────────────────────────────────
const testimonials = [
  { name: "Karim Benali",          city: "Casablanca", rating: 5, text: "Service impeccable ! L'équipe MONDE CLIM a installé 4 unités dans notre villa en une seule journée. Travail propre et professionnel." },
  { name: "Fatima Zahra Idrissi",  city: "Rabat",       rating: 5, text: "Je recommande vivement. Le technicien est ponctuel, compétent et transparent sur les tarifs. Mon climatiseur fonctionne parfaitement." },
  { name: "Mohamed El Fassi",      city: "Marrakech",   rating: 5, text: "Excellent rapport qualité-prix. MONDE CLIM a réparé mon clim en moins de 2h. Je suis client depuis 3 ans, toujours satisfait." },
  { name: "Amina Tazi",            city: "Fès",         rating: 5, text: "Professionnels et réactifs. Ils ont géré notre projet commercial de 20 unités avec une organisation remarquable." },
];

// ── Edit "Why Us" cards here ───────────────────────────────
const whyUs = [
  { icon: <Shield size={24} />,       title: "Garantie 2 ans",        desc: "Toutes nos installations sont couvertes par une garantie de 2 ans pièces et main-d'œuvre." },
  { icon: <Zap size={24} />,          title: "Intervention rapide",    desc: "Intervention sous 24h en urgence, 7j/7. Votre confort ne peut pas attendre." },
  { icon: <Award size={24} />,        title: "Techniciens certifiés",  desc: "Nos équipes sont formées et certifiées par les plus grandes marques HVAC mondiales." },
  { icon: <CheckCircle2 size={24} />, title: "Prix transparents",      desc: "Devis gratuit et détaillé avant chaque intervention. Aucune surprise à la facture." },
];
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const { t } = useI18n();
  const company = useCompany();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Show first 4 products as "featured"
  const featured = productsData.slice(0, 4);

  return (
    <Layout>

      {/* ══════════════════════════════════════════════
          HERO SECTION
          Background image: public/images/hero/hero-bg.jpg
          Replace this file to change the hero photo.
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {/* Hero background photo — replace /images/hero/hero-bg.jpg */}
          <img src="/images/hero/hero-bg.jpg" alt="MONDE CLIM hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/80 to-[#0A2540]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540]/30 via-transparent to-[#0A2540]/50" />
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#1E88E5]/20 border border-[#1E88E5]/30 rounded-full px-4 py-1.5 text-[#1E88E5] text-sm font-medium mb-8"
            >
              <span className="w-1.5 h-1.5 bg-[#1E88E5] rounded-full animate-pulse" />
              {t("hero.tagline")}
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05] mb-6"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            >
              {t("hero.slogan").split(",").map((part, i) => (
                <span key={i}>
                  {i > 0 && <>,<br /></>}
                  {i === 1 ? <span className="text-[#1E88E5]">{part}</span> : part}
                </span>
              ))}
            </motion.h1>

            <motion.p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            >
              Vente, installation, maintenance et dépannage de systèmes de climatisation. Des solutions HVAC professionnelles pour chaque besoin au Maroc.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a href={`https://wa.me/${company.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1E88E5] hover:bg-[#1976D2] text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#1E88E5]/25"
              >
                {t("hero.cta")} <ChevronRight size={18} />
              </a>
              <Link href="/produits" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors backdrop-blur-sm">
                {t("hero.secondaryCta")}
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 border border-white/15 hover:bg-white/5 text-white/80 hover:text-white font-medium px-6 py-3.5 rounded-xl transition-colors">
                Installation rapide
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ══ STATS SECTION ══ */}
      <section className="bg-[#0D2E50] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {company.stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-4xl sm:text-5xl font-display font-bold text-[#1E88E5] mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/60 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ══ */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
          >
            <motion.div variants={fadeUp}>
              <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-2">Notre sélection</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Produits phares</h2>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link href="/produits" className="inline-flex items-center gap-2 text-[#1E88E5] font-semibold hover:gap-3 transition-all">
                Voir tous les produits <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-[#1E88E5]/50 hover:shadow-lg hover:shadow-[#1E88E5]/10 transition-all duration-300"
              >
                {/* Product photo on white background */}
                <div className="h-44 bg-white flex items-center justify-center p-4 relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  {product.inverter && (
                    <div className="absolute top-3 right-3 bg-[#1E88E5] text-white text-xs font-bold px-2 py-0.5 rounded-full">INVERTER</div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-1 font-medium">{product.brand} · {product.category}</div>
                  <h3 className="font-semibold text-foreground text-sm leading-snug mb-3">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-medium">{product.energyClass}</span>
                    <span className="text-xs text-muted-foreground">{product.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-[#1E88E5] text-lg">{product.price.toLocaleString("fr-FR")} MAD</span>
                    <span className={`text-xs font-medium ${product.inStock ? "text-green-500" : "text-amber-500"}`}>
                      {product.inStock ? "En stock" : "Sur commande"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INSTALLATION SHOWCASE ══ */}
      <section className="py-20 bg-[#0A2540]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Nos réalisations</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Installations partout au Maroc</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { src: "/images/projects/villa-install.jpg",       label: "Villas" },
              { src: "/images/projects/office-install.jpg",      label: "Bureaux" },
              { src: "/images/projects/hospital-install.jpg",    label: "Hôpitaux" },
              { src: "/images/projects/commercial-install.jpg",  label: "Commerces" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl overflow-hidden aspect-square group cursor-pointer"
              >
                <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white font-semibold text-sm">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/projets" className="inline-flex items-center gap-2 text-[#1E88E5] font-semibold hover:gap-3 transition-all">
              Voir tous nos projets <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Notre différence</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Pourquoi choisir {company.name} ?</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-[#1E88E5]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#1E88E5]/10 rounded-xl flex items-center justify-center text-[#1E88E5] mb-5">{item.icon}</div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-20 bg-[#0A2540] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Ce qu'ils disent</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-12">Nos clients témoignent</h2>
          </motion.div>
          <div className="relative min-h-[200px]">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: activeTestimonial === i ? 1 : 0, x: activeTestimonial === i ? 0 : -40 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 ${activeTestimonial === i ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, s) => (
                    <Star key={s} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/80 text-lg sm:text-xl leading-relaxed italic mb-6">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-white/40 text-sm">{testimonial.city}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${activeTestimonial === i ? "bg-[#1E88E5] w-6" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ COVERAGE ══ */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Disponibilité</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Couverture nationale</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Nos équipes interviennent dans toutes les grandes villes du Maroc.</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {company.coverage.map((city, i) => (
              <motion.div key={city} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground hover:border-[#1E88E5]/50 hover:text-[#1E88E5] transition-colors"
              >
                <div className="w-1.5 h-1.5 bg-[#1E88E5] rounded-full" /> {city}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="py-20 bg-gradient-to-r from-[#0A2540] to-[#1565C0] relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">Prêt à améliorer votre confort ?</h2>
            <p className="text-white/70 text-lg mb-8">Contactez-nous dès maintenant pour un devis gratuit et sans engagement.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/${company.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE57] text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg"
              >
                Devis WhatsApp
              </a>
              <a href={`tel:${company.contact.phone}`}
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <Phone size={20} /> {company.contact.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
