"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, User, LogOut, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "./CartDrawer";
import { LoginDrawer } from "./LoginDrawer";
import { useCartStore } from "@/store/cart-store";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { cn, imgPath } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/order", label: "Order Online" },
];

function userInitials(name: string | null | undefined, email: string | null | undefined): string {
  const n = (name || "").trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return n.slice(0, 2).toUpperCase();
  }
  const e = (email || "").split("@")[0] || "?";
  return e.slice(0, 2).toUpperCase();
}

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginCallbackUrl, setLoginCallbackUrl] = useState("/");
  const [authDrawerView, setAuthDrawerView] = useState<"login" | "signup">("login");
  const [mounted, setMounted] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  const handleConfirmLogout = () => {
    setLogoutConfirmOpen(false);
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (status !== "unauthenticated" || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const callbackUrl = params.get("callbackUrl");
    const openLogin = params.get("openLogin");
    if (callbackUrl || openLogin === "1") {
      setLoginCallbackUrl(callbackUrl || "/");
      setAuthDrawerView("login");
      setLoginOpen(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [status]);

  useEffect(() => {
    const openDrawer = () => {
      setLoginCallbackUrl(pathname || "/");
      setAuthDrawerView("login");
      setLoginOpen(true);
    };
    window.addEventListener("open-login-drawer", openDrawer);
    return () => window.removeEventListener("open-login-drawer", openDrawer);
  }, [pathname]);

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full overflow-visible border-b border-[#5c3a21]/10 bg-[#f5efe6]/95 backdrop-blur supports-[backdrop-filter]:bg-[#f5efe6]/90 p-2"
        style={{ backgroundColor: "#f5efe6", borderBottom: "1px solid rgba(92, 58, 33, 0.1)" }}
      >
        <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-6 overflow-visible">
          {/* Left: logo – same design (40px height, left-aligned) */}
          <Link
            href="/"
            className="flex shrink-0 items-center py-[7.5px] focus:outline-none focus:ring-2 focus:ring-[#b22222] focus:ring-offset-2 rounded"
            aria-label="Shrishti Cloud Kitchen – Home"
          >
            <Image
              src={imgPath("@/images/logo.png")}
              alt="Shrishti Cloud Kitchen"
              width={180}
              height={48}
              className="h-16 w-auto object-contain object-left"
              priority
            />
          </Link>

          {/* Pure veg – leaf + text, theme colours */}
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-[#5c3a21]/08 px-2.5 py-1 text-xs font-medium text-[#5c3a21] border border-[#5c3a21]/20">
            <Leaf className="h-3.5 w-3.5 text-green-600 shrink-0" />
            Pure veg only
          </span>

          {/* Center: nav menu – same design (active underline, cream bg) */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8 min-w-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-[2px] pb-1",
                    isActive
                      ? "text-[#5c3a21] border-[#5c3a21]"
                      : "text-[#5c3a21]/70 border-transparent hover:text-[#b22222]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Order Online CTA (red) + cart + auth – same design */}
          <div className="relative z-[45] flex shrink-0 items-center gap-3 overflow-visible">
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex bg-[#b22222] hover:bg-[#9a1d1d] text-white rounded-lg px-5 font-medium shadow-sm"
            >
              <Link href="/order">Order Online</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#5c3a21] hover:text-[#b22222]"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#b22222] text-[10px] font-bold text-white">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Button>

            {!mounted || status === "loading" ? (
              <div className="h-9 w-9 rounded-full bg-accent/10 animate-pulse" aria-hidden />
            ) : session ? (
              <DropdownMenu.Root
                modal={false} /* avoid Radix scroll-lock padding (right-edge gap) */
              >
                <DropdownMenu.Trigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Account menu">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="z-[200] min-w-[260px] max-w-[min(100vw-2rem,320px)] rounded-lg border border-accent/10 bg-secondary p-0 shadow-lg"
                    align="end"
                    side="bottom"
                    sideOffset={10}
                    alignOffset={0}
                    avoidCollisions
                    collisionPadding={12}
                  >
                    {/* Profile summary — not a menu row */}
                    <div className="border-b border-accent/10 px-3 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {session.user?.image ? (
                          // eslint-disable-next-line @next/next/no-img-element -- OAuth avatar URLs vary by host
                          <img
                            src={session.user.image}
                            alt=""
                            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-[#5c3a21]/10"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#b22222]/15 text-sm font-bold text-[#b22222] ring-2 ring-[#5c3a21]/10"
                            aria-hidden
                          >
                            {userInitials(session.user?.name, session.user?.email)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1 text-left">
                          <p className="truncate text-sm font-semibold text-accent">
                            {session.user?.name?.trim() ||
                              session.user?.email?.split("@")[0] ||
                              "Account"}
                          </p>
                          <p className="truncate text-xs text-accent/70" title={session.user?.email ?? undefined}>
                            {session.user?.email ?? "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5 pt-1">
                    <DropdownMenu.Item className="w-full min-w-0 p-0 outline-none" asChild>
                      <Link
                        href="/orders"
                        className="block w-full rounded-md px-3 py-2 text-sm text-accent no-underline outline-none hover:bg-accent/10 data-[highlighted]:bg-accent/10"
                      >
                        Order History
                      </Link>
                    </DropdownMenu.Item>
                    {session.user?.email?.includes("admin") && (
                      <DropdownMenu.Item className="w-full min-w-0 p-0 outline-none" asChild>
                        <Link
                          href="/admin"
                          className="block w-full rounded-md px-3 py-2 text-sm text-accent no-underline outline-none hover:bg-accent/10 data-[highlighted]:bg-accent/10"
                        >
                          Admin
                        </Link>
                      </DropdownMenu.Item>
                    )}
                    <DropdownMenu.Separator className="my-1 h-px bg-accent/10" />
                    <DropdownMenu.Item
                      className="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-accent outline-none hover:bg-accent/10 data-[highlighted]:bg-accent/10"
                      onSelect={() => setLogoutConfirmOpen(true)}
                    >
                      <LogOut className="h-4 w-4 shrink-0" />
                      Sign out
                    </DropdownMenu.Item>
                    </div>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#5c3a21] hover:text-[#b22222]"
                  onClick={() => {
                    setLoginCallbackUrl("/");
                    setAuthDrawerView("signup");
                    setLoginOpen(true);
                  }}
                >
                  Sign up
                </Button>
                <Button
                  size="sm"
                  className="bg-[#b22222] hover:bg-[#9a1d1d] text-white"
                  onClick={() => {
                    setLoginCallbackUrl("/");
                    setAuthDrawerView("login");
                    setLoginOpen(true);
                  }}
                >
                  Login
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu – animated toggle (slide down + fade) */}
        <div
          className={cn(
            "md:hidden overflow-hidden border-t bg-[#f5efe6] transition-all duration-300 ease-out",
            mobileOpen
              ? "max-h-[80vh] opacity-100 border-[#5c3a21]/10"
              : "max-h-0 opacity-0 border-transparent"
          )}
        >
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            <p className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#5c3a21] bg-[#5c3a21]/08 rounded-lg border border-[#5c3a21]/15 sm:hidden">
              <Leaf className="h-3.5 w-3.5 text-green-600 shrink-0" />
              Pure vegetarian only
            </p>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#5c3a21]/10 transition-colors",
                    isActive ? "text-[#b22222] font-semibold" : "text-[#5c3a21] hover:text-[#b22222]"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            {session ? (
              <>
                <Link
                  href="/orders"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[#5c3a21] hover:bg-[#5c3a21]/10 w-full text-left transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Order History
                </Link>
                {session.user?.email?.includes("admin") && (
                  <Link
                    href="/admin"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[#5c3a21] hover:bg-[#5c3a21]/10 w-full text-left transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button
                  type="button"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[#b22222] w-full text-left transition-colors flex items-center gap-2"
                  onClick={() => {
                    setMobileOpen(false);
                    setLogoutConfirmOpen(true);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[#5c3a21] hover:bg-[#5c3a21]/10 w-full text-left transition-colors"
                  onClick={() => {
                    setMobileOpen(false);
                    setLoginCallbackUrl("/");
                    setAuthDrawerView("signup");
                    setLoginOpen(true);
                  }}
                >
                  Sign up
                </button>
                <button
                  type="button"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[#b22222] w-full text-left transition-colors"
                  onClick={() => {
                    setMobileOpen(false);
                    setLoginCallbackUrl("/");
                    setAuthDrawerView("login");
                    setLoginOpen(true);
                  }}
                >
                  Login
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <LoginDrawer open={loginOpen} onOpenChange={setLoginOpen} callbackUrl={loginCallbackUrl} defaultView={authDrawerView} />

      <Dialog.Root open={logoutConfirmOpen} onOpenChange={setLogoutConfirmOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[300] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            className={cn(
              "fixed left-1/2 top-1/2 z-[301] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#5c3a21]/15 bg-[#f5efe6] p-6 shadow-xl",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            )}
          >
            <Dialog.Title className="font-display text-lg font-bold text-accent">
              Sign out?
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-accent/80">
              Are you sure you want to sign out? You will need to sign in again to place orders or view order history.
            </Dialog.Description>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => setLogoutConfirmOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                className="w-full bg-[#b22222] hover:bg-[#9a1d1d] text-white sm:w-auto"
                onClick={handleConfirmLogout}
              >
                Sign out
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
