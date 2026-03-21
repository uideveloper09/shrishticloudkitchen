import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, UtensilsCrossed } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16 text-center bg-secondary">
      <UtensilsCrossed className="h-16 w-16 text-[#b22222]/40 mb-4" aria-hidden />
      <h1 className="font-display text-3xl font-bold text-accent md:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-accent/80">
        This page doesn&apos;t exist or the link may be broken. Head back home or browse our menu.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Button asChild className="bg-[#b22222] hover:bg-[#9a1d1d] text-white min-h-11 px-6">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button asChild variant="outline" className="min-h-11 px-6 border-[#5c3a21]/30">
          <Link href="/menu">View menu</Link>
        </Button>
      </div>
    </div>
  );
}
