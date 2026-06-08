"use client";

import Link from "next/link";
import { translations } from "@/src/lib/i18n";
import { useLanguage } from "@/src/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full bg-white/90" />
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#1a1a35] -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white border-2 border-[#1a1a35] rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="text-white font-display font-bold text-lg">{t(translations.pokedex)}</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              {t(translations.footerDescription)}
            </p>
          </div>

          <div>
            <h4 className="text-white font-display font-semibold mb-4">{t(translations.navigation)}</h4>
            <ul className="space-y-2">
              <li><Link href="/pokedex" className="text-white/40 hover:text-white text-sm transition-colors">{t(translations.pokedex)}</Link></li>
              <li><Link href="/compare" className="text-white/40 hover:text-white text-sm transition-colors">{t(translations.comparator)}</Link></li>
              <li><Link href="/quiz" className="text-white/40 hover:text-white text-sm transition-colors">{t(translations.quiz)}</Link></li>
              <li><Link href="/items" className="text-white/40 hover:text-white text-sm transition-colors">{t(translations.itemsAndBerries)}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-semibold mb-4">{t(translations.resources)}</h4>
            <ul className="space-y-2">
              <li><a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm transition-colors">{t(translations.pokeapi)}</a></li>
              <li><a href="https://www.pokemon.com/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm transition-colors">{t(translations.pokemonOfficiel)}</a></li>
              <li><a href="https://bulbapedia.bulbagarden.net/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm transition-colors">{t(translations.bulbapedia)}</a></li>
              <li><a href="https://www.pokepedia.fr/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm transition-colors">{t(translations.pokepedia)}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            {t(translations.pokemonCopyright)}
          </p>
          <p className="text-white/25 text-xs">
            {t(translations.copyright)} <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-red-400/60 hover:text-red-300 transition-colors">{t(translations.pokeapi)}</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
