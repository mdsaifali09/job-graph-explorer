# Job Graph Explorer

A graph-based web application built using **React, Node.js, Express.js, and CognoDB Cloud**.

Job Graph Explorer allows users to explore developers, skills, projects, technologies, and their relationships using a graph database.

## 🚀 Live Demo

- **Frontend:** https://job-graph-explorer.vercel.app/
- **Backend:** https://job-graph-explorer.onrender.com
- **GitHub:** https://github.com/mdsaifali09/job-graph-explorer

## ✨ Features

- View all developers
- Search developers by skill
- Search developers by technology
- View developer profile
- View developer skills and projects
- Developer recommendations based on common skills
- Multi-hop graph traversal
- Loading, empty, and error states
- REST APIs using Express.js
- Parameterized Cypher queries

## 🧠 Graph Data Model


Developer ──HAS_SKILL──> Skill
Developer ──WORKED_ON──> Project
Project ──USES──> Technology

🛠️ Tech Stack

Frontend: React, Vite, Axios, CSS

Backend: Node.js, Express.js, Neo4j Driver

Database: CognoDB Cloud, Cypher

Deployment: Vercel, Render

📁 Project Structure
job-graph-explorer/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── queries/
│   ├── routes/
│   ├── scripts/
│   ├── server.js
│   └── package.json
├── fronted/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── .gitignore
└── README.md

⚙️ Installation
Clone Repository
git clone https://github.com/mdsaifali09/job-graph-explorer.git
cd job-graph-explorer

Backend
cd backend
npm install

Create a .env file:
PORT=5000
COGNODB_URI=your_cognodb_uri
COGNODB_USERNAME=your_username
COGNODB_PASSWORD=your_password

Run the backend:
npm run dev

Backend:

http://localhost:5000


Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Frontend:

http://localhost:5173

🔗 API Endpoints
GET /api/developers
GET /api/developers/:id
GET /api/developers/skill/:skill
GET /api/developers/technology/:technology
GET /api/developers/:id/recommendations
GET /api/health

📊 Data Flow
React Frontend
      ↓
Axios
      ↓
Express.js API
      ↓
Neo4j Driver
      ↓
CognoDB Cloud
      ↓
Cypher Query
      ↓
Graph Data
      ↓
React UI

🔐 Security

Database credentials are stored using environment variables.

The real .env file should never be committed to GitHub.

Use .env.example for sharing the required environment variable structure.

👨‍💻 Author

Md Saif Ali

B.Tech Computer Science Engineering — 2026
