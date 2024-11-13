import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve and set the logged-in user from localStorage
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(user);
        } else {
            // If no user is logged in, redirect to login page
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Remove the user from localStorage and navigate to login
        localStorage.removeItem('loggedInUser');
        toast.success("You have been logged out successfully!");
        setTimeout(() => {
            navigate('/login');
        }, 1500); // Adding a small delay to allow the toast to display before redirecting
    };

    return (
        <div>
            <h1>Welcome, {loggedInUser}</h1>
            <button onClick={handleLogout}>Log Out</button>
            <ToastContainer />
        </div>
    );
}

export default Home;
