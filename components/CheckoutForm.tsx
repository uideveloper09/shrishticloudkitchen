"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderSummary } from "./OrderSummary";
import { useCartStore } from "@/store/cart-store";
import { DELIVERY_CHARGE } from "@/lib/constants";
import { loadRazorpayScript, createRazorpayOrder } from "@/lib/razorpay";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

interface CheckoutFormProps {
  paymentMethod: "razorpay" | "cod";
}

export function CheckoutForm({ paymentMethod }: CheckoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const total = subtotal + (itemCount > 0 ? DELIVERY_CHARGE : 0);

  const update = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    if (!form.name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      return false;
    }
    if (!form.address.trim()) {
      setError("Please enter your address.");
      return false;
    }
    if (!form.city.trim()) {
      setError("Please enter your city.");
      return false;
    }
    if (!form.pincode.trim() || form.pincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      if (paymentMethod === "cod") {
        const orderPayload = {
          customerName: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
          items: items.map((i) => ({
            itemId: i.id,
            title: i.title,
            price: i.price,
            quantity: i.quantity,
          })),
          subtotal,
          deliveryCharge: DELIVERY_CHARGE,
          total,
          paymentMethod: "cod" as const,
        };
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });
        if (!res.ok) throw new Error("Failed to place order");
        const { orderId } = await res.json();
        clearCart();
        router.push(`/order-success?orderId=${orderId}`);
        return;
      }

      await loadRazorpayScript();
      const orderData = await createRazorpayOrder(total, form);
      if (!orderData) throw new Error("Could not create payment order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Shrishti Cloud Kitchen",
        description: "Order payment",
        order_id: orderData.id,
        handler: async function (response: { razorpay_payment_id: string }) {
          try {
            const res = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                customerName: form.name,
                phone: form.phone,
                address: form.address,
                city: form.city,
                pincode: form.pincode,
                items: items.map((i) => ({
                  itemId: i.id,
                  title: i.title,
                  price: i.price,
                  quantity: i.quantity,
                })),
                subtotal,
                deliveryCharge: DELIVERY_CHARGE,
                total,
                paymentMethod: "razorpay",
                razorpayOrderId: orderData.id,
                razorpayPaymentId: response.razorpay_payment_id,
              }),
            });
            if (!res.ok) throw new Error("Failed to save order");
            const { orderId } = await res.json();
            clearCart();
            router.push(`/order-success?orderId=${orderId}`);
          } catch (err) {
            setError("Payment succeeded but order save failed. Please contact support.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: form.name,
          contact: form.phone,
        },
      };

      const Razorpay = (window as unknown as { Razorpay: unknown }).Razorpay;
      if (typeof Razorpay !== "function") throw new Error("Razorpay not loaded");
      const rzp = new (Razorpay as new (o: object) => { open: () => void })(options);
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-accent/10 bg-secondary/50 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-accent">Delivery Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="10-digit mobile number"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Street, landmark"
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="City"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              value={form.pincode}
              onChange={(e) => update("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="6-digit pincode"
              maxLength={6}
              required
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading || items.length === 0}
          >
            {loading ? "Processing..." : paymentMethod === "cod" ? "Place Order (COD)" : "Pay with Razorpay"}
          </Button>
        </div>
        <OrderSummary />
      </div>
    </form>
  );
}
