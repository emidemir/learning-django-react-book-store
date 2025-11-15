import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/DetailedView.css';

// Sample book data
const bookDetails = {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: '15.99',
    cover_image: 'https://via.placeholder.com/400x600.png?text=The+Midnight+Library',
    rating: 4.5,
    reviews: 1245,
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices . . . Would you have done anything different, if you had the chance to undo your regrets?",
    publisher: "Viking",
    publication_date: "2020-08-13",
    pages: 304,
    genre: "Fantasy Fiction"
};


const DetailedView = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorite(prevState => !prevState);
        // API call to update favorites will be handled here
        console.log('Toggled favorite status for detailed view');
    };

    return (
        <div className="detailed-view-page">
            <Navbar />

            <main className="book-detail-container">
                <div className="book-detail-card">
                    <div className="book-detail-image-wrapper">
                        <img src={bookDetails.cover_image} alt={`${bookDetails.title} cover`} className="book-detail-cover" />
                    </div>
                    <div className="book-detail-content">
                        <h1 className="book-detail-title">{bookDetails.title}</h1>
                        <p className="book-detail-author">by {bookDetails.author}</p>
                        
                        <div className="book-detail-rating">
                            <span>{'★'.repeat(Math.round(bookDetails.rating))}</span>
                            <span>{'☆'.repeat(5 - Math.round(bookDetails.rating))}</span>
                            <span className="review-count">({bookDetails.reviews} reviews)</span>
                        </div>

                        <p className="book-detail-description">{bookDetails.description}</p>

                        <div className="book-meta-info">
                            <p><strong>Genre:</strong> {bookDetails.genre}</p>
                            <p><strong>Publisher:</strong> {bookDetails.publisher}</p>
                            <p><strong>Published:</strong> {bookDetails.publication_date}</p>
                            <p><strong>Pages:</strong> {bookDetails.pages}</p>
                        </div>
                        
                        <div className="book-detail-actions">
                            <p className="book-detail-price">${bookDetails.price}</p>
                            <div className="book-detail-buttons">
                                <button
                                    className={`favorite-detailed-btn ${isFavorite ? 'active' : ''}`}
                                    onClick={handleFavoriteToggle}
                                    aria-label="Add to favorites"
                                >
                                    ♥
                                </button>
                                <button className="add-to-cart-detailed-btn">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DetailedView;