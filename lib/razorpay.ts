const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

export function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT}"]`);
  if (existing) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.body.appendChild(script);
  });
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
}

export async function createRazorpayOrder(
  amountInr: number,
  _customer: { name: string; phone: string; address: string; city: string; pincode: string }
): Promise<RazorpayOrderResponse | null> {
  const amountPaise = Math.round(amountInr * 100);
  const res = await fetch("/api/razorpay/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: amountPaise }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return {
    id: data.id,
    amount: data.amount,
    currency: data.currency || "INR",
  };
}
