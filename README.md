# Classic Online Shop

A modern, responsive e-commerce web application featuring a rich product catalog, responsive shopping cart, instant search & filter controls, and seamless checkout experience.

## Overview & Architecture

Classic Online Shop represents an evolutionary multi-phase e-commerce platform built with React 19, Vite 7, and Node/Express:

- **Phase 1**: Static HTML/CSS prototype.
- **Phase 2**: Interactive JavaScript DOM rendering and initial state management.
- **Phase 3**: Component modularization and dynamic UI architecture.
- **Phase 4**: Full-stack modern application:
  - **Frontend**: React 19 + Vite 7 SPA with client-side routing, responsive UI, search & category filters, shopping cart state management, and PWA capabilities.
  - **Backend**: Node.js & Express RESTful API with mock catalog endpoints and order management.

## Production Frontend Features

- **Responsive Design**: Mobile-first navigation with responsive product grids and cart layouts.
- **Live Search & Category Filtering**: Filter products dynamically across Audio, Wearables, Gaming, Electronics, Home, and Accessories.
- **Dynamic Shopping Cart**: Real-time quantity adjustment, subtotal calculations, instant feedback toasts, and persistent storage.
- **Resilient Checkout**: Works seamlessly both online (integrated with backend API) and offline / standalone static hosting.
- **Demo / Guest Mode**: Instant guest authentication for frictionless testing.

## Local Development

### 1. Install & Run Frontend
```bash
cd phase4/frontend
npm install
npm run dev
```

### 2. (Optional) Run Backend
```bash
cd phase4/backend
npm install
npm start
```

## Deployment

Configured for seamless deployment on Vercel with SPA routing fallbacks and optimized production builds.
