"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Incorrect email or password.");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-brand-paper/10 bg-brand-paper p-8 shadow-xl"
    >
      <h1 className="font-display text-xl font-bold text-brand-navy">
        Sign in
      </h1>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@scribescreative.co.ke"
            className="rounded-md border border-brand-navy/20 px-3.5 py-2.5 font-body text-sm text-brand-navy placeholder:text-brand-navy/30 focus:border-brand-navy focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-slate"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-brand-navy/20 px-3.5 py-2.5 pr-10 font-body text-sm text-brand-navy focus:border-brand-navy focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-slate"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-3 font-body text-sm text-brand-red">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-brand-navy px-4 py-2.5 font-body text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
      >
        {loading && <Loader className="h-4 w-4 animate-spin" />}
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark px-4">
      <div className="w-full max-w-sm">
        {/* Logo — larger for the full-page login context */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <Logo height={52} variant="dark-bg" asLink={false} />
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-paper/50">
            Admin Panel
          </p>
        </div>

        {/* Suspense boundary required for useSearchParams() in App Router */}
        <Suspense
          fallback={
            <div className="flex h-48 items-center justify-center rounded-xl border border-brand-paper/10 bg-brand-paper">
              <Loader className="h-5 w-5 animate-spin text-brand-slate" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}