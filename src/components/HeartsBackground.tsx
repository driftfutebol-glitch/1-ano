import { motion } from "framer-motion";
import { useMemo } from "react";

type HeartItem = {
  id: number;
  leftPct: number;
  sizePx: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
};

function seeded(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

export default function HeartsBackground() {
  const hearts = useMemo<HeartItem[]>(() => {
    const count = 22;
    return Array.from({ length: count }).map((_, i) => {
      const a = seeded(i + 1);
      const b = seeded(i + 11);
      const c = seeded(i + 21);
      const d = seeded(i + 31);
      const e = seeded(i + 41);
      return {
        id: i,
        leftPct: Math.round(a * 1000) / 10,
        sizePx: 10 + Math.round(b * 14),
        opacity: 0.12 + c * 0.22,
        duration: 9 + d * 10,
        delay: e * 6,
        drift: (seeded(i + 51) - 0.5) * 120,
      };
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-aurora-romance opacity-70" />
      <div className="absolute inset-0 bg-grain opacity-[0.14]" />

      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute bottom-[-12%] select-none text-rose-200/90 drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
          style={{ left: `${h.leftPct}%`, fontSize: `${h.sizePx}px`, opacity: h.opacity }}
          initial={{ y: 0, x: 0, rotate: -8 }}
          animate={{ y: [0, -1400], x: [0, h.drift], rotate: [-8, 10] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "linear" }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}

