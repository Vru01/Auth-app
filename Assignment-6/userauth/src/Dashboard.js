import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Grid, User, Settings, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const apps = [
    { name: 'Profile', icon: User },
    { name: 'Settings', icon: Settings },
    { name: 'Apps', icon: Grid },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-800">Welcome, {user.username}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {apps.map((app, index) => (
            <div key={index} className="bg-indigo-50 rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:shadow-md hover:bg-indigo-100 cursor-pointer">
              <app.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h2 className="text-xl font-semibold text-indigo-800">{app.name}</h2>
            </div>
          ))}
        </div>
        <button
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;