import type { GalleryImage } from "@/components/GalleryGrid";

const u = (id: string, w = 600, q = 80) =>
  `https://images.unsplash.com/${id}?w=${w}&q=${q}`;

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: u("photo-1604329760661-e71dc83f2b26", 800),
    alt: "Paratha on tawa",
    width: 800,
    height: 600,
    featured: true,
  },
  {
    id: "2",
    src: u("photo-1556910103-1c0275a541b5", 600),
    alt: "Chef preparing paratha",
    width: 600,
    height: 800,
  },
  {
    id: "3",
    src: u("photo-1565299624946-b28f40a0ae38", 800),
    alt: "Stuffed paratha platter",
    width: 800,
    height: 600,
  },
  {
    id: "4",
    src: u("photo-1556911220-bff31c812dba", 600),
    alt: "Kitchen setup",
    width: 600,
    height: 600,
  },
  {
    id: "5",
    src: u("photo-1604329760661-e71dc83f2b26", 600),
    alt: "Aloo paratha",
    width: 600,
    height: 400,
  },
  {
    id: "6",
    src: u("photo-1565299624946-b28f40a0ae38", 600),
    alt: "Paneer paratha",
    width: 600,
    height: 400,
  },
  {
    id: "7",
    src: u("photo-1546069901-ba9599a7e63c", 600),
    alt: "Sattu paratha",
    width: 600,
    height: 400,
  },
  {
    id: "8",
    src: u("photo-1567620905732-2d1ec7ab7445", 600),
    alt: "Gobi paratha",
    width: 600,
    height: 400,
  },
];
