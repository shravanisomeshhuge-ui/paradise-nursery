# Paradise Nursery

**Project name:** Paradise Nursery – Online Houseplant Shop

A React + Redux Toolkit shopping cart application for an online plant shop.

## Features
- Landing page with company name, background image and a "Get Started" button
- About Us section describing the company
- Plant listing in three categories (Air Purifying, Aromatic, Low-Light), six plants each
- "Add to Cart" buttons that disable once a plant is added and update the cart count
- Navbar (Home, Plants, Cart) on both the Plants and Cart pages
- Cart page with thumbnail, name, unit price, quantity +/- , per-item subtotal, delete, total amount
- "Checkout" (Coming Soon) and "Continue Shopping" buttons

## Run locally
```bash
npm create vite@latest paradise-nursery -- --template react
cd paradise-nursery
npm install @reduxjs/toolkit react-redux
# copy the files from src/ into your project's src/
npm run dev
```

## Structure
- `src/App.jsx` – landing page + About Us, switches to product list
- `src/ProductList.jsx` – navbar, plant catalogue, hosts the cart page
- `src/CartItem.jsx` – shopping cart page
- `src/CartSlice.jsx` – Redux slice (addItem, removeItem, updateQuantity)
- `src/store.js`, `src/main.jsx` – store and entry point
