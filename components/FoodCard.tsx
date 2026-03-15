"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { QuantitySelector } from "./QuantitySelector";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FoodCardProps {
  item: MenuItem;
  showQuantity?: boolean;
  className?: string;
}

export function FoodCard({
  item,
  showQuantity = false,
  className,
}: FoodCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItem = items.find((i) => i.id === item.id);
  const [isAdding, setIsAdding] = useState(false);

  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    setIsAdding(true);
    addItem(item);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        className
      )}
    >
      <Link href={`/menu#${item.id}`} className="block no-underline text-inherit hover:text-inherit">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/80">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AN+iiirnM//Z"
          />
        </div>
        <CardHeader className="pb-1">
          <h3 className="font-semibold text-accent line-clamp-1">{item.title}</h3>
          {item.description && (
            <p className="text-xs text-accent/70 line-clamp-2">
              {item.description}
            </p>
          )}
        </CardHeader>
      </Link>
      <CardContent className="pt-0">
        <p className="text-lg font-bold text-primary">{formatPrice(item.price)}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center gap-2 pt-0">
        {showQuantity && quantity > 0 ? (
          <QuantitySelector
            value={quantity}
            onIncrease={() => updateQuantity(item.id, quantity + 1)}
            onDecrease={() => updateQuantity(item.id, quantity - 1)}
            size="sm"
          />
        ) : null}
        <Button
          size="sm"
          className="flex-1 gap-1"
          onClick={handleAdd}
          disabled={isAdding}
        >
          <ShoppingCart className="h-4 w-4" />
          {quantity > 0 ? "Add more" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
