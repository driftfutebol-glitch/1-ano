import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

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

type HeartsFloatLayerProps = {
  count?: number;
  className?: string;
};

export default function HeartsFloatLayer({ count = 28, className }: HeartsFloatLayerProps) {
  const hearts = useMemo<HeartItem[]>(() => {
    return Array.from({ length: count }).map((_, i) => {
      const a = seeded(i + 1);
      const b = seeded(i + 11);
      const c = seeded(i + 21);
      const d = seeded(i + 31);
      const e = seeded(i + 41);
      return {
        id: i,
        leftPct: Math.round(a * 1000) / 10,
        sizePx: 12 + Math.round(b * 18),
        opacity: 0.12 + c * 0.3,
        duration: 8 + d * 10,
        delay: e * 6,
        drift: (seeded(i + 51) - 0.5) * 140,
      };
    });
  }, [count]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute bottom-[-12%] select-none text-rose-200/95 drop-shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
          style={{ left: `${h.leftPct}%`, fontSize: `${h.sizePx}px`, opacity: h.opacity }}
          initial={{ y: 0, x: 0, rotate: -10 }}
          animate={{ y: [0, -1500], x: [0, h.drift], rotate: [-10, 14] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "linear" }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}

