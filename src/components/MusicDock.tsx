import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Music2, Pause, Play, X } from "lucide-react";
import type { BackgroundAudioConfig, MusicConfig } from "@/content/siteContent";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type MusicDockProps = {
  music: MusicConfig;
  backgroundAudio?: BackgroundAudioConfig;
  className?: string;
};

function providerLabel(provider: MusicConfig["provider"]) {
  if (provider === "spotify") return "Spotify";
  return "YouTube Music";
}

export default function MusicDock({ music, backgroundAudio, className }: MusicDockProps) {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytContainerRef = useRef<HTMLDivElement | null>(null);
  const ytPlayerRef = useRef<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const title = useMemo(() => `${providerLabel(music.provider)} — ${music.trackLabel}`, [music.provider, music.trackLabel]);

  const bgTitle = useMemo(() => {
    if (!backgroundAudio) return null;
    return `Tocando — ${backgroundAudio.label}`;
  }, [backgroundAudio]);

  const coverUrl = useMemo(() => {
    if (!backgroundAudio) return null;
    if (backgroundAudio.coverImageUrl) return backgroundAudio.coverImageUrl;
    if (backgroundAudio.provider === "youtube") return `https://i.ytimg.com/vi/${backgroundAudio.videoId}/hqdefault.jpg`;
    return null;
  }, [backgroundAudio]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!backgroundAudio) return;
    if (backgroundAudio.provider !== "file") return;

    const audio = audioRef.current;
    if (!audio) return;

    function onPlay() {
      setIsPlaying(true);
      setNeedsInteraction(false);
    }

    function onPause() {
      setIsPlaying(false);
    }

    function onError() {
      setAudioError("Arquivo de música não encontrado. Coloque em public/audio/velha-infancia.mp3 (ou troque o caminho no siteContent.ts).");
      setIsPlaying(false);
    }

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    if (backgroundAudio?.loop) audio.loop = true;

    audio.load();

    Promise.resolve()
      .then(() => audio.play())
      .catch(() => {
        setNeedsInteraction(true);
      });

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
  }, [backgroundAudio]);

  useEffect(() => {
    if (!backgroundAudio) return;
    if (backgroundAudio.provider !== "youtube") return;

    const youtubeAudio = backgroundAudio as Extract<BackgroundAudioConfig, { provider: "youtube" }>;

    const container = ytContainerRef.current;
    if (!container) return;
    let cancelled = false;

    function ensureYouTubeApi() {
      return new Promise<void>((resolve, reject) => {
        if (window.YT?.Player) {
          resolve();
          return;
        }

        const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]');
        if (!existing) {
          const s = document.createElement("script");
          s.src = "https://www.youtube.com/iframe_api";
          s.async = true;
          s.onerror = () => reject(new Error("yt_api_load_failed"));
          document.head.appendChild(s);
        }

        const prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          prev?.();
          resolve();
        };

        setTimeout(() => {
          if (window.YT?.Player) resolve();
        }, 2000);

        setTimeout(() => {
          if (!window.YT?.Player) reject(new Error("yt_api_timeout"));
        }, 8000);
      });
    }

    async function init() {
      try {
        setAudioError(null);
        setNeedsInteraction(true);

        await ensureYouTubeApi();
        if (cancelled) return;

        ytPlayerRef.current?.destroy();
        ytPlayerRef.current = new window.YT!.Player(container, {
          height: "0",
          width: "0",
          videoId: youtubeAudio.videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            start: youtubeAudio.startSeconds ?? 0,
            loop: youtubeAudio.loop ? 1 : 0,
            playlist: youtubeAudio.loop ? youtubeAudio.videoId : undefined,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              setNeedsInteraction(true);
              try {
                ytPlayerRef.current?.playVideo();
              } catch {
                setNeedsInteraction(true);
              }
            },
            onStateChange: (e) => {
              const playing = e.data === window.YT!.PlayerState.PLAYING;
              const paused = e.data === window.YT!.PlayerState.PAUSED;
              const ended = e.data === window.YT!.PlayerState.ENDED;
              if (playing) {
                setIsPlaying(true);
                setNeedsInteraction(false);
              }
              if (paused || ended) setIsPlaying(false);
            },
            onError: () => {
              setAudioError("Não consegui tocar pelo YouTube. Tente abrir no botão 'Abrir' e dar play.");
              setIsPlaying(false);
            },
          },
        });
      } catch {
        setAudioError("Não consegui carregar o player do YouTube.");
      }
    }

    init();

    return () => {
      cancelled = true;
      ytPlayerRef.current?.destroy();
      ytPlayerRef.current = null;
    };
  }, [backgroundAudio]);

  async function toggleBackgroundAudio() {
    if (!backgroundAudio) return;
    setAudioError(null);

    if (backgroundAudio.provider === "file") {
      const audio = audioRef.current;
      if (!audio) return;
      try {
        if (audio.paused) {
          if (audio.readyState === 0) audio.load();
          await audio.play();
        } else {
          audio.pause();
        }
      } catch {
        setNeedsInteraction(true);
      }
      return;
    }

    if (backgroundAudio.provider === "youtube") {
      const player = ytPlayerRef.current;
      if (!player) {
        setAudioError("Player do YouTube ainda carregando.");
        return;
      }
      try {
        const state = player.getPlayerState();
        if (state === window.YT!.PlayerState.PLAYING) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
      } catch {
        setNeedsInteraction(true);
      }
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-2">
        {backgroundAudio ? (
          <>
            {backgroundAudio.provider === "file" ? (
              <audio ref={audioRef} src={backgroundAudio.src} preload="auto" />
            ) : (
              <div ref={ytContainerRef} />
            )}
            <button
              type="button"
              onClick={toggleBackgroundAudio}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-sm text-white shadow-sm backdrop-blur transition",
                "hover:bg-black/45 hover:border-white/30",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
              )}
              aria-label={isPlaying ? "Pausar música" : "Tocar música"}
              title={bgTitle ?? undefined}
            >
              <span className="relative">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={backgroundAudio.label}
                    className="h-9 w-9 rounded-lg border border-white/15 object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5">
                    <Music2 className="h-4 w-4" />
                  </span>
                )}
                <span className="absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-black/70 shadow-sm">
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </span>
              </span>
              <span className="max-w-[160px] truncate">{backgroundAudio.label}</span>
            </button>
          </>
        ) : null}

        {backgroundAudio?.provider === "youtube" ? null : (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-sm text-white shadow-sm backdrop-blur transition",
              "hover:bg-black/45 hover:border-white/30",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
            )}
            aria-expanded={open}
            aria-label={open ? "Fechar player" : "Abrir player"}
          >
            <Music2 className="h-4 w-4" />
            <span className="max-w-[180px] truncate">{music.trackLabel}</span>
            <span className="hidden text-white/70 sm:inline">({providerLabel(music.provider)})</span>
          </button>
        )}

        <a
          href={music.openUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-sm text-white shadow-sm backdrop-blur transition",
            "hover:bg-black/45 hover:border-white/30",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          )}
          aria-label="Abrir música em outra aba"
          title="Abrir no app/site"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline">Abrir</span>
        </a>
      </div>

      {backgroundAudio && (audioError || (needsInteraction && !isPlaying)) ? (
        <div className="mt-2 text-xs text-white/80">
          {audioError ? (
            <span className="text-rose-200/90">{audioError}</span>
          ) : (
            <span>Clique em “{backgroundAudio.label}” para iniciar a música.</span>
          )}
        </div>
      ) : null}

      {open && backgroundAudio?.provider !== "youtube" ? (
        <div className="absolute right-0 top-[52px] z-20 w-[min(520px,calc(100vw-32px))] rounded-2xl border border-white/15 bg-black/50 p-3 shadow-lg backdrop-blur">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-white">{music.trackLabel}</div>
              <div className="truncate text-xs text-white/70">{title}</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
            <iframe
              title={title}
              src={music.embedUrl}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ border: "none" }}
            />
          </div>

          {audioError ? <div className="mt-2 text-xs text-rose-200/90">{audioError}</div> : null}
          <div className="mt-2 text-xs text-white/70">Se não tocar automaticamente, clique em tocar (ou no play do player).</div>
        </div>
      ) : null}
    </div>
  );
}

