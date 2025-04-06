# 🗂️ Prep-BE — File Review Backend

A full-stack-ready backend system for a collaborative file review application. Built with **Node.js**, **Express**, **MongoDB**, and **Multer**, this service supports file uploads, status updates, commenting, and user associations — everything you'd expect in a real-world approval workflow.

## 🚀 Features

- ✅ Upload files (image, PDF, etc.)
- ✅ Track file metadata and status (`pending`, `approved`, `needs_changes`)
- ✅ Add and fetch user comments on files
- ✅ RESTful API with user, file, and comment routes
- ✅ File uploads saved to disk and served statically
- ✅ Clean error handling and input validation

## 🏗️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **File Handling:** Multer
- **Dev Tools:** Nodemon, dotenv
- **Architecture:** MVC-style folder structure

## 📁 Folder Structure

```
src/
├── config/           # MongoDB connection logic
├── controllers/      # API request logic
├── middleware/       # Multer upload config
├── models/           # Mongoose schemas
├── routes/           # Route handlers
├── uploads/          # File uploads (gitignored)
└── server.js         # Entry point
```

## 📦 Installation

```bash
git clone https://github.com/MehrShahbaz/Prep-BE.git
cd Prep-BE
npm install
```

> Make sure to create a `.env` file with:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## ▶️ Running the Server

```bash
npm run dev
```

Your backend will be running at:
```
http://localhost:5000
```

## 📤 File Upload Endpoint

**POST** `/api/files/upload`  
**Body (form-data):**
- `file` (type: file)
- `userId` (type: text)

Returns uploaded file metadata with file path:
```
{
  "_id": "...",
  "originalName": "image.png",
  "name": "image-1712.png",
  "path": "/uploads/image-1712.png",
  "status": "pending"
}
```

## 📂 View Uploaded Files

Access via:
```
http://localhost:5000/uploads/<filename>
```

## 🧪 API Endpoints Summary

### Users
- `POST /api/users` — create user
- `GET /api/users` — list users
- `DELETE /api/users/:id` — delete user

### Files
- `POST /api/files/upload` — upload file
- `GET /api/files` — list all files (optional: `?userId=...`)
- `PATCH /api/files/:id/status` — update file status

### Comments
- `POST /api/comments` — add comment
- `GET /api/comments?userId=...&fileId=...` — get comments

## 🧹 To-Do

- [ ] JWT Authentication
- [ ] Rate limiting & validation with Zod or Joi
- [ ] Dockerize app
- [ ] Write tests (Jest + Supertest)

## 🙌 Author

**Mehr Shahbaz**  
[GitHub: @MehrShahbaz](https://github.com/MehrShahbaz)

## 📄 License

MIT License