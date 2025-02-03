import type React from "react"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface LoadingProps {
    message?: string
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center space-y-4"
            >
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                <p className="text-slate-800 text-xl font-semibold">{message}</p>
            </motion.div>
        </div>
    )
}

export default Loading

