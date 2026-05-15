import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal, Plus, Check } from "lucide-react";
import productsData from "@/data/products.json";
import Layout from "@/components/Layout";

// ============================================================
// PRODUCTS PAGE — Filterable product catalog
// ============================================================
// Products are loaded from src/data/products.json
// To add/edit products: update products.json (no code changes needed)
//
// Filter options below — add new categories/brands as needed:
// ============================================================

// ── Filter options — keep in sync with your product categories ──
const categories = ["Tous", "Split", "Inverter", "Cassette", "Ceiling Concealed", "Floor Standing", "VRV/VRF"];
const brands     = ["Tous", "Gree", "Carrier", "Daikin", "Mitsubishi", "Samsung", "LG", "Midea"];
const capacities = ["Tous", "9000 BTU", "12000 BTU", "18000 BTU", "24000 BTU", "36000 BTU+"];
// ─────────────────────────────────────────────────────────────

// Energy class badge with color coding
function EnergyBadge({ cls }: { cls: string }) {
  const colors: Record<string, string> = {
    "A+++": "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    "A++":  "bg-green-500/15  text-green-500  border-green-500/30",
    "A+":   "bg-lime-500/15   text-lime-600   border-lime-500/30",
    "A":    "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${colors[cls] || "bg-muted text-muted-foreground border-border"}`}>
      {cls}
    </span>
  );
}

export default function Products() {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("Tous");
  const [brand,    setBrand]    = useState("Tous");
  const [capacity, setCapacity] = useState("Tous");
  const [quotation, setQuotation] = useState<string[]>([]);  // IDs of products added to quote

  // Filter products based on active filters
  const filtered = productsData.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat    = category === "Tous" || p.category === category;
    const matchBrand  = brand === "Tous" || p.brand === brand;
    const matchCap    = capacity === "Tous" || p.capacity === capacity ||
      (capacity === "36000 BTU+" && parseInt(p.capacity) >= 36000);
    return matchSearch && matchCat && matchBrand && matchCap;
  });

  // Toggle a product in/out of the quotation list
  const toggleQuotation = (id: string) => {
    setQuotation((q) => q.includes(id) ? q.filter(i => i !== id) : [...q, id]);
  };

  return (
    <Layout>
      {/* ── Page Header ── */}
      <div className="bg-[#0A2540] pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#1E88E5] text-sm font-semibold uppercase tracking-widest mb-3">Catalogue</p>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">Nos Produits</h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Découvrez notre gamme complète de solutions de climatisation des plus grandes marques mondiales.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Search & Filters ── */}
        <div className="mb-8 space-y-4">
          {/* Search input */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Rechercher un produit, une marque..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
            />
          </div>

          {/* Category filter pills */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground uppercase tracking-widest">
              <SlidersHorizontal size={12} /> Catégorie
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    category === cat
                      ? "bg-[#1E88E5] border-[#1E88E5] text-white"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-[#1E88E5]/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Brand + Capacity filters */}
          <div className="flex flex-wrap gap-6">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Marque</div>
              <div className="flex flex-wrap gap-2">
                {brands.map((b) => (
                  <button key={b} onClick={() => setBrand(b)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      brand === b
                        ? "bg-[#0A2540] border-[#0A2540] text-white dark:bg-[#1E88E5] dark:border-[#1E88E5]"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Capacité</div>
              <div className="flex flex-wrap gap-2">
                {capacities.map((c) => (
                  <button key={c} onClick={() => setCapacity(c)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      capacity === c
                        ? "bg-[#0A2540] border-[#0A2540] text-white dark:bg-[#1E88E5] dark:border-[#1E88E5]"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Results count + WhatsApp quote button ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            produit{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
          </p>
          {/* Send selected products as WhatsApp quote */}
          {quotation.length > 0 && (
            <a
              href={`https://wa.me/212600000000?text=${encodeURIComponent(`Bonjour, je souhaite un devis pour ${quotation.length} produit(s) MONDE CLIM.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE57] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg shadow-[#25D366]/25"
            >
              Demander devis ({quotation.length})
            </a>
          )}
        </div>

        {/* ── Product Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Filter size={40} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun produit ne correspond à vos critères.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-[#1E88E5]/50 hover:shadow-xl hover:shadow-[#1E88E5]/8 transition-all duration-300 flex flex-col"
              >
                {/* Product photo */}
                <div className="relative overflow-hidden bg-white h-[200px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.inverter && (
                      <span className="bg-[#1E88E5] text-white text-xs font-bold px-2 py-0.5 rounded-full">INVERTER</span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.inStock ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {product.inStock ? "En stock" : "Sur commande"}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#1E88E5] uppercase tracking-wide">{product.brand}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{product.category}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-3 leading-snug flex-1">{product.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <EnergyBadge cls={product.energyClass} />
                    <span className="text-xs bg-muted text-muted-foreground border border-border px-2 py-0.5 rounded-full">{product.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-bold text-[#1E88E5] text-xl">
                      {product.price.toLocaleString("fr-FR")} <span className="text-sm font-normal text-muted-foreground">MAD</span>
                    </span>
                  </div>
                  {/* Add to quote / In quote toggle */}
                  <button
                    onClick={() => toggleQuotation(product.id)}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      quotation.includes(product.id)
                        ? "bg-[#1E88E5] text-white"
                        : "bg-[#1E88E5]/10 text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white border border-[#1E88E5]/30"
                    }`}
                  >
                    {quotation.includes(product.id) ? (
                      <><Check size={16} /> Dans le devis</>
                    ) : (
                      <><Plus size={16} /> Ajouter au devis</>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
