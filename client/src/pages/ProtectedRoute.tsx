import { Navigate } from "react-router-dom"
import axios from "axios"
import {ReactNode, useEffect, useState} from 'react'
import Loading from "@/pages/Loading.tsx";

type ProtectedRouteProps = {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setIsAuthenticated(false)
                return
            }

            try{
                const response = await axios.get('https://quizapp-backend-d24y.onrender.com/api/auth/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 200) {
                    setIsAuthenticated(true)
                }
            }
            catch (e) {
                setIsAuthenticated(false)
            }
        }
        checkAuth()
    }, []);

    if(isAuthenticated===undefined){
        return(
            <>
                <Loading message="Checking Authentication" />
            </>
        )
    }

    return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute

