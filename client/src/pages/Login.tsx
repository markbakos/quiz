import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

const Login = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [message, setMessage] = useState<string>('')


    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', username)

            setMessage('Logged in successfully!')

           setTimeout(() => navigate('/quiz'), 3000)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error:", error.response?.data || error.message)
                setMessage(error.response?.data.message)
                setPassword('')
            }
            else if(error instanceof Error) {
                console.error("Error:", error)
                setPassword('')
                setMessage(error.message)
            }
            else{
                console.error("Error:", error)
                setPassword('')
                setMessage('Something went wrong')
            }
        }
    }
    
    return (
        <div
            className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-400 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold">
                    Log in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white/10 backdrop-blur-md py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-900"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-900"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                Login
                            </button>
                        </div>
                        {message && <p className="text-gray-900 z-20 text-center font-medium text-lg">{message}</p>}
                    </form>


                    <div className="mt-2">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <p className="px-2 mt-10 text-lg">
                                    Don't have an account?
                                </p>
                            </div>
                        </div>

                        <div className="mt-2">
                            <Link
                                to="/register"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-purple-600 bg-white hover:bg-gray-50"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login