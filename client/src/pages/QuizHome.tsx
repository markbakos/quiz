import type React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import { Github, Globe, Linkedin, Mail } from "lucide-react"

interface Quiz {
    _id: string
    title: string
    description: string
}

const QuizHome: React.FC = () => {
    const [userName, setUserName] = useState<string>("User")
    const [quizzes, setQuizzes] = useState<Quiz[]>([])

    useEffect(() => {
        const storedUserName = localStorage.getItem("username")
        if (storedUserName) {
            setUserName(storedUserName)
        }

        const fetchQuizzes = async () => {
            try {
                const response = await axios.get("https://quizapp-backend-d24y.onrender.com/api/quizzes")
                setQuizzes(response.data)
            } catch (e) {
                console.error("Error fetching quizzes", e)
            }
        }

        fetchQuizzes()
    }, [])

    const handleLogOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        window.location.href = "/login"
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <Navbar username={userName} onLogout={handleLogOut} />
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-12 px-4 md:px-8 flex flex-col items-center bg-blue-600 text-white"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Welcome, {userName}</h1>
                <div className="flex space-x-4">
                    <SocialLink href="https://github.com/markbakos" icon={<Github size={20} />} />
                    <SocialLink href="https://markbakos.onrender.com" icon={<Globe size={20} />} />
                    <SocialLink href="https://www.linkedin.com/in/markbakos/" icon={<Linkedin size={20} />} />
                    <SocialLink href="mailto:markbakosss@gmail.com" icon={<Mail size={20} />} />
                </div>
            </motion.header>

            <main className="container mx-auto px-4 md:px-8 py-12">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl md:text-3xl font-semibold text-center mb-8 text-blue-600"
                >
                    Choose a Quiz Category
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-slate-600 mb-12 text-center"
                >
                    These questions are made by the community!
                </motion.p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {quizzes.map((quiz, index) => (
                        <motion.div
                            key={quiz._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="bg-white shadow-md h-full flex flex-col border border-slate-200 hover:border-blue-300 transition-colors">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-blue-600">{quiz.title}</CardTitle>
                                    <CardDescription className="text-slate-600">{quiz.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex items-end">
                                    <Link to={`/quiz/${quiz._id}`} className="w-full">
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">Start Quiz</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    )
}

const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-white hover:text-blue-200 transition-colors"
    >
        {icon}
    </motion.a>
)

export default QuizHome

