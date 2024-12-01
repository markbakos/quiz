import React, {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button"
import {Link} from "react-router-dom"
import axios from "axios";

interface Quiz {
    _id: string
    title: string
    description: string
}

const QuizHome: React.FC = ()=> {
    const [userName, setUserName] = useState<string>("User")
    const [quizzes, setQuizzes] = useState<Quiz[]>([])

    useEffect(() => {
        const storedUserName = localStorage.getItem('username')
        if (storedUserName) {
            setUserName(storedUserName)
        }

        const fetchQuizzes = async () => {
            try {
                const response  = await axios.get('http://localhost:5000/api/quizzes')
                setQuizzes(response.data)
            }
            catch (e) {
                console.error('Error fetching quizzes', e)
            }
        }

        fetchQuizzes()
    }, [])



    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 text-white">
            <header className="py-6 px-4 md:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-center">Welcome, {userName}!</h1>
            </header>
            <main className="container mx-auto px-4 md:px-8 py-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Choose a Quiz Category</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {quizzes.map((quiz) => (
                        <Card key={quiz._id} className="bg-white/10 backdrop-blur-md border-none">
                            <CardHeader>
                                <CardTitle className="text-xl md:text-2xl font-semibold text-center">{quiz.title}</CardTitle>
                                <CardDescription className="text-gray-800 text-center">{quiz.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link to={`/quiz/${quiz._id}`}>
                                    <Button className="w-full bg-purple-500 hover:bg-purple-600">
                                        Start Quiz
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default QuizHome