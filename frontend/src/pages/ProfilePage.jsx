import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/ProfilePage.css';


const ProfilePage = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [userData, setUserData] = useState({}); // Used for displaying user data
    const [formData, setFormData] = useState({}); // Used for updating user data

    const authToken = localStorage.getItem("access_token");
    const userID = localStorage.getItem("userID")

    // Initial retrieval of profile data
    useEffect(()=>{
        const retrieveProfile = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profiles/${userID}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }
            })
            const data = await response.json()
            
            if (response.ok){
                const profileData = {
                    username: data.user.username,
                    email: data.user.email,
                    bio: data.bio,
                    profilePicture: data.avatar
                }
                setUserData(profileData);
                setFormData(profileData);
            }else{
                alert("Error retrieving profile data: " + JSON.stringify(data))
            }
        }

        retrieveProfile()
    },[])

    // Called when a data is changed while editing
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // When changed are canceled
    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
        
        setFormData(userData); 
    };
    
    // Called when changes are saved
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profiles/${userID}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        if (response.ok){
            alert("Successfully edited profile information!");
            setUserData(formData); // Update the main user data
        }else{
            alert("Failed edit operation: " + JSON.stringify(data))
        }

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