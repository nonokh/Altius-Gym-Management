# Quick Start Guide - Altius Gym Management System

Get up and running in 5 minutes!

## Prerequisites
- Node.js v18+ installed
- MongoDB installed and running locally, OR MongoDB Atlas account

## Option 1: Quick Local Setup (5 minutes)

### Step 1: Install MongoDB (if not already installed)

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Windows:**
Download from https://www.mongodb.com/try/download/community

### Step 2: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/nonokh/Hello-World.git
cd Hello-World

# Setup Backend
cd backend
npm install
cp .env.example .env
# .env already configured for local MongoDB

# Seed the database (creates admin, staff, and plans)
npm run seed

# Start backend (in this terminal)
npm run dev
# Backend running at http://localhost:5000
```

### Step 3: Setup Frontend (New Terminal)

```bash
# From project root
cd frontend
npm install

# Start frontend
npm run dev
# Frontend running at http://localhost:5173
```

### Step 4: Access the Application

Open browser: http://localhost:5173

**Login with:**
- Admin: `admin@altius.gym` / `admin123`
- Staff: `staff@altius.gym` / `staff123`

✅ **You're ready to go!**

---

## Option 2: Using MongoDB Atlas (Cloud Database)

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a new cluster (M0 Free tier)
4. Setup database user and password
5. Whitelist IP: 0.0.0.0/0 (for development)
6. Get connection string

### Step 2: Configure Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and update MONGODB_URI:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/altius-gym?retryWrites=true&w=majority
```

### Step 3: Seed and Start

```bash
# Seed database
npm run seed

# Start backend
npm run dev
```

### Step 4: Start Frontend

```bash
# New terminal, from project root
cd frontend
npm install
npm run dev
```

### Step 5: Login

Open http://localhost:5173 and login with default credentials.

---

## Common Tasks

### Add a New Member

1. Login to the application
2. Click "Members" in sidebar
3. Click "Add Member" button
4. Fill in the form
5. Select a membership plan
6. Click "Create Member"

### Check In a Member

1. Click "Attendance" in sidebar
2. Select member from dropdown
3. Click "Check In"
4. Member is now checked in for today

### Record a Payment

1. Click "Payments" in sidebar
2. Click "Record Payment"
3. Select member and plan
4. Enter amount and payment method
5. Click "Record Payment"

### View Dashboard Statistics

1. Click "Dashboard" in sidebar
2. View:
   - Total members
   - Active members
   - Today's attendance
   - Total revenue

---

## Troubleshooting

### Backend won't start

**Error: "Cannot connect to MongoDB"**
```bash
# Check if MongoDB is running
# macOS/Linux:
brew services list  # macOS
sudo systemctl status mongodb  # Linux

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongodb  # Linux
```

**Error: "Port 5000 already in use"**
```bash
# Change port in backend/.env
PORT=5001

# Restart backend
npm run dev
```

### Frontend won't connect to backend

**Check backend URL in `frontend/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Restart frontend after changing .env:**
```bash
npm run dev
```

### Seed script fails

```bash
# Make sure MongoDB is running
# Clear existing data
cd backend
# Connect to MongoDB
mongosh
use altius-gym
db.dropDatabase()
exit

# Run seed again
npm run seed
```

---

## Development Tips

### Backend Development

```bash
cd backend

# Start with auto-reload
npm run dev

# Run seed script
npm run seed

# Check logs
# Logs appear in terminal
```

### Frontend Development

```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database Management

**Using MongoDB Shell:**
```bash
mongosh

# Switch to database
use altius-gym

# View collections
show collections

# Query members
db.members.find().pretty()

# Count members
db.members.count()

# Clear all data
db.members.deleteMany({})
db.payments.deleteMany({})
db.attendance.deleteMany({})
```

**Using MongoDB Compass (GUI):**
1. Download from https://www.mongodb.com/products/compass
2. Connect to `mongodb://localhost:27017`
3. Select `altius-gym` database
4. Browse and edit data visually

---

## Next Steps

### Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on:
- Deploying frontend to Vercel
- Deploying backend to Render
- Setting up MongoDB Atlas
- Configuring environment variables
- Security best practices

### API Usage

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for:
- Complete API endpoint reference
- Request/response examples
- Authentication details
- Error handling

### Customization

**Change Branding:**
- Edit colors in `frontend/src/index.css` (`:root` variables)
- Update app name in `frontend/src/components/layout/Sidebar.jsx`
- Modify logo/icons

**Add Features:**
- Backend: Add new models in `backend/src/models/`
- Backend: Add new routes in `backend/src/routes/`
- Frontend: Add new pages in `frontend/src/pages/`

---

## Support

- 📖 Read the [README.md](README.md) for full documentation
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for hosting instructions
- 📡 Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- 🐛 Report issues on GitHub

---

## Quick Reference

### Default Ports
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

### Default Credentials
- Admin: admin@altius.gym / admin123
- Staff: staff@altius.gym / staff123

### Useful Commands

```bash
# Backend
cd backend
npm run dev      # Start dev server
npm run seed     # Seed database
npm start        # Start production server

# Frontend
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

**🎉 Happy Coding!**

For more help, visit: https://altius.vercel.app/
