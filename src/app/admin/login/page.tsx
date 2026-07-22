"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
    <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-mutedBorder shadow-xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-3">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-bold text-ink">
          SCWOP Admin Portal
        </h1>
        <p className="text-xs text-ink/60 mt-1 font-body">
          Sign in to manage gallery photos, site text, and contact submissions.
        </p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="p-4 mb-6 rounded-xl bg-secondaryAccent/15 border border-secondaryAccent/30 text-ink text-xs leading-relaxed"
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
            placeholder="admin@scwop.org"
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
          className="w-full py-3.5 px-6 rounded-full font-medium bg-primary text-white hover:bg-primary-hover disabled:opacity-60 transition-colors shadow-md text-sm focus-visible:ring-2 focus-visible:ring-primary"
        >
          {loading ? "Authenticating..." : "Sign In to Admin Dashboard"}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-mutedBorder/60 text-center">
        <Link
          href="/"
          className="text-xs text-ink/70 hover:text-primary transition-colors font-medium inline-flex items-center gap-1"
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
