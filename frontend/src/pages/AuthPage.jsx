import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import '../css/AuthPage.css';

const AuthPage = () => {
    const navigate = useNavigate()

    // UI state
    const [isLogin, setIsLogin] = useState(true);

    // User states
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const toggleAuthMode = () => {
        setIsLogin(prevState => !prevState);
    };

    // Regular login
    const handleLogin = async (e) => {
        e.preventDefault();
        const payload = {
            email: email,
            password: password,
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        if (response.ok){
            alert("Successfully logged in!");
            setIsLogin(true);

            localStorage.setItem("userID", data.user.id);
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);

            navigate('/home');
        }else{
            alert("Signin failed: " + JSON.stringify(data));
        }
    };

    // Regular signup
    const handleSignup = async (e) => {
        e.preventDefault();

        const payload = {
            username: username,
            email: email,
            password: password,
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        if(response.ok){
            alert("Account created successfully!");
            setIsLogin(true);
        }else{
            alert("Signup failed: " + JSON.stringify(data));
        }
    };

    // Google auth
    const handleGoogleAuth = async (credentialResponse) => {
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/google/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({access_token: credentialResponse.credential})
            })
    
            const data = await response.json()
                
            if (response.ok){
                localStorage.setItem("user", data.user);
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                
                navigate('/home');
            } else {
                console.error('Error:', data.error);
                alert('Authentication failed: ' + data.error);
            }            
        } catch(error){
            console.error('Network error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                    <p>Welcome to the Bookstore</p>
                </div>
                {isLogin ? (
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="email" >Email</label>
                            <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="auth-button">Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleSignup}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="auth-button">Sign Up</button>
                    </form>
                )}

                {/* --- New Section for Google Sign-In --- */}
                <div className="divider">
                    <span>OR</span>
                </div>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
                    <GoogleLogin
                        onSuccess={handleGoogleAuth}
                    />  
                </GoogleOAuthProvider>

                <div className="toggle-auth">
                    <p>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <button onClick={toggleAuthMode} className="toggle-button">
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;