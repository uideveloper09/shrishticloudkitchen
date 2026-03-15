import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <CheckCircle className="mx-auto h-20 w-20 text-primary mb-6" />
      <h1 className="text-3xl font-bold text-accent mb-2">Order Placed Successfully!</h1>
      <p className="text-accent/80 mb-2">
        Thank you for ordering from Shrishti Cloud Kitchen.
      </p>
      {orderId && (
        <p className="text-sm text-accent/70 mb-8">
          Order ID: <strong>{orderId}</strong>
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link href="/menu">Order Again</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
