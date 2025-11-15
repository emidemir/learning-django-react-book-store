import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/ProfilePage.css';

// Sample user data - this will come from your backend API
const initialUserData = {
    username: 'JaneDoe',
    email: 'jane.doe@example.com',
    bio: 'An avid reader and aspiring writer. My favorite genres are fantasy and historical fiction.',
    profilePicture: 'https://via.placeholder.com/150'
};

const ProfilePage = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [userData, setUserData] = useState(initialUserData);
    const [formData, setFormData] = useState(initialUserData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
        // Reset form data to current user data when entering edit mode
        setFormData(userData); 
    };
    
    const handleSaveChanges = (e) => {
        e.preventDefault();
        // API call to save updated user data will be handled here
        console.log('Saving data:', formData);
        
        setUserData(formData); // Update the main user data
        setIsEditMode(false); // Exit edit mode
    };

    return (
        <div className="profile-page">
            <Navbar />
            
            <main className="profile-container">
                <header className="profile-header">
                    <h1>Account Information</h1>
                </header>
                
                <div className="profile-card">
                    <div className="profile-picture-section">
                        <img src={userData.profilePicture} alt="User Profile" />
                        {isEditMode && <button className="change-picture-btn">Change Picture</button>}
                    </div>

                    <div className="profile-details-section">
                        {!isEditMode ? (
                            <>
                                <div className="detail-item">
                                    <label>Username</label>
                                    <p>{userData.username}</p>
                                </div>
                                <div className="detail-item">
                                    <label>Email</label>
                                    <p>{userData.email}</p>
                                </div>
                                <div className="detail-item">
                                    <label>Bio</label>
                                    <p>{userData.bio || 'No bio provided.'}</p>
                                </div>
                                <button onClick={handleEditToggle} className="profile-action-btn">Edit Profile</button>
                            </>
                        ) : (
                            <form onSubmit={handleSaveChanges}>
                                <div className="detail-item-edit">
                                    <label htmlFor="username">Username</label>
                                    <input 
                                        type="text" 
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="detail-item-edit">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="detail-item-edit">
                                    <label htmlFor="bio">Bio</label>
                                    <textarea 
                                        id="bio"
                                        name="bio"
                                        rows="4"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="profile-action-btn save-btn">Save Changes</button>
                                    <button type="button" onClick={handleEditToggle} className="profile-action-btn cancel-btn">Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;