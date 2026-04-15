import Reveal from "@/components/Reveal";
import { siteContent } from "@/content/siteContent";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, Copy, KeyRound, Link2, Lock, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function generateToken() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function Admin() {
  const owner = siteContent.owner;
  const [pass, setPass] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [key, setKey] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isPassOk = useMemo(() => pass.trim() === owner.adminPassphrase, [owner.adminPassphrase, pass]);
  const keyOk = useMemo(() => /^[0-9A-F]{6}-[0-9A-F]{6}-[0-9A-F]{8}$/i.test(key.trim()), [key]);

  function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (!isPassOk) return;
    setUnlocked(true);
  }

  async function copy() {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  function validateAndGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!keyOk) return;
    const token = generateToken();
    const link = `${window.location.origin}/roleta/${token}`;
    setGeneratedLink(link);
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
            <Lock className="h-4 w-4" />
            Admin
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
        <Reveal>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_140px_rgba(0,0,0,0.7)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Exclusivo</div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  <span className="text-gradient-romance">Validador de chave</span>
                </h1>
                <p className="mt-2 text-sm text-white/80">Cole a chave que ela te mandou e gere o link da roleta.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/80">
                <Sparkles className="h-4 w-4" />
                {owner.displayName}
              </div>
            </div>

            {!unlocked ? (
              <form onSubmit={unlock} className="mt-7 rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur">
                <label className="block text-sm font-medium text-white/90">Senha do admin</label>
                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <KeyRound className="h-4 w-4 text-white/70" />
                  <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="Digite a senha"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isPassOk}
                  className={cn(
                    "mt-4 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-black/25 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition",
                    "hover:bg-black/35 hover:border-white/25",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                  )}
                >
                  <Lock className="h-4 w-4" />
                  Entrar
                </button>
              </form>
            ) : (
              <div className="mt-7 grid gap-6 md:grid-cols-2">
                <form onSubmit={validateAndGenerate} className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur">
                  <label className="block text-sm font-medium text-white/90">Chave recebida</label>
                  <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <KeyRound className="h-4 w-4 text-white/70" />
                    <input
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      placeholder="XXXXXX-XXXXXX-XXXXXXXX"
                      className="w-full bg-transparent font-mono text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                  </div>
                  {!keyOk && key.length > 0 ? <div className="mt-2 text-xs text-rose-200/90">Formato inválido.</div> : null}

                  <button
                    type="submit"
                    disabled={!keyOk}
                    className={cn(
                      "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-gradient-to-r from-rose-400/25 via-amber-200/10 to-rose-400/25 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(244,114,182,0.18)] backdrop-blur transition",
                      "hover:bg-white/10 hover:border-white/25",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                    )}
                  >
                    <Check className="h-4 w-4" />
                    Validar e gerar link
                  </button>
                </form>

                <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur">
                  <div className="text-xs uppercase tracking-widest text-white/60">Link da roleta</div>
                  <div className="mt-2 text-sm leading-7 text-white/80">Mande esse link pra ela abrir e girar 3 vezes.</div>

                  {generatedLink ? (
                    <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
                      <div className="text-xs text-white/70">Link</div>
                      <div className="mt-2 break-all font-mono text-sm text-white/95">{generatedLink}</div>
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
                        {copied ? "Copiado!" : "Copiar link"}
                      </button>
                      <a
                        href={generatedLink}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "mt-2 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/25 px-4 py-2 text-sm text-white/90 backdrop-blur transition",
                          "hover:bg-black/35 hover:border-white/25",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                        )}
                      >
                        <Link2 className="h-4 w-4" />
                        Abrir
                      </a>
                    </div>
                  ) : (
                    <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
                      Valide uma chave para gerar o link.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </main>
    </div>
  );
}

