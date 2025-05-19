# TaskTracker Application

A full-stack task management application that allows users to create projects, add tasks, track progress, and manage their workflow efficiently.

## Features

- **User Authentication**: Signup, login, email verification, password reset
- **Project Management**: Create and manage multiple projects
- **Task Tracking**: Create, update, and delete tasks within projects
- **Status Updates**: Track task progress (To-Do, In Progress, Completed)
- **Dashboard View**: Visual overview of all your projects and tasks

## Tech Stack

### Frontend

- React.js
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js and Express
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email services

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the backend directory

   ```sh
   cd backend
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   PORT=4000
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OTP_EXPIRY=10
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=465
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the backend server
   ```sh
   npm run dev
   ```

### Frontend Setup

1. From the project root, install dependencies

   ```sh
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:

   ```
   REACT_APP_BASE_URL=http://localhost:4000
   REACT_APP_COOKIE_NAME=TaskTracker
   ```

3. Start the frontend development server
   ```sh
   npm start
   ```

## Running the Application

You can run both the frontend and backend concurrently using:

```sh
npm run dev
```

This will start:

- Frontend server at http://localhost:3000
- Backend server at http://localhost:4000

## API Routes

### Authentication

- `POST /auth/sendotp` - Send verification OTP
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login
- `POST /auth/reset-password-token` - Request password reset
- `POST /auth/reset-password` - Reset password

### Projects

- `POST /projects/create` - Create a new project
- `GET /projects` - Get all user projects
- `PUT /projects/:projectId` - Update a project
- `DELETE /projects/:projectId` - Delete a project

### Tasks

- `POST /tasks/create` - Create a new task
- `GET /tasks/project/:projectId` - Get all tasks for a project
- `PUT /tasks/:taskId` - Update a task
- `DELETE /tasks/:taskId` - Delete a task

## Screenshots

(Add screenshots of your application here)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
