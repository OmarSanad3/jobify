# Jobify

A full-stack job application tracking system built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication and authorization
- Job posting and management
- Job search and filtering
- Dashboard with job statistics
- Profile management
- Responsive design with light/dark theme support
- Admin interface
- File upload support

## Tech Stack

### Frontend
- React
- Vite
- CSS with custom styling
- Styled Components
- Axios for API requests
- Context API for state management
- React Router for navigation
- Modern responsive design

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Multer for file uploads
- Express Validator for input validation

## Project Structure

```
├── client/          # Frontend React application
│   ├── src/
│   │   ├── assets/      # Static assets
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   └── utils/      # Utility functions
│   
└── server/          # Backend Node.js application
    ├── controllers/    # Route controllers
    ├── models/        # Database models
    ├── routes/        # API routes
    ├── middlewares/   # Custom middlewares
    └── utils/         # Utility functions
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jobify.git
cd jobify
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
NODE_ENV=development
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Running the Application

1. Start the backend server:

```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`
