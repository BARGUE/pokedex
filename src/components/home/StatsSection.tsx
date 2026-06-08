"use client";

import { Language } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";
import { motion } from "framer-motion";

type Props = {
  total: number;
  mega: number;
  gigantamax: number;
  regionals: number;
  t: (translations: Record<Language, string>) => string;
};

export default function StatsSection({ total, mega, gigantamax, regionals, t }: Props) {
  const stats = [
    { value: total.toLocaleString(), label: t(translations.pokemon), color: "from-red-500 to-red-600" },
    { value: mega, label: t(translations.mega), color: "from-blue-500 to-indigo-600" },
    { value: gigantamax, label: t(translations.gigamax), color: "from-pink-500 to-rose-600" },
    { value: regionals, label: t(translations.regional), color: "from-cyan-500 to-teal-600" },
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl -z-10"
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
              />
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <div
                  className={`text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="text-[#f0f2f4]/50 text-sm font-medium mt-2">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
