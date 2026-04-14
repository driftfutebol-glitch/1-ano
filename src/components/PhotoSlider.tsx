import { useEffect, useMemo, useState } from "react";
import type { PhotoItem } from "@/content/siteContent";
import { cn } from "@/lib/utils";

type PhotoSliderProps = {
  photos: PhotoItem[];
  intervalMs?: number;
  className?: string;
};

export default function PhotoSlider({ photos, intervalMs = 4500, className }: PhotoSliderProps) {
  const safePhotos = useMemo(() => (photos.length > 0 ? photos : [{ src: "", alt: "" }]), [photos]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safePhotos.length <= 1) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % safePhotos.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs, safePhotos.length]);

  useEffect(() => {
    if (index >= safePhotos.length) setIndex(0);
  }, [index, safePhotos.length]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {safePhotos.map((p, i) => (
        <img
          key={`${p.src}-${i}`}
          src={p.src}
          alt={p.alt}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1100ms] ease-out will-change-transform",
            i === index ? "opacity-100 scale-[1.06]" : "opacity-0 scale-[1.01]",
          )}
          loading={i === index ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
      ))}

      {safePhotos.length > 1 ? (
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur">
          {safePhotos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                i === index ? "bg-white" : "bg-white/40 hover:bg-white/70",
              )}
              aria-label={`Ir para a foto ${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

