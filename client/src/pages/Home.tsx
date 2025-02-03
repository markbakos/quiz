import type { FC } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Home: FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center p-4">
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600">Quiz App</h1>
            </motion.header>
            <motion.main
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-md w-full"
            >
                <section className="bg-white rounded-lg shadow-lg p-8 text-center border border-slate-200">
                    <h2 className="text-2xl font-semibold mb-6 text-slate-700">Test Your Knowledge</h2>
                    <p className="text-slate-600 mb-8">Challenge yourself with quizzes and see how you stack up!</p>
                    <div className="space-y-4">
                        <Link to="/register" className="block">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-700"
                            >
                                Register Now
                            </motion.button>
                        </Link>
                        <Link to="/login" className="block">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2 px-4 bg-slate-100 text-slate-800 font-medium rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-opacity-50 hover:bg-slate-200"
                            >
                                Login
                            </motion.button>
                        </Link>
                    </div>
                </section>
            </motion.main>
        </div>
    )
}

export default Home

