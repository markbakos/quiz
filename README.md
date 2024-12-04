# Interactive Quiz Application

## 🚀 Overview

The Interactive Quiz Application is a full-stack web application that allows users to create, take, and share quizzes on various topics. Built with the MERN stack, this application offers a seamless and engaging quiz experience with features 
like real-time leaderboards, user profiles, and custom quiz creation.

🔗 [Live Demo](https://quizapp-dhav.onrender.com/quiz)
## ✨ Features

- **User Authentication**: Secure sign-up and login functionality using JWT.
- **Custom Quiz Creation**: Users can create their own quizzes with multiple-choice questions.
- **Interactive Quiz Taking**: Smooth and responsive quiz interface with immediate feedback.
- **Real-time Leaderboards**: Track top scores and compete with other users.
- **User Profiles**: Personalized profiles showcasing quiz history and achievements.
- **Responsive Design**: Seamless experience across desktop and mobile devices.

## 🛠️ Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Render

## 🏗️ Architecture

The application follows a client-server architecture:

- The frontend is built with React, offering a dynamic and responsive user interface.
- The backend, powered by Node.js and Express, handles data processing, authentication, and database operations.
- MongoDB serves as the database, storing user information, quiz data, and scores.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repositories:
```
https://github.com/markbakos/quiz_app.git
```

2. Install dependencies for both frontend and backend:
```
cd client  
npm install  
cd ../server  
npm install
```

3. Set up the environment variables for the backend:<br>
<br>Create a .env file in the backend directory.<br>
Add the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000 
```

4. Start the application:<br> Backend:
```
  cd server
  node app.js
```
Frontend:
```
  cd client
  npm run dev
```

### Run the Application

Ensure both the backend and frontend servers are running. <br>
Open your browser and visit localhost with the port vite gives you, for example: http://localhost:3000 to interact with the application.

## 📚 Usage
**Sign up/Login**: Create an account or log in using existing credentials.<br>
**Create Quizzes**: Use the custom quiz creation tool to design your quizzes.<br>
**Take Quizzes**: Explore and attempt quizzes created by others.<br>
**Track Progress**: View your achievements and quiz history on your profile.<br>

## 🤝 Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (git checkout -b feature-name).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-name).
5. Open a pull request.

## 📧 Contact
For any inquiries, feel free to reach out:

Email: [markbakosss@gmail.com](mailto:markbakosss@gmail.com) <br>
GitHub: [markbakos](https://github.com/markbakos)
