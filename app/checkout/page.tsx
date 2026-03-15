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
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-accent/80">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-accent mb-4">Your cart is empty.</p>
        <Button asChild>
          <Link href="/menu">Browse Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-accent mb-2">Checkout</h1>
      <p className="text-accent/80 mb-8">
        Enter delivery details and choose payment method.
      </p>

      <Tabs
        value={paymentMethod}
        onValueChange={(v) => setPaymentMethod(v as "razorpay" | "cod")}
        className="mb-8"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="razorpay" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Razorpay (UPI / Card / Wallet)
          </TabsTrigger>
          <TabsTrigger value="cod" className="gap-2">
            <Banknote className="h-4 w-4" />
            Cash on Delivery
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
