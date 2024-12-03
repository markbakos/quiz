import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

interface LeaderboardEntry {
    username: string
    score: number
    date: string
}

interface LeaderboardProps {
    quizID: string
    quizTitle: string
}

const Leaderboard: React.FC<LeaderboardProps> = ({quizID, quizTitle}) => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`https://quizapp-backend-d24y.onrender.com/api/leaderboard/${quizID}`)
                setLeaderboard(response.data)
            } catch (e) {
                console.error('Error fetching leaderboard', e)
            }
        }

        fetchLeaderboard()
    }, [quizID]);

    const goToHome = () => {
        navigate('/quiz')
    }

    return(
        <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md text-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Leaderboard: {quizTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-white">Rank</TableHead>
                            <TableHead className="text-white">Username</TableHead>
                            <TableHead className="text-white">Score</TableHead>
                            <TableHead className="text-white">Date</TableHead>
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
                <div className="flex justify-center">
                    <Button onClick={goToHome} className="bg-green-500 hover:bg-green-600 w-64 mt-4">
                        Go to Home
                    </Button>
                </div>
            </CardContent>
        </Card>
    )

}

export default Leaderboard