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

# Development Setup

## Prerequisites

Install:

* Node.js
* Git
* MongoDB Atlas access

MongoDB does not need to be installed locally. The development application connects to the shared MongoDB Atlas development database.

---

## 1. Clone the Repository

```bash
git clone <repository-url>
cd pagecraft
```

---

## 2. Install Dependencies

Install root dependencies:

```bash
npm install
```

If required, install frontend and backend dependencies separately:

```bash
cd backend
npm install

cd ../frontend
npm install
```

---

## 3. Configure Backend Environment

Copy:

```text
backend/.env.example
```

to:

```text
backend/.env
```

Configure the following:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

MONGODB_URI=<shared-development-atlas-connection-string>

JWT_SECRET=<development-jwt-secret>
JWT_EXPIRES_IN=7d
```

### Important

Never commit `backend/.env`.

Never commit MongoDB credentials or JWT secrets.

Only `.env.example` files containing placeholders should be committed.

---

## 4. MongoDB Atlas

The team uses a shared MongoDB Atlas development database.

Each developer must have their current public IP added to the MongoDB Atlas project's IP Access List.

The application database is:

```text
pagecraft
```

Developers do not need a local MongoDB installation.

If Atlas connection fails, first check:

1. MongoDB URI
2. Database username/password
3. Atlas IP Access List
4. Network/VPN connection

---

## 5. Start Backend

```bash
cd backend
npm run dev
```

Backend:

```text
http://localhost:5000
```

Health check:

```http
GET /api/health
```

---

## 6. Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Authentication API Contract

Base URL:

```text
http://localhost:5000/api
```

## Register

```http
POST /auth/register
```

Request:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Password123"
}
```

Successful response:

```text
201 Created
```

```json
{
  "success": true,
  "message": "Registration successful.",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  },
  "token": "..."
}
```

---

## Login

```http
POST /auth/login
```

Request:

```json
{
  "email": "test@example.com",
  "password": "Password123"
}
```

Successful response:

```text
200 OK
```

```json
{
  "success": true,
  "message": "Login successful.",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  },
  "token": "..."
}
```

---

## Current User

```http
GET /auth/me
```

Required header:

```http
Authorization: Bearer <JWT>
```

Successful response:

```text
200 OK
```

```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

---

# Protected API Contract

All protected endpoints must receive:

```http
Authorization: Bearer <JWT>
```

After authentication, the backend provides:

```javascript
req.user = {
  id: "<authenticated-user-id>",
  role: "<authenticated-user-role>"
};
```

Feature controllers should use:

```javascript
req.user.id
```

to determine resource ownership.

The frontend must not be trusted to provide or override the authenticated user's `userId`.

---

# Standard Error Format

API errors use:

```json
{
  "success": false,
  "message": "Error message"
}
```

Common status codes:

| Status | Meaning               |
| ------ | --------------------- |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 404    | Not Found             |
| 409    | Conflict              |
| 500    | Internal Server Error |

---

# Git Workflow

## Main Branch

`main` contains integrated, reviewed code.

Do not develop directly on `main`.

---

## Create a Feature Branch

Always start from the latest `main`:

```bash
git checkout main
git pull origin main
```

Create a feature branch:

```bash
git checkout -b feature/<feature-name>
```

Examples:

```text
feature/authentication
feature/portfolio
feature/editor
feature/publishing
```

---

## Commit

Use meaningful commits:

```bash
git add .
git commit -m "feat(portfolio): add portfolio creation API"
```

Recommended commit prefixes:

```text
feat
fix
refactor
docs
test
chore
```

---

## Push

```bash
git push -u origin feature/<feature-name>
```

---

## Pull Request

Create a Pull Request:

```text
feature/<feature-name>
        ↓
      main
```

Before requesting review:

* Verify the application starts.
* Run relevant tests.
* Verify no secrets are committed.
* Verify `.env` remains ignored.
* Check that only relevant files were changed.

At least one teammate should review the PR before merging.

---

## After Main Changes

Update your local main:

```bash
git checkout main
git pull origin main
```

Then update your feature branch:

```bash
git checkout feature/<feature-name>
git merge main
```

Resolve conflicts before continuing development.

---

# Important Team Rules

1. Never commit `.env` files.
2. Never commit passwords, MongoDB credentials, API keys, or JWT secrets.
3. Never push directly to `main`.
4. Use feature branches.
5. Use Pull Requests for integration.
6. Do not modify another teammate's feature without coordination.
7. Do not duplicate authentication/JWT logic.
8. Protected APIs must use the shared `protect` middleware.
9. Resource ownership must come from `req.user.id`, not the client request body.
10. Run the application and relevant tests before opening a PR.
11. Keep commits focused and descriptive.
12. Communicate breaking API/schema changes with the team before implementing them.

