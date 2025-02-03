import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Calendar, Trophy } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import Navbar from "@/components/Navbar"

interface User {
    username: string
    createdAt: string
}

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { username } = useParams<{ username: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        if (username === undefined) {
            navigate(`/profile/${localStorage.getItem("username")}`)
            return
        }

        const fetchUserData = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await axios.get(`https://quizapp-backend-d24y.onrender.com/api/profile/${username}`)
                setUserData(response.data)
            } catch (e) {
                console.error("Error fetching user data", e)
                setError("Failed to fetch user data. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [username, navigate])

    const renderContent = () => {
        if (isLoading) {
            return (
                <Card className="w-full max-w-md bg-white shadow-lg">
                    <CardHeader>
                        <Skeleton className="h-12 w-3/4 mx-auto" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-2/3 mx-auto" />
                    </CardContent>
                </Card>
            )
        }

        if (error) {
            return (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )
        }

        if (!userData) {
            return (
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Data</AlertTitle>
                    <AlertDescription>No user data available.</AlertDescription>
                </Alert>
            )
        }

        return (
            <Card className="w-full max-w-md bg-white shadow-lg">
                <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl font-semibold text-center">User Profile</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6 p-6">
                    <Avatar className="w-24 h-24 mx-auto">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${userData.username}`} />
                        <AvatarFallback>{userData.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-semibold text-slate-800">{userData.username}</h2>
                    <div className="flex justify-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Joined {new Date(userData.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                            <Trophy className="mr-2 h-4 w-4" />
                            <span>Highest Score: WIP</span>
                        </div>
                    </div>
                    <p className="text-lg text-slate-700">Quizzes Taken: WIP</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar
                username={userData?.username || ""}
                onLogout={() => {
                    localStorage.removeItem("token")
                    localStorage.removeItem("username")
                    window.location.href = "/login"
                }}
            />
            <div className="flex-grow flex items-center justify-center p-4 mt-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    {renderContent()}
                </motion.div>
            </div>
        </div>
    )
}

export default Profile

