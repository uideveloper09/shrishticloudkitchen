import { MenuItem } from "@/types";
import { imgPath } from "@/lib/utils";

const IMG = (name: string) =>
  imgPath(
    `@/images/popular-parathas/${name}`
  );

export const menuItems: MenuItem[] = [
  {
    id: "aloo-paratha",
    title: "Aloo Paratha",
    price: 50,
    image: IMG("aloo-parathas.png"),
    category: "paratha",
    description: "Stuffed with spiced mashed potatoes, cooked on tawa until golden.",
  },
  {
    id: "sattu-paratha",
    title: "Sattu Paratha",
    price: 60,
    image: IMG("sattu-parathas.png"),
    category: "paratha",
    description: "Bihari-style paratha stuffed with roasted gram flour and spices.",
  },
  {
    id: "gobi-paratha",
    title: "Gobi Paratha",
    price: 65,
    image: IMG("gobi-parathas.png"),
    category: "paratha",
    description: "Grated cauliflower and spices, crisp outside and soft inside.",
  },
  {
    id: "paneer-paratha",
    title: "Paneer Paratha",
    price: 80,
    image: IMG("paneer-parathas.png"),
    category: "paratha",
    description: "Cottage cheese stuffing with green chillies and coriander.",
  },
  // {
  //   id: "methi-paratha",
  //   title: "Methi Paratha",
  //   price: 55,
  //   image: IMG("methi-parathas"),
  //   category: "paratha",
  //   description: "Fresh fenugreek leaves kneaded into whole wheat dough.",
  // },
  // {
  //   id: "mooli-paratha",
  //   title: "Mooli Paratha",
  //   price: 55,
  //   image: IMG("mooli-parathas"),
  //   category: "paratha",
  //   description: "Grated radish with spices, perfect with curd or pickle.",
  // },
  // {
  //   id: "lachha-paratha",
  //   title: "Lachha Paratha",
  //   price: 45,
  //   image: IMG("lachha"),
  //   category: "breads",
  //   description: "Layered flaky paratha, crisp and buttery.",
  // },
  {
    id: "onion-paratha",
    title: "Onion Paratha",
    price: 45,
    image: IMG("onion-parathas.png"),
    category: "breads",
    description: "Spiced onion stuffing in whole wheat dough - crisp outside, savoury inside.",
  },
  {
    id: "curd",
    title: "Curd (100g)",
    price: 25,
    image: IMG("curd.jpeg"),
    category: "sides",
    description: "Fresh homemade curd.",
  },
  {
    id: "pickle",
    title: "Mixed Pickle",
    price: 20,
    image: IMG("pickle.png"),
    category: "sides",
    description: "Tangy homemade mixed vegetable pickle.",
  },
];

export const popularParathas = menuItems.filter((m) => m.category === "paratha").slice(0, 4);


