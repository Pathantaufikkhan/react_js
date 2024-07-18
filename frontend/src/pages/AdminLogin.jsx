import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addbook.css'; // Import the CSS file

const AdminLogin = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const audioRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        try {
            const response = await axios.post('http://localhost:1000/admin/login', {
                username,
                password
            });

            setMessage(response.data.message);

            // Store the token in local storage
            localStorage.setItem('token', response.data.token);

            // Update authentication state
            setIsAuthenticated(true);

            // Redirect to home page
            navigate('/');
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login">
                <center><h2 className='admin-login-title text-white'>Admin Login</h2></center>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <center>
                        <button type="submit">Login</button>
                    </center>
                </form>
                {message && <p>{message}</p>}
            </div>
            <audio ref={audioRef} src="https://tuna.voicemod.net/sound/98e1d359-e9ca-4748-bced-b40808656974" loop>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AdminLogin;
