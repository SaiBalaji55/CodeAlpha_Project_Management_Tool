# CodeAlpha_Project_Management_Tool

#  ProjectFlow – Project Management Web Application

ProjectFlow is a full-stack Project Management Web Application built to manage projects and tasks using a Kanban-style workflow. This project is developed as part of an internship submission and demonstrates real-world backend and frontend integration.

---

##  Features

- User Authentication (JWT)
- Create & Manage Projects
- Create & Track Tasks
- Kanban Board (Todo / In-Progress / Completed)
- Secure REST APIs
- MongoDB Database Integration
- Responsive Frontend UI
- Activity & Status Tracking

---

##  Tech Stack

### Frontend
- HTML5  
- CSS3  
- JavaScript (Vanilla JS)  
- Fetch API  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  

---

##  Project Structure
```
projectflow/

│

├── frontend/

│   └── index.html

│

├── backend/

│   └── src/

│       ├── models/

│       ├── routes/

│       ├── controllers/

│       ├── middleware/

│       └── server.js

│

└── README.md
```

---

##  Setup Instructions

### 1️ Clone Repository
```bash
git clone https://github.com/your-username/projectflow.git
cd projectflow
```

### 2 Backend Setup
```bash
cd backend
npm install
npm start
```

### Create a .env file inside backend folder:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3️ Frontend Setup

Open frontend/index.html in browser
(or use VS Code Live Server)


