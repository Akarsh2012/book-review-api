# 📚 Book Review API

A simple RESTful API built using **Node.js**, **Express.js**, **TypeScript**, and **MongoDB** to manage book reviews.

---

## 🔧 Features

- ✅ **CRUD operations** for book reviews
- 🔐 **API key authentication** for protected routes
- 📊 **Aggregation query** to fetch average rating per book
- 🔄 **Controller-service pattern** for clean architecture
- ⚠️ **Error handling** and validation

---

## 📁 Project Structure

```
src/
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
├── index.ts
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```
PORT=5000
MONGO_URI=your-mongo-uri
API_KEY=my-secret-api-key
```

### 4. Run the app in dev mode

```bash
npm run dev
```

---

## 🛠️ API Endpoints

### 🔓 Public Endpoints:

- `POST /api/v1/reviews` → Add new review
- `GET /api/v1/reviews` → Get all reviews
- `GET /api/v1/reviews/:id` → Get review by ID

### 🔐 Protected (Requires `API_KEY` header):

- `PUT /api/v1/reviews/:id` → Update review
- `DELETE /api/v1/reviews/:id` → Delete review
- `GET /api/v1/reviews/stats/average` → Get average rating per book

> Pass the header: `Authorization: my-secret-api-key`

---

## 🧪 Testing

Use **Postman** :

- Create reviews with JSON body

```json
{
  "name": "Akarsh Singh",
  "bookTitle": "Atomic Habits",
  "reviewText": "Amazing book on building habits!",
  "rating": 5
}
```

- Hit protected endpoints with API key in headers.

---

## 🛡️ Authentication

Implemented simple **API Key based authentication** middleware to secure sensitive routes.

---

## 📊 Aggregation

`GET /api/v1/reviews/average` → returns average ratings per book title from all available reviews.

---

## 📌 Assignment Notes

- 🔀 Used **two branches** with **2 PRs** (`auth-feature`, `aggregation-feature`)
- ✅ Implemented clean code structure and proper Git flow

---

## 🧑‍💻 Author

**Akarsh Singh**

GitHub: [github.com/Akarsh2012](https://github.com/Akarsh2012)

---

## 📄 License

This project is licensed under the MIT License.

