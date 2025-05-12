# DnD Character manager - Backend

This is the backend for the DnD Character Manager, a web application that helps players create and manage their Dungeons & Dragons characters digitally. The backend handles authentication, character data storage, and API endpoints for user interactions.

Features:
- User registration and login with JWT authentication  
- Create, update, and manage DnD characters  
- Secure storage of user and character data in MongoDB  
- RESTful API for frontend communication  

For the backend to work and connect with the frontend and database, an .env file needs to be created in the root directory with the following properties:
- "PORT", decides which port the backend will be accessed through, ex. 3000
- "CORS_ORIGIN", the URL of which the frontend is hosted on
- "MONGO_URI", a connection string to a MongoDB database. The database should have two collections named "users" and "characters"
- "JWT_SECRET", a JWT secret
- "JWT_REFRESH_SECRET", another JWT secret
