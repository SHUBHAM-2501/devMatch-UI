# DevMatch - A Developer Networking Platform

DevMatch is a social networking platform designed specifically for developers to connect with like-minded individuals, build professional relationships, and potentially find collaboration partners. The application implements a Tinder-like interface for developers to match based on skills, interests, and experience.

## Project Overview

DevMatch consists of two main components:
- **Frontend**: React-based UI built with Vite
- **Backend**: Node.js/Express server with MongoDB database

## Key Features

- **User Authentication**: Secure signup/login system with JWT-based authentication
- **Developer Profiles**: Customizable profiles with skills, photo, bio, and personal information
- **Connection System**: Swipe-like interface to express interest or skip potential connections
- **Request Management**: Accept or reject connection requests from other developers
- **Real-time Chat**: Direct messaging with connections using Socket.io
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Technology Stack

### Frontend
- React 19 with hooks
- Redux Toolkit for state management
- React Router for navigation
- Socket.io client for real-time communication
- Tailwind CSS with DaisyUI for styling
- Vite for fast development and optimized builds

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Socket.io for real-time chat functionality
- Bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance

### Frontend Setup
1. Clone the repository
2. Navigate to `devMatch-UI` directory
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`

### Backend Setup
1. Navigate to `DevTinder_Node` directory
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   ```
   DATABASE_STRING=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server: `node src/app.js`

## Project Structure

### Frontend
- `src/components`: UI components
- `src/utils`: Helper functions and Redux slices
- `src/App.jsx`: Main application component with routing

### Backend
- `src/models`: MongoDB schema definitions
- `src/routes`: API endpoint handlers
- `src/middleware`: Authentication middleware
- `src/utils`: Helper functions for validation and Socket.io

