"use client";

import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { DELIVERY_CHARGE } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const itemCount = useCartStore((s) => s.getItemCount());
  const deliveryCharge = itemCount > 0 ? DELIVERY_CHARGE : 0;
  const total = subtotal + deliveryCharge;

  return (
    <div className="rounded-xl border border-accent/10 bg-secondary/50 p-6">
      <h3 className="text-lg font-semibold text-accent mb-4">Order Summary</h3>
      <ul className="space-y-2 text-sm text-accent">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <Separator className="my-4" />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-accent">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-accent">
          <span>Delivery charge</span>
          <span>{formatPrice(deliveryCharge)}</span>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between font-semibold text-lg text-accent">
        <span>Total</span>
        <span className="text-primary">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
