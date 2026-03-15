import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/AnimateIn";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919667710954";
const ZOMATO_URL = "https://www.zomato.com";
const SWIGGY_URL = "https://www.swiggy.com";

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Order Now banner – red with pattern */}
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        style={{ backgroundColor: "#b22222" }}
      >
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20c0-2 1-4 2-5l-2 1v-1l1-2c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2l-1 2v1l2-1c-1 1-2 3-2 5z' fill='%23fff' fill-opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <AnimateIn animation="fade-in-down" rootMargin="0px">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              Order Now
            </h1>
          </AnimateIn>
          <AnimateIn animation="fade-in-up" delay={80} rootMargin="0px">
            <p className="mt-3 text-lg text-white/95 font-sans max-w-xl mx-auto">
              Get Delicious Parathas Delivered to Your Doorstep
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Zomato + Swiggy buttons */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
          <AnimateIn animation="scale-in" delay={0}>
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto min-h-[56px] text-lg bg-[#b22222] hover:bg-[#9a1d1d] text-white rounded-xl shadow-md font-semibold"
          >
            <a href={ZOMATO_URL} target="_blank" rel="noopener noreferrer">
              Order on Zomato
            </a>
          </Button>
          </AnimateIn>
          <AnimateIn animation="scale-in" delay={80}>
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto min-h-[56px] text-lg bg-[#FC8019] hover:bg-[#e67314] text-white rounded-xl shadow-md font-semibold border-0"
          >
            <a href={SWIGGY_URL} target="_blank" rel="noopener noreferrer">
              Order on Swiggy
            </a>
          </Button>
          </AnimateIn>
        </div>
      </section>

      {/* WhatsApp section */}
      <section className="container mx-auto px-6 py-12">
        <AnimateIn animation="fade-in-up">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-[#5c3a21]/10 shadow-sm p-8 text-center">
          <div className="flex items-center justify-center gap-2 text-accent mb-2">
            <MessageCircle className="h-6 w-6 text-[#25D366]" />
            <span className="font-semibold">WhatsApp</span>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full min-h-[52px] rounded-xl text-white font-semibold text-lg transition-opacity hover:opacity-95"
            style={{ backgroundColor: "#25D366" }}
          >
            +91 9667710954
          </a>
          <p className="mt-4 text-sm text-accent/80 font-sans">
            Chat with us on WhatsApp to place your order. We&apos;re here to help!
          </p>
        </div>
        </AnimateIn>
      </section>

      {/* Optional: Order direct (cart) */}
      <section className="container mx-auto px-6 pb-16 text-center">
        <p className="text-accent/80 font-sans mb-4">
          Or build your order and checkout directly with us.
        </p>
        <Button asChild variant="outline" className="border-[#5c3a21]/30 text-accent hover:bg-[#5c3a21]/5">
          <Link href="/menu">View Menu & Add to Cart</Link>
        </Button>
      </section>
    </div>
  );
}
