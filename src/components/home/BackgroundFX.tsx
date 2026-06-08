"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const generateOrbProperties = () => ({
  width: Math.random() * 300 + 100,
  height: Math.random() * 300 + 100,
  left: Math.random() * 100,
  top: Math.random() * 100,
});

export default function BackgroundFX() {
  const floatingOrbs = useMemo(() => Array.from({ length: 8 }, generateOrbProperties), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-[30%] -right-[20%] w-[80vw] h-[80vw] opacity-[0.03]"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="2" fill="none" />
          <path d="M2 50 H98" stroke="white" strokeWidth="2" />
          <circle cx="50" cy="50" r="12" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${orb.width}px`,
            height: `${orb.height}px`,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            background: `radial-gradient(circle, ${
              [
                "rgba(239, 68, 68, 0.1)",
                "rgba(59, 130, 246, 0.1)",
                "rgba(234, 179, 8, 0.1)",
                "rgba(168, 85, 247, 0.1)",
              ][i % 4]
            } 0%, transparent 70%)`,
          }}
          animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
