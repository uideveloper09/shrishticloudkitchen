"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreditCard, Banknote } from "lucide-react";
import { TrustStrip } from "@/components/TrustStrip";
import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const items = useCartStore((s) => s.items);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/?callbackUrl=/checkout");
      return;
    }
    if (items.length === 0 && status === "authenticated") {
      router.push("/order");
    }
  }, [status, items.length, router]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-4 w-full max-w-md mb-8" />
        <Skeleton className="h-12 w-full max-w-md mb-4" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-accent/10 p-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <p className="text-accent font-display text-xl font-semibold mb-2">Your cart is empty</p>
        <p className="text-accent/75 text-sm mb-6">Add parathas from the menu, then come back to checkout.</p>
        <TrustStrip className="mb-8 text-xs" />
        <Button asChild className="bg-[#b22222] hover:bg-[#9a1d1d] text-white min-h-11 w-full sm:w-auto px-8">
          <Link href="/menu">Browse menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-accent mb-2">Checkout</h1>
      <p className="text-accent/80 mb-4">
        Enter delivery details and choose payment method.
      </p>
      <div className="mb-8 rounded-lg border border-[#5c3a21]/10 bg-white/40 px-4 py-3">
        <TrustStrip className="text-xs sm:text-sm" />
      </div>

      <Tabs
        value={paymentMethod}
        onValueChange={(v) => setPaymentMethod(v as "razorpay" | "cod")}
        className="mb-8"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2 min-h-[3rem]">
          <TabsTrigger value="razorpay" className="gap-2 min-h-11 py-2 text-left sm:text-center">
            <CreditCard className="h-4 w-4 shrink-0" />
            <span className="leading-tight">Razorpay</span>
          </TabsTrigger>
          <TabsTrigger value="cod" className="gap-2 min-h-11 py-2 text-left sm:text-center">
            <Banknote className="h-4 w-4 shrink-0" />
            <span className="leading-tight">Cash on delivery</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="razorpay" className="mt-4">
          <p className="text-sm text-accent/80">
            Pay securely via UPI, card, net banking or wallet.
          </p>
        </TabsContent>
        <TabsContent value="cod" className="mt-4">
          <p className="text-sm text-accent/80">
            Pay when your order is delivered.
          </p>
        </TabsContent>
      </Tabs>

      <CheckoutForm paymentMethod={paymentMethod} />
    </div>
  );
}
