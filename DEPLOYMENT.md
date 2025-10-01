# Deployment Guide

## Frontend Deployment (Vercel)

1. **Sign up for Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select "frontend" as root directory
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Environment Variables**
   - Add `VITE_API_URL` pointing to your backend URL
   - Example: `https://your-backend.onrender.com/api`

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

## Backend Deployment (Render)

1. **Sign up for Render**
   - Go to https://render.com
   - Sign up with GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service**
   - Name: `altius-gym-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free

4. **Environment Variables**
   Add the following environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<your-secure-random-string>
   JWT_EXPIRE=7d
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your service URL (e.g., `https://altius-gym-backend.onrender.com`)

## Database Setup (MongoDB Atlas)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**
   - Choose "Build a Database"
   - Select "FREE" shared cluster (M0)
   - Choose a cloud provider and region closest to your backend
   - Name your cluster (e.g., "altius-gym")

3. **Configure Security**
   - Database Access:
     - Create a database user
     - Username: `altiusadmin`
     - Password: Generate secure password
     - Database User Privileges: "Read and write to any database"
   
   - Network Access:
     - Click "Add IP Address"
     - Select "Allow Access from Anywhere" (0.0.0.0/0)
     - This is safe for free tier development
     - In production, restrict to your server's IP

4. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `altius-gym`
   - Example: `mongodb+srv://altiusadmin:password@cluster0.xxxxx.mongodb.net/altius-gym?retryWrites=true&w=majority`

5. **Seed Database**
   - Update your local `.env` with Atlas connection string
   - Run: `cd backend && npm run seed`
   - This creates initial admin/staff users and membership plans

## Post-Deployment Steps

1. **Update Frontend Environment**
   - In Vercel, update `VITE_API_URL` to your Render backend URL
   - Redeploy frontend

2. **Test Your Application**
   - Visit your Vercel frontend URL
   - Login with default credentials:
     - Admin: admin@altius.gym / admin123
     - Staff: staff@altius.gym / staff123
   - Change passwords immediately!

3. **Update Backend CORS**
   - In Render, set `CORS_ORIGIN` to your Vercel frontend URL
   - Restart backend service

## Alternative Deployment Options

### Frontend Alternatives

**Netlify:**
1. Sign up at https://netlify.com
2. New site from Git
3. Build command: `cd frontend && npm run build`
4. Publish directory: `frontend/dist`
5. Add environment variables

**GitHub Pages:**
1. Build locally: `cd frontend && npm run build`
2. Push `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Backend Alternatives

**Railway:**
1. Sign up at https://railway.app
2. New Project → Deploy from GitHub repo
3. Select `backend` directory
4. Add environment variables
5. Deploy

**Fly.io:**
1. Install Fly CLI: `https://fly.io/docs/hands-on/install-flyctl/`
2. Login: `flyctl auth login`
3. Navigate to backend: `cd backend`
4. Launch: `flyctl launch`
5. Set secrets: `flyctl secrets set MONGODB_URI=...`

## Monitoring & Maintenance

1. **Monitor Logs**
   - Render: Check logs in dashboard
   - Vercel: Check function logs
   - MongoDB Atlas: Monitor queries and performance

2. **Free Tier Limits**
   - Render: Service sleeps after 15 minutes of inactivity
   - MongoDB Atlas: 512MB storage, suitable for ~5000+ members
   - Vercel: Unlimited bandwidth for hobby projects

3. **Backup Strategy**
   - MongoDB Atlas: Automatic backups available
   - Export data periodically: `mongodump --uri="your-connection-string"`
   - Store backups securely

## Troubleshooting

**Backend won't connect to MongoDB:**
- Check IP whitelist in MongoDB Atlas
- Verify connection string is correct
- Check if password contains special characters (URL encode them)

**Frontend can't reach backend:**
- Verify VITE_API_URL is correct
- Check CORS settings on backend
- Ensure backend is running (Render free tier sleeps)

**Render service is slow:**
- Free tier services sleep after inactivity
- First request after sleep takes 30-60 seconds
- Consider keeping service alive with a ping service (e.g., UptimeRobot)

## Security Checklist

- [ ] Changed default admin/staff passwords
- [ ] Updated JWT_SECRET to secure random string
- [ ] CORS configured for production domain only
- [ ] MongoDB user has minimum required permissions
- [ ] Environment variables are secure (not in code)
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] Database backups configured

## Cost Optimization

All services remain FREE with:
- Vercel: Unlimited static sites (hobby)
- Render: 750 hours/month free tier
- MongoDB Atlas: 512MB M0 cluster
- Total cost: $0/month for up to 200 members

---

Need help? Check the main README.md or create an issue on GitHub.
