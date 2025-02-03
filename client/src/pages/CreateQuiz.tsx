import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2, Copy, Import } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import axios from "axios"
import Navbar from "@/components/Navbar"

interface Question {
    question: string
    options: string[]
    correctAnswer: string
}

const CreateQuiz: React.FC = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [questions, setQuestions] = useState<Question[]>([
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ])

    const [bulkImportText, setBulkImportText] = useState("")

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
            setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }])
        }
    }

    const removeQuestion = (index: number) => {
        if (questions.length > 3) {
            const updatedQuestions = questions.filter((_, i) => i !== index)
            setQuestions(updatedQuestions)
        }
    }

    const duplicateQuestion = (index: number) => {
        if (questions.length < 50) {
            const questionToDuplicate = questions[index]
            setQuestions([...questions, { ...questionToDuplicate }])
        }
    }

    const handleBulkImport = () => {
        const parsedQuestions = parseBulkImportText(bulkImportText)
        if (parsedQuestions.length > 0 && questions.length + parsedQuestions.length <= 50) {
            setQuestions([...questions, ...parsedQuestions])
            setBulkImportText("")
        }
    }

    const parseBulkImportText = (text: string): Question[] => {
        const lines = text.split('\n').filter(line => line.trim() !== '')
        const parsedQuestions: Question[] = []

        lines.forEach(line => {
            const parts = line.split(',').map(part => part.trim())
            if (parts.length === 6) {
                parsedQuestions.push({
                    question: parts[0],
                    options: parts.slice(1, 5),
                    correctAnswer: parts[5]
                })
            }
        })

        return parsedQuestions
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post("https://quizapp-backend-d24y.onrender.com/api/quizzes", {
                title,
                description,
                questions,
            })
            navigate("/quiz")
        } catch (e) {
            console.error("Error creating quiz", e)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar username="User" onLogout={() => {}} />
            <div className="container mx-auto py-8 px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="max-w-4xl mx-auto bg-white shadow-lg">
                        <CardHeader className="bg-blue-600 text-white rounded-t-lg flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl font-bold">Create a New Quiz</CardTitle>
                            <div className="flex space-x-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="text-white border-white bg-blue-600 hover:bg-blue-700 hover:text-white">
                                            <Import className="mr-2 h-4 w-4" /> Bulk Import
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Bulk Import Questions</DialogTitle>
                                        </DialogHeader>
                                        <Textarea
                                            placeholder="Paste questions in format: Question, Option1, Option2, Option3, Option4, CorrectAnswer"
                                            value={bulkImportText}
                                            onChange={(e) => setBulkImportText(e.target.value)}
                                            className="h-60"
                                        />
                                        <Button onClick={handleBulkImport} className="w-full">
                                            Import Questions
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            </div>
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
                                        className="bg-white border border-slate-200"
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
                                        className="bg-white border border-slate-200"
                                    />
                                </div>
                                <ScrollArea className="h-[60vh] pr-4">
                                    {questions.map((question, index) => (
                                        <Card key={index} className="mb-6 border border-slate-200">
                                            <CardContent className="space-y-4 pt-6">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-semibold text-slate-800">Question {index + 1}</h3>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => duplicateQuestion(index)}
                                                            title="Duplicate Question"
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                        {index >= 3 && (
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="icon"
                                                                onClick={() => removeQuestion(index)}
                                                                title="Remove Question"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                                <Input
                                                    placeholder="Enter your question"
                                                    value={question.question}
                                                    onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                                                    required
                                                    className="bg-white border border-slate-200"
                                                />
                                                <RadioGroup
                                                    value={question.correctAnswer}
                                                    onValueChange={(value) => handleQuestionChange(index, "correctAnswer", value)}
                                                >
                                                    {question.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                                                            <RadioGroupItem value={option} id={`q${index}-option${optionIndex}`} />
                                                            <Input
                                                                placeholder={`Option ${optionIndex + 1}`}
                                                                value={option}
                                                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                                                required
                                                                className="bg-white border border-slate-200 flex-grow"
                                                            />
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </ScrollArea>
                                <div className="flex space-x-4">
                                    {questions.length < 50 && (
                                        <Button
                                            type="button"
                                            onClick={addQuestion}
                                            className="flex-grow bg-green-600 hover:bg-green-700"
                                        >
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Add Question
                                        </Button>
                                    )}
                                    <Button
                                        type="submit"
                                        className="flex-grow bg-blue-600 hover:bg-blue-700"
                                    >
                                        Create Quiz
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

export default CreateQuiz