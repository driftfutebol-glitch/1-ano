import MusicDock from "@/components/MusicDock";
import PhotoSlider from "@/components/PhotoSlider";
import HeartsBackground from "@/components/HeartsBackground";
import PhotoCarousel from "@/components/PhotoCarousel";
import Reveal from "@/components/Reveal";
import SurpriseButton from "@/components/SurpriseButton";
import Timeline from "@/components/Timeline";
import { siteContent } from "@/content/siteContent";
import { assetPhotos } from "@/content/assetPhotos";
import { motion, useScroll, useTransform } from "framer-motion";
import { Gift, Image } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]); 
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0.2]);
  const photos = assetPhotos.length > 0 ? assetPhotos : siteContent.photos;

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white">
      <HeartsBackground />

      <header className="fixed left-0 right-0 top-0 z-30 animate-fade-down">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-wide">{siteContent.coupleNameLine}</div>
            <div className="text-xs text-white/70">Um pedacinho da nossa história</div>
          </div>
          <MusicDock music={siteContent.music} backgroundAudio={siteContent.backgroundAudio} />
        </div>
      </header>

      <main>
        <section ref={heroRef} className="relative h-[100svh] min-h-[680px] overflow-hidden">
          <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
            <PhotoSlider photos={photos} intervalMs={siteContent.sliderIntervalMs} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-[#0b0b0c]" />

          <motion.div
            style={{ opacity: glowOpacity }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_25%_20%,rgba(244,114,182,0.22),transparent_55%),radial-gradient(900px_circle_at_85%_70%,rgba(253,230,138,0.16),transparent_60%)]"
          />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-14 pt-28">
              <Reveal className="max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs text-white/90 backdrop-blur shadow-[0_18px_60px_rgba(244,114,182,0.14)]">
                  12/04/2024 • 1 ano de namoro
                </div>

                <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                  <span className="text-gradient-romance">{siteContent.heroTitle}</span>
                </h1>
                <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">{siteContent.heroSubtitle}</p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <SurpriseButton
                    buttonLabel={siteContent.surprise.buttonLabel}
                    title={siteContent.surprise.title}
                    body={siteContent.surprise.body}
                  />

                  <Link
                    to="/presente"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-black/25 px-5 py-2.5 text-sm font-semibold text-white/90 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur transition hover:bg-black/35 hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <Gift className="h-4 w-4" />
                    {siteContent.gift.ctaLabel}
                  </Link>

                  <Link
                    to="/foto-destaque"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-black/25 px-5 py-2.5 text-sm font-semibold text-white/90 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur transition hover:bg-black/35 hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <Image className="h-4 w-4" />
                    Foto destaque
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14 pt-10">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-2 md:items-start">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Galeria</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white/95">Momentos que ficam</h2>
                <p className="mt-3 text-sm leading-7 text-white/80">
                  Um carrossel com nossas memórias — e as próximas que ainda vão vir.
                </p>
              </div>
              <PhotoCarousel photos={photos} />
            </div>
          </Reveal>

          <div className="mt-14">
            <Reveal>
              <div className="grid gap-10 md:grid-cols-2 md:items-start">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/60">Nossa história</div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white/95">Linha do tempo</h2>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    Datas importantes, lembranças e tudo que fez a gente chegar até aqui.
                  </p>
                </div>
                <Timeline items={siteContent.timeline} />
              </div>
            </Reveal>
          </div>

          <div className="mt-14">
            <Reveal>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-[0_40px_140px_rgba(0,0,0,0.7)] backdrop-blur">
                <div className="text-xs uppercase tracking-widest text-white/60">Carta</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{siteContent.messageTitle}</h2>
                <motion.p
                  className="mt-4 whitespace-pre-line text-sm leading-7 text-white/85 sm:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  {siteContent.messageBody}
                </motion.p>
              </div>
            </Reveal>
          </div>

          <footer className="mt-10 text-center text-xs text-white/60">
            Feito pelo desenvolvedor Pedro.
          </footer>
        </section>
      </main>
    </div>
  );
}
