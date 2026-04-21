# Full Stack User Management System

A full-stack web application that supports user authentication and role-based access (User / Admin), built with Spring Boot and React.

Deployed on:
- Frontend: Vercel
- Backend: Render


## Live Demo

Frontend : https://full-stack-user-system.vercel.app/
Backend : https://full-stack-user-system.onrender.com


## Features

- User registration and login
- JWT-based authentication
- Role-based access control (User / Admin)
- Admin can:
  - View all users
  - Update user details
  - Delete users
- Protected routes using JWT
- Responsive UI with React


## Tech Stack

### Frontend
- React (Vite)
- Axios
- Tailwind CSS

### Backend
- Spring Boot
- Spring Security
- JWT (Authentication)
- H2 Database (in-memory)

### Deployment
- Frontend: Vercel
- Backend: Render



## Key Learnings

- Implemented JWT authentication and authorization with Spring Security
- Managed protected routes and role-based access control
- Handled CORS issues between frontend (Vercel) and backend (Render)
- Deployed full-stack application across different platforms
- Debugged real-world issues like:
  - CORS errors
  - JWT secret strength
  - Environment variable handling
 




## Notes

- Uses H2 in-memory database, data resets on restart
- Intended for learning and demonstration purposes
