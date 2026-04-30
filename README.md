# PasalOS

PasalOS is a modern, scalable SaaS platform designed for store management. It provides a comprehensive suite of tools for inventory tracking, sales management, and vendor coordination.

## Features

- **Store Profile Management**: Track store details and settings.
- **Role-Based Access Control**: Secure authentication and authorization for store owners and staff.
- **Inventory Management**: Manage products, stock levels, and categories.
- **Vendor Management**: Keep track of suppliers and purchase orders.
- **Sales Tracking**: Real-time sales monitoring and reporting.

## Tech Stack

### Backend
- **Core**: Node.js & Express
- **Database**: PostgreSQL (via Prisma ORM)
- **Validation**: Zod
- **Security**: JWT Authentication, bcryptjs, Helmet
- **Logging**: Morgan

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **API Client**: Axios

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ssrsapkota/pasalos.git
   cd pasalos
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/pasalos"
   JWT_SECRET="your_secret_key"
   PORT=5000
   ```

4. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

5. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

6. **Run the Application**
   - **Backend**: `npm run dev` (from root)
   - **Frontend**: `npm run dev` (from `frontend` directory)

## License

This project is licensed under the ISC License.
