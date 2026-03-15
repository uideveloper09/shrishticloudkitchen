import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy – Shrishti Cloud Kitchen",
  description: "Privacy policy for Shrishti Cloud Kitchen.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-accent mb-6">Privacy Policy</h1>
      <p className="text-accent/80 mb-4">
        We collect your name, email, phone and address only to process and deliver your orders. We do not share your data with third parties for marketing.
      </p>
      <p className="text-accent/80 mb-8">
        For questions, contact hello@shrishticloudkitchen.com.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
