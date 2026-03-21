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
        "grid min-h-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        "auto-rows-[200px]",
        className
      )}
    >
      {images.map((img, index) => (
        <div
          key={img.id}
          className={cn(
            "relative h-full min-h-0 overflow-hidden rounded-xl border border-accent/10 bg-transparent leading-none",
            "transition-transform duration-300 hover:scale-[1.02] hover:shadow-card-hover",
            img.featured ? "sm:col-span-2 sm:row-span-2" : "",
            index === 0 && !img.featured ? "sm:row-span-2" : ""
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={
              img.featured
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            priority={img.featured}
            className={cn(
              "object-cover transition-transform duration-500",
              /* Featured: anchor to top + zoom from top so no gap / letterboxing shows */
              img.featured
                ? "object-top scale-[1.18] origin-top hover:scale-[1.26]"
                : "scale-[1.02] object-center hover:scale-110"
            )}
          />
        </div>
      ))}
    </div>
  );
}
