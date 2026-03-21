"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm" | "default" | "lg";
}

export function QuantitySelector({
  value,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  className,
  size = "default",
}: QuantitySelectorProps) {
  /* sm uses 44px min touch target (mobile-friendly) */
  const sizeClass =
    size === "sm" ? "h-11 w-11 min-h-[44px] min-w-[44px]" : size === "lg" ? "h-11 w-11" : "h-9 w-9";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border border-accent/20 bg-secondary",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(sizeClass, "rounded-r-none hover:bg-accent/10")}
        onClick={onDecrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span
        className={cn(
          "min-w-[2rem] text-center font-medium text-accent",
          size === "sm" && "text-sm",
          size === "lg" && "text-lg"
        )}
      >
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(sizeClass, "rounded-l-none hover:bg-accent/10")}
        onClick={onIncrease}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
