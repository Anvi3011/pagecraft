# Pagecraft

> A modern MERN-based drag-and-drop portfolio builder for creating, customizing, publishing, and exporting professional portfolios and resumes.

---

## 🛠️ Technology Stack

- **Frontend**: React (v18), Vite, CSS3, Lucide Icons
- **Backend**: Node.js, Express.js (ES Modules), JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`)
- **Database**: MongoDB Atlas / Mongoose ODM

---

## 📁 Project Structure

```text
pagecraft/
├── backend/                  # Express REST API
│   ├── src/
│   │   ├── config/           # Database configuration (Mongoose)
│   │   ├── controllers/      # Route controllers (auth, health)
│   │   ├── middleware/       # Error handling & JWT protect middleware
│   │   ├── models/           # Mongoose schemas & models (User)
│   │   ├── routes/           # Express routers (/api/auth, /api/health)
│   │   ├── services/         # Business logic layer (auth.service)
│   │   ├── utils/            # Utilities (JWT generation & verification)
│   │   ├── app.js            # Express app configuration & CORS
│   │   └── server.js         # Server entry point
│   ├── .env.example          # Backend environment template
│   └── package.json
├── frontend/                 # React frontend application (Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components (HealthCheck)
│   │   ├── services/         # API client & fetch utilities
│   │   ├── App.jsx           # Base application component
│   │   ├── main.jsx          # React DOM entry point
│   │   └── index.css         # Global styling
│   ├── .env.example          # Frontend environment template
│   ├── index.html            # HTML shell
│   ├── vite.config.js        # Vite config
│   └── package.json
├── .env.example              # Root environment template reference
├── .gitignore                # Global git ignore configuration
└── package.json              # Root orchestration scripts
```

---

## 🚀 Local Development Setup

### 1. Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)
- **MongoDB Atlas** account access (invitation provided by Team Lead)

---

### 2. Clone the Repository

Clone the repository and switch to your assigned feature branch:

```bash
git clone <REPOSITORY_URL>
cd pagecraft
git checkout -b feat/<your-feature-name>
```

---

### 3. Install Dependencies

Install all dependencies across root, backend, and frontend using the root orchestration script:

```bash
npm run install:all
```

*Alternatively, you can install dependencies individually:*

```bash
# Root tooling (concurrently)
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

---

### 4. Backend Environment Setup

Create your local backend environment configuration:

```bash
cd backend
cp .env.example .env
```

> ⚠️ **Important**: `.env` files contain local secrets and are strictly ignored by Git. **Never commit `.env` files to version control.**

#### Backend Environment Variables Reference:

| Variable | Example Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port where the Express API server listens |
| `NODE_ENV` | `development` | Runtime environment (`development` or `production`) |
| `CLIENT_URL` | `http://localhost:5173` | Allowed origin for CORS (Vite dev server) |
| `MONGODB_URI` | `mongodb+srv://pagecraft-dev:<PASSWORD>@<CLUSTER>/pagecraft` | MongoDB Atlas connection string |
| `JWT_SECRET` | `your_jwt_secret_here` | Secret key used for signing and verifying JWTs |
| `JWT_EXPIRES_IN` | `7d` | Expiration window for issued JWT tokens |

---

### 5. Shared MongoDB Atlas Development Setup

The team shares a common MongoDB Atlas development cluster to ensure consistent schema evolution and feature integration.

- **Database Name**: `pagecraft`
- **Shared Database User**: `pagecraft-dev`
- **User Roles**: Separate Atlas logins are used for repository team members. Database user credentials (`pagecraft-dev`) are distinct from individual Atlas account logins.
- **Connection URI**: Obtain the actual password and connection URI securely from the Team Lead. Paste it into your local `backend/.env`.
- **IP Access List**: Each teammate must add their current public IP address to the MongoDB Atlas project's Network Access list.
  > 🔒 **Security Notice**: Do **NOT** use `0.0.0.0/0` (allow access from anywhere) for standard development. Only whitelist individual, specific developer IPs.

---

### 6. Frontend Environment Setup

Create your local frontend environment configuration:

```bash
cd frontend
cp .env.example .env
```

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `http://localhost:5000/api` | Base URL pointing to the Express backend API |

---

### 7. Running the Project

#### Option A: Run Backend & Frontend Concurrently (Recommended)
From the project root directory:
```bash
npm run dev
```

#### Option B: Run Services Individually
From the project root:
```bash
# Start Backend only (http://localhost:5000)
npm run dev:backend

# Start Frontend only (http://localhost:5173)
npm run dev:frontend
```

*Or run from within each directory:*
```bash
# Inside backend/
npm run dev

# Inside frontend/
npm run dev
```

---

## 🔍 System Verification & API Contracts

### Health Check Endpoint
Verify the backend is operational:
- **URL**: `GET http://localhost:5000/api/health`
- **Response**:
```json
{
  "status": "ok",
  "message": "Pagecraft API is healthy and operational",
  "timestamp": "2026-09-04T12:00:00.000Z",
  "uptime": "45.20s",
  "services": {
    "server": "operational",
    "database": "connected"
  },
  "environment": "development"
}
```

---

### Authentication API Contract (FR-01)

Authentication follows a structured 4-tier pattern:
`Route` ➔ `Controller` ➔ `Service` ➔ `Model`

#### 1. User Registration
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Request Body**:
```json
{
  "name": "Alex Developer",
  "email": "alex@example.com",
  "password": "SecurePassword123"
}
```
- **Response** (`201 Created`):
```json
{
  "success": true,
  "message": "Registration successful.",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Alex Developer",
    "email": "alex@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. User Login
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
```json
{
  "email": "alex@example.com",
  "password": "SecurePassword123"
}
```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Alex Developer",
    "email": "alex@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Current User Profile
- **Endpoint**: `GET /api/auth/me`
- **Access**: Private (Requires `protect` middleware)
- **Headers**:
```http
Authorization: Bearer <JWT_TOKEN>
```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Alex Developer",
    "email": "alex@example.com",
    "role": "user"
  }
}
```

---

## 🛡️ Security & Architecture Rules

1. **`protect` Middleware**: Attaches the authenticated identity to `req.user`:
   ```javascript
   req.user = {
     id: decoded.id,
     role: decoded.role
   }
   ```
2. **Ownership Enforcement**: Feature APIs (e.g., portfolios, sections) **must always derive the authenticated user ID from `req.user.id`**. Never trust a client-supplied `userId` in `req.body` or query parameters.
3. **Password Protection**: Passwords are saved only as `passwordHash` (`select: false`). Plaintext passwords and `passwordHash` are **never** returned in API responses.
4. **Standard Error Format**: All API errors conform to:
   ```json
   {
     "success": false,
     "message": "Error description here"
   }
   ```

---

## 🌿 Git & Team Workflow

1. **Branch Protection**: Never commit directly to `main`.
2. **Feature Branches**: Create focused branches from up-to-date `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/<feature-name>
   ```
3. **Conventional Commits**: Format commit messages clearly using standard prefixes:
   - `feat:` New feature implementation
   - `fix:` Bug fix
   - `refactor:` Code refactoring without feature changes
   - `docs:` Documentation updates
   - `test:` Adding or updating tests
   - `chore:` Tooling, configuration, or dependency updates
4. **Pull Requests & Code Review**:
   - Push your feature branch and open a Pull Request against `main`.
   - Every PR requires review and approval from at least **one teammate** before merging.
   - Keep PRs small, focused, and verified.

---

## 📋 Team Onboarding Checklist

Follow this checklist when setting up your development workspace:

- [ ] Clone repository: `git clone <REPO_URL>`
- [ ] Checkout your assigned feature branch: `git checkout -b feat/<feature-name>`
- [ ] Install dependencies: `npm run install:all`
- [ ] Create `backend/.env` from `backend/.env.example`
- [ ] Obtain the shared MongoDB Atlas URI securely from the Team Lead
- [ ] Ensure your current public IP is added to the MongoDB Atlas Network Access list
- [ ] Start the backend server: `npm run dev:backend`
- [ ] Start the frontend dev server: `npm run dev:frontend`
- [ ] Verify health check: `GET http://localhost:5000/api/health`
- [ ] Register a test account via `POST /api/auth/register`
- [ ] Log in with the test account via `POST /api/auth/login`
- [ ] Query `GET /api/auth/me` with the returned Bearer token to verify protected access
