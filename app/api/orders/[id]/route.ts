import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOrderById, updateOrderStatus } from "@/lib/orders-store";
import { Order } from "@/types";

const STATUSES: Order["status"][] = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const isAdmin =
    session?.user?.email === process.env.ADMIN_EMAIL ||
    session?.user?.email?.toLowerCase().includes("admin");
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const { status } = body;
  if (!status || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const order = getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  updateOrderStatus(id, status);
  return NextResponse.json(getOrderById(id));
}
