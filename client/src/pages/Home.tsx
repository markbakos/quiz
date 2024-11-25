import { Link } from "react-router-dom"
import { FC } from "react"

const Home: FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 text-white">
            <header className="py-8 px-4 md:px-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center">Quiz App</h1>
            </header>
            <main className="container mx-auto px-4 md:px-8 py-12">
                <section className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                        Test Your Computer Science Knowledge
                    </h2>
                    <p className="text-xl mb-8">
                        Challenge yourself with quizzes and see how you stack up!
                    </p>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-medium mb-4">Ready to begin?</h3>
                            <Link to="/register">
                                <button className="w-full md:w-64 py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75">
                                    Register Now
                                </button>
                            </Link>
                        </div>
                        <div>
                            <h3 className="text-2xl font-medium mb-4">Already have an account?</h3>
                            <Link to="/login">
                                <button className="w-full md:w-64 py-3 px-6 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home

