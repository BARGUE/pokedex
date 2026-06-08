"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hourglass, Leaf, Sparkles, Stars, Zap, Flame, Droplets, Crown } from "lucide-react";

import { Header } from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { CategoryModal } from "@/src/components/modals/CategoryModal";

import BackgroundFX from "./BackgroundFX";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import CategorySection from "./CategorySection";
import GamesSection from "./GamesSection";

import { PokemonListItem } from "@/src/services/pokemon/list/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";

type Props = {
  allPokemon: PokemonListItem[];
  megaPokemon: PokemonListItem[];
  starterPokemon: PokemonListItem[];
  legendaryPokemon: PokemonListItem[];
  mythicalPokemon: PokemonListItem[];
  gigantamaxPokemon: PokemonListItem[];
  alolaPokemon: PokemonListItem[];
  galarPokemon: PokemonListItem[];
  hisuiPokemon: PokemonListItem[];
};

export type SelectedCategory = null | {
  slug: string;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  iconColor: string;
  icon: React.ElementType;
  list: PokemonListItem[];
};

export default function HomeClient(props: Props) {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const categories = useMemo(
    () => [
      {
        slug: "starters",
        title: t(translations.starters),
        subtitle: t(translations.startersSubtitle),
        icon: Leaf,
        list: props.starterPokemon,
        color: "from-emerald-500 to-green-600",
        bgColor: "bg-emerald-500/10",
        iconColor: "text-emerald-400",
      },
      {
        slug: "mythical",
        title: t(translations.mythical),
        subtitle: t(translations.mythicalSubtitle),
        icon: Stars,
        list: props.mythicalPokemon,
        color: "from-violet-600 to-fuchsia-700",
        bgColor: "bg-violet-600/10",
        iconColor: "text-fuchsia-400",
      },
      {
        slug: "legendary",
        title: t(translations.legendary),
        subtitle: t(translations.legendarySubtitle),
        icon: Crown,
        list: props.legendaryPokemon,
        color: "from-amber-400 to-orange-500",
        bgColor: "bg-amber-500/10",
        iconColor: "text-amber-400",
      },
      {
        slug: "mega",
        title: t(translations.megaEvolutions),
        subtitle: t(translations.megaSubtitle),
        icon: Zap,
        list: props.megaPokemon,
        color: "from-blue-500 to-indigo-600",
        bgColor: "bg-blue-500/10",
        iconColor: "text-blue-400",
      },
      {
        slug: "gigantamax",
        title: t(translations.gigamaxEvolutions),
        subtitle: t(translations.gigamaxSubtitle),
        icon: Flame,
        list: props.gigantamaxPokemon,
        color: "from-red-500 to-rose-600",
        bgColor: "bg-red-500/10",
        iconColor: "text-red-400",
      },
      {
        slug: "alola",
        title: t(translations.alolaForms),
        subtitle: t(translations.alolaSubtitle),
        icon: Droplets,
        list: props.alolaPokemon,
        color: "from-cyan-400 to-teal-500",
        bgColor: "bg-cyan-500/10",
        iconColor: "text-cyan-400",
      },
      {
        slug: "galar",
        title: t(translations.galarForms),
        subtitle: t(translations.galarSubtitle),
        icon: Sparkles,
        list: props.galarPokemon,
        color: "from-violet-500 to-purple-600",
        bgColor: "bg-violet-500/10",
        iconColor: "text-violet-400",
      },
      {
        slug: "hisui",
        title: t(translations.hisuiForms),
        subtitle: t(translations.hisuiSubtitle),
        icon: Hourglass,
        list: props.hisuiPokemon,
        color: "from-orange-400 to-amber-500",
        bgColor: "bg-orange-500/10",
        iconColor: "text-orange-400",
      },
    ],
    [props, t]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f23] via-[#1a1a35] to-[#0f0f23] overflow-hidden">
      <CategoryModal
        isOpen={selectedCategory !== null}
        onClose={() => setSelectedCategory(null)}
        title={selectedCategory?.title || ""}
        subtitle={selectedCategory?.subtitle || ""}
        pokemonList={selectedCategory?.list || []}
        gradient={selectedCategory?.color || ""}
        iconColor={selectedCategory?.iconColor || ""}
        icon={selectedCategory?.icon || Sparkles}
      />

      <BackgroundFX />

      <Header />

      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        <HeroSection totalPokemon={props.allPokemon.length} t={t} />
      </motion.section>

      <StatsSection
        total={props.allPokemon.length}
        mega={props.megaPokemon.length}
        gigantamax={props.gigantamaxPokemon.length}
        regionals={props.alolaPokemon.length + props.galarPokemon.length + props.hisuiPokemon.length}
        t={t}
      />

      <CategorySection
        categories={categories}
        onSelect={(cat) =>
          setSelectedCategory({
            slug: cat.slug,
            title: cat.title,
            subtitle: cat.subtitle,
            color: cat.color,
            bgColor: cat.bgColor,
            iconColor: cat.iconColor,
            icon: cat.icon,
            list: cat.list,
          })
        }
        t={t}
      />

      <GamesSection t={t} />

      <Footer />
    </div>
  );
}
