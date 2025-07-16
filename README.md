# 📚 Library Management System API

A RESTful API built with **Express**, **TypeScript**, and **MongoDB (Mongoose)** to manage a library's books and borrowing records.

---

## 🚀 Features

✅ Create, Read, Update, Delete books  
✅ Filter and sort books by genre, date  
✅ Borrow books with stock availability control  
✅ Aggregated summary of borrowed books (MongoDB aggregation)  
✅ Static method for availability check  
✅ Mongoose pre/post middleware (logging, cleanup)  
✅ Generic error responses matching spec

---

## 🛠️ Tech Stack

- Node.js
- Express
- TypeScript
- Mongoose
- MongoDB

---

## ⚡ Setup Instructions

1️⃣ Clone the repository:

```bash
git clone <your-repo-link>
cd <your-repo-folder>
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Create a `.env` file:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4️⃣ Start the server:

```bash
npm run dev
```

---

## 📌 API Endpoints

### 📘 Books

✅ `POST /api/books` – Create a new book  
✅ `GET /api/books` – List books (with filter, sort, limit)  
✅ `GET /api/books/:id` – Get a book by ID  
✅ `PUT /api/books/:id` – Update book details  
✅ `DELETE /api/books/:id` – Delete a book (also cleans up related borrow records)

---

### 📖 Borrow

✅ `POST /api/borrow` – Borrow a book (checks stock, updates availability)  
✅ `GET /api/borrow` – Aggregated borrow summary (total quantity per book with title and ISBN)

---

## 🗂️ Static Method

Used to enforce borrowing rules:

```ts
Book.borrowBookAvailability(bookId, quantity)
```
- Checks available copies
- Deducts quantity
- Marks unavailable if stock reaches 0

---

## 🔄 Mongoose Middleware

- **pre('save')** – Logs before saving a book  
- **post('save')** – Logs after saving a borrow record  
- **post('findOneAndDelete')** – Cleans up related borrow records after a book is deleted

---

## ⚠️ Error Response Format

Matches the required generic error structure:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```