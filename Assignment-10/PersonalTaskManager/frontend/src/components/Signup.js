import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Registration response:", response.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        console.log("Error data:", error.response.data);
        setError(error.response.data.message || "Registration failed. Please try again.");
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("Error setting up request. Please try again.");
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Register</h2>
      {error && (
        <div className="signup-error">
          {error}
        </div>
      )}
      <form onSubmit={handleRegister} className="signup-form">
        <div>
          <label htmlFor="name" className="signup-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="signup-input"
          />
        </div>
        <div>
          <label htmlFor="email" className="signup-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
        </div>
        <div>
          <label htmlFor="password" className="signup-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            className="signup-input"
          />
        </div>
        <button
          type="submit"
          className="signup-button"
        >
          Register
        </button>
        <button
          type="button"
          onClick={handleLoginRedirect}
          className="login-button"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Signup;