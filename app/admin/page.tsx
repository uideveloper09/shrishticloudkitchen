"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/types";
import { LayoutDashboard, Package, Users, UtensilsCrossed } from "lucide-react";

const STATUS_OPTIONS: Order["status"][] = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/?callbackUrl=/admin");
      return;
    }
    if (status !== "authenticated") return;
    fetch("/api/orders?admin=true")
      .then((res) => {
        if (res.status === 401) {
          router.push("/");
          return [];
        }
        return res.json();
      })
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [status, router]);

  const updateStatus = async (orderId: string, newStatus: Order["status"]) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) return;
    const updated = await res.json();
    setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
  };

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-accent/80">Loading...</p>
      </div>
    );
  }

  if (!session) return null;

  const isAdmin =
    session.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
    session.user?.email?.toLowerCase().includes("admin");

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-accent">You don’t have access to this page.</p>
        <Button asChild className="mt-4">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  const uniqueCustomers = new Set(orders.map((o) => o.customerName)).size;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-accent flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          Admin Dashboard
        </h1>
        <Button asChild variant="secondary">
          <Link href="/">Back to Site</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="rounded-xl border border-accent/10 bg-secondary/50 p-6">
          <Package className="h-10 w-10 text-primary mb-2" />
          <p className="text-2xl font-bold text-accent">{orders.length}</p>
          <p className="text-sm text-accent/70">Total Orders</p>
        </div>
        <div className="rounded-xl border border-accent/10 bg-secondary/50 p-6">
          <Users className="h-10 w-10 text-primary mb-2" />
          <p className="text-2xl font-bold text-accent">{uniqueCustomers}</p>
          <p className="text-sm text-accent/70">Customers</p>
        </div>
        <div className="rounded-xl border border-accent/10 bg-secondary/50 p-6">
          <UtensilsCrossed className="h-10 w-10 text-primary mb-2" />
          <p className="text-2xl font-bold text-accent">
            {formatPrice(orders.reduce((s, o) => s + o.total, 0))}
          </p>
          <p className="text-sm text-accent/70">Total Revenue</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-accent mb-4">Orders</h2>
      <div className="rounded-xl border border-accent/10 bg-secondary/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-accent/5 text-accent border-b border-accent/10">
              <tr>
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-accent/70">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                orders
                  .slice()
                  .reverse()
                  .map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-accent/10 hover:bg-accent/5"
                    >
                      <td className="p-4 font-mono text-xs">{order.id}</td>
                      <td className="p-4">
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-accent/70">{order.phone}</p>
                      </td>
                      <td className="p-4 font-semibold text-primary">
                        {formatPrice(order.total)}
                      </td>
                      <td className="p-4 capitalize">{order.paymentMethod}</td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(
                              order.id,
                              e.target.value as Order["status"]
                            )
                          }
                          className="rounded-lg border border-accent/20 bg-white px-2 py-1 text-accent"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s.replace(/_/g, " ")}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 text-accent/70">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
