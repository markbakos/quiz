import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import QuizHome from "./pages/QuizHome.tsx";
import Quiz from "./pages/quiz/Quiz.tsx";

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
        </Routes>
      </Router>
  )
}

export default App
