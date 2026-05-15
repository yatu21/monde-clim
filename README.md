# MONDE CLIM — Site Web HVAC Premium

Site web professionnel pour une entreprise de climatisation marocaine.
Construit avec **React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion**.

---

## Démarrage rapide

### Prérequis
- Node.js 18+ ([télécharger](https://nodejs.org))
- npm (inclus avec Node.js) ou pnpm

### Installation & lancement

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en mode développement (http://localhost:3000)
npm run dev

# 3. Compiler pour la production
npm run build

# 4. Prévisualiser le build de production
npm run preview
```

---

## Structure du projet

```
monde-clim/
├── public/
│   ├── images/
│   │   ├── hero/           # Image de fond page d'accueil
│   │   │   └── hero-bg.jpg
│   │   ├── products/       # Photos des produits (PNG/JPG)
│   │   └── projects/       # Photos des réalisations
│   └── favicon.svg
│
├── src/
│   ├── config/
│   │   └── company.json    ← Infos entreprise (tel, email, adresse...)
│   │
│   ├── data/
│   │   └── products.json   ← Catalogue produits (prix, marques, images...)
│   │
│   ├── components/
│   │   ├── Layout.tsx          Wrapper: Navbar + Footer + WhatsApp + Modal
│   │   ├── Navbar.tsx          Navigation fixe avec menu mobile
│   │   ├── Footer.tsx          Pied de page 4 colonnes
│   │   ├── FloatingWhatsApp.tsx Bouton WhatsApp flottant
│   │   ├── QuoteModal.tsx      Devis instantané 4 étapes
│   │   └── ThemeProvider.tsx   Gestion thème clair/sombre
│   │
│   ├── pages/
│   │   ├── Home.tsx        Accueil (hero, stats, produits, témoignages)
│   │   ├── Products.tsx    Catalogue avec filtres
│   │   ├── Services.tsx    Liste des services
│   │   ├── Projects.tsx    Portfolio réalisations
│   │   ├── About.tsx       À propos & timeline
│   │   └── Contact.tsx     Formulaire & carte
│   │
│   ├── hooks/
│   │   └── useCompany.ts   Hook pour accéder à company.json
│   │
│   ├── lib/
│   │   └── i18n.tsx        Internationalisation FR/AR/EN (RTL)
│   │
│   ├── styles/
│   │   └── index.css       Styles globaux & variables CSS
│   │
│   ├── App.tsx             Routeur principal
│   └── main.tsx            Point d'entrée
│
├── index.html              Template HTML (SEO meta tags)
├── vite.config.ts          Config Vite (port: 3000)
├── tsconfig.json           Config TypeScript
└── package.json
```

---

## Personnalisation

### 1. Infos de l'entreprise
Éditez **`src/config/company.json`** pour changer :
- Numéro de téléphone et WhatsApp
- Adresse email
- Adresse physique
- Horaires d'ouverture
- Villes couvertes
- Statistiques (clients, installations...)

```json
{
  "contact": {
    "phone": "+212600000000",
    "phoneDisplay": "+212 600 000 000",
    "whatsapp": "+212600000000",
    "email": "contact@mondeclim.ma"
  }
}
```

### 2. Catalogue produits
Éditez **`src/data/products.json`** pour :
- Ajouter/supprimer des produits
- Modifier les prix
- Changer les images
- Mettre à jour les stocks

```json
{
  "id": "25",
  "name": "Mon Nouveau Produit 12000 BTU",
  "brand": "Gree",
  "category": "Split",
  "capacity": "12000 BTU",
  "energyClass": "A++",
  "inverter": true,
  "price": 5500,
  "inStock": true,
  "image": "/images/products/mon-produit.png",
  "description": "Description du produit..."
}
```

### 3. Images
- **Hero** : remplacez `public/images/hero/hero-bg.jpg`
- **Produits** : placez vos photos dans `public/images/products/` et mettez à jour le chemin dans `products.json`
- **Projets** : placez vos photos dans `public/images/projects/`

> Images produits recommandées : fond blanc, PNG transparent, taille 400×400px minimum.

### 4. Couleurs de la marque
Éditez les variables CSS dans **`src/styles/index.css`** :

```css
:root {
  --primary:   210 73% 15%;   /* Bleu foncé #0A2540 */
  --secondary: 208 79% 51%;   /* Bleu électrique #1E88E5 */
  --accent:    0 0% 75%;      /* Argent #C0C0C0 */
}
```

### 5. Traductions
Éditez **`src/lib/i18n.tsx`** pour modifier ou ajouter des textes en FR/AR/EN.

### 6. Prix du devis instantané
Éditez l'objet `priceRanges` dans **`src/components/QuoteModal.tsx`** pour ajuster les fourchettes de prix (en MAD).

---

## Stack technique

| Outil | Version | Usage |
|-------|---------|-------|
| React | 18 | UI library |
| Vite | 5 | Build tool & dev server |
| TypeScript | 5 | Typage statique |
| Tailwind CSS | 4 | Styles utilitaires |
| Framer Motion | 11 | Animations |
| Wouter | 3 | Routing côté client |
| Lucide React | — | Icônes |

---

## Pages & routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Accueil | Hero, stats, produits phares, témoignages |
| `/produits` | Produits | Catalogue filtrable (catégorie, marque, capacité) |
| `/services` | Services | Installation, maintenance, réparation, etc. |
| `/projets` | Projets | Portfolio de réalisations avec filtres |
| `/a-propos` | À Propos | Histoire, valeurs, certifications |
| `/contact` | Contact | Formulaire, téléphone, WhatsApp, carte |

---

## Fonctionnalités clés

- **Multi-langue** : Français (défaut), Arabe (RTL automatique), Anglais
- **Thème clair/sombre** : toggle dans la navbar, sauvegardé en localStorage
- **Devis instantané** : modal 4 étapes avec estimation de prix en MAD
- **Bouton WhatsApp** : flottant sur toutes les pages
- **Filtres produits** : par catégorie, marque, capacité, recherche texte
- **Compteurs animés** : s'animent au scroll (stats, chiffres clés)
- **Formulaire contact** : prêt à connecter à un backend ou Formspree

---

## Déploiement

### Netlify (recommandé, gratuit)
```bash
npm run build
# Puis glissez-déposez le dossier `dist/` sur netlify.com
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Hébergement traditionnel (cPanel, etc.)
```bash
npm run build
# Uploadez le contenu du dossier `dist/` sur votre FTP
```

---

## GitHub — Mise en ligne du code

```bash
# 1. Initialisez Git dans ce dossier
git init
git add .
git commit -m "Initial commit — MONDE CLIM website"

# 2. Créez un dépôt sur github.com, puis :
git remote add origin https://github.com/VOTRE_USERNAME/monde-clim.git
git branch -M main
git push -u origin main
```

---

## Connecter le formulaire à un vrai backend

Le formulaire contact affiche actuellement un succès simulé.
Pour le connecter à une vraie destination :

### Option A — Formspree (sans backend, gratuit)
1. Inscrivez-vous sur [formspree.io](https://formspree.io)
2. Créez un formulaire, obtenez votre endpoint
3. Dans `src/pages/Contact.tsx`, remplacez le `handleSubmit` :

```ts
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSending(true);
  await fetch("https://formspree.io/f/VOTRE_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  setSending(false);
  setSubmitted(true);
};
```

### Option B — EmailJS (envoie directement un email)
Voir [emailjs.com](https://www.emailjs.com) pour la configuration.

---

## Support & Contact

Pour toute question technique sur ce code source, consultez la documentation :
- [Vite](https://vitejs.dev/guide/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Wouter](https://github.com/molefrog/wouter)
