# 1Fi – Product EMI Platform backed by Mutual Funds

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://product-emi-platform.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/ihimanshu17/product-emi-platform)

> 🌐 **Live Website**: [https://product-emi-platform.vercel.app](https://product-emi-platform.vercel.app)
> 
> **1Fi SDE1 Assignment**: A full-stack, production-ready fintech e-commerce web application where users can browse smartphones, interactively configure variants (storage and finishes), view dynamically calculated 0% and standard reducing-balance EMI plans backed by mutual fund collateral, and submit loan confirmation requests.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Project Architecture](#project-architecture)
5. [Database Schema (Prisma + PostgreSQL)](#database-schema)
6. [EMI Financial Calculation Logic](#emi-financial-calculation-logic)
7. [Prerequisites](#prerequisites)
8. [Installation & Local Setup](#installation--local-setup)
9. [Environment Variables](#environment-variables)
10. [Database Migration & Seeding](#database-migration--seeding)
11. [Running the Application](#running-the-application)
12. [Testing](#testing)
13. [API Documentation](#api-documentation)
14. [Example API Requests & Responses](#example-api-requests--responses)
15. [Deployment Guide](#deployment-guide)
16. [Screenshots & UI Preview](#screenshots--ui-preview)
17. [Future Enhancements](#future-enhancements)

---

## 1. Project Overview

The **1Fi Product EMI Platform** solves a fundamental consumer finance dilemma: consumers wanting flagship electronics without paying predatory interest rates or liquidating their long-term wealth.

By pledging their mutual fund portfolio as collateral:
- Users unlock **0% interest EMIs** across 3, 6, 12, and 24-month tenures.
- Mutual funds **remain invested**, earning continuous market compounding and dividends.
- Users receive up to **₹7,500 additional direct cashback**.
- No prepayment penalties, zero capital gains tax triggers, and instant digital approval.

---

## 2. Key Features

- **Dynamic Product Pages with Unique URLs**:
  - `/products/iphone-17-pro`
  - `/products/vivo-x300-ultra`
  - `/products/oneplus-12`
- **Interactive Multi-Variant Selector**:
  - Instant live updates for storage sizes (`256GB`, `512GB`, `1TB`) and color swatches (`Cosmic Orange`, `Silver`, `Deep Blue`, `Eclipse Black`, `Victory Green`, `Silky Black`, `Flowy Emerald`).
  - Real-time recalculation of pricing, MRP, savings percentage, and gallery imagery.
- **Mutual Fund Backed EMI Plans**:
  - Actuarial monthly reducing balance calculator and 0% interest tenures (3, 6, 12, 24, 36, 48, 60 months).
  - Clear cashback highlight (`Additional cashback of ₹7,500`).
  - Active selection states with radio check badges.
- **Proceed Confirmation Workflow**:
  - Interactive modal displaying complete loan breakdown (Principal, Tenure, Monthly EMI, Interest Rate, Total Interest, Cashback, Net Payable).
  - Borrower contact form (Name, Phone with +91 formatting, Email validation).
  - Instant order record generation via `POST /api/orders/proceed` with unique tracking reference ID (`1FI-XXXX-XXXX`).
- **Resilient Multi-Mode Architecture**:
  - PostgreSQL + Prisma ORM database layer.
  - Automatic in-memory relational fallback for instant zero-dependency local testing.
  - Zero hardcoding on frontend—100% dynamic API consumption.
- **Complete Edge Case & Error Handling**:
  - Polished skeleton loaders during fetch transitions.
  - Custom 404 page for non-existent product slugs.
  - Retry actions for network disconnections.
  - Image fallback mechanisms for broken assets.

---

## 3. Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Tooling**: Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios with configured interceptors

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Security & Logging**: Helmet, CORS, Morgan, Zod Schema Validation
- **Architecture**: Modular Layered (Routes -> Controllers -> Services -> DB Layer)

### Database & ORM
- **Database**: PostgreSQL (compatible with Neon, Supabase, Render, Railway, AWS RDS)
- **ORM**: Prisma ORM (Client v5.22.0)

---

## 4. Project Architecture

```
product-emi-platform/
├── client/                     
│   ├── src/
│   │   ├── components/         
│   │   │   ├── Navbar.tsx      
│   │   │   ├── Footer.tsx      
│   │   │   ├── ProductGallery.tsx 
│   │   │   ├── ProductInfo.tsx 
│   │   │   ├── VariantSelector.tsx 
│   │   │   ├── EMIPlanCard.tsx 
│   │   │   ├── EMIPlanList.tsx 
│   │   │   ├── ProceedModal.tsx 
│   │   │   ├── LoadingSkeleton.tsx 
│   │   │   └── ErrorState.tsx  
│   │   ├── pages/
│   │   │   ├── Home.tsx        
│   │   │   ├── ProductPage.tsx 
│   │   │   └── NotFound.tsx    
│   │   ├── hooks/              
│   │   │   ├── useProduct.ts   
│   │   │   └── useProducts.ts  
│   │   ├── services/
│   │   │   ├── api.ts          
│   │   │   └── productService.ts 
│   │   ├── types/       
│   │   │   ├── product.ts
│   │   │   └── emi.ts
│   │   ├── utils/
│   │   │   └── formatters.ts   
│   │   ├── App.tsx             
│   │   ├── main.tsx            
│   │   └── index.css           
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── server/                     
│   ├── prisma/
│   │   ├── schema.prisma       
│   │   └── seed.ts             
│   ├── src/
│   │   ├── controllers/        
│   │   │   ├── productController.ts
│   │   │   ├── variantController.ts
│   │   │   ├── emiController.ts
│   │   │   ├── orderController.ts
│   │   │   └── healthController.ts
│   │   ├── services/           
│   │   │   ├── db.ts           
│   │   │   ├── productService.ts
│   │   │   ├── emiService.ts
│   │   │   ├── orderService.ts
│   │   │   └── seedData.ts     
│   │   ├── routes/             
│   │   │   ├── productRoutes.ts
│   │   │   ├── variantRoutes.ts
│   │   │   ├── emiRoutes.ts
│   │   │   ├── orderRoutes.ts
│   │   │   └── healthRoutes.ts
│   │   ├── middleware/         
│   │   │   ├── errorHandler.ts
│   │   │   ├── notFoundHandler.ts
│   │   │   └── validator.ts
│   │   ├── utils/              
│   │   │   ├── emiCalculator.ts
│   │   │   ├── formatters.ts
│   │   │   └── responseHandler.ts
│   │   ├── types/              
│   │   ├── app.ts              
│   │   └── server.ts           
│   ├── tests/                  
│   │   ├── emiCalculator.test.ts
│   │   └── api.test.ts
│   ├── jest.config.js
│   └── tsconfig.json
│
├── .env.example                
├── .gitignore                  
├── package.json                
├── vercel.json                 
└── render.yaml                 
```

---

## 5. Database Schema (Prisma + PostgreSQL)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id          String           @id @default(uuid())
  name        String
  slug        String           @unique
  brand       String
  description String?
  category    String           @default("Smartphones")
  isNew       Boolean          @default(false)
  variants    ProductVariant[]
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt

  @@index([slug])
}

model ProductVariant {
  id           String         @id @default(uuid())
  productId    String
  product      Product        @relation(fields: [productId], references: [id], onDelete: Cascade)
  storage      String         // e.g. "256GB", "512GB", "1TB"
  colorName    String         // e.g. "Cosmic Orange", "Silver", "Deep Blue"
  colorHex     String         // e.g. "#F07A3B"
  mrp          Float          // Maximum Retail Price
  price        Float          // Selling Price
  stock        Int            @default(50)
  isDefault    Boolean        @default(false)
  images       ProductImage[]
  emiPlans     EMIPlan[]
  orders       Order[]
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt

  @@unique([productId, storage, colorName])
  @@index([productId])
}

model ProductImage {
  id        String         @id @default(uuid())
  variantId String
  variant   ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  url       String
  altText   String?
  isPrimary Boolean        @default(false)
  order     Int            @default(0)
  createdAt DateTime       @default(now())

  @@index([variantId])
}

model EMIPlan {
  id             String         @id @default(uuid())
  variantId      String
  variant        ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  tenureMonths   Int            // e.g. 3, 6, 12, 24, 36, 48, 60
  interestRate   Float          // e.g. 0.0 or 10.5
  monthlyPayment Float          // Computed monthly installment
  cashback       Float          @default(0)
  totalPayable   Float          // Total payment over tenure
  isPopular      Boolean        @default(false)
  createdAt      DateTime       @default(now())

  @@index([variantId])
  @@index([tenureMonths])
}

model Order {
  id             String         @id @default(uuid())
  orderNumber    String         @unique
  variantId      String
  variant        ProductVariant @relation(fields: [variantId], references: [id])
  tenureMonths   Int
  monthlyPayment Float
  interestRate   Float
  cashback       Float
  totalPayable   Float
  customerName   String
  customerPhone  String
  customerEmail  String
  status         String         @default("CONFIRMED")
  createdAt      DateTime       @default(now())

  @@index([orderNumber])
}
```

---

## 6. EMI Financial Calculation Logic

The backend calculation engine implements the actuarial reducing-balance loan formula:

### Standard Reducing Balance Formula ($r > 0$)
$$\text{EMI} = P \times r \times \frac{(1+r)^n}{(1+r)^n - 1}$$

where:
- $P$ = Principal loan amount (selling price of selected product variant)
- $r$ = Monthly interest rate $= \frac{\text{Annual Interest Rate \%}}{12 \times 100}$
- $n$ = Tenure in months

### 0% No-Cost EMI Formula ($r = 0$)
$$\text{EMI} = \text{round}\left(\frac{P}{n}\right)$$

### Derived Financial Metrics
- $\text{Total Payable} = \text{EMI} \times n$
- $\text{Total Interest} = \begin{cases} 0 & \text{if } r = 0 \\ \max(0, \text{Total Payable} - P) & \text{if } r > 0 \end{cases}$
- $\text{Net Effective Cost} = \text{Total Payable} - \text{Cashback}$

---

## 7. Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ / v24 recommended)
- **npm**: v9.0.0 or higher
- **PostgreSQL**: (Optional for local dev, supported for cloud DB like Neon / Supabase)

---

## 8. Installation & Local Setup

Clone the repository and install all dependencies:

```bash
# Clone the repository
git clone https://github.com/ihimanshu17/product-emi-platform.git
cd product-emi-platform

# Install root, server, and client dependencies in one command
npm run install:all
```

---

## 9. Environment Variables

Create `.env` in the root (or in `server/` and `client/`):

```bash
cp .env.example .env
```

### `.env` Contents
```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# PostgreSQL Connection String (Optional for local memory mode)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/product_emi_db?schema=public"

# Frontend (Vite)
VITE_API_URL=http://localhost:5000/api
```

---

## 10. Database Migration & Seeding

When using a PostgreSQL database (local or cloud Neon/Supabase):

```bash
# 1. Generate Prisma Client
npm run db:generate

# 2. Run Database Migrations
npm run db:migrate

# 3. Seed Database with initial products, variants, and EMI plans
npm run db:seed
```

---

## 11. Running the Application

Start both the backend API and frontend React client concurrently:

```bash
npm run dev
```

- **Frontend Client**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 12. Testing

Run the automated backend test suite (unit tests for EMI calculations and integration tests for all REST endpoints):

```bash
npm run test
```

### Test Suite Summary
- `api.test.ts`:
  - `GET /api/health` -> Status 200 UP
  - `GET /api/products` -> Status 200, array of products with variants
  - `GET /api/products/:slug` -> Status 200, full product & default variant
  - `GET /api/products/:slug` (invalid) -> Status 404
  - `GET /api/products/:slug/emi-plans` -> Status 200, calculated EMI plans
  - `GET /api/variants/:variantId` -> Status 200, variant details
  - `POST /api/orders/proceed` -> Status 201, confirmed application reference
  - `POST /api/orders/proceed` (invalid) -> Status 400 validation error
- `emiCalculator.test.ts`:
  - 0% interest monthly payment accuracy
  - 10.5% reducing balance actuarial formula accuracy
  - Negative and zero amount boundary cases
  - Cashback & net effective cost calculation

---

## 13. API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and database connectivity |
| `GET` | `/api/products` | Retrieve all products with variant counts and starting price |
| `GET` | `/api/products/:slug` | Retrieve complete product, all variants, and default EMI plans |
| `GET` | `/api/products/:slug/emi-plans?variantId=...` | Retrieve calculated EMI plans for a specific product and variant |
| `GET` | `/api/variants/:variantId` | Retrieve full variant specifications, images, and EMI plans |
| `POST` | `/api/emi/calculate` | Calculate custom reducing balance or 0% EMI for given parameters |
| `GET` | `/api/emi/plans?amount=...` | Generate full standard tenure EMI plans for any custom amount |
| `POST` | `/api/orders/proceed` | Submit and confirm an EMI loan application |

---

## 14. Example API Requests & Responses

### 1. Get Product by Slug
`GET /api/products/iphone-17-pro`

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Product details retrieved successfully",
  "data": {
    "id": "prod-1",
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "description": "The groundbreaking iPhone 17 Pro with Grade 5 Titanium finish, A19 Pro Bionic silicon, ProMotion 120Hz Super Retina XDR display, and 48MP triple camera system.",
    "category": "Smartphones",
    "isNew": true,
    "variants": [
      {
        "id": "var-1",
        "productId": "prod-1",
        "storage": "256GB",
        "colorName": "Cosmic Orange",
        "colorHex": "#F07A3B",
        "mrp": 134900,
        "price": 127400,
        "stock": 45,
        "isDefault": true,
        "discountPercentage": 6,
        "images": [
          {
            "id": "img-1",
            "variantId": "var-1",
            "url": "/images/products/iphone-17-pro/cosmicorange1.png",
            "altText": "iPhone 17 Pro Cosmic Orange Front View",
            "isPrimary": true,
            "order": 1
          }
        ],
        "emiPlans": [
          {
            "id": "emi-1",
            "variantId": "var-1",
            "tenureMonths": 3,
            "interestRate": 0,
            "monthlyPayment": 42467,
            "cashback": 7500,
            "totalPayable": 127401,
            "totalInterest": 0,
            "netEffectiveCost": 119901,
            "isPopular": false
          },
          {
            "id": "emi-2",
            "variantId": "var-1",
            "tenureMonths": 6,
            "interestRate": 0,
            "monthlyPayment": 21233,
            "cashback": 7500,
            "totalPayable": 127398,
            "totalInterest": 0,
            "netEffectiveCost": 119898,
            "isPopular": true
          }
        ]
      }
    ],
    "startingPrice": 127400,
    "totalVariants": 3
  },
  "timestamp": "2026-09-02T12:00:00.000Z"
}
```

---

### 2. Submit Proceed Order
`POST /api/orders/proceed`

**Payload:**
```json
{
  "variantId": "var-1",
  "tenureMonths": 12,
  "customerName": "Rahul Sharma",
  "customerPhone": "9876543210",
  "customerEmail": "rahul.sharma@example.com"
}
```

**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "EMI plan application processed and confirmed successfully",
  "data": {
    "order": {
      "id": "order-1725279600000",
      "orderNumber": "1FI-1725279600000-8472",
      "variantId": "var-1",
      "tenureMonths": 12,
      "monthlyPayment": 10617,
      "interestRate": 0,
      "cashback": 7500,
      "totalPayable": 127404,
      "customerName": "Rahul Sharma",
      "customerPhone": "9876543210",
      "customerEmail": "rahul.sharma@example.com",
      "status": "CONFIRMED",
      "createdAt": "2026-09-02T12:00:00.000Z"
    },
    "variant": {
      "id": "var-1",
      "productId": "prod-1",
      "storage": "256GB",
      "colorName": "Cosmic Orange",
      "price": 127400,
      "mrp": 134900
    },
    "emiPlan": {
      "tenureMonths": 12,
      "monthlyPayment": 10617,
      "interestRate": 0,
      "cashback": 7500,
      "totalPayable": 127404,
      "totalInterest": 0,
      "netEffectiveCost": 119904
    }
  },
  "timestamp": "2026-09-02T12:00:00.000Z"
}
```

---

## 15. Deployment Guide

### A. Deploy Backend to Render / Railway
1. Push your repository to GitHub.
2. In [Render](https://render.com) or [Railway](https://railway.app), create a new **Web Service** connected to your repository.
3. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build && npx prisma generate`
   - **Start Command**: `node dist/server.js`
4. Set Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `DATABASE_URL`: `postgresql://user:pass@host:port/dbname`
   - `FRONTEND_URL`: `https://your-frontend-app.vercel.app`

### B. Deploy Frontend to Vercel
1. In [Vercel](https://vercel.com), import your repository.
2. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Set Environment Variable:
   - `VITE_API_URL`: `https://your-backend-api.onrender.com/api`
4. Deploy!

---

## 16. Screenshots & UI Preview

| Section | Description |
|---|---|
| **Catalog Home (`/`)** | Hero banner explaining MF-backed financing with product cards, starting prices, and variant previews. |
| **Product Page (`/products/:slug`)** | Dual-column layout featuring image gallery, storage/color swatches, price breakdown, and EMI cards. |
| **EMI Plan Cards** | Highlighted 0% tenures, monthly installments, interest tags, and cashback badges. |
| **Proceed Modal** | Full loan breakdown, borrower details form, mutual fund pledge note, and confirmed application state. |

---

## 17. Future Enhancements

1. **CAMS / KFintech Real-Time Portfolio Fetch**: Live CAS (Consolidated Account Statement) parsing via MFCentral OTP to determine exact borrowing limits.
2. **Automated Lien Marking**: Direct integration with CSDL / NSDL depository APIs for real-time electronic pledge creation.
3. **E-Mandate & NACH Auto-Debit**: Integration with NPCI e-NACH for monthly automated EMI repayments.
4. **Loan Repayment Dashboard**: User portal for monitoring tenure progress, foreclosing loans, and unlocking pledged units.

---


## 18. License & Credits

Built as part of the **1Fi SDE1 Assignment** for evaluation.
Designed and Developed with ❤️ by **Himanshu Upadhyay**.
