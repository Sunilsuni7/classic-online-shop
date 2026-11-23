# Classic Online Shop 🛍️

A modern, high-performance, and responsive full-stack e-commerce web platform built with **React 19**, **Vite 7**, and **Node.js / Express 5**. The project showcases an evolutionary multi-phase software development journey—from static prototype to production-grade, PWA-enabled full-stack application deployed on Vercel.

---

## 🌐 Live Demo & Deployment

| Resource | Link | Status |
| :--- | :--- | :--- |
| **Production Application (Phase 4)** | **[classic-online-shop.vercel.app](https://classic-online-shop.vercel.app/)** | 🟢 Live |
| **Phase 1 (Prototype SPA)** | **[classic-online-shop.vercel.app/phase1/](https://classic-online-shop.vercel.app/phase1/)** | 🟢 Live |
| **Phase 2 (Client-Server SPA)** | **[classic-online-shop.vercel.app/phase2/](https://classic-online-shop.vercel.app/phase2/)** | 🟢 Live |
| **Phase 3 (PWA Showcase)** | **[classic-online-shop.vercel.app/phase3/](https://classic-online-shop.vercel.app/phase3/)** | 🟢 Live |
| **Backend REST API** | **[classic-online-shop.vercel.app/api/products](https://classic-online-shop.vercel.app/api/products)** | 🟢 Active |
| **GitHub Repository** | **[github.com/Sunilsuni7/classic-online-shop](https://github.com/Sunilsuni7/classic-online-shop)** | 🟢 Main |

> 🚀 **Quick Access:** Visit the live production store directly at **[https://classic-online-shop.vercel.app/](https://classic-online-shop.vercel.app/)**.

---

## 📖 Table of Contents

1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Multi-Phase Architecture](#-multi-phase-architecture)
4. [Technology Stack](#-technology-stack)
5. [Project Folder Structure](#-project-folder-structure)
6. [Installation & Setup](#-installation--setup)
7. [Local Development](#-local-development)
8. [API Documentation](#-api-documentation)
9. [Environment Variables](#-environment-variables)
10. [Vercel Deployment Architecture](#-vercel-deployment-architecture)
11. [Screenshots & UI Showcase](#-screenshots--ui-showcase)
12. [Author](#-author)
13. [License](#-license)

---

## 🌟 Project Overview

**Classic Online Shop** is an e-commerce platform designed with an emphasis on seamless user experience, sub-second load times, and offline resilience. The repository documents the architectural evolution of the application across four discrete phases:

1. **Phase 1**: Static React Single Page Application (SPA) utilizing in-memory catalog data.
2. **Phase 2**: Decoupled Client-Server architecture introducing an Express REST API with persistent order storage.
3. **Phase 3**: Progressive Web App (PWA) integration with service workers and web app manifest for installability.
4. **Phase 4**: Complete production full-stack platform featuring JWT authentication, live product search & category filtering, dynamic shopping cart calculation in Indian Rupees (₹), resilient checkout, and automated Vercel cloud deployment.

---

## ⚡ Key Features

- **Dynamic Product Catalog**: 14 curated electronic and lifestyle products with high-resolution imagery, descriptions, and real-time inventory pricing.
- **Instant Search & Category Filters**: Client-side search and filtering across *Audio*, *Wearables*, *Gaming*, *Electronics*, *Home*, and *Accessories*.
- **Real-Time Price Sorting**: Sort products dynamically by lowest price, highest price, or default catalog order.
- **Dynamic Shopping Cart**:
  - Quantity adjusters (`+` / `-`) per item.
  - Automatic calculation of item subtotals and overall order total in `₹`.
  - Instant Add-to-Cart feedback and badge counter in the navigation bar.
- **Resilient Checkout System**:
  - Complete customer detail validation (name, email, 10-digit phone number, address).
  - Submits orders to the live REST API and provides graceful fallback to browser `localStorage` when offline.
- **Authentication & Security**:
  - User registration with password strength requirements.
  - Login system with `bcrypt` password hashing and signed JSON Web Tokens (JWT).
  - One-click **Demo / Guest Login** mode for frictionless evaluation.
- **Progressive Web App (PWA)**:
  - Offline fallback page and asset precaching via Workbox service worker.
  - Installable on Android, iOS, and desktop devices.
- **Full SPA Routing**: Clean client-side routes (`/products`, `/cart`, `/checkout`, `/login`, `/register`) with Vercel edge rewrites to eliminate 404s on page refresh.

---

## 🏗️ Multi-Phase Architecture

```
                          [ Classic Online Shop ]
                                     │
         ┌──────────────┬────────────┴─────────────┬──────────────┐
         ▼              ▼                          ▼              ▼
    [ Phase 1 ]    [ Phase 2 ]                [ Phase 3 ]    [ Phase 4 (Production) ]
     Prototype    Client-Server                   PWA         Full-Stack E-Commerce
     React SPA     React + Express            Vite PWA SW     React 19 + Express 5
    Static Data   Orders Persistence          Offline Cache   Auth + Search + Cart
```

### Phase 1: Prototype SPA
- **Path:** `phase1/`
- **Scope:** Pure client-side frontend prototype built with React 19 and Vite 7.
- **State:** In-memory mock catalog located in `src/data/products.js`.

### Phase 2: Client-Server Architecture
- **Path:** `phase2/` (`phase2/frontend` and `phase2/backend`)
- **Scope:** Separated frontend and backend layers.
- **Backend:** Express 5 REST API providing `/products` and `/orders` endpoints.
- **Persistence:** Local JSON file persistence (`orders.json`).

### Phase 3: PWA Integration
- **Path:** `phase3/` (`phase3/frontend` and `phase3/backend`)
- **Scope:** Progressive Web App capabilities via `vite-plugin-pwa`.
- **Features:** Web app manifest, service worker lifecycle management, and offline precaching.

### Phase 4: Production Full-Stack Platform (Primary Application)
- **Path:** `phase4/` (`phase4/frontend` and `phase4/backend`)
- **Scope:** Complete, fully-featured commercial application.
- **Frontend Enhancements:** Interactive search, category pills, responsive shopping cart, order review, JWT session handling, and guest mode.
- **Backend Enhancements:** bcrypt hashing, JWT issuance, `express-validator` payload sanitization, and Vercel serverless adaptation via `api/index.js`.

---

## 💻 Technology Stack

### Frontend
- **Library:** [React 19](https://react.dev/) (`react`, `react-dom`)
- **Build Tool:** [Vite 7](https://vitejs.dev/) (Lightning-fast HMR and Rollup bundling)
- **Routing:** [React Router DOM 7](https://reactrouter.com/) (Browser router with SPA fallbacks)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **PWA Tooling:** [Vite Plugin PWA](https://vite-pwa-org.netlify.app/) (Workbox service workers)
- **Styling:** Modern CSS3 (Flexbox, CSS Grid, mobile-first responsive media queries)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules & CommonJS)
- **Framework:** [Express 5](https://expressjs.com/)
- **Authentication:** [JSON Web Token (jsonwebtoken)](https://jwt.io/) & [bcrypt](https://www.npmjs.com/package/bcrypt)
- **Validation:** [express-validator](https://express-validator.github.io/docs/) & [validator](https://www.npmjs.com/package/validator)
- **CORS:** [cors](https://www.npmjs.com/package/cors)

### Cloud & DevOps
- **Hosting Platform:** [Vercel](https://vercel.com/)
- **Architecture:** Vercel Global Edge Network + Vercel Serverless Functions
- **VCS & CI/CD:** [GitHub](https://github.com/) (Automated push-to-deploy)

---

## 📁 Project Folder Structure

```
classic-online-shop/
├── .github/                       # GitHub workflows and repository metadata
├── api/                           # Vercel Serverless Function entrypoint
│   └── index.js                   # Serverless bridge exporting the Express API
├── scripts/                       # Monorepo build and orchestration scripts
│   └── build-all.js               # Multi-phase unified build and packager
├── phase1/                        # Phase 1: Prototype Frontend
│   ├── public/                    # Static assets & product images
│   ├── src/                       # React source components and pages
│   ├── package.json
│   └── vite.config.js
├── phase2/                        # Phase 2: Client-Server Architecture
│   ├── backend/                   # Express 5 server + orders.json
│   └── frontend/                  # React + Axios SPA
├── phase3/                        # Phase 3: PWA Integration
│   ├── backend/                   # Express 5 server + orders.json
│   └── frontend/                  # React + PWA Manifest & Service Worker
├── phase4/                        # Phase 4: Production Full-Stack Application
│   ├── backend/                   # Production Express API (Auth, Orders, Products)
│   │   ├── server.js              # Server implementation with serverless export
│   │   ├── orders.json            # Order storage
│   │   ├── users.json             # User credential storage (hashed)
│   │   └── package.json
│   └── frontend/                  # Production React 19 SPA
│       ├── public/                # Icons, PWA manifest, offline fallback
│       ├── src/
│       │   ├── assets/            # Logos and icons
│       │   ├── components/        # Navbar, Footer, ProductCard, CartItem
│       │   ├── config/            # api.js (environment-aware API base URL)
│       │   ├── data/              # Fallback product catalog
│       │   ├── pages/             # Home, Products, ProductDetails, Cart, Checkout, Login, Register
│       │   └── styles.css         # Responsive styling
│       ├── package.json
│       └── vite.config.js
├── package.json                   # Root monorepo configuration
├── vercel.json                    # Root Vercel routing & serverless rewrites
└── README.md                      # Comprehensive project documentation
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm**: v9.0.0 or higher
- **Git**: Installed and configured ([Download Git](https://git-scm.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/Sunilsuni7/classic-online-shop.git
cd classic-online-shop
```

### 2. Install Root Dependencies
```bash
npm install
```

---

## 🚀 Local Development

### Option A: Run the Primary Production App (Phase 4)

**Start the Frontend:**
```bash
cd phase4/frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:5173`.*

**Start the Backend API:**
```bash
cd phase4/backend
npm install
npm start
```
*Backend API runs at `http://localhost:5000`.*

---

### Option B: Build All Four Phases Locally
To test the unified multi-phase build exactly as it runs on Vercel:

```bash
# From the root directory:
npm run build
```

This compiles Phase 4 (root), Phase 1 (`/phase1`), Phase 2 (`/phase2`), and Phase 3 (`/phase3`) into the `./dist` folder.

**Preview the Unified Build:**
```bash
npm run preview
```

---

## 📡 API Documentation

Base URL (Local): `http://localhost:5000`  
Base URL (Production): `https://classic-online-shop.vercel.app/api`

### 1. Health Check
- **Endpoint:** `GET /` or `GET /api/`
- **Response:** HTML Welcome Banner

### 2. Get Product Catalog
- **Endpoint:** `GET /products` or `GET /api/products`
- **Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation...",
    "price": 699,
    "image": "Wireless Headphones.jpg"
  }
]
```

### 3. User Registration
- **Endpoint:** `POST /register` or `POST /api/register`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
- **Response:** `200 OK`
```json
{
  "message": "✅ User registered successfully!"
}
```

### 4. User Login
- **Endpoint:** `POST /login` or `POST /api/login`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
- **Response:** `200 OK`
```json
{
  "message": "✅ Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 5. Submit Customer Order
- **Endpoint:** `POST /orders` or `POST /api/orders`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "items": [
    { "id": 1, "name": "Wireless Headphones", "price": 699, "quantity": 1 }
  ],
  "customer": {
    "name": "Sunil S",
    "email": "sunil@example.com",
    "phone": "9480245680",
    "address": "Bengaluru, Karnataka, India"
  }
}
```
- **Response:** `201 Created`
```json
{
  "message": "✅ Order submitted successfully!",
  "order": {
    "id": 1795431274622,
    "createdAt": "11/23/2026, 10:54:34 AM"
  }
}
```

### 6. Get Order History
- **Endpoint:** `GET /orders?json=true` or `GET /api/orders?json=true`
- **Response:** `200 OK` (Array of all placed orders)

---

## 🔐 Environment Variables

Create a `.env` file in the appropriate project directory using these placeholders:

### Backend Configuration (`phase4/backend/.env`)
```ini
# Port for local server (Default: 5000)
PORT=5000

# Secret key used for signing JSON Web Tokens
JWT_SECRET=your_jwt_secret_key_here

# Node environment mode
NODE_ENV=development
```

### Frontend Configuration (`phase4/frontend/.env`)
```ini
# Target API URL (Leave blank to use automatic local/production detection)
VITE_API_URL=
```

> [!NOTE]
> In production on Vercel, `JWT_SECRET` is configured under **Project Settings > Environment Variables**, and the frontend automatically targets the relative path `/api` without requiring manual URL configuration.

---

## ☁️ Vercel Deployment Architecture

The application is deployed using Vercel's automated Git integration:

1. **Continuous Deployment**: Every push to the `main` branch automatically triggers a build on Vercel.
2. **Build Configuration**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `node scripts/build-all.js`
   - **Output Directory**: `dist`
3. **Edge Routing (`vercel.json`)**:
   - `/api/(.*)` rewrites transparently to the serverless function `api/index.js`.
   - `/phase1`, `/phase2`, and `/phase3` route to their respective sub-bundles.
   - All client-side SPA routes (`/products`, `/cart`, `/checkout`, `/login`, `/register`) fallback to `/index.html` to eliminate 404s.

---

## 📸 Screenshots & UI Showcase

| Homepage & Hero Banner | Product Catalog & Category Filters |
| :---: | :---: |
| ![Hero Banner](phase4/frontend/public/image1.jpg) | ![Catalog Logo](phase4/frontend/src/assets/classicshop-logo.jpg) |

| Shopping Cart & Quantity Controls | Progressive Web App Icons |
| :---: | :---: |
| Real-time quantity adjustments and total in `₹` | ![PWA 192 Icon](phase4/frontend/public/icons/logo192.png) |

---

## 👤 Author

**Sunil S**
- **GitHub:** [@Sunilsuni7](https://github.com/Sunilsuni7)
- **Repository:** [Sunilsuni7/classic-online-shop](https://github.com/Sunilsuni7/classic-online-shop)
- **Live Store:** [classic-online-shop.vercel.app](https://classic-online-shop.vercel.app/)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE) — feel free to explore, fork, and use for learning and development.
