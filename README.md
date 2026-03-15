# Shrishti Cloud Kitchen

Homemade paratha delivery — **100% vegetarian** cloud kitchen (Next.js).

- **Pure veg only** — We serve only vegetarian food.
- **Location:** Greater Noida, UP | **Timings:** 9 AM – 11 PM
- **Contact:** +91 9667710954 | [WhatsApp](https://wa.me/919667710954)
- **Order:** [Zomato](https://www.zomato.com) · [Swiggy](https://www.swiggy.com) · or checkout on the website

---

## Tech Stack

- Next.js 14 (App Router) · React · Tailwind CSS · Radix UI
- Zustand (cart) · NextAuth (Email + Google) · Razorpay (payments)

## Getting Started

```bash
npm install
```

Copy `.env.example` to `.env.local` and add `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, Razorpay keys. Optional: Google OAuth keys.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Demo login: any email + password `password`.

## Features

- **Home** — Hero, popular parathas, about, gallery
- **Menu** — Full menu, Add to Cart, filters
- **Order / Checkout** — Cart, Razorpay or COD, order success
- **Login** — Email + Google; Order history; Admin panel (`/admin`)

## Deploy (Vercel)

Push to GitHub → Import in Vercel → Add env vars → Deploy.

## License

Private / project use.
