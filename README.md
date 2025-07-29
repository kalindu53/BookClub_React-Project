# Book Club Library Management Project



# 📚 Library Management System

A full-stack library management system built with:

- 🔵 React + Vite + TypeScript (Frontend)
- 🟢 Node.js + Express + MongoDB + Mongoose (Backend)
- 🔐 JWT-based Authentication for staff
- 🎨 Tailwind CSS for styling

---

## ✨ Features

### 👩‍💼 Staff Authentication
- Login with username and password
- JWT Token-based secure access

### 📖 Reader Management
- Add / Edit / Delete readers
- Search / Filter readers

### 📚 Book Management
- Add / Edit / Delete books
- View book list

### 🔁 Lending System
- Issue (lend) books to readers
- Return books
- View lending history
- View overdue books

---

## ⚙️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React + Vite + TS | Node.js + Express |
| Axios | MongoDB + Mongoose |
| Tailwind CSS | JWT Authentication |

---

## 📁 Folder Structure

GDSE69_ITS1114_KalinduAkalanka/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── src/index.ts
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── services/
│ └── vite.config.ts

yaml
Copy
Edit

---

## 🚀 Getting Started

### 🔧 Backend Setup

```bash
cd backend
npm install
npx ts-node-dev src/index.ts
Create .env file:

env
Copy
Edit
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
🌐 Frontend Setup
bash
Copy
Edit
cd frontend/vite-project
npm install
npm run dev
🔐 Default Credentials (for testing)
Username	Password
admin	admin123

📝 Author
👨‍💻 Kalindu Akalanka (GDSE69 - IJSE)

📄 License
MIT License

yaml
Copy
Edit

---

### 🔄 Instructions

- Save this content as `README.md` file in your project root.
- Push your project to GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/your-username/library-system.git
  git push -u origin main
