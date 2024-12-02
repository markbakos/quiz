import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2 } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"

interface Question {
    question: string
    options: string[]
    correctAnswer: string
}

const CreateQuiz: React.FC = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [questions, setQuestions] = useState<Question[]>([
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ])

    const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
        const updatedQuestions = [...questions]
        updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
        setQuestions(updatedQuestions)
    }

    const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
        const updatedQuestions = [...questions]
        updatedQuestions[questionIndex].options[optionIndex] = value
        setQuestions(updatedQuestions)
    }

    const addQuestion = () => {
        if (questions.length < 50) {
            setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }])
        }
    }

    const removeQuestion = (index: number) => {
        if (questions.length > 3) {
            const updatedQuestions = questions.filter((_, i) => i !== index)
            setQuestions(updatedQuestions)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            await axios.post('http://localhost:5000/api/quizzes', {
                title,
                description,
                questions
            })
            navigate('/quiz')
        }
        catch (e) {
            console.error('Error creating quiz', e)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 py-8 px-4">
            <Card className="max-w-4xl mx-auto bg-white shadow-xl">
                <CardHeader className="bg-purple-600 text-white">
                    <CardTitle className="text-2xl font-bold">Create a New Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Quiz Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter quiz title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="bg-gray-50 border border-gray-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Quiz Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter quiz description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="bg-gray-50 border border-gray-300"
                            />
                        </div>
                        <ScrollArea className="h-[60vh] pr-4">
                            {questions.map((question, index) => (
                                <Card key={index} className="mb-6 border border-gray-200">
                                    <CardContent className="space-y-4 pt-6">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                                            {index >= 3 && (
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => removeQuestion(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                        <Input
                                            placeholder="Enter your question"
                                            value={question.question}
                                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                            required
                                            className="bg-gray-50 border border-gray-300"
                                        />
                                        <RadioGroup
                                            value={question.correctAnswer}
                                            onValueChange={(value) => handleQuestionChange(index, 'correctAnswer', value)}
                                        >
                                            {question.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                                                    <RadioGroupItem value={option} id={`q${index}-option${optionIndex}`} />
                                                    <Input
                                                        placeholder={`Option ${optionIndex + 1}`}
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                                        required
                                                        className="bg-gray-50 border border-gray-300 flex-grow"
                                                    />
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </CardContent>
                                </Card>
                            ))}
                        </ScrollArea>
                        {questions.length < 50 && (
                            <Button type="button" onClick={addQuestion} className="w-full bg-green-500 hover:bg-green-600">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Question
                            </Button>
                        )}
                        <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">
                            Create Quiz
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateQuiz

