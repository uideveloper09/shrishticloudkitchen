"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/AnimateIn";
import { FoodCard } from "@/components/FoodCard";
import { menuItems } from "@/lib/menu-data";
import { formatPrice } from "@/lib/utils";

const MENU_IMAGE =
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85";

export default function MenuPage() {
  const parathas = menuItems.filter(
    (m) => m.category === "paratha" || m.category === "breads"
  );
  const extras = menuItems.filter((m) => m.category === "sides");

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left: Menu list */}
          <AnimateIn animation="fade-in-up">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-accent">
              Our Menu
            </h1>
            <p className="mt-2 text-accent/80 font-sans">
              Tasty & Affordable Parathas
            </p>
            <div className="mt-8 border-t border-[#5c3a21]/20 pt-6">
              <ul className="space-y-3">
                {parathas.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-baseline gap-4 font-sans text-accent border-b border-[#5c3a21]/10 pb-2"
                  >
                    <span className="font-medium">{item.title}</span>
                    <span className="text-[#b22222] font-semibold shrink-0">
                      {formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-medium text-accent/80">
                Extra: Achar & Curd
              </p>
              <ul className="mt-2 space-y-2">
                {extras.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-baseline gap-4 font-sans text-accent"
                  >
                    <span>{item.title}</span>
                    <span className="text-[#b22222] font-semibold shrink-0">
                      {formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="mt-8 w-full sm:w-auto bg-[#b22222] hover:bg-[#9a1d1d] text-white rounded-lg"
              >
                <Link href="/order">Order Online</Link>
              </Button>
            </div>
          </div>
          </AnimateIn>

          {/* Right: Image */}
          <AnimateIn animation="slide-in-right" delay={100}>
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] rounded-xl overflow-hidden shadow-lg border border-[#5c3a21]/10">
            <Image
              src={MENU_IMAGE}
              alt="Fresh parathas with chutney and curd"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          </AnimateIn>
        </div>

        {/* Full menu – add to cart */}
        <div className="mt-16 pt-12 border-t border-[#5c3a21]/15">
          <h2 className="font-display text-2xl font-bold text-accent mb-6">
            Build your order
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {menuItems.map((item) => (
              <FoodCard key={item.id} item={item} showQuantity />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
