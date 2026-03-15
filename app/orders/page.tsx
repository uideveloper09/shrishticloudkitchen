"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/types";
import { Package } from "lucide-react";

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
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-accent/80">Loading...</p>
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
        <div className="rounded-xl border border-accent/10 bg-secondary/50 p-12 text-center">
          <p className="text-accent/80 mb-4">You haven’t placed any orders yet.</p>
          <Button asChild>
            <Link href="/menu">Browse Menu</Link>
          </Button>
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
