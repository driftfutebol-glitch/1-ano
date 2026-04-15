import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PrizeWheelProps = {
  prizes: string[];
  spinning: boolean;
  rotation: number;
  className?: string;
};

export default function PrizeWheel({ prizes, spinning, rotation, className }: PrizeWheelProps) {
  const n = Math.max(1, prizes.length);
  const slice = 360 / n;
  const colors = [
    "rgba(244,114,182,0.55)",
    "rgba(253,230,138,0.50)",
    "rgba(251,113,133,0.50)",
    "rgba(216,180,254,0.48)",
    "rgba(255,228,230,0.35)",
  ];

  const segments = prizes.map((p, i) => {
    const a0 = (i * slice - slice / 2) * (Math.PI / 180);
    const a1 = ((i + 1) * slice - slice / 2) * (Math.PI / 180);
    const x0 = 50 + 50 * Math.cos(a0);
    const y0 = 50 + 50 * Math.sin(a0);
    const x1 = 50 + 50 * Math.cos(a1);
    const y1 = 50 + 50 * Math.sin(a1);
    const large = slice > 180 ? 1 : 0;
    const d = `M 50 50 L ${x0} ${y0} A 50 50 0 ${large} 1 ${x1} ${y1} Z`;
    return { d, fill: colors[i % colors.length], label: p, i };
  });

  return (
    <div className={cn("relative mx-auto w-full max-w-[380px]", className)}>
      <div className="absolute left-1/2 top-[-6px] z-10 -translate-x-1/2">
        <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-rose-200/90 drop-shadow-[0_12px_25px_rgba(0,0,0,0.55)]" />
      </div>

      <motion.div
        className={cn(
          "relative overflow-hidden rounded-full border border-white/15 bg-black/20 shadow-[0_40px_140px_rgba(0,0,0,0.7)] backdrop-blur",
          spinning ? "ring-2 ring-rose-200/30" : null,
        )}
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 26, damping: 18 }}
      >
        <svg viewBox="0 0 100 100" className="block h-auto w-full">
          {segments.map((s) => (
            <path key={s.i} d={s.d} fill={s.fill} stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" />
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(260px_circle_at_30%_25%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30" />
      </motion.div>

      <div className="mt-4 grid grid-cols-1 gap-2">
        <div className="text-center text-xs uppercase tracking-widest text-white/60">Prêmios</div>
        <div className="mx-auto flex max-w-[520px] flex-wrap justify-center gap-2">
          {prizes.map((p, i) => (
            <div
              key={`${p}-${i}`}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80 backdrop-blur"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

