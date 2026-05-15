import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { useCompany } from "@/hooks/useCompany";

// ============================================================
// QUOTE MODAL — 4-Step Instant Price Estimator
// ============================================================
// Step 1: Choose service type
// Step 2: Choose brand
// Step 3: Choose capacity + number of units
// Step 4: View price estimate → send to WhatsApp
//
// To edit price ranges: update the `priceRanges` object below.
// Format: { "ServiceName": { "Capacity": [minPrice, maxPrice] } }
// Prices are in MAD (Moroccan Dirhams) per unit.
// ============================================================

interface Props {
  open: boolean;
  onClose: () => void;
}

// ── Editable options ─────────────────────────────────────────
const serviceTypes = [
  "Installation", "Maintenance", "Réparation",
  "Recharge gaz", "Nettoyage", "Diagnostics"
];

const brands = [
  "Gree", "Carrier", "Daikin", "Mitsubishi",
  "Samsung", "LG", "Midea", "Autre"
];

const capacities = [
  "9000 BTU", "12000 BTU", "18000 BTU", "24000 BTU", "36000 BTU+"
];

// Price ranges in MAD per unit [min, max]
// Edit these to reflect your actual pricing
const priceRanges: Record<string, Record<string, [number, number]>> = {
  Installation:   { "9000 BTU": [800, 1200],  "12000 BTU": [1000, 1500], "18000 BTU": [1200, 1800], "24000 BTU": [1500, 2200], "36000 BTU+": [2000, 3500] },
  Maintenance:    { "9000 BTU": [200, 350],   "12000 BTU": [200, 350],   "18000 BTU": [250, 400],   "24000 BTU": [300, 450],   "36000 BTU+": [400, 600]  },
  Réparation:     { "9000 BTU": [300, 600],   "12000 BTU": [300, 600],   "18000 BTU": [350, 700],   "24000 BTU": [400, 800],   "36000 BTU+": [500, 1000] },
  "Recharge gaz": { "9000 BTU": [250, 400],   "12000 BTU": [300, 450],   "18000 BTU": [350, 500],   "24000 BTU": [400, 600],   "36000 BTU+": [500, 800]  },
  Nettoyage:      { "9000 BTU": [150, 250],   "12000 BTU": [150, 250],   "18000 BTU": [200, 300],   "24000 BTU": [250, 350],   "36000 BTU+": [300, 450]  },
  Diagnostics:    { "9000 BTU": [100, 200],   "12000 BTU": [100, 200],   "18000 BTU": [150, 250],   "24000 BTU": [150, 250],   "36000 BTU+": [200, 300]  },
};
// ─────────────────────────────────────────────────────────────

export default function QuoteModal({ open, onClose }: Props) {
  const company = useCompany();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ service: "", brand: "", capacity: "", units: "1" });

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep(0), 300); // Reset after animation
  };

  const getPrice = (): [number, number] => {
    const base = priceRanges[form.service]?.[form.capacity] || [0, 0];
    const units = Math.max(1, parseInt(form.units) || 1);
    return [base[0] * units, base[1] * units];
  };

  const canProceed = () => {
    if (step === 0) return !!form.service;
    if (step === 1) return !!form.brand;
    if (step === 2) return !!form.capacity;
    return true;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-[#0D2137] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Modal Header ── */}
            <div className="bg-[#0A2540] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-white font-display font-bold text-lg">Devis Instantané</h2>
                <p className="text-white/50 text-xs mt-0.5">Étape {step + 1} / 4</p>
              </div>
              <button onClick={handleClose} className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* ── Progress Bar ── */}
            <div className="h-1 bg-white/10">
              <motion.div
                className="h-full bg-[#1E88E5]"
                animate={{ width: `${((step + 1) / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">

                {/* Step 1 — Service Type */}
                {step === 0 && (
                  <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="font-semibold text-foreground mb-4">Type de service</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {serviceTypes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setForm((f) => ({ ...f, service: s }))}
                          className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all text-left ${form.service === s ? "border-[#1E88E5] bg-[#1E88E5]/10 text-[#1E88E5]" : "border-border text-foreground hover:border-[#1E88E5]/50"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2 — Brand */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="font-semibold text-foreground mb-4">Marque</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {brands.map((b) => (
                        <button
                          key={b}
                          onClick={() => setForm((f) => ({ ...f, brand: b }))}
                          className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all text-left ${form.brand === b ? "border-[#1E88E5] bg-[#1E88E5]/10 text-[#1E88E5]" : "border-border text-foreground hover:border-[#1E88E5]/50"}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3 — Capacity + Units */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="font-semibold text-foreground mb-4">Capacité</h3>
                    <div className="space-y-2">
                      {capacities.map((c) => (
                        <button
                          key={c}
                          onClick={() => setForm((f) => ({ ...f, capacity: c }))}
                          className={`w-full px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left ${form.capacity === c ? "border-[#1E88E5] bg-[#1E88E5]/10 text-[#1E88E5]" : "border-border text-foreground hover:border-[#1E88E5]/50"}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <label className="text-sm font-medium text-foreground block mb-1.5">Nombre d'unités</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={form.units}
                        onChange={(e) => setForm((f) => ({ ...f, units: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4 — Price Summary */}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="font-semibold text-foreground mb-2">Estimation de prix</h3>
                    <div className="bg-[#0A2540] rounded-xl p-5 mb-4">
                      <div className="text-white/60 text-xs mb-1">Fourchette estimée</div>
                      <div className="text-[#1E88E5] font-display font-bold text-3xl">
                        {getPrice()[0].toLocaleString("fr-FR")} – {getPrice()[1].toLocaleString("fr-FR")} MAD
                      </div>
                      <div className="text-white/40 text-xs mt-2">Prix indicatif · devis gratuit sur site</div>
                    </div>
                    <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                      <div className="flex justify-between"><span>Service</span><span className="font-medium text-foreground">{form.service}</span></div>
                      <div className="flex justify-between"><span>Marque</span><span className="font-medium text-foreground">{form.brand}</span></div>
                      <div className="flex justify-between"><span>Capacité</span><span className="font-medium text-foreground">{form.capacity}</span></div>
                      <div className="flex justify-between"><span>Unités</span><span className="font-medium text-foreground">{form.units}</span></div>
                    </div>
                    <a
                      href={`https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(`Bonjour, je souhaite un devis pour: ${form.service} ${form.brand} ${form.capacity} x${form.units}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Confirmer sur WhatsApp
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Navigation Buttons ── */}
              {step < 3 && (
                <div className="flex gap-3 mt-6">
                  {step > 0 && (
                    <button
                      onClick={() => setStep(s => s - 1)}
                      className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      Retour
                    </button>
                  )}
                  <button
                    onClick={() => setStep(s => s + 1)}
                    disabled={!canProceed()}
                    className="flex-1 py-2.5 rounded-xl bg-[#1E88E5] hover:bg-[#1976D2] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    Suivant <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
