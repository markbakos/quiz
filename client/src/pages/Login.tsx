import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://quizapp-backend-d24y.onrender.com/api/auth/login', {
                username,
                password
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', username)
            setMessage('Logged in successfully!')
            setTimeout(() => navigate('/quiz'), 3000)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error:", error.response?.data || error.message)
                setMessage(error.response?.data.message || 'An error occurred')
            } else {
                console.error("Error:", error)
                setMessage('Something went wrong')
            }
            setPassword('')
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="bg-white shadow-lg">
                    <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                        <CardTitle className="text-2xl font-bold text-center">Log in to your account</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                                    Username
                                </label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                Login
                            </Button>
                        </form>
                        {message && <p className="mt-4 text-center font-medium text-blue-600">{message}</p>}
                        <p className="mt-4 text-center text-sm text-slate-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                Register here
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default Login
