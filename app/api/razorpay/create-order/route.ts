import { NextResponse } from "next/server";
import Razorpay from "razorpay";

function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("Razorpay keys not configured");
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();
    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: Number(amount),
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });
    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
