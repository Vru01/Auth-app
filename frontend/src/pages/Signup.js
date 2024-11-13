import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './style/main.css';
import { handleerror, handlesuccess } from '../utils';

function Signup() {
    // Corrected useState syntax
    const [SignupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        
        // Update the SignupInfo state
        setSignupInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = SignupInfo;
        
        if (!name || !email || !password) {
            return handleerror('All fields are required!');
        }

        try {
            const url = "http://localhost:5000/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(SignupInfo)
            });
            
            const result = await response.json();
            const { success, message, errorObj } = result;
            
            if (success) {
                handlesuccess(message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else if (errorObj) {
                const details = errorObj?.details[0]?.message;
                handleerror(details);
            } else if (!success) {
                handleerror(message);
            }
            
            console.log(result);
        } catch (err) {
            handleerror(err.message);
        }
    };

    return (
        <div className='container'>
            <h1>SIGNUP</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Your Name'
                        value={SignupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Your Email'
                        value={SignupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter Password'
                        value={SignupInfo.password}
                    />
                </div>

                <button type='submit'>Sign Up</button>
                <span>
                    Already have an account?
                    <Link to={"/login"}> Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
