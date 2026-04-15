import PrizeWheel from "@/components/PrizeWheel";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/content/siteContent";
import { cn } from "@/lib/utils";
import { ArrowLeft, Dice5, RotateCw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

function secureRandomInt(maxExclusive: number) {
  if (maxExclusive <= 1) return 0;
  const maxUint = 0xffffffff;
  const limit = maxUint - (maxUint % maxExclusive);
  const buf = new Uint32Array(1);
  while (true) {
    crypto.getRandomValues(buf);
    const v = buf[0];
    if (v < limit) return v % maxExclusive;
  }
}

type StoredState = {
  used: number;
  results: number[];
};

export default function Roleta() {
  const { token = "" } = useParams();
  const prizes = siteContent.roulette.prizes;
  const spinsTotal = siteContent.roulette.spins;
  const prizeTitles = useMemo(() => prizes.map((p) => p.title), [prizes]);

  const storageKey = useMemo(() => `roulette:${token}`, [token]);
  const [state, setState] = useState<StoredState>({ used: 0, results: [] });
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const remaining = Math.max(0, spinsTotal - state.used);

  useEffect(() => {
    if (!token) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredState;
      if (typeof parsed?.used === "number" && Array.isArray(parsed?.results)) {
        setState({ used: parsed.used, results: parsed.results });
      }
    } catch {
      setState({ used: 0, results: [] });
    }
  }, [storageKey, token]);

  useEffect(() => {
    if (!token) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      return;
    }
  }, [state, storageKey, token]);

  async function spin() {
    if (spinning) return;
    if (!token) return;
    if (remaining <= 0) return;

    const n = prizes.length;
    const resultIndex = secureRandomInt(n);

    const slice = 360 / Math.max(1, n);
    const target = 360 * 6 + (n - resultIndex) * slice;
    setSpinning(true);
    setRotation((r) => r + target);

    window.setTimeout(() => {
      setState((s) => ({ used: s.used + 1, results: [...s.results, resultIndex] }));
      setSpinning(false);
    }, 1400);
  }

  const lastIndex = state.results[state.results.length - 1];
  const lastPrize = typeof lastIndex === "number" ? prizes[lastIndex] : null;

  return (
    <div className="min-h-screen bg-[#070709] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-aurora-romance opacity-75" />
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
            <Dice5 className="h-4 w-4" />
            Roleta do amor
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
        <Reveal>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_140px_rgba(0,0,0,0.7)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Você tem</div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  <span className="text-gradient-romance">{remaining} giros</span>
                </h1>
                <p className="mt-2 text-sm text-white/80">5 prêmios, todos com a mesma chance.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/80">
                <Sparkles className="h-4 w-4" />
                Boa sorte 💖
              </div>
            </div>

            {!token ? (
              <div className="mt-7 rounded-3xl border border-white/10 bg-black/25 p-6 text-sm text-white/75 backdrop-blur">
                Link inválido. Peça para o Pedro te enviar o link da roleta.
              </div>
            ) : (
              <>
                <div className="mt-8">
                  <PrizeWheel prizes={prizeTitles} spinning={spinning} rotation={rotation} />
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={spin}
                    disabled={spinning || remaining <= 0}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-gradient-to-r from-rose-400/25 via-amber-200/10 to-rose-400/25 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(244,114,182,0.18)] backdrop-blur transition",
                      "hover:bg-white/10 hover:border-white/25",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                    )}
                  >
                    <RotateCw className={cn("h-4 w-4", spinning ? "animate-spin" : null)} />
                    Girar
                  </button>
                </div>

                {lastPrize ? (
                  <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur">
                    <div className="text-xs uppercase tracking-widest text-white/60">Você ganhou</div>
                    <div className="mt-2 text-xl font-semibold tracking-tight text-white/95">{lastPrize.title}</div>
                    <div className="mt-2 text-sm leading-7 text-white/80">{lastPrize.body}</div>
                  </div>
                ) : (
                  <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-6 text-sm text-white/75 backdrop-blur">
                    Clique em girar para descobrir seu primeiro prêmio.
                  </div>
                )}

                {state.results.length > 0 ? (
                  <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <div className="text-xs uppercase tracking-widest text-white/60">Seus resultados</div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {state.results.map((idx, i) => (
                        <div
                          key={`${idx}-${i}`}
                          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85"
                        >
                          {i + 1}º giro — {prizes[idx]?.title ?? "Prêmio"}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </Reveal>
      </main>
    </div>
  );
}
