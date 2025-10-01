# Altius Gym Management System

A modern, full-stack gym management system built with React, Node.js, Express, and MongoDB. This system is designed to manage up to 200 gym members per month using completely free and open-source technologies.

## 🌟 Features

### Member Management
- Add, edit, and delete gym members
- Track member status (active, inactive, expired, suspended)
- Search members by name, email, or phone
- Assign membership plans to members
- Store member details including contact information and emergency contacts

### Membership Plans
- Multiple membership tiers (Daily, Monthly, Quarterly, Annual)
- Customizable plan features
- Flexible pricing structure
- Plan activation/deactivation

### Attendance Tracking
- Daily member check-in system
- Attendance history and reports
- Real-time attendance count
- Member attendance validation

### Payment Management
- Record membership payments
- Multiple payment methods (Cash, Card, UPI, Bank Transfer)
- Payment history tracking
- Revenue statistics and reporting

### Dashboard
- Real-time statistics overview
- Member count by status
- Today's attendance count
- Total revenue tracking
- Key metrics visualization

## 🚀 Technology Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nonokh/Altius-Gym-Management.git
cd Altius-Gym-Management
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# Update MONGODB_URI, JWT_SECRET, etc.

# Seed the database with initial data (creates admin and staff users + membership plans)
npm run seed

# Start the backend server
npm run dev
```

The backend server will start on http://localhost:5000

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the frontend development server
npm run dev
```

The frontend will start on http://localhost:5173

## 🔐 Default Login Credentials

After running the seed script, you can login with:

**Admin Account:**
- Email: admin@altius.gym
- Password: admin123

**Staff Account:**
- Email: staff@altius.gym
- Password: staff123

**⚠️ Important:** Change these credentials in production!

## 📁 Project Structure

```
Altius-Gym-Management/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   ├── seed.js         # Database seeding script
│   │   └── server.js       # Main server file
│   ├── .env.example        # Environment variables template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── .env.example        # Environment variables template
│   └── package.json
│
└── README.md
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Members
- `GET /api/members` - Get all members (with pagination and search)
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member
- `GET /api/members/stats/overview` - Get member statistics

### Membership Plans
- `GET /api/plans` - Get all plans
- `GET /api/plans/:id` - Get plan by ID
- `POST /api/plans` - Create new plan (Admin only)
- `PUT /api/plans/:id` - Update plan (Admin only)
- `DELETE /api/plans/:id` - Delete plan (Admin only)

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/checkin` - Check in member
- `PUT /api/attendance/checkout/:id` - Check out member
- `GET /api/attendance/today/count` - Get today's attendance count

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get payment by ID
- `POST /api/payments` - Record new payment
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Delete payment
- `GET /api/payments/stats/overview` - Get payment statistics

## 🆓 Free Hosting Options

### Frontend (Choose one)
1. **Vercel** (Recommended)
   - Sign up at vercel.com
   - Connect your GitHub repository
   - Select the `frontend` directory
   - Deploy automatically

2. **Netlify**
   - Sign up at netlify.com
   - Connect your GitHub repository
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`

3. **GitHub Pages**
   - Build: `cd frontend && npm run build`
   - Deploy the `dist` folder

### Backend (Choose one)
1. **Render** (Recommended)
   - Sign up at render.com
   - Create new Web Service
   - Connect your GitHub repository
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`

2. **Railway**
   - Sign up at railway.app
   - Connect your GitHub repository
   - Select `backend` directory
   - Automatic deployment

3. **Fly.io**
   - Sign up at fly.io
   - Install Fly CLI
   - Deploy with `fly launch`

### Database (Choose one)
1. **MongoDB Atlas** (Recommended)
   - Sign up at mongodb.com/cloud/atlas
   - Create a free M0 cluster (512MB storage)
   - Get connection string
   - Update MONGODB_URI in backend .env

2. **MongoDB Cloud**
   - Alternative free tier at cloud.mongodb.com

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/altius-gym
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

**Production:** Update VITE_API_URL to point to your deployed backend URL.

## 📈 Scaling for 200+ Members

The system is optimized to handle 200+ monthly active users with:

- Efficient database queries with indexing
- Pagination support on all list endpoints
- Optimized React rendering
- Lightweight frontend bundle
- RESTful API design
- JWT-based authentication

### MongoDB Atlas Free Tier Limits:
- 512MB storage (sufficient for ~5000+ member records)
- Shared RAM
- Shared vCPUs
- No limit on connections

## 🔒 Security Best Practices

1. **Change default credentials** immediately after deployment
2. **Use strong JWT_SECRET** (at least 32 characters)
3. **Enable CORS** only for your frontend domain in production
4. **Use HTTPS** in production
5. **Regular backups** of MongoDB database
6. **Update dependencies** regularly for security patches

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- Check if port 5000 is available

### Frontend won't connect to backend
- Verify VITE_API_URL in frontend/.env
- Check if backend is running
- Check CORS settings

### Database connection failed
- Verify MongoDB is running
- Check MongoDB connection string
- Ensure MongoDB Atlas IP whitelist includes your IP (use 0.0.0.0/0 for development)

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🙏 Credits

Built with ❤️ by Altius Team
- Website: https://altius.vercel.app/

## 📞 Support

For issues and questions:
1. Check the documentation
2. Review closed issues on GitHub
3. Create a new issue with detailed information

---

**Note:** This project uses only free and open-source technologies. All recommended hosting platforms offer free tiers suitable for managing up to 200 gym members per month.
