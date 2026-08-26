# Pagecraft

> A MERN-based drag-and-drop portfolio builder for creating, customizing, publishing, and exporting professional portfolios and resumes.

---

## 🛠️ Technology Stack

- **Frontend**: React, Vite, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)

---

## 📁 Project Structure

```text
pagecraft/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── config/           # Database configuration (Mongoose)
│   │   ├── controllers/      # Route controllers (health check, etc.)
│   │   ├── middleware/       # Error handling & middleware
│   │   ├── routes/           # Express routers (/api/health, etc.)
│   │   ├── app.js            # Express app configuration & CORS
│   │   └── server.js         # Server entry point
│   ├── .env.example          # Backend environment template
│   └── package.json
├── frontend/                 # React frontend application (Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components (HealthCheck, etc.)
│   │   ├── services/         # API client & fetch services
│   │   ├── App.jsx           # Base application component
│   │   ├── main.jsx          # React DOM entry point
│   │   └── index.css         # Global styles
│   ├── .env.example          # Frontend environment template
│   ├── index.html            # Vite HTML shell
│   ├── vite.config.js        # Vite config
│   └── package.json
├── .env.example              # Root environment template reference
├── .gitignore                # Global git ignore configuration
└── package.json              # Root orchestration scripts
```

---

## 🚀 Getting Started

### 1. Install Dependencies

You can install all root, backend, and frontend dependencies with one command from the project root:

```bash
npm run install:all
```

Or install them individually:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Environment Configuration

Copy the example environment files:

```bash
# In backend/
cp .env.example .env

# In frontend/
cp .env.example .env
```

### 3. Running the Project

#### Run Both Concurrently (Recommended):
From the project root:
```bash
npm run dev
```

#### Run Backend Only:
From the project root:
```bash
npm run dev:backend
```
*Or from `backend/`:*
```bash
npm run dev
```
Backend will start at: `http://localhost:5000`  
Health Check endpoint: `http://localhost:5000/api/health`

#### Run Frontend Only:
From the project root:
```bash
npm run dev:frontend
```
*Or from `frontend/`:*
```bash
npm run dev
```
Frontend will start at: `http://localhost:5173`
