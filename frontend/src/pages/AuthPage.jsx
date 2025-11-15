import React, { useState } from 'react';
import '../css/AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => {
        setIsLogin(prevState => !prevState);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // API call for login will be handled here
        console.log('Logging in...');
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // API call for signup will be handled here
        console.log('Signing up...');
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
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required />
                        </div>
                        <button type="submit" className="auth-button">Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleSignup}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required />
                        </div>
                        <button type="submit" className="auth-button">Sign Up</button>
                    </form>
                )}
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