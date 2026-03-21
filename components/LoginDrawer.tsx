"use client";

import { useState, useEffect } from "react";
import { signIn, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { cn, imgPath } from "@/lib/utils";

interface LoginDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callbackUrl?: string;
  defaultView?: "login" | "signup";
}

export function LoginDrawer({
  open,
  onOpenChange,
  callbackUrl = "/",
  defaultView = "login",
}: LoginDrawerProps) {
  const router = useRouter();
  const [view, setView] = useState<"login" | "signup">(defaultView);

  useEffect(() => {
    if (open) setView(defaultView);
  }, [open, defaultView]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showReferralInput, setShowReferralInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasGoogleProvider, setHasGoogleProvider] = useState<boolean | null>(null);

  useEffect(() => {
    if (!open) return;
    getProviders().then((providers) => {
      setHasGoogleProvider(Boolean(providers?.google));
    });
  }, [open]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password.");
        return;
      }
      onOpenChange(false);
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, referralCode: referralCode || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed.");
        return;
      }
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (signInRes?.error) {
        setError("Account created. Please sign in.");
        setView("login");
        return;
      }
      onOpenChange(false);
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!hasGoogleProvider) return;
    onOpenChange(false);
    signIn("google", { callbackUrl });
  };

  const switchToLogin = () => {
    setView("login");
    setError(null);
  };
  const switchToSignUp = () => {
    setView("signup");
    setError(null);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl border-l border-gray-200 rounded-l-2xl overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
          )}
        >
          {/* Header - reference style: X top-left, title, orange link, line, circle right */}
          <div className="shrink-0 bg-white px-6 pt-5 pb-5">
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-col min-w-0">
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" aria-label="Close" className="text-black hover:bg-gray-100 hover:text-black -ml-2 w-9 h-9 shrink-0 self-start">
                    <X className="h-5 w-5" />
                  </Button>
                </Dialog.Close>
                <h2 className="text-2xl font-bold text-black tracking-tight mt-1">
                  {view === "signup" ? "Sign up" : "Login"}
                </h2>
                <p className="mt-2 text-sm">
                  <span className="text-black">or </span>
                  <button
                    type="button"
                    onClick={view === "signup" ? switchToLogin : switchToSignUp}
                    className="text-[#ea580c] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    {view === "signup" ? "login to your account" : "create an account"}
                  </button>
                </p>
                <div className="mt-2 h-0.5 w-10 bg-black rounded-full self-start" aria-hidden />
              </div>
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden" aria-hidden="true">
                {/* Paratha image: local file (add public/images/paratha-login.png) or fallback emoji */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgPath("@/images/paratha-login.png")}
                  alt=""
                  width={96}
                  height={96}
                  className="object-cover w-full h-full rounded-full"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.dataset.retried !== "1") {
                      target.dataset.retried = "1";
                      target.src = imgPath("@/images/fallback-paratha.png");
                      return;
                    }
                    target.style.display = "none";
                    const fallback = document.createElement("span");
                    fallback.setAttribute("aria-hidden", "true");
                    fallback.className = "text-4xl";
                    fallback.textContent = "";
                    target.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 pt-4 border-t border-gray-100">
            {view === "signup" ? (
              <>

                {error && (
                  <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      minLength={6}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowReferralInput((v) => !v)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {showReferralInput ? "Hide referral code" : "Have a referral code?"}
                  </button>
                  {showReferralInput && (
                    <div className="space-y-2">
                      <Label htmlFor="signup-referral">Referral code</Label>
                      <Input
                        id="signup-referral"
                        type="text"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        placeholder="Enter referral code"
                        className="max-w-xs"
                      />
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-semibold uppercase tracking-wide"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Continue"}
                  </Button>
                </form>
                <p className="mt-6 text-xs text-gray-600">
                  By creating an account, I accept the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms & Conditions
                  </Link>{" "}
                  &{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-6">
                  Sign in to place orders and view your order history.
                </p>
                {error && (
                  <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="drawer-email">Email</Label>
                    <Input
                      id="drawer-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="drawer-password">Password</Label>
                    <Input
                      id="drawer-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in with Email"}
                  </Button>
                </form>
                {hasGoogleProvider === false && (
                  <p className="mt-4 text-xs text-gray-500 text-center">
                    Sign in with Google will be available soon. Please use{" "}
                    <strong className="text-gray-700">email and password</strong> above.
                  </p>
                )}
                {hasGoogleProvider && (
                  <>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                      onClick={handleGoogleLogin}
                    >
                      Sign in with Google
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
