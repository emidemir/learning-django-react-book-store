import React from 'react';
import '../css/FavoriteBook.css';

const FavoriteBook = ({ book, onRemove }) => {
    const { id, title, author, price, cover_image } = book;
    const authToken = localStorage.getItem("access_token");

    const handleRemove = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            }
        })
        if(response.ok){
            onRemove(id);
        }else{
            alert("Couldn't delete the item from favorites: " + JSON.stringify(response.json()));
        }

    };

    // Adding an item to Cart
    const handleCartToggle = async () => {
        const payload = {
            book: id,
            quantity: 1
        }
        // Adding a book into CART (POST request to items, NOT items/id)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/items/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify(payload)
        })

        if (response.ok){
            alert("Item successfully added to the chart!");
        }else{
            alert("Item could NOT be added to the chart");
        }
    }

    return (
        <div className="favorite-book-card">
            <img src={cover_image} alt={`${title} cover`} className="favorite-book-cover" />
            <div className="favorite-book-details">
                <h3 className="favorite-book-title">{title}</h3>
                <p className="favorite-book-author">by {author.name}</p>
                <p className="favorite-book-price">${price}</p>
            </div>
            <div className="favorite-book-actions">
                <button className="add-to-cart-fav-btn" onClick={handleCartToggle}>Add to Cart</button>
                <button className="remove-from-fav-btn" onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
};

export default FavoriteBook;