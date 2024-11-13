import { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); // Store token in localStorage
            navigate('/profile'); // Redirect to profile page
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed! Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2 w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border p-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
                <button type="button" onClick={() => navigate('/register')} className="text-blue-500 w-full text-center mt-2">
                    Register
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
