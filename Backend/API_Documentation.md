# MovieHUB API Documentation

## Overview
This document provides a comprehensive list of all working APIs in the MovieHUB backend application.

---

## 📋 Table of Contents
- [Authentication APIs](#authentication-apis)
- [Favorites APIs](#favorites-apis)
- [History APIs](#history-apis)
- [Base URL](#base-url)

---

## Base URL
```
http://localhost:5000/api
```

---

## Authentication APIs

### 1. User Sign Up
- **Route:** `POST /api/auth/signup`
- **Access:** Public
- **Description:** Register a new user with email and password
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response (Success - 200):**
  ```json
  {
    "_id": "user_id",
    "name": "string",
    "email": "string",
    "token": "jwt_token"
  }
  ```
- **Response (Error - 400):**
  ```json
  {
    "message": "User already exists"
  }
  ```
- **Features:**
  - Checks if user already exists
  - Hashes password using bcryptjs
  - Generates JWT token for authentication

---

### 2. User Login
- **Route:** `POST /api/auth/login`
- **Access:** Public
- **Description:** Authenticate user and receive JWT token
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response (Success - 200):**
  ```json
  {
    "_id": "user_id",
    "name": "string",
    "email": "string",
    "token": "jwt_token"
  }
  ```
- **Response (Error - 400):**
  ```json
  {
    "message": "Invalid credentials"
  }
  ```
- **Features:**
  - Validates user credentials
  - Returns JWT token for subsequent API requests

---

## 🎬 Favorites APIs

### 1. Add Movie to Favorites
- **Route:** `POST /api/favorites`
- **Access:** Private (requires authentication token)
- **Authentication:** Bearer token required in header
- **Description:** Add a movie to the user's favorite list
- **Request Body:**
  ```json
  {
    "movieId": "string",
    "title": "string",
    "poster": "string (image URL)"
  }
  ```
- **Response (Success - 200):**
  ```json
  {
    "_id": "favorite_id",
    "user": "user_id",
    "movieId": "string",
    "title": "string",
    "poster": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

---

### 2. Get User's Favorites
- **Route:** `GET /api/favorites`
- **Access:** Private (requires authentication token)
- **Authentication:** Bearer token required in header
- **Description:** Retrieve all movies in the user's favorite list
- **Request Body:** None
- **Response (Success - 200):**
  ```json
  [
    {
      "_id": "favorite_id",
      "user": "user_id",
      "movieId": "string",
      "title": "string",
      "poster": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    ...
  ]
  ```

---

### 3. Remove Movie from Favorites
- **Route:** `DELETE /api/favorites/:id`
- **Access:** Private (requires authentication token)
- **Authentication:** Bearer token required in header
- **Description:** Delete a specific movie from the user's favorites
- **URL Parameters:**
  - `id` (string): The ID of the favorite entry to delete
- **Request Body:** None
- **Response (Success - 200):**
  ```json
  {
    "message": "Removed from favorites"
  }
  ```

---

## 📜 History APIs

### 1. Add Movie to History
- **Route:** `POST /api/history`
- **Access:** Private (requires authentication token)
- **Authentication:** Bearer token required in header
- **Description:** Add a movie to the user's watch history
- **Request Body:**
  ```json
  {
    "movieId": "string",
    "title": "string",
    "poster": "string (image URL)"
  }
  ```
- **Response (Success - 200):**
  ```json
  {
    "_id": "history_id",
    "user": "user_id",
    "movieId": "string",
    "title": "string",
    "poster": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

---

### 2. Get User's History
- **Route:** `GET /api/history`
- **Access:** Private (requires authentication token)
- **Authentication:** Bearer token required in header
- **Description:** Retrieve the user's watch history (sorted by most recent first)
- **Request Body:** None
- **Response (Success - 200):**
  ```json
  [
    {
      "_id": "history_id",
      "user": "user_id",
      "movieId": "string",
      "title": "string",
      "poster": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    ...
  ]
  ```
- **Features:**
  - Returns history sorted by most recent first (createdAt: -1)

---

## 🔐 Authentication

### How to Use Protected APIs (Private Routes)

All private routes require a JWT token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

**Example using cURL:**
```bash
curl -X GET http://localhost:5000/api/favorites \
  -H "Authorization: Bearer your_jwt_token_here" \
  -H "Content-Type: application/json"
```

**Example using JavaScript/Axios:**
```javascript
const token = "your_jwt_token_here";
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

axios.get("http://localhost:5000/api/favorites", config)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

## 📊 Summary Table

| API | Method | Route | Access | Purpose |
|-----|--------|-------|--------|---------|
| Sign Up | POST | `/api/auth/signup` | Public | Register new user |
| Login | POST | `/api/auth/login` | Public | Authenticate user |
| Add Favorite | POST | `/api/favorites` | Private | Add movie to favorites |
| Get Favorites | GET | `/api/favorites` | Private | Retrieve all favorites |
| Remove Favorite | DELETE | `/api/favorites/:id` | Private | Remove from favorites |
| Add History | POST | `/api/history` | Private | Add to watch history |
| Get History | GET | `/api/history` | Private | Retrieve watch history |

---

## ⚙️ Middleware

### Authentication Middleware (`protect`)
- **Usage:** Applied to all private routes
- **Function:** Validates JWT token from request header
- **Location:** `src/middleware/Auth.middleware.js`

### Error Handling Middleware
- **Location:** `src/middleware/Error.middleware.js`
- **Purpose:** Centralized error handling for all API responses

---

## 📝 Notes

- **JWT Token Generation:** Tokens are generated using the `GenerateToken` utility in `src/utils/GenerateToken.js`
- **Password Security:** Passwords are hashed using bcryptjs with 10 salt rounds
- **Database:** All data is stored in MongoDB
- **CORS:** Enabled for frontend-backend communication
- **Request Format:** All requests use JSON format with `Content-Type: application/json`

---

## ✅ API Status: All Working & Tested

Last Updated: March 9, 2026
