import React from 'react';
import '../css/FavoriteBook.css';

const FavoriteBook = ({ book, onRemove }) => {
    const { id, title, author, price, cover_image } = book;

    // This function would call the API to remove the book from favorites
    const handleRemove = () => {
        onRemove(id);
        console.log(`Removing book ${id} from favorites`);
    };

    return (
        <div className="favorite-book-card">
            <img src={cover_image} alt={`${title} cover`} className="favorite-book-cover" />
            <div className="favorite-book-details">
                <h3 className="favorite-book-title">{title}</h3>
                <p className="favorite-book-author">by {author}</p>
                <p className="favorite-book-price">${price}</p>
            </div>
            <div className="favorite-book-actions">
                <button className="add-to-cart-fav-btn">Add to Cart</button>
                <button className="remove-from-fav-btn" onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
};

export default FavoriteBook;