import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import QuizHome from "./pages/QuizHome.tsx";
import Quiz from "./pages/Quiz.tsx";
import Profile from "@/pages/Profile.tsx";
import CreateQuiz from "@/pages/CreateQuiz.tsx";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" element={
              <ProtectedRoute>
                  <QuizHome />
              </ProtectedRoute>
              } />
            <Route path="/quiz/:id" element={
                <ProtectedRoute>
                    <Quiz />
                </ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />
            <Route path="/create-quiz" element={
                <ProtectedRoute>
                    <CreateQuiz />
                </ProtectedRoute>
            } />
            <Route path="/profile/:username" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />
        </Routes>
      </Router>
  )
}

export default App
