import React, { useState } from 'react';
import '../css/Book.css'

const Book = ({ book }) => {
    const { title, author, price, cover_image } = book;
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorite(prevState => !prevState);
        // API call to update favorites will be handled here
        console.log('Toggled favorite status');
    };

    return (
        <div className="book-card">
            <div className="book-image-container">
                <img src={cover_image} alt={`${title} cover`} className="book-image" />
            </div>
            <div className="book-details">
                <h3 className="book-title">{title}</h3>
                <p className="book-author">by {author}</p>
                <p className="book-price">${price}</p>
                <div className="book-actions">
                    <button className="add-to-cart-btn">Add to Cart</button>
                    <button 
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        onClick={handleFavoriteToggle}
                        aria-label="Add to favorites"
                    >
                        ♥
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Book;