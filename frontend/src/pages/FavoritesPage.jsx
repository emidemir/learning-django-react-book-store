import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FavoriteBook from '../components/FavoriteBook';
import '../css/FavoritesPage.css';

// Sample data for favorite books - this will come from your backend
const initialFavoriteBooks = [
    { id: 2, title: 'Dune', author: 'Frank Herbert', price: '18.50', cover_image: 'https://via.placeholder.com/80x120.png?text=Dune' },
    { id: 5, title: 'Atomic Habits', author: 'James Clear', price: '14.75', cover_image: 'https://via.placeholder.com/80x120.png?text=Atomic+Habits' },
    { id: 9, title: 'Where the Crawdads Sing', author: 'Delia Owens', price: '14.00', cover_image: 'https://via.placeholder.com/80x120.png?text=Crawdads+Sing' },
];

const FavoritesPage = () => {
    const [favoriteBooks, setFavoriteBooks] = useState(initialFavoriteBooks);

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