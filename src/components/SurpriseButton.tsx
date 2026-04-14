import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SurpriseButtonProps = {
  buttonLabel: string;
  title: string;
  body: string;
  className?: string;
};

export default function SurpriseButton({ buttonLabel, title, body, className }: SurpriseButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-white/15 bg-gradient-to-r from-rose-400/20 via-amber-200/10 to-rose-400/20 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(244,114,182,0.18)] backdrop-blur transition",
          "hover:border-white/25 hover:bg-white/10",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          className,
        )}
      >
        {buttonLabel}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />

            <motion.div
              className="absolute left-1/2 top-1/2 w-[min(640px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(16px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(16px)" }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-7 shadow-[0_40px_140px_rgba(0,0,0,0.8)] backdrop-blur">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_15%_20%,rgba(244,114,182,0.22),transparent_55%),radial-gradient(700px_circle_at_85%_70%,rgba(253,230,138,0.16),transparent_60%)]" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-widest text-white/70">Surpresa</div>
                      <div className="mt-2 text-2xl font-semibold tracking-tight text-white/95">
                        <span className="text-gradient-romance">{title}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur transition hover:bg-black/40"
                      aria-label="Fechar"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <motion.p
                    className="mt-5 whitespace-pre-line text-base leading-8 text-white/85"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                  >
                    {body}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

