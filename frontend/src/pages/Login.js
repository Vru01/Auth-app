import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './style/main.css';
import { handleerror, handlesuccess } from '../utils';

function Login() {
    const [LoginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        
        // Update the LoginInfo state
        setLoginInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = LoginInfo;
        
        if (!email || !password) {
            return handleerror('Both email and password are required!');
        }

        try {
            const url = "http://localhost:5000/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginInfo)
            });
            
            const result = await response.json();
            const { success, message,jwt_token,name, errorObj } = result;
            
            if (success) {
                handlesuccess(message);
                localStorage.setItem('token', jwt_token);
                localStorage.setItem('loggedInUser',name);
                setTimeout(() => {
                    navigate("/home"); // Redirect to dashboard after successful login
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
            <h1>LOGIN</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Your Email'
                        value={LoginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter Password'
                        value={LoginInfo.password}
                    />
                </div>

                <button type='submit'>Login</button>
                <span>
                    Don't have an account?
                    <Link to={"/signup"}> Sign Up</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
