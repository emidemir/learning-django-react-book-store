import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FavoriteBook from '../components/FavoriteBook';
import '../css/FavoritesPage.css';

const FavoritesPage = () => {
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const authToken = localStorage.getItem("access_token");

    useEffect(()=>{
        const getFavoriteBooks = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites/`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }
            });  
            const data = await response.json()
            
            if (response.ok){
                setFavoriteBooks(data);
            }else{
                alert("Failed to fetch favorites: " + JSON.stringify(data));
            }
        }
        getFavoriteBooks()
    },[authToken])

    const handleRemoveFavorite = (bookId) => {
        setFavoriteBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    };

    return (
        <div className="favorites-page">
            <Navbar />

            <main className="favorites-container">
                <header className="favorites-header">
                    <h1>Your Favorites</h1>
                    <p>Here are the books you've saved for later.</p>
                </header>

                <div className="favorites-list">
                    {favoriteBooks.length > 0 ? (
                        favoriteBooks.map(book => (
                            <FavoriteBook 
                                key={book.id} 
                                book={book} 
                                onRemove={handleRemoveFavorite} 
                            />
                        ))
                    ) : (
                        <div className="empty-favorites">
                            <p>You haven't added any books to your favorites yet.</p>
                            <a href="/" className="browse-books-link">Browse Books</a>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FavoritesPage;