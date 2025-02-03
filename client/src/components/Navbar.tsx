import type React from "react"
import { PlusCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

interface NavbarProps {
    username: string
    onLogout: () => void
}

const Navbar: React.FC<NavbarProps> = ({ username, onLogout }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
        navigate("/login")
    }

    return (
        <motion.nav
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md"
        >
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/quiz" className="text-blue-600 text-xl font-semibold select-none">
                    Quiz App
                </Link>
                <div className="flex items-center space-x-4">
                    <Link to="/create-quiz">
                        <Button variant="outline" className="flex items-center text-blue-600 border-blue-600 hover:bg-blue-50">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Quiz
                        </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                {username}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onSelect={() => navigate(`/profile/${username}`)}>Profile</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 hover:bg-red-50" onSelect={handleLogout}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar

