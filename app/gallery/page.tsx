import { AnimateIn } from "@/components/AnimateIn";
import { GalleryGrid } from "@/components/GalleryGrid";
import { galleryImages } from "@/lib/gallery-data";

export const metadata = {
  title: "Gallery – Shrishti Cloud Kitchen",
  description: "Food and kitchen photos from Shrishti Cloud Kitchen.",
};

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimateIn animation="fade-in-up">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-accent mb-2">Gallery</h1>
          <p className="text-accent/80 font-sans">
            Our kitchen, parathas, and the love that goes into every order.
          </p>
        </div>
      </AnimateIn>
      <AnimateIn animation="fade-in-up" delay={100}>
        <GalleryGrid images={galleryImages} />
      </AnimateIn>
    </div>
  );
}
