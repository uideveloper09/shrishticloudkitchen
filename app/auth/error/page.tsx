"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ERROR_HELP: Record<string, string> = {
  Configuration:
    "The sign-in service is not set up correctly on the server. If you manage this site, add NEXTAUTH_SECRET and NEXTAUTH_URL in Vercel (Environment Variables), then redeploy. For Google login, also add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.",
  AccessDenied: "Sign in was cancelled or you don’t have access.",
  Verification: "This sign-in link has expired or was already used.",
  OAuthSignin: "Could not start Google sign-in. Check Google OAuth settings and redirect URIs.",
  OAuthCallback:
    "Google returned an error after sign-in. Check that the redirect URI in Google Cloud Console matches your site (e.g. https://shrishticloud.kitchen/api/auth/callback/google).",
  OAuthAccountNotLinked:
    "This email is already used with another sign-in method. Try email & password instead.",
  Callback: "Something went wrong during sign in. Please try again.",
  Default: "Something went wrong during sign in. Please try again or use email & password.",
};

function AuthErrorInner() {
  const searchParams = useSearchParams();
  const code = searchParams.get("error") ?? "";
  const message = ERROR_HELP[code] ?? ERROR_HELP.Default;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-center bg-secondary">
      <h1 className="font-display text-2xl font-bold text-[#b22222] md:text-3xl">
        Can&apos;t sign you in
      </h1>
      <p className="mt-4 text-accent max-w-lg text-sm md:text-base leading-relaxed">{message}</p>
      {code === "Configuration" && (
        <p className="mt-4 text-xs text-accent/70 max-w-md">
          Quick check: Vercel → Project → Settings → Environment Variables → ensure{" "}
          <code className="rounded bg-white/80 px-1 py-0.5">NEXTAUTH_SECRET</code> (32+ random chars) and{" "}
          <code className="rounded bg-white/80 px-1 py-0.5">NEXTAUTH_URL=https://shrishticloud.kitchen</code>{" "}
          are set for Production.
        </p>
      )}
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-[#b22222] px-6 py-3 text-white font-semibold hover:bg-[#9a1d1d]"
        >
          Back to home
        </Link>
        <Link
          href="/order"
          className="inline-flex items-center justify-center rounded-lg border border-[#5c3a21]/30 px-6 py-3 text-accent font-medium hover:bg-white/50"
        >
          Order online
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center bg-secondary text-accent">
          Loading…
        </div>
      }
    >
      <AuthErrorInner />
    </React.Suspense>
  );
}
