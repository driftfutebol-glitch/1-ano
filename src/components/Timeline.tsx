import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TimelineItem = {
  date: string;
  title: string;
  body: string;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

export default function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-rose-200/30 via-white/10 to-transparent" />
      <div className="space-y-6">
        {items.map((it, idx) => (
          <motion.div
            key={`${it.title}-${idx}`}
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: idx * 0.05 }}
            className="relative pl-10"
          >
            <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border border-white/15 bg-black/25 shadow-[0_0_30px_rgba(244,114,182,0.25)] backdrop-blur">
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-rose-200/60 to-amber-100/30" />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur">
              <div className="text-xs uppercase tracking-widest text-white/60">{it.date}</div>
              <div className="mt-2 text-lg font-semibold tracking-tight text-white/95">{it.title}</div>
              <div className="mt-2 text-sm leading-7 text-white/80">{it.body}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

