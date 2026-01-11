URL Shortener Project

A simple and efficient URL Shortener web application built with React, Node.js, Express, and MongoDB. Users can shorten long URLs, manage their links, and access analytics.

Table of Contents


Features

Shorten long URLs into small, easy-to-share links.

Redirect users to the original URL when the short link is accessed.

User authentication and protected routes.

Track click analytics (optional: if implemented).

Responsive and user-friendly interface.

Tech Stack

Frontend: React, Redux, React Router, Axios

Backend: Node.js, Express

Database: MongoDB

Authentication: JWT

Other Tools: Vite, Tailwind CSS (if used)

Installation
Prerequisites

Node.js >= 18.x

npm or yarn

MongoDB running locally or a MongoDB Atlas account

Steps

Clone the repository

git clone <your-repo-url>
cd URL_Shortener_Project


Install dependencies for backend

cd Backend
npm install


Install dependencies for frontend

cd ../Frontend
npm install


Configure Environment Variables

Created an .env file for the Backend 

Backend .env:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret


Frontend .env:

VITE_API_URL=http://localhost:5000/api

Usage
Start Backend
cd Backend
npm run dev

Start Frontend
cd Frontend
npm run dev


Open your browser at http://localhost:5173
 (Vite default port).
