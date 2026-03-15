"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  featured?: boolean;
}

interface GalleryGridProps {
  images: GalleryImage[];
  className?: string;
}

export function GalleryGrid({ images, className }: GalleryGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        "auto-rows-[200px]",
        className
      )}
    >
      {images.map((img, index) => (
        <div
          key={img.id}
          className={cn(
            "relative h-full min-h-[200px] overflow-hidden rounded-xl border border-accent/10 bg-secondary/50",
            "transition-transform duration-300 hover:scale-[1.02] hover:shadow-card-hover",
            img.featured ? "sm:col-span-2 sm:row-span-2" : "",
            index === 0 && !img.featured ? "sm:row-span-2" : ""
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      ))}
    </div>
  );
}
