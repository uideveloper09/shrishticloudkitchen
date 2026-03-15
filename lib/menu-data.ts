import { MenuItem } from "@/types";
import { imgPath } from "@/lib/utils";

const IMG = (name: string) => imgPath(`@/images/popular-parathas/${name}.png`);

export const menuItems: MenuItem[] = [
  {
    id: "aloo-paratha",
    title: "Aloo Paratha",
    price: 50,
    image: IMG("aloo-parathas"),
    category: "paratha",
    description: "Stuffed with spiced mashed potatoes, cooked on tawa until golden.",
  },
  {
    id: "sattu-paratha",
    title: "Sattu Paratha",
    price: 60,
    image: IMG("sattu-parathas"),
    category: "paratha",
    description: "Bihari-style paratha stuffed with roasted gram flour and spices.",
  },
  {
    id: "gobi-paratha",
    title: "Gobi Paratha",
    price: 65,
    image: IMG("gobi-parathas"),
    category: "paratha",
    description: "Grated cauliflower and spices, crisp outside and soft inside.",
  },
  {
    id: "paneer-paratha",
    title: "Paneer Paratha",
    price: 80,
    image: IMG("paneer-parathas"),
    category: "paratha",
    description: "Cottage cheese stuffing with green chillies and coriander.",
  },
  {
    id: "methi-paratha",
    title: "Methi Paratha",
    price: 55,
    image: IMG("methi-parathas"),
    category: "paratha",
    description: "Fresh fenugreek leaves kneaded into whole wheat dough.",
  },
  {
    id: "mooli-paratha",
    title: "Mooli Paratha",
    price: 55,
    image: IMG("mooli-parathas"),
    category: "paratha",
    description: "Grated radish with spices, perfect with curd or pickle.",
  },
  {
    id: "lachha-paratha",
    title: "Lachha Paratha",
    price: 45,
    image: IMG("lachha"),
    category: "breads",
    description: "Layered flaky paratha, crisp and buttery.",
  },
  {
    id: "plain-paratha",
    title: "Plain Paratha",
    price: 40,
    image: IMG("plain-parathas"),
    category: "breads",
    description: "Simple whole wheat paratha, soft and warm.",
  },
  {
    id: "curd",
    title: "Curd (100g)",
    price: 25,
    image: "https://images.unsplash.com/photo-1571212515416-d2a4e0b04dbb?w=400&q=80",
    category: "sides",
    description: "Fresh homemade curd.",
  },
  {
    id: "pickle",
    title: "Mixed Pickle",
    price: 20,
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f2b26?w=400&q=80",
    category: "sides",
    description: "Tangy homemade mixed vegetable pickle.",
  },
  {
    id: "butter",
    title: "Butter (1 pc)",
    price: 15,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80",
    category: "sides",
    description: "Fresh butter to top your paratha.",
  },
];

export const popularParathas = menuItems.filter((m) => m.category === "paratha").slice(0, 4);
