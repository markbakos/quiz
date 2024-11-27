import React, {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button"
import {Link} from "react-router-dom"

const quizCategories = [
    { id: 1, name: "Programming", description: "Test your knowledge of programming concepts.", path: "/quiz/programming" },
    { id: 2, name: "Mathematics", description: "Challenge yourself with questions on algebra, geometry, and calculus.", path: "/quiz/mathematics" },
    { id: 3, name: "Data Structures & Algorithms", description: "Test your knowledge of data structures and algorithms.", path: "/quiz/dsa" },
    { id: 4, name: "Tech Knowledge", description: "Test your computer/tech knowledge..", path: "/quiz/tech" },
];

const Quiz: React.FC = ()=> {
    const [userName, setUserName] = useState<string>("User")

    useEffect(() => {
        const storedUserName = localStorage.getItem('username');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 text-white">
            <header className="py-6 px-4 md:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-center">Welcome, {userName}!</h1>
            </header>
            <main className="container mx-auto px-4 md:px-8 py-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Choose a Quiz Category</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {quizCategories.map((category) => (
                        <Card key={category.id} className="bg-white/10 backdrop-blur-md border-none">
                            <CardHeader>
                                <CardTitle className="text-xl md:text-2xl font-semibold text-center">{category.name}</CardTitle>
                                <CardDescription className="text-gray-800 text-center">{category.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link to={category.path}>
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

export default Quiz