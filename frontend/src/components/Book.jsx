import React, { useState, useEffect } from 'react';
import '../css/Book.css'

const Book = ({ bookID, book }) => {
    const { title, author, price, cover_image } = book;
    const [isFavorite, setIsFavorite] = useState(false);

    const authToken = localStorage.getItem("access_token");

    // Check if the book is a favorite or not
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                // Fetch the user's full list of favorites
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`,
                    }
                });

                if (response.ok) {
                    const favoritesList = await response.json();
                    
                    // Check if the current book's ID exists in the list of favorites
                    const isBookFavorite = favoritesList.some(favBook => favBook.id === bookID);
                    
                    // Set the initial state
                    setIsFavorite(isBookFavorite);
                }
            } catch (error) {
                console.error("Error checking favorite status:", error);
            }
        };

        checkFavoriteStatus();
    }, [authToken, bookID]);

    const handleFavoriteToggle = async () => {

        const payload = {
            book_id: bookID
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify(payload)

        })
        if (response.ok){
            alert("Book added to favorites!");
        }else{
            alert("Failed to add the book to favorites!");
        }

        setIsFavorite(prevState => !prevState);
    };

    const handleCartToggle = async () => {
        const payload = {
            book: bookID,
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
        <div className="book-card">
            <div className="book-image-container">
                <img src={cover_image} alt={`${title} cover`} className="book-image" />
            </div>
            <div className="book-details">
                <h3 className="book-title">{title}</h3>
                <p className="book-author">by {author}</p>
                <p className="book-price">${price}</p>
                <div className="book-actions">
                    <button className="add-to-cart-btn" onClick={handleCartToggle}>Add to Cart</button>
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