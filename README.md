# Bookstore Management System

A simple bookstore management application built with React for the frontend and Express/MongoDB for the backend.

## Project Overview

This project supports two main user roles:

- **User**
  - Register/login via a simple user portal
  - Browse available books
  - Request book issues
  - Submit feedback

- **Admin**
  - Login via admin portal
  - Add and manage books
  - View students/users
  - Review issue requests and approve issued books
  - View issued books and user feedback

## Tech Stack

- Frontend: React, React Router, Bootstrap, React Bootstrap, React Icons, AOS
- Backend: Node.js, Express, MongoDB, Mongoose, CORS, body-parser
- Database: MongoDB (local)

## Folder Structure

- `Backend/` - Express server and MongoDB models
- `frontend/` - React application
- `frontend/src/components/` - UI components for users and admin

## Prerequisites

- Node.js and npm
- MongoDB running locally on `mongodb://127.0.0.1:27017`

## Setup and Run

### 1. Start MongoDB

Make sure MongoDB is running locally.

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Run the backend server

```bash
cd ../Backend
npm run dev
```

The backend server runs on `http://localhost:8080`.

### 5. Run the frontend app

```bash
cd ../frontend
npm start
```

The React app runs on `http://localhost:3000`.

## Available Scripts

### Backend

- `npm start` - Start the backend server with Node
- `npm run dev` - Start the backend server with nodemon

### Frontend

- `npm start` - Run the React development server
- `npm build` - Build the React app for production
- `npm test` - Launch the test runner

## Key API Endpoints

- `GET /` - Backend health check
- `POST /user` - Save user details
- `POST /admin` - Save admin login attempts
- `POST /addbook` - Add new books
- `GET /allbooks` - Get all books
- `DELETE /allbookdelete` - Delete a single book
- `DELETE /allbooksdelete` - Delete all books
- `GET /allstudents` - Get all registered users
- `POST /issue` - Issue a book to a student
- `GET /issuedbooks` - Get issued books
- `DELETE /issuebooksdelete` - Delete an issued book record
- `POST /requestIssue` - Submit an issue request
- `GET /requests` - Get pending issue requests
- `POST /approveRequest/:id` - Approve a request and create an issued book
- `GET /search` - Search books by name
- `PUT /update/:id` - Update book details
- `POST /feedback` - Submit feedback
- `GET /getfeedback` - Get all feedback

## Notes

- The admin password is currently validated in the frontend and expected as `admin123`.
- The backend stores data in `bookstore` database on the local MongoDB instance.
- This project is a good starting point for adding authentication, data validation, and production deployment.

## Future Improvements

- Add secure authentication for admin and users
- Improve issue request workflow and book availability tracking
- Add client-side and server-side validation
- Add pagination and search filters
- Deploy backend and frontend to production environments
