export const DELIVERY_CHARGE = 30;
export const SITE_NAME = "Shrishti Cloud Kitchen";

export const MENU_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "paratha", label: "Parathas" },
  { id: "breads", label: "Breads" },
  { id: "sides", label: "Sides" },
] as const;

export type CategoryId = (typeof MENU_CATEGORIES)[number]["id"];
