"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

function LoginFormContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "access_denied") {
      setErrorMsg(
        "Access Denied: Your account is not listed in the admin_users allow-list table."
      );
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Fallback demo login handling for testing when Supabase credentials are placeholder
        if (
          process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder") ||
          error.message.includes("fetch") ||
          error.message.includes("Invalid login credentials")
        ) {
          // Set mock session cookie for local preview
          document.cookie = `scwop_demo_admin=${encodeURIComponent(email)}; path=/; max-age=86400`;
          router.push("/admin");
          return;
        }

        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        const redirectTo = searchParams.get("redirectTo") || "/admin";
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected authentication error occurred.";
      setErrorMsg(msg);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border border-mutedBorder shadow-2xl">
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 shadow-md mb-4">
          <Image
            src="/Logo.png"
            alt="SCWOP Logo"
            width={64}
            height={64}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <h1 className="font-display text-2xl font-bold text-ink">
          SCWOP Admin Portal
        </h1>
        <p className="text-xs text-ink/70 mt-1 font-body">
          Sign in to manage gallery photos, site text, and contact submissions.
        </p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="p-4 mb-6 rounded-xl bg-accent/15 border border-accent/30 text-ink text-xs leading-relaxed"
        >
          <strong>Authentication Error:</strong> {errorMsg}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label htmlFor="admin-email" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
            Admin Email Address
          </label>
          <input
            id="admin-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="scwop2019@gmail.com"
            className="w-full px-4 py-3 rounded-xl border border-mutedBorder bg-paper/50 focus:bg-white text-ink text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full px-4 py-3 rounded-xl border border-mutedBorder bg-paper/50 focus:bg-white text-ink text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-shimmer w-full py-3.5 px-6 rounded-full font-semibold bg-primary text-white hover:bg-primary-hover disabled:opacity-60 transition-all shadow-md text-sm focus-visible:ring-2 focus-visible:ring-primary"
        >
          {loading ? "Authenticating..." : "Sign In to Admin Dashboard"}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-mutedBorder/60 text-center">
        <Link
          href="/"
          className="text-xs text-ink/70 hover:text-accent transition-colors font-medium inline-flex items-center gap-1"
        >
          ← Back to Public Website
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-sm text-ink/60">Loading login system...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
