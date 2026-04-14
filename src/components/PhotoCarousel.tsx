import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { PhotoItem } from "@/content/siteContent";
import { cn } from "@/lib/utils";

type PhotoCarouselProps = {
  photos: PhotoItem[];
  className?: string;
};

export default function PhotoCarousel({ photos, className }: PhotoCarouselProps) {
  const safePhotos = useMemo(() => (photos.length > 0 ? photos : [{ src: "", alt: "" }]), [photos]);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  function go(next: number) {
    setDir(next > index ? 1 : -1);
    setIndex((v) => {
      const n = (next + safePhotos.length) % safePhotos.length;
      return n;
    });
  }

  const current = safePhotos[index];

  return (
    <div className={cn("w-full", className)}>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_25%_20%,rgba(244,114,182,0.18),transparent_55%),radial-gradient(700px_circle_at_80%_60%,rgba(253,230,138,0.14),transparent_60%)]" />

        <div className="relative aspect-[16/10]">
          <AnimatePresence initial={false} custom={dir}>
            <motion.img
              key={`${current.src}-${index}`}
              src={current.src}
              alt={current.alt}
              className="absolute inset-0 h-full w-full object-cover"
              custom={dir}
              initial={{ opacity: 0, x: dir * 80, scale: 1.06, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, scale: 1.03, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir * -80, scale: 1.02, filter: "blur(10px)" }}
              transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-white/95">{current.alt || ""}</div>
              <div className="text-xs text-white/70">Galeria</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur transition",
                  "hover:bg-black/45 hover:border-white/25",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                )}
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur transition",
                  "hover:bg-black/45 hover:border-white/25",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                )}
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {safePhotos.length > 1 ? (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {safePhotos.map((p, i) => (
            <button
              key={`${p.src}-${i}`}
              type="button"
              onClick={() => go(i)}
              className={cn(
                "group relative h-16 w-24 flex-none overflow-hidden rounded-2xl border transition",
                i === index ? "border-white/40" : "border-white/10 hover:border-white/25",
              )}
              aria-label={`Abrir foto ${i + 1}`}
            >
              <img src={p.src} alt={p.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className={cn("absolute inset-0", i === index ? "bg-white/0" : "bg-black/15")} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

