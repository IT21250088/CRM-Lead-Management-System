# Quick Start Guide - CRM Lead Management System

## 5-Minute Setup

### Prerequisites
- Node.js installed
- MongoDB running locally or MongoDB Atlas account

### Step 1: Backend Setup (2 minutes)
```bash
cd backend
npm install
node seed.js  # Creates test user and sample data
npm run dev
```
Backend ready at: **http://localhost:5000**

### Step 2: Frontend Setup (2 minutes)
```bash
cd frontend
npm install
npm run dev
```
Frontend ready at: **http://localhost:3000**

### Step 3: Login (1 minute)
Open browser to **http://localhost:3000**
```
Email: admin@example.com
Password: password123
```

## What You Can Do

### 1. Dashboard
- View pipeline overview
- See statistics and revenue metrics
- Get insights about your leads

### 2. Leads List
- See all leads in a table
- Search by name, company, or email
- Filter by status, source, or salesperson
- Click to view lead details

### 3. Create Lead
- Click "New Lead" button
- Fill in lead information
- Set deal value and status
- Save to add to pipeline

### 4. Lead Details
- View complete lead information
- Edit lead details
- View all notes
- Add new notes

### 5. Update Status
- Click on a lead to view details
- Click "Edit Lead"
- Change status in dropdown
- Save changes

## Database Notes

### Default Database
Uses MongoDB at: `mongodb://localhost:27017/crm-lead-management`

### Change Connection
Edit `backend/.env`:
```
MONGO_URI=your_mongodb_connection_string
```

### Reset Data
```bash
cd backend
npm run seed
```

## Troubleshooting

### Port Already in Use
- Backend default: 5000 - Change in `backend/.env`
- Frontend default: 3000 - Vite will use next available

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas: Update MONGO_URI in `.env`

### CORS Errors
- Check frontend .env has correct API URL
- Ensure backend is running before frontend

### Can't Login
- Run seed script: `cd backend && npm run seed`
- Check .env file exists with JWT_SECRET

## File Structure Summary

```
Backend (/backend)
├── Server endpoints for API
├── MongoDB models (User, Lead, Note)
├── Authentication with JWT
├── Database seed script

Frontend (/frontend)
├── React components for UI
├── Pages: Login, Dashboard, Leads, LeadDetails
├── API service layer
├── Responsive styling
```

## Key Features to Test

✅ Login with test credentials
✅ View dashboard statistics
✅ Create a new lead
✅ Edit lead information
✅ Update lead status
✅ Add notes to lead
✅ Search leads by name/company
✅ Filter leads by status
✅ Delete a lead
✅ View pipeline metrics

## Production Deployment

### Frontend (Vercel/Netlify)
1. `npm run build`
2. Deploy `dist` folder
3. Set `VITE_API_URL` environment variable

### Backend (Heroku/Railway)
1. Push code to git
2. Set environment variables
3. Run seed command
4. Deploy

## Support

See **README.md** for detailed documentation
See **REFLECTION.md** for architecture and decisions

---

**Ready to go! Start with `npm install` in both directories.**
