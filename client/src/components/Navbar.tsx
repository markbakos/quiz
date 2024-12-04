import React from "react"
import {PlusCircle, User} from "lucide-react"
import {Button} from "@/components/ui/button.tsx"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"


interface NavbarProps {
    username: string
    onLogout: () => void
}

const Navbar:React.FC<NavbarProps> = ({username, onLogout}) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
        navigate('/login')
    }

    return(
        <nav>
            <div className="container mx-auto flex justify-between items-center p-5">
                <Link to="/quiz" className="text-white text-xl font-semibold select-none">Quiz App</Link>
                <div className="flex items-center space-x-4">
                    <Link to="/create-quiz">
                        <Button variant="secondary" className="flex items-center">
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            Create Quiz
                        </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="flex items-center">
                                <User className="mr-2 h-4 w-4"/>
                                {username}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => navigate(`/profile/${username}`)}>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-red-600 hover:text-white" onSelect={handleLogout}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar