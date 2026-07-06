<div align="center">

# ⚡ Pokédex

**Un Pokédex web moderne, rapide et bilingue, construit avec Next.js 16.**

Explorez l'intégralité du roster Pokémon — statistiques, évolutions, capacités, faiblesses et lieux d'apparition — comparez vos favoris, parcourez objets et baies, et redécouvrez les jeux de chaque génération.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ✨ Fonctionnalités

- **🏠 Accueil thématique** — sections dédiées aux Pokémon Méga, starters, légendaires, fabuleux, Gigamax et aux formes régionales (Alola, Galar, Hisui).
- **📖 Pokédex complet** — catalogue paginé avec recherche instantanée et filtrage par type.
- **🔬 Fiche détaillée** — statistiques, chaîne d'évolution, capacités (talents), attaques, faiblesses par type et lieux de rencontre pour chaque Pokémon.
- **⚔️ Comparateur** — comparez jusqu'à 3 Pokémon côte à côte (sélection persistée via cookies).
- **🎒 Objets & baies** — catalogue navigable des objets et baies du jeu.
- **🎮 Section jeux** — les opus principaux, génération par génération, avec leurs jaquettes.
- **🌍 Bilingue FR / EN** — bascule de langue en un clic.
- **🎨 UI soignée** — thème sombre, animations Framer Motion, composants accessibles Radix UI.

## 🛠️ Stack technique

| Domaine | Technologies |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Server Components, Route Handlers) |
| **Langage** | [TypeScript 5](https://www.typescriptlang.org) |
| **UI** | [React 18](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com), [Lucide](https://lucide.dev) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Data fetching** | [TanStack Query](https://tanstack.com/query), `fetch` avec ISR (`revalidate`) |
| **Validation** | [Zod](https://zod.dev), [React Hook Form](https://react-hook-form.com) |
| **Graphiques** | [Recharts](https://recharts.org) |
| **Qualité** | [ESLint](https://eslint.org) (`eslint-config-next`) |

## 🚀 Démarrage

### Prérequis

- **Node.js 18.18+** (recommandé : 20 LTS ou supérieur)
- **npm**, `yarn`, `pnpm` ou `bun`

### Installation

```bash
# 1. Cloner le dépôt
git clone <url-du-depot>
cd pokedex

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env .env.local   # puis ajustez si nécessaire
```

### Variables d'environnement

| Variable | Description | Valeur par défaut |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL de base de l'API Pokédex consommée par l'application. | `https://pokedex.one` |

> `API_URL` peut également être défini pour surcharger l'URL côté serveur uniquement.

### Lancer en développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📜 Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur de développement. |
| `npm run build` | Génère le build de production. |
| `npm run start` | Sert le build de production. |
| `npm run lint` | Analyse le code avec ESLint. |

## 📁 Structure du projet

```
pokedex/
├── public/
│   └── images/            # Jaquettes des jeux, cartes des régions, assets
├── src/
│   ├── app/               # Routes App Router (pages + API Route Handlers)
│   │   ├── api/           # Endpoints internes (pokemon, compare, types...)
│   │   ├── pokedex/       # Page catalogue
│   │   ├── pokemon/[id]/  # Fiche détaillée d'un Pokémon
│   │   ├── compare/       # Comparateur
│   │   ├── items/         # Objets & baies
│   │   └── game/[name]/   # Détail d'un jeu
│   ├── components/        # Composants UI (home, pokedex, detail, catalog, ui...)
│   ├── services/          # Couche d'accès aux données (api + client + types)
│   ├── contexts/          # Contextes React (langue)
│   ├── hooks/             # Hooks personnalisés (pagination...)
│   ├── lib/               # Utilitaires, i18n, store de comparaison, données jeux
│   └── providers/         # Providers globaux (TanStack Query, thème...)
└── next.config.ts
```

### Organisation de la couche `services`

Chaque domaine de données suit une convention claire :

- **`api.ts`** — fonctions exécutées côté serveur qui appellent l'API distante.
- **`client.ts`** — helpers de récupération côté client (React Query).
- **`types.ts`** — typages TypeScript du domaine.

## 🌐 Déploiement

Le projet est optimisé pour un déploiement sur [Vercel](https://vercel.com). Pensez à définir la variable `NEXT_PUBLIC_API_URL` dans les paramètres du projet.

```bash
npm run build && npm run start
```

## 🤝 Contribution

Les contributions sont les bienvenues :

1. Forkez le dépôt et créez une branche (`git checkout -b feat/ma-fonctionnalite`).
2. Vérifiez le lint (`npm run lint`) et le build (`npm run build`).
3. Ouvrez une Pull Request décrivant vos changements.

## 📝 Licence

Projet personnel à but éducatif. Pokémon et tous les noms associés sont des marques déposées de Nintendo, Game Freak et The Pokémon Company. Ce projet n'est pas affilié à ces entités.

---