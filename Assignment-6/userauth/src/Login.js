import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { User, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold mb-6 text-center text-indigo-800">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-indigo-800 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <input
                  className="w-full bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-full py-3 px-4 pl-10 focus:outline-none focus:border-indigo-500 transition-all duration-300"
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <User className="absolute left-3 top-3 w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <label className="block text-indigo-800 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-full py-3 px-4 pl-10 focus:outline-none focus:border-indigo-500 transition-all duration-300"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-3 top-3 w-5 h-5 text-indigo-400" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm italic">{error}</p>}
            <button
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
              type="submit"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;