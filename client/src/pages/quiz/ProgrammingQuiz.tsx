import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface Question {
    id: number
    question: string
    options: string[]
    correctAnswer: string
}

const programmingQuestions: Question[] = [
    {
        id: 1,
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Multi Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        id: 2,
        question: "Which of the following is not a programming language?",
        options: ["Java", "Python", "HTML", "C++"],
        correctAnswer: "HTML"
    },
    {
        id: 3,
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        id: 4,
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "/* */", "#", "<!-- -->"],
        correctAnswer: "//"
    },
    {
        id: 5,
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["variable x;", "var x;", "v x;", "x = var;"],
        correctAnswer: "var x;"
    }
]

const ProgrammingQuiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [userName, setUserName] = useState("User")

    useEffect(() => {
        const storedName = localStorage.getItem('username')
        if (storedName) {
            setUserName(storedName)
        }
    }, [])

    const handleAnswerClick = (selectedAnswer: string) => {
        if (selectedAnswer === programmingQuestions[currentQuestion].correctAnswer) {
            setScore(score + 1)
        }

        const nextQuestion = currentQuestion + 1
        if (nextQuestion < programmingQuestions.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setShowScore(true)
        }
    }

    const restartQuiz = () => {
        setCurrentQuestion(0)
        setScore(0)
        setShowScore(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Programming Quiz</CardTitle>
                    <CardDescription className="text-center text-white/80">Test your programming knowledge, {userName}!</CardDescription>
                </CardHeader>
                <CardContent>
                    {showScore ? (
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
                            <p className="text-xl mb-4">You scored {score} out of {programmingQuestions.length}</p>
                            <Button onClick={restartQuiz} className="bg-purple-500 hover:bg-purple-600">
                                Restart Quiz
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <p>Question {currentQuestion + 1} of {programmingQuestions.length}</p>
                                    <p>{score}/{programmingQuestions.length} ({Math.round((score / programmingQuestions.length) * 100)}%)</p>
                                </div>
                                <Progress value={(currentQuestion / programmingQuestions.length) * 100} className="h-2" />
                            </div>
                            <h2 className="text-xl font-semibold mb-4">{programmingQuestions[currentQuestion].question}</h2>
                            <div className="space-y-3">
                                {programmingQuestions[currentQuestion].options.map((option, index) => (
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
        </div>
    )
}

export default ProgrammingQuiz

