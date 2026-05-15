import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2 } from "lucide-react";
import { useCompany } from "@/hooks/useCompany";
import Layout from "@/components/Layout";

// ============================================================
// CONTACT PAGE
// ============================================================
// Left column: quick contact buttons (phone, WhatsApp, email, address, hours)
// Right column: contact form + Google Maps embed
//
// All contact info is read from src/config/company.json
//
// IMPORTANT: The form currently shows a success message after a 1.2s delay.
// To connect it to a real backend, replace the handleSubmit function with
// a real API call (e.g. POST to your server or a Formspree endpoint).
//
// Google Maps embed URL: edit company.json > address.googleMapsEmbed
// ============================================================

// Service options for the dropdown
const serviceOptions = [
  "Installation", "Maintenance", "Réparation", "Recharge gaz",
  "Nettoyage", "Diagnostics", "Projet commercial", "Autre"
];

export default function Contact() {
  const company = useCompany();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // ── Replace this with a real API call when ready ─────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulated delay
    setSending(false);
    setSubmitted(true);
    // TODO: Send form data to your backend or email service
    // Example: await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
  };
  // ─────────────────────────────────────────────────────────

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      {/* ── Page Header ── */}
      <div className="bg-[#0A2540] pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Contactez-nous</p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">Parlons de votre projet</h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Devis gratuit sous 24h. Nos experts sont disponibles pour répondre à toutes vos questions.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left: Contact Info Cards ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Phone */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <a href={`tel:${company.contact.phone}`}
                className="flex items-center gap-4 bg-[#0A2540] hover:bg-[#0D2E50] rounded-2xl p-5 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#1E88E5] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-widest mb-0.5">Appeler</div>
                  <div className="font-bold text-white">{company.contact.phoneDisplay}</div>
                  <div className="text-white/40 text-xs">Lun–Sam, 8h–20h</div>
                </div>
              </a>
            </motion.div>

            {/* WhatsApp */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <a
                href={`https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent("Bonjour MONDE CLIM, je souhaite un devis.")}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-2xl p-5 transition-colors"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">WhatsApp</div>
                  <div className="font-bold text-foreground">{company.contact.phoneDisplay}</div>
                  <div className="text-muted-foreground text-xs">Réponse rapide garantie</div>
                </div>
              </a>
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <a href={`mailto:${company.contact.email}`}
                className="flex items-center gap-4 bg-card hover:bg-muted border border-border rounded-2xl p-5 transition-colors"
              >
                <div className="w-12 h-12 bg-[#1E88E5]/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={22} className="text-[#1E88E5]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Email</div>
                  <div className="font-bold text-foreground">{company.contact.email}</div>
                  <div className="text-muted-foreground text-xs">Réponse sous 24h</div>
                </div>
              </a>
            </motion.div>

            {/* Address */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1E88E5]/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-[#1E88E5]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Adresse</div>
                  <div className="font-bold text-foreground">{company.address.city}, {company.address.country}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{company.address.street}</div>
                </div>
              </div>
            </motion.div>

            {/* Business Hours — from company.json */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-[#1E88E5]" />
                <span className="text-sm font-semibold text-foreground">Horaires d'ouverture</span>
              </div>
              <div className="space-y-2 text-sm">
                {company.hours.map(({ day, hours }) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-muted-foreground">{day}</span>
                    <span className="font-medium text-foreground">{hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Form + Map ── */}
          <motion.div className="lg:col-span-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              {submitted ? (
                // Success state
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">Message envoyé !</h3>
                  <p className="text-muted-foreground">
                    Nous vous répondrons dans les 24 heures. Pour une réponse immédiate, contactez-nous sur WhatsApp.
                  </p>
                  <a href={`https://wa.me/${company.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1EBE57] transition-colors"
                  >
                    WhatsApp maintenant
                  </a>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-display font-bold text-foreground mb-6">Demande de devis gratuit</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="name" required value={form.name} onChange={handleChange}
                          placeholder="Mohamed El Amrani"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1E88E5] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Téléphone <span className="text-red-500">*</span>
                        </label>
                        <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                          placeholder="+212 6xx xxx xxx"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1E88E5] transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="vous@exemple.com"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1E88E5] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Type de service <span className="text-red-500">*</span>
                      </label>
                      <select name="service" required value={form.service} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#1E88E5] transition-colors"
                      >
                        <option value="">Sélectionnez un service</option>
                        {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea name="message" required rows={4} value={form.message} onChange={handleChange}
                        placeholder="Décrivez votre projet ou besoin (surface, type de logement, marque souhaitée...)"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1E88E5] transition-colors resize-none"
                      />
                    </div>
                    <button type="submit" disabled={sending}
                      className="w-full bg-[#1E88E5] hover:bg-[#1976D2] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      {sending ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi en cours...</>
                      ) : (
                        <><Send size={18} /> Envoyer ma demande</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Google Maps embed — URL from company.json */}
            <div className="mt-5 bg-card border border-border rounded-2xl overflow-hidden h-64">
              <iframe
                src={company.address.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${company.name} - ${company.address.city}`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
