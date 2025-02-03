import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface LeaderboardEntry {
    username: string
    score: number
    date: string
}

interface LeaderboardProps {
    quizID: string
    quizTitle: string
}

const Leaderboard: React.FC<LeaderboardProps> = ({ quizID, quizTitle }) => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`https://quizapp-backend-d24y.onrender.com/api/leaderboard/${quizID}`)
                setLeaderboard(response.data)
            } catch (e) {
                console.error("Error fetching leaderboard", e)
            }
        }

        fetchLeaderboard()
    }, [quizID])

    const goToHome = () => {
        navigate("/quiz")
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
        >
            <Card className="bg-white shadow-lg">
                <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl font-bold text-center">Leaderboard: {quizTitle}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-slate-700">Rank</TableHead>
                                <TableHead className="text-slate-700">Username</TableHead>
                                <TableHead className="text-slate-700">Score</TableHead>
                                <TableHead className="text-slate-700">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboard.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{entry.username}</TableCell>
                                    <TableCell>{entry.score}</TableCell>
                                    <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-center mt-6">
                        <Button onClick={goToHome} className="bg-blue-600 hover:bg-blue-700">
                            Go to Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default Leaderboard

