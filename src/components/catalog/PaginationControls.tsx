"use client";

import { motion } from "framer-motion";

export function PaginationControls({
  hasPrevious,
  hasNext,
  safePage,
  totalPages,
  onPrev,
  onNext,
  nextGradientClass,
}: {
  hasPrevious: boolean;
  hasNext: boolean;
  safePage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  nextGradientClass: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          disabled={!hasPrevious}
          className="px-6 py-3 rounded-full bg-[#252542] text-[#f0f2f4] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#353560] transition-colors"
        >
          Précédent
        </motion.button>

        <span className="text-gray-400 text-sm">
          Page {safePage} / {totalPages}
        </span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          disabled={!hasNext}
          className={`px-6 py-3 rounded-full ${nextGradientClass} text-[#f0f2f4] font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Suivant
        </motion.button>
      </div>
    </div>
  );
}
