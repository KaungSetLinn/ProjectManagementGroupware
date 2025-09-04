import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useAuth } from '../AuthContext';

function LoginBackup() {
    const { setIsAuthorized } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const route = "/api/token/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post(route, { username, password });

            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

            setIsAuthorized(true);
            navigate("/");
        } 
        catch (error) {
            alert(error.response?.data ? JSON.stringify(error.response.data) : error);
        } 
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main class="flex-1 p-8 overflow-y-auto flex items-center justify-center min-h-screen bg-gray-100">

            <section id="login" class="content-section w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <h2 class="text-4xl font-extrabold text-gray-800 mb-8 text-center">Login</h2>

                <form id="loginForm" onSubmit={handleSubmit}>
                    <div class="mb-6">
                        <label htmlFor="username" class="block text-gray-700 text-sm font-bold mb-4">Username</label>
                        <input 
                            type="text" 
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded-lg 
                            w-full py-3 px-4 text-gray-700 leading-tight 
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="山田太郎" 
                            required 
                        />
                    </div>
                    <div class="mb-6">
                        <label htmlFor="password" class="block text-gray-700 text-sm font-bold mb-4">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded-lg 
                            w-full py-3 px-4 text-gray-700 leading-tight 
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="at least 6 characters" 
                            required 
                        />
                    </div>
                    <div class="flex items-center justify-between">
                        <button 
                            type="submit" 
                            class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 
                            cursor-pointer transition-colors duration-200 shadow-md w-full"
                        >
                            Login
                        </button>
                    </div>
                    <p class="text-center text-gray-600 text-sm mt-6">
                        Don't have an account? 
                        <Link to="/register" className='ml-2 text-blue-600 hover:underline font-medium'>
                            Register here
                        </Link>
                        {/* <a href="#" id="showRegisterLink" class="text-blue-600 hover:underline font-medium">Register here</a> */}
                    </p>
                </form>
            </section>
        </main>
    );
}

export default LoginBackup;