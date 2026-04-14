import Reveal from "@/components/Reveal";
import { siteContent } from "@/content/siteContent";
import { cn } from "@/lib/utils";
import { ArrowLeft, Copy, Gift, Mail, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function generateKey() {
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return `${hex.slice(0, 6)}-${hex.slice(6, 12)}-${hex.slice(12, 20)}`;
}

export default function Presente() {
  const c = siteContent.gift;
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(87);
  const [key, setKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const emailOk = useMemo(() => /.+@.+\..+/.test(email.trim()), [email]);

  async function copy() {
    if (!key) return;
    try {
      await navigator.clipboard.writeText(key);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailOk) return;
    setKey(generateKey());
    setCopied(false);
  }

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
            <Gift className="h-4 w-4" />
            {c.pageTitle}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
        <Reveal>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_140px_rgba(0,0,0,0.7)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Presente</div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  <span className="text-gradient-romance">{c.pageTitle}</span>
                </h1>
                <p className="mt-2 text-sm text-white/80">{c.pageSubtitle}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/80">
                <Sparkles className="h-4 w-4" />
                Só você consegue gerar
              </div>
            </div>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur">
                <label className="block text-sm font-medium text-white/90">{c.formEmailLabel}</label>
                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <Mail className="h-4 w-4 text-white/70" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="ana@email.com"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                </div>
                {!emailOk && email.length > 0 ? (
                  <div className="mt-2 text-xs text-rose-200/90">Digita um e-mail válido.</div>
                ) : null}

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-medium text-white/90">{c.formScoreLabel}</label>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/85">{score}</div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="mt-3 w-full accent-rose-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!emailOk}
                  className={cn(
                    "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-gradient-to-r from-rose-400/25 via-amber-200/10 to-rose-400/25 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(244,114,182,0.18)] backdrop-blur transition",
                    "hover:bg-white/10 hover:border-white/25",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                  )}
                >
                  <Gift className="h-4 w-4" />
                  {c.formSubmitLabel}
                </button>
              </form>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur">
                <div className="text-xs uppercase tracking-widest text-white/60">Resultado</div>
                <div className="mt-2 text-xl font-semibold tracking-tight text-white/95">{c.resultTitle}</div>
                <div className="mt-2 text-sm leading-7 text-white/80">{c.resultBody}</div>

                {key ? (
                  <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="text-xs text-white/70">Sua chave</div>
                    <div className="mt-2 break-all font-mono text-base text-white/95">{key}</div>
                    <button
                      type="button"
                      onClick={copy}
                      className={cn(
                        "mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/25 px-4 py-2 text-sm text-white/90 backdrop-blur transition",
                        "hover:bg-black/35 hover:border-white/25",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                      )}
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Copiado!" : c.resultCopyLabel}
                    </button>
                    <div className="mt-3 text-xs text-white/70">{c.resultHint}</div>
                  </div>
                ) : (
                  <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
                    Preenche o e-mail e escolhe um valor pra gerar sua chave.
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

