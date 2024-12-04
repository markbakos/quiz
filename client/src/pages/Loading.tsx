import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingProps {
    message?: string
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 flex flex-col items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 flex flex-col items-center space-y-4">
                <Loader2 className="h-12 w-12 text-white animate-spin" />
                <p className="text-white text-xl font-semibold">{message}</p>
            </div>
        </div>
    )
}

export default Loading
