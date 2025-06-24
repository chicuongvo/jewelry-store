# 💎 JewelryStore - E-commerce Platform

A full-stack jewelry e-commerce platform built with React, TypeScript, Node.js, and Prisma. This application provides a complete solution for jewelry store management with both customer-facing and admin interfaces.

## 🌟 Features

### Customer Features

- **Product Catalog**: Browse and search jewelry products with detailed information
- **User Authentication**: Register, login, and manage user profiles
- **Shopping Cart**: Add products to cart and manage purchases
- **Order Management**: Place and track orders
- **User Profile**: Update personal information and avatar
- **Newsletter Subscription**: Stay updated with latest offers

### Admin Features

- **Inventory Management**: Track product stock levels and inventory reports
- **Order Management**: Process and manage customer orders
- **Service Orders**: Handle jewelry repair and custom services
- **Reporting**: Generate monthly inventory reports with export functionality
- **User Management**: Manage customer accounts and profiles

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for responsive styling
- **React Router** for navigation
- **TanStack Query** for server state management
- **React Hook Form** for form handling
- **React Toastify** for notifications
- **Lucide React** for icons

### Backend

- **Node.js** with Express.js
- **Prisma ORM** for database management
- **PostgreSQL** database
- **Passport.js** for authentication
- **Cloudinary** for image storage
- **JWT** for session management
- **Joi** for data validation

## 📁 Project Structure

```
jewelry-store/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API service functions
│   │   ├── contexts/       # React contexts
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── assets/             # Images and media files
├── backend/                 # Node.js backend application
│   ├── controllers/        # Route handlers
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/            # Configuration files
│   ├── prisma/            # Database schema and migrations
│   ├── validation/        # Input validation schemas
│   └── utils/             # Backend utilities
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/jewelry-store.git
   cd jewelry-store
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   Create `.env` files in both frontend and backend directories:

   **Backend `.env`:**

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/jewelry_store"
   JWT_SECRET="your-jwt-secret"
   CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
   CLOUDINARY_API_KEY="your-cloudinary-key"
   CLOUDINARY_API_SECRET="your-cloudinary-secret"
   PORT=5000
   ```

   **Frontend `.env`:**

   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **Database Setup**

   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

6. **Start Development Servers**

   **Backend:**

   ```bash
   cd backend
   npm run dev
   ```

   **Frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

## 📊 API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product (Admin)
- `PUT /products/:id` - Update product (Admin)
- `DELETE /products/:id` - Delete product (Admin)

### Inventory Reports

- `GET /inventory-reports` - Get all inventory reports
- `GET /inventory-reports/:month/:year` - Get report by month/year
- `POST /inventory-reports` - Create new report
- `GET /inventory-reports-details/:reportId/:productId` - Get report details

### Orders

- `GET /orders` - Get user orders
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order status

## 🎨 UI Components

The application uses a consistent design system with:

- **Color Scheme**: Primary pink (#FF93A0), Admin blue (#4880FF)
- **Typography**: Lexend for body text, Playwrite HU for logo
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Interactive Elements**: Hover effects and smooth transitions

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with Joi
- CORS configuration
- Session management
- File upload validation

## 🧪 Testing

Run tests with:

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test
```

## 📦 Build & Deployment

### Frontend Build

```bash
cd frontend
npm run build
```

### Backend Build

```bash
cd backend
npm run build
```

### Production Deployment

The application is configured for deployment on:

- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Heroku, DigitalOcean
- **Database**: PostgreSQL on Railway, Supabase

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and TypeScript communities
- TailwindCSS for the amazing utility-first CSS framework
- Prisma for the excellent ORM
- All contributors and testers
