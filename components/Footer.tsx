"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/order", label: "Order Online" },
];

export function Footer() {
  const pathname = usePathname();

  const openLoginDrawer = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-login-drawer"));
    }
  };

  return (
    <footer
      className="relative border-t border-[#8b1a1a] text-white overflow-hidden"
      style={{ backgroundColor: "#b22222" }}
    >
      {/* Subtle decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20c0-2 1-4 2-5l-2 1v-1l1-2c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2l-1 2v1l2-1c-1 1-2 3-2 5z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm font-sans text-white/95">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0" />
              Greater Noida, UP
            </span>
            <span className="hidden sm:inline text-white/60">|</span>
            <span>Order: 9 AM – 11 PM</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+919667710954"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-white/90 transition-colors"
            >
              <Phone className="h-4 w-4 shrink-0" />
              +91 9667710954
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        {/* Bottom menu – same behaviour as header: active underline, same links */}
        <div className="mt-6 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-sm font-sans font-medium">
          {footerLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors border-b-2 -mb-[2px] pb-0.5",
                  isActive
                    ? "text-white border-white"
                    : "text-white/80 border-transparent hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={openLoginDrawer}
            className="text-white/80 border-transparent border-b-2 -mb-[2px] pb-0.5 hover:text-white transition-colors font-sans font-medium bg-transparent cursor-pointer"
          >
            Login
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-white/60" suppressHydrationWarning>
          © {new Date().getFullYear()} Shrishti Cloud Kitchen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
