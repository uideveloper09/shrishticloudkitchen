import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/AnimateIn";
import { popularParathas } from "@/lib/menu-data";
import { formatPrice, imgPath } from "@/lib/utils";
import { Leaf } from "lucide-react";
import { TrustStrip } from "@/components/TrustStrip";

/** Local file in public/images/banner â€” use / path; no ?w=&q= (those only apply to remote/CDN URLs) */
const HERO_IMAGE = imgPath("@/images/banner/banner1.png");

export default function HomePage() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      {/* Hero â€“ image with red overlay, title, subtitle, Zomato + Swiggy */}
      <section className="relative flex min-h-[46vh] w-full min-w-0 items-center overflow-hidden sm:min-h-[52vh] md:min-h-[56vh] lg:min-h-[70vh]">
        <Image
          src={HERO_IMAGE}
          alt="Fresh homemade parathas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[#b22222]/85"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c-2 0-4 1.5-4 4s2 4 4 4 4-1.5 4-4-2-4-4-4zm0 10c-2 0-4 1.5-4 4s2 4 4 4 4-1.5 4-4-2-4-4-4z' fill='%23fff' fill-opacity='0.06'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="container relative z-10 mx-auto w-full max-w-full px-3 py-7 sm:px-4 sm:py-9 md:py-11 lg:py-16">
          <div className="max-w-2xl w-full">
            <AnimateIn animation="fade-in-up" delay={0}>
              <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Shrishti Cloud Kitchen
              </h1>
            </AnimateIn>
            <AnimateIn animation="fade-in-up" delay={100}>
              <p className="mt-3 max-w-[28ch] text-base text-white/95 font-sans sm:mt-4 sm:text-lg md:text-xl">
                Homemade Parathas Delivered Hot & Fresh
              </p>
            </AnimateIn>
            <AnimateIn animation="fade-in-up" delay={200}>
            <div className="mt-5 flex w-full max-w-xs flex-col gap-2.5 sm:mt-6 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-3 md:mt-7 md:gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 w-full bg-white text-[#b22222] hover:bg-gray-100 rounded-lg shadow-md font-semibold sm:h-11 sm:w-auto"
              >
                <a
                  href="https://www.zomato.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order on Zomato
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="h-12 w-full bg-[#FC8019] text-white hover:bg-[#e67314] rounded-lg shadow-md font-semibold border-0 sm:h-11 sm:w-auto"
              >
                <a
                  href="https://www.swiggy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order on Swiggy
                </a>
              </Button>
            </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Wavy divider — shorter on mobile/tablet so less cream gap above TrustStrip */}
      <div className="relative h-9 bg-secondary overflow-hidden sm:h-11 md:h-12 lg:h-14">
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 h-9 w-full sm:h-11 md:h-12 lg:h-14"
          preserveAspectRatio="none"
        >
          <path
            d="M0 28 Q360 0 720 28 T1440 28 V56 H0 V28 Z"
            fill="#f5efe6"
          />
          <path
            d="M0 36 Q360 8 720 36 T1440 36 V56 H0 V36 Z"
            fill="#f5efe6"
            fillOpacity="0.7"
          />
        </svg>
      </div>

      <section className="border-b border-[#5c3a21]/08 bg-secondary pb-5 pt-1 sm:pb-6 sm:pt-3 md:pt-4 lg:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <TrustStrip className="text-xs sm:text-sm" />
        </div>
      </section>

      {/* Popular Parathas â€“ 3 cards */}
      <section className="bg-secondary pb-16 pt-10 sm:pt-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimateIn animation="fade-in-up">
            <h2 className="font-display text-3xl font-bold text-accent text-center mb-10">
              Popular Parathas
            </h2>
          </AnimateIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
            {popularParathas.slice(0, 4).map((item, i) => (
              <AnimateIn key={item.id} animation="scale-in" delay={i * 80}>
              <Link
                key={item.id}
                href="/menu"
                className="group block bg-white rounded-xl border border-[#5c3a21]/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary/50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-accent font-sans">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[#b22222] font-semibold">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </Link>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn animation="fade-in-up" delay={200}>
            <div className="mt-10 text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#b22222] hover:bg-[#9a1d1d] text-white rounded-lg transition-transform hover:scale-[1.02]"
            >
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>
          </AnimateIn>
        </div>
      </section>

      {/* The Taste of Home â€“ 2 columns */}
      <section className="py-16 bg-white border-t border-[#5c3a21]/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateIn animation="slide-in-right">
            <div>
              <h2 className="font-display text-3xl font-bold text-accent flex items-center gap-2">
                <Leaf className="h-8 w-8 text-[#b22222]" />
                The Taste of Home
              </h2>
              <p className="mt-4 text-accent/90 font-sans leading-relaxed">
                We bring you authentic, hygienic, and affordable parathas made with the same love and care you&apos;d find at home. Every paratha is prepared fresh with quality ingredients, so you get the real taste of homemade food delivered to your doorstep.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 bg-[#b22222] hover:bg-[#9a1d1d] text-white rounded-lg"
              >
                <Link href="/order">Order Online</Link>
              </Button>
            </div>
            </AnimateIn>
            <AnimateIn animation="scale-in" delay={100}>
            <div className="relative aspect-[4/3] max-w-xl mx-auto lg:max-w-none rounded-xl overflow-hidden shadow-lg">
              <Image
                src={imgPath("@/images/taste-of-home/image1.jpeg")}
                alt="Parathas with curd and pickle"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Preparation showcase â€“ 3 images + text */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <AnimateIn animation="fade-in-up">
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:max-w-none">
              {[
                imgPath("@/images/delicious-homemade-meals/step1.png"),
                imgPath("@/images/delicious-homemade-meals/step2.png"),
                imgPath("@/images/delicious-homemade-meals/step3.png"),
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg overflow-hidden border border-[#5c3a21]/15 shadow-sm"
                >
                  <Image
                    src={src}
                    alt={`Preparation ${i + 1}`}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            </AnimateIn>
            <AnimateIn animation="slide-in-right" delay={100}>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-accent">
                We Prepare Healthy, Hygienic & Delicious Homemade Meals!
              </h2>
              <p className="mt-4 text-accent/85 font-sans">
                Our kitchen follows strict hygiene practices. We use fresh ingredients and traditional recipes to deliver parathas that taste like they were made in your own home.
              </p>
            </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-16 bg-white border-t border-[#5c3a21]/10">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimateIn animation="fade-in-up">
            <h2 className="font-display text-3xl font-bold text-accent text-center mb-8">
              Gallery
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              "image1.jpeg",
              "paneer-parathas.png",
              "image3.jpeg",
              "image2.jpeg",
            ].map((id, i) => (
              <AnimateIn key={id} animation="scale-in" delay={i * 60}>
              <Link
                href="/gallery"
                className="relative aspect-square rounded-xl overflow-hidden border border-[#5c3a21]/15 group block"
              >
                <Image
                  src={imgPath(`@/images/gallery/${id}`)}
                  alt={`Gallery ${i + 1}`}
                  fill
                  sizes="200px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn animation="fade-in-up" delay={150}>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="border-[#5c3a21]/30 text-accent hover:bg-[#5c3a21]/5">
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
