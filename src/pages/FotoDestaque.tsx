import HeartsFloatLayer from "@/components/HeartsFloatLayer";
import Reveal from "@/components/Reveal";
import { featuredAssetPhoto } from "@/content/assetPhotos";
import { siteContent } from "@/content/siteContent";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function FotoDestaque() {
  const photo = featuredAssetPhoto ?? (siteContent.photos.length > 0 ? siteContent.photos[0] : null);

  return (
    <div className="min-h-screen bg-[#070709] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-aurora-romance opacity-85" />
        <div className="absolute inset-0 bg-grain opacity-[0.14]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/25 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <Link
            to="/"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm text-white/90 backdrop-blur transition",
              "hover:bg-black/35 hover:border-white/25",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>

          <div className="inline-flex items-center gap-2 text-sm text-white/80">
            <Sparkles className="h-4 w-4" />
            Foto destaque
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_40px_140px_rgba(0,0,0,0.75)] backdrop-blur">
            {photo ? (
              <>
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover opacity-35 blur-2xl scale-110"
                    draggable={false}
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/60" />
                <HeartsFloatLayer count={34} className="absolute inset-0" />

                <div className="relative p-6 sm:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/60">Destaque</div>
                      <div className="mt-2 text-2xl font-semibold tracking-tight text-white/95">
                        <span className="text-gradient-romance">Nosso momento especial</span>
                      </div>
                      <div className="mt-2 text-sm text-white/80">Um pedacinho da nossa história pra guardar.</div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/80 backdrop-blur">
                      <Sparkles className="h-4 w-4" />
                      Surpresa
                    </div>
                  </div>

                  <motion.div
                    className="mt-7 overflow-hidden rounded-3xl border border-white/15 bg-black/25 shadow-[0_30px_90px_rgba(0,0,0,0.65)] backdrop-blur"
                    initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(14px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
                  >
                    <div className="flex max-h-[72svh] min-h-[420px] w-full items-center justify-center bg-black/35">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="max-h-[72svh] w-auto max-w-full object-contain"
                        draggable={false}
                      />
                    </div>
                  </motion.div>
                </div>
              </>
            ) : (
              <div className="p-8 text-sm text-white/80">
                Coloque a imagem <span className="font-mono text-white/90">foto destaque.png</span> em{" "}
                <span className="font-mono text-white/90">src/assets/fotos</span>.
              </div>
            )}
          </div>
        </Reveal>
      </main>
    </div>
  );
}
