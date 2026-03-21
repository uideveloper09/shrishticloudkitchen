"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/types";
import { Package, ShoppingBag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/?callbackUrl=/orders");
      return;
    }
    if (status !== "authenticated") return;
    fetch("/api/orders")
      .then((res) => (res.ok ? res.json() : []))
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Skeleton className="h-10 w-64 mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-accent/10 bg-secondary/30 p-6 space-y-3">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-3 w-full max-w-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-accent mb-8 flex items-center gap-2">
        <Package className="h-8 w-8 text-primary" />
        Order History
      </h1>
      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#5c3a21]/25 bg-secondary/50 p-12 text-center max-w-lg mx-auto">
          <ShoppingBag className="mx-auto h-14 w-14 text-accent/30 mb-4" aria-hidden />
          <p className="text-accent font-medium text-lg">No orders yet</p>
          <p className="text-accent/70 text-sm mt-2 mb-6">
            When you place an order, it will show up here. Start with something delicious from our menu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Button asChild className="bg-[#b22222] hover:bg-[#9a1d1d] text-white min-h-11">
              <Link href="/menu">Browse menu</Link>
            </Button>
            <Button asChild variant="outline" className="min-h-11 border-[#5c3a21]/30">
              <Link href="/order">Order online</Link>
            </Button>
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.slice().reverse().map((order) => (
            <li
              key={order.id}
              className="rounded-xl border border-accent/10 bg-secondary/50 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-sm text-accent/70">{order.id}</p>
                  <p className="font-semibold text-accent mt-1">
                    {formatPrice(order.total)}
                  </p>
                  <p className="text-sm text-accent/70 mt-1">
                    {order.items.length} item(s) · {order.customerName}
                  </p>
                  <p className="text-xs text-accent/60 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-primary/10 text-primary"
                  }`}
                >
                  {order.status.replace(/_/g, " ")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
