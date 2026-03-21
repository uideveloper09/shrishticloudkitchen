import { Leaf, MapPin, Clock, Star } from "lucide-react";

/** Compact trust / delivery info — reuse on home, checkout, order */
export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-accent/85 ${className}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <Leaf className="h-4 w-4 text-green-600 shrink-0" />
        <strong className="text-accent">100% vegetarian</strong>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <MapPin className="h-4 w-4 text-[#b22222] shrink-0" />
        Greater Noida, UP
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4 text-[#b22222] shrink-0" />
        9 AM – 11 PM
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Star className="h-4 w-4 text-amber-500 shrink-0" />
        Fresh homemade parathas
      </span>
    </div>
  );
}
