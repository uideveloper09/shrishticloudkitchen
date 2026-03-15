import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms & Conditions – Shrishti Cloud Kitchen",
  description: "Terms and conditions for using Shrishti Cloud Kitchen.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-accent mb-6">Terms & Conditions</h1>
      <p className="text-accent/80 mb-4">
        By using Shrishti Cloud Kitchen, you agree to these terms. We deliver homemade parathas and food items. Orders are subject to availability and delivery areas.
      </p>
      <p className="text-accent/80 mb-8">
        For full terms, please contact us at hello@shrishticloudkitchen.com.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
