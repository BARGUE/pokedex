import { motion } from 'framer-motion';
import { useLanguage } from '@/src/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171c26] hover:bg-[#29303d] text-[#f0f2f4] text-sm font-semibold transition-colors border border-[#29303d]"
      title={language === 'fr' ? 'Switch to English' : 'Passer en Français'}
    >
      <span className={language === 'fr' ? 'opacity-100' : 'opacity-40'}>🇫🇷</span>
      <span className="text-[#f0f2f4]">/</span>
      <span className={language === 'en' ? 'opacity-100' : 'opacity-40'}>🇬🇧</span>
    </motion.button>
  );
}
