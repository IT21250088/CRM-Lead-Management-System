# CRM Lead Management System

A full-stack Customer Relationship Management (CRM) application for managing sales leads, tracking progress through a sales pipeline, adding notes, and viewing a comprehensive dashboard.

## Features

### Authentication
- JWT-based authentication
- Test user credentials included
- Protected routes and API endpoints
- Automatic logout on token expiration

### Lead Management
- **Create** new leads with detailed information
- **View** lead list with filtering and search
- **Edit** lead details and status
- **Delete** leads and associated notes
- **Track** lead through sales pipeline stages

### Lead Attributes
- Lead Name & Company
- Email & Phone
- Lead Source (Website, LinkedIn, Referral, Cold Email, Event, Other)
- Status (New, Contacted, Qualified, Proposal Sent, Won, Lost)
- Assigned Salesperson
- Estimated Deal Value
- Created/Updated timestamps

### Lead Notes
- Add notes to leads
- Track notes by creator and date
- Delete notes
- View full note history per lead

### Dashboard
- Total leads count
- New leads count
- Qualified leads count
- Won deals count
- Lost deals count
- Total estimated pipeline value
- Total value of won deals
- Pipeline insights and recommendations

### Search & Filtering
- Search by lead name, company, or email
- Filter by status
- Filter by lead source
- Filter by assigned salesperson
- Real-time filtering

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd CRM-Lead-Management-System
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with your configuration
# Edit .env with your MongoDB URI and JWT secret

PORT=5000
MONGO_URI=mongodb://localhost:27017/crm-lead-management
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development


# Seed the database with test data
npm run seed

# Start the development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file

VITE_API_URL=http://localhost:5000


# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Test Login Credentials

```
Email: admin@example.com
Password: password123
```

## Database Setup

###  MongoDB Atlas (Cloud)
1. Create a free MongoDB Atlas cluster
2. Get your connection string
3. Update the `MONGO_URI` in backend `.env`

### Initialize Data
The seed script creates:
- 1 test user (admin@example.com)
- 5 sample leads with various statuses
- Demonstrates the data structure

Run anytime: `npm run seed`

## Project Structure

```
CRM-Lead-Management-System/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── leadController.js
│   │   ├── noteController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Lead.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── leadRoutes.js
│   │   ├── noteRoutes.js
│   │   └── dashboardRoutes.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── LeadForm.jsx
    │   │   ├── LeadTable.jsx
    │   │   └── NotesList.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Leads.jsx
    │   │   └── LeadDetails.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── .env
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Leads
- `GET /api/leads` - Get all leads (with filtering)
- `GET /api/leads/:id` - Get specific lead
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Notes
- `GET /api/notes/lead/:leadId` - Get notes for a lead
- `POST /api/notes/lead/:leadId` - Add note to lead
- `DELETE /api/notes/:noteId` - Delete note

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Features Explained

### Lead Status Pipeline
- **New**: Recently added leads
- **Contacted**: Initial contact made
- **Qualified**: Potential match identified
- **Proposal Sent**: Formal proposal delivered
- **Won**: Deal closed successfully
- **Lost**: Opportunity missed

### Search & Filtering
- Real-time search updates
- Search across name, company, and email
- Combine multiple filters
- Reset filters button

### Notes System
- Add internal notes to track interactions
- Auto-timestamps every note
- Track who added each note
- Delete individual notes

## Testing Features

### Create a Lead
1. Click "New Lead" button
2. Fill in required fields
3. Optionally set deal value and status

### Update a Lead
1. Click a lead in the table
2. Review all details
3. Click "Edit Lead"
4. Modify information and save

### Add Notes
1. View lead details
2. Scroll to notes section
3. Type note and click "Add Note"
4. View all notes with timestamps

### Filter Leads
1. Use search box for quick search
2. Select status filter
3. Select source filter
4. Select salesperson filter
5. Click "Reset Filters" to clear

## Dashboard Statistics

The dashboard displays:
- Total number of leads
- Breakdown by status
- Pipeline value (all leads)
- Won deals value
- Quick insights and recommendations

## Environment Variables

### Backend
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/crm-lead-management
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend
```
VITE_API_URL=http://localhost:5000
```

