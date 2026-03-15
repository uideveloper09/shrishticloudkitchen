import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Order } from "@/types";
import { addOrder, getOrders } from "@/lib/orders-store";

function generateId() {
  return "ORD-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const {
      customerName,
      phone,
      address,
      city,
      pincode,
      items,
      subtotal,
      deliveryCharge,
      total,
      paymentMethod,
      razorpayOrderId,
      razorpayPaymentId,
    } = body;

    if (
      !customerName ||
      !phone ||
      !address ||
      !city ||
      !pincode ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    const order: Order = {
      id: generateId(),
      userId: session?.user?.email ?? undefined,
      customerName,
      phone,
      address,
      city,
      pincode,
      items,
      subtotal: Number(subtotal),
      deliveryCharge: Number(deliveryCharge),
      total: Number(total),
      paymentMethod: paymentMethod === "cod" ? "cod" : "razorpay",
      status: "pending",
      createdAt: new Date().toISOString(),
      razorpayOrderId: razorpayOrderId ?? undefined,
      razorpayPaymentId: razorpayPaymentId ?? undefined,
    };
    addOrder(order);
    return NextResponse.json({ orderId: order.id });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const admin = searchParams.get("admin");

  if (admin === "true") {
    const isAdmin =
      session?.user?.email === process.env.ADMIN_EMAIL ||
      session?.user?.email?.toLowerCase().includes("admin");
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(getOrders());
  }

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userOrders = getOrders().filter((o) => o.userId === session.user?.email);
  return NextResponse.json(userOrders);
}
