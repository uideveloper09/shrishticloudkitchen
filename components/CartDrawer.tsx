"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./QuantitySelector";
import { formatPrice } from "@/lib/utils";
import { DELIVERY_CHARGE } from "@/lib/constants";
import { X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const itemCount = useCartStore((s) => s.getItemCount());
  const total = subtotal + (itemCount > 0 ? DELIVERY_CHARGE : 0);

  const handleCheckout = () => {
    onOpenChange(false);
    router.push("/order");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl border-l border-gray-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
          )}
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-accent flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Your Cart ({itemCount})
            </h2>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close cart">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-accent/70">
                <ShoppingBag className="mb-4 h-16 w-16 opacity-40" />
                <p>Your cart is empty</p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    onOpenChange(false);
                    router.push("/menu");
                  }}
                >
                  Browse Menu
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-accent truncate">
                        {item.title}
                      </p>
                      <p className="text-sm text-primary font-semibold">
                        {formatPrice(item.price)}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <QuantitySelector
                          value={item.quantity}
                          onIncrease={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          onDecrease={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          size="sm"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-3">
              <div className="flex justify-between text-sm text-accent">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-accent">
                <span>Delivery</span>
                <span>{formatPrice(DELIVERY_CHARGE)}</span>
              </div>
              <div className="flex justify-between font-semibold text-accent text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
