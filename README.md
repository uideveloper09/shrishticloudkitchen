# Shrishti Cloud Kitchen

A production-ready website for **Shrishti Cloud Kitchen** — an Indian cloud kitchen brand for homemade paratha delivery.

**100% Vegetarian** — Pure veg only. We serve only vegetarian food.

- **Location:** Greater Noida, UP  
- **Order timings:** 9 AM – 11 PM  
- **Contact:** +91 9667710954 | [WhatsApp](https://wa.me/919667710954)  
- **Order:** [Zomato](https://www.zomato.com), [Swiggy](https://www.swiggy.com), or direct checkout on the website  

---

## Screenshots

_Add screenshots of your site here (e.g. Home, Menu, Cart). Upload images to the repo and link them:_

<!-- ![Home](screenshots/home.png) -->

---

## Tech Stack

- **Next.js 14** (App Router)
- **React** + **Tailwind CSS**
- **Shadcn-style UI** (Radix primitives + Tailwind)
- **Zustand** for cart state (persisted)
- **NextAuth** for login (Email + Google)
- **Razorpay** for online payment
- Mobile-first responsive design

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXTAUTH_SECRET` — required; use `openssl rand -base64 32`
- `NEXTAUTH_URL` — e.g. `http://localhost:3000`
- `NEXT_PUBLIC_RAZORPAY_KEY` / `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` — for Razorpay
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — optional, for Google login

**Demo login:** Any email with password `password` works (credentials provider).

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Google Sign-in (production):** step-by-step for [shrishticloud.kitchen](https://shrishticloud.kitchen) — [docs/GOOGLE_OAUTH_SETUP.md](docs/GOOGLE_OAUTH_SETUP.md).

## Features

- **Home** — Hero, popular parathas, about, hygiene, gallery preview, CTA
- **Menu** — Full menu with categories, filters, Add to Cart, quantity
- **Gallery** — Masonry-style food and kitchen gallery with hover zoom
- **Order (Cart)** — Cart page with list, quantity, remove, summary, checkout
- **Checkout** — Delivery form, order summary, Razorpay or Cash on Delivery
- **Order Success** — Confirmation after payment/COD
- **Login** — Email and Google (NextAuth); protected checkout
- **Order History** — User’s past orders (`/orders`)
- **Admin** — `/admin`: view orders, update status, view customers (admin email or email containing "admin")

## Deployment (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Add environment variables in Vercel:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` — e.g. `https://shrishticloud.kitchen` (no trailing slash; must match your live domain)
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY`
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — see [docs/GOOGLE_OAUTH_SETUP.md](docs/GOOGLE_OAUTH_SETUP.md) for redirect URI `https://shrishticloud.kitchen/api/auth/callback/google`
   - Optional: `ADMIN_EMAIL`
3. Deploy. Orders are stored in memory; for production use a database and set `DATABASE_URL`.

## Project structure

```
/app          — App Router pages and API routes
/components   — Navbar, Footer, FoodCard, CartDrawer, etc.
/lib          — utils, auth, menu-data, orders-store, razorpay
/store        — Zustand cart store
/types        — TypeScript types
/public       — Static assets (optional local images)
```

## SEO

- Default title: **Shrishti Cloud Kitchen – Homemade Paratha Delivery**
- Meta description: **Order fresh homemade parathas online. Aloo, Paneer, Sattu and more.**

## Live demo

_After deployment, add your live link here:_

<!-- **Live site:** https://shrishticloudkitchen.vercel.app -->

---

## License

Private / project use.
