import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Leaderboard from "@/pages/Leaderboard.tsx";

interface Question {
    question: string
    options: string[]
    correctAnswer: string
}

interface QuizData {
    _id: string
    title: string
    description: string
    questions: Question[]
}


const Quiz: React.FC = () => {
    const [quizData, setQuizData] = useState<QuizData | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [showScore, setShowScore] = useState<boolean>(false)
    const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>("User")
    const { id } = useParams<{id : string}>()
    const navigate = useNavigate()


    useEffect(() => {
        const storedName = localStorage.getItem('username')
        if (storedName) {
            setUserName(storedName)
        }

        const fetchQuiz = async () => {
            try{
                const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`)
                setQuizData(response.data)
            } catch (e) {
                console.error('Error fetching quiz', e)
            }
        }

        fetchQuiz()
    }, [id])

    const handleAnswerClick = async (selectedAnswer: string) => {
        let newScore = score
        if (quizData && selectedAnswer === quizData.questions[currentQuestion].correctAnswer) {
            newScore = score + 1
            setScore(newScore)
        }

        const nextQuestion = currentQuestion + 1
        if (quizData && nextQuestion < quizData.questions.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setShowScore(true)
            await saveScore(newScore)
        }
    }

    const saveScore = async (finalScore: number) => {
        if(quizData) {
            try {
                await axios.post('http://localhost:5000/api/scores', {
                    username: userName,
                    quizID: quizData._id,
                    score: finalScore,
                    quizType: quizData.title
                })
            }
            catch (e) {
                console.error('Error saving score', e)
            }
        }
    }

    const restartQuiz = () => {
        setCurrentQuestion(0)
        setScore(0)
        setShowScore(false)
    }

    const toggleLeaderboard = () => {
        setShowLeaderboard(!showLeaderboard)
    }

    if(!quizData) {
        return <div>Loading...</div>
    }

    const goToHome = () => {
        navigate('/quiz')
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 flex flex-col items-center justify-center p-4">
            {showLeaderboard ? (
                <Leaderboard quizID={quizData._id} quizTitle={quizData.title}/>
            ) : (
                <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">{quizData.title}</CardTitle>
                        <CardDescription className="text-center text-white/80">{quizData.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {showScore ? (
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
                                <p className="text-xl mb-4">You scored {score} out of {quizData.questions.length}</p>
                                <div className="space-y-4">
                                    <Button onClick={restartQuiz} className="bg-purple-500 hover:bg-purple-600 w-full">
                                        Restart Quiz
                                    </Button>
                                    <Button onClick={toggleLeaderboard}
                                            className="bg-indigo-500 hover:bg-indigo-600 w-full">
                                        View Leaderboard
                                    </Button>
                                    <Button onClick={goToHome} className="bg-green-500 hover:bg-green-600 w-full">
                                        Go to Home
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
                                        <span>{score}/{quizData.questions.length} ({Math.round((score / quizData.questions.length) * 100)}%)</span>
                                    </div>
                                    <Progress value={(currentQuestion / quizData.questions.length) * 100}
                                              className="h-2"/>
                                </div>
                                <h2 className="text-xl font-semibold mb-4">{quizData.questions[currentQuestion].question}</h2>
                                <div className="space-y-3">
                                    {quizData.questions[currentQuestion].options.map((option, index) => (
                                        <Button
                                            key={index}
                                            onClick={() => handleAnswerClick(option)}
                                            className="w-full text-left justify-start bg-white/20 hover:bg-white/30"
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default Quiz

