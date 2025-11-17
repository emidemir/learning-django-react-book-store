import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/ProfilePage.css';


const ProfilePage = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [userData, setUserData] = useState({}); // Used for displaying user data
    const [formData, setFormData] = useState({}); // Used for updating user data
    const [avatarFile, setAvatarFile] = useState(null); // Used for updating avatar

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
                    username: data.username,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    bio: data.bio,
                    profilePicture: `${process.env.REACT_APP_BACKEND_URL}${data.img_url}`
                }
                setUserData(profileData);
                setFormData(profileData);
            }else{
                alert("Error retrieving profile data: " + JSON.stringify(data))
            }
        }

        retrieveProfile()
    },[])

    // Called when a data (text) is changed while editing
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    // Called when a data (file) is changed while editing
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            // Preview the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevData => ({
                    ...prevData,
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // When changed are canceled
    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
        setAvatarFile(null); // Reset file
        setFormData(userData); 
    };
    
    // Called when changes are saved
    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('username', formData.username);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('first_name', formData.first_name);
        formDataToSend.append('last_name', formData.last_name);
        formDataToSend.append('bio', formData.bio || '');
        
        // Only append avatar if a new file was selected
        if (avatarFile) {
            formDataToSend.append('avatar', avatarFile);
        }
        
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profiles/${userID}/`, {
            method: "PUT",
            headers: {
                // REMOVED Content-Type header - browser sets it automatically for FormData
                "Authorization": `Bearer ${authToken}`,
            },
            body: formDataToSend
        })

        const data = await response.json()

        if (response.ok){
            alert("Successfully edited profile information!");
            setUserData({
                ...formData,
                profilePicture: `${process.env.REACT_APP_BACKEND_URL}${data.avatar}`
            });
        }else{
            alert("Failed edit operation: " + JSON.stringify(data))
        }

        setIsEditMode(false); // Exit edit mode
        setAvatarFile(null); // Reset file
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
                        <img src={formData.profilePicture || userData.profilePicture} alt="User Profile" />
                        {isEditMode && (
                            <>
                                <button 
                                    type="button"
                                    className="change-picture-btn"
                                    onClick={() => document.getElementById('avatar-upload').click()}
                                >
                                    Change Picture
                                </button>
                                <input 
                                    id="avatar-upload"
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </>
                        )}
                    </div>

                    <div className="profile-details-section">
                        {!isEditMode ? (
                            <>
                                <div className="detail-item">
                                    <label>Username</label>
                                    <p>{userData.username}</p>
                                </div>
                                <div className="detail-item">
                                    <label>First Name</label>
                                    <p>{userData.first_name}</p>
                                </div>
                                <div className="detail-item">
                                    <label>Last Name</label>
                                    <p>{userData.last_name}</p>
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
                                    <label htmlFor="first_name">First Name</label>
                                    <input 
                                        type="text" 
                                        id="first_name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="detail-item-edit">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
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
                                        value={formData.bio || ''}
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