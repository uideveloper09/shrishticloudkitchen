import type { GalleryImage } from "@/components/GalleryGrid";
import { imgPath } from "@/lib/utils";

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: imgPath("@/images/gallery/featured-main.png"),
    alt: "Fresh paratha basket platter",
    width: 1200,
    height: 900,
    featured: true,
  },
  {
    id: "4",
    src: imgPath("@/images/popular-parathas/butter.jpeg"),
    alt: "Fresh butter cubes",
    width: 1000,
    height: 1000,
  },
  {
    id: "5",
    src: imgPath("@/images/popular-parathas/aloo-parathas.png"),
    alt: "Aloo paratha",
    width: 900,
    height: 600,
  },
  {
    id: "6",
    src: imgPath("@/images/popular-parathas/paneer-parathas.png"),
    alt: "Paneer paratha",
    width: 900,
    height: 600,
  },
  {
    id: "7",
    src: imgPath("@/images/popular-parathas/sattu-parathas.png"),
    alt: "Sattu paratha",
    width: 900,
    height: 600,
  },
  {
    id: "8",
    src: imgPath("@/images/popular-parathas/gobi-parathas.png"),
    alt: "Gobi paratha",
    width: 900,
    height: 600,
  },
];






