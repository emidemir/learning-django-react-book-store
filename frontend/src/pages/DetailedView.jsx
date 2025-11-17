import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation, Link } from 'react-router-dom'
import '../css/DetailedView.css';

const DetailedView = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [book, setBook] = useState({});
    
    const location = useLocation();
    // useParams is used to extract queries form URL. Use 'useLocation' for state data.
    const { bookID } = location.state || {};
    const authToken = localStorage.getItem("access_token");

    useEffect(()=>{
        const getBook = async () => {
            const book_response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books/${bookID}/`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }
            })

            const book_data = await book_response.json();

            if (book_response.ok){
                const genreNames = book_data.genres 
                    ? book_data.genres.map(g => g.name).join(', ') 
                    : 'N/A';

                setBook({
                    id: book_data.id,
                    title: book_data.title,
                    author: book_data.author.name,
                    price: book_data.price,
                    cover_image: book_data.cover_image,
                    rating: book_data.rating,
                    description: book_data.description,
                    publication_date: book_data.publication_date,
                    pages: book_data.page,
                    genre: genreNames,
                })
                const favoritesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                    }
                });
                
                if (favoritesResponse.ok) {
                    const favoritesList = await favoritesResponse.json();
                    
                    const isBookFavorite = favoritesList.some(favBook => favBook.id.toString() === bookID.toString());
                    
                    setIsFavorite(isBookFavorite)
                }
            }else{
                alert("Detailed view of book fetching failed: " + JSON.stringify(book_response));
            }
        }

        getBook();
    },[authToken, bookID])

    const handleFavoriteToggle = async () => {
        if (isFavorite){
            const handleRemove = async () => {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites/${bookID}/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`,
                    }
                })
                if(!response.ok){
                    alert("Couldn't delete the item from favorites: " + JSON.stringify(response.json()));
                }
            };
            handleRemove()
        }else{
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
                setIsFavorite(false)
            }else{
                alert("Failed to add the book to favorites!");
            }
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
        <div className="detailed-view-page">
            <Navbar />

            <main className="book-detail-container">
                <div className="book-detail-card">
                    <div className="book-detail-image-wrapper">
                        <img src={book.cover_image} alt={`${book.title} cover`} className="book-detail-cover" />
                    </div>
                    <div className="book-detail-content">
                        <h1 className="book-detail-title">{book.title}</h1>
                        <p className="book-detail-author">by {book.author}</p>
                        
                        <div className="book-detail-rating">
                            <Link to='/reviews' state={{bookID: bookID, bookTitle: book.title}}>
                                <span>{'★'.repeat(Math.round(book.rating))}</span>
                                <span>{'☆'.repeat(5 - Math.round(book.rating))}</span>
                                <span className="review-count">({book.reviews} reviews)</span>
                            </Link>
                        </div>

                        <p className="book-detail-description">{book.description}</p>

                        <div className="book-meta-info">
                            <p><strong>Genre:</strong> {book.genre}</p>
                            <p><strong>Published:</strong> {book.publication_date}</p>
                            <p><strong>Pages:</strong> {book.pages}</p>
                        </div>
                        
                        <div className="book-detail-actions">
                            <p className="book-detail-price">${book.price}</p>
                            <div className="book-detail-buttons">
                                <button
                                    className={`favorite-detailed-btn ${isFavorite ? 'active' : ''}`}
                                    onClick={handleFavoriteToggle}
                                    aria-label="Add to favorites"
                                >
                                    ♥
                                </button>
                                <button className="add-to-cart-detailed-btn" onClick={handleCartToggle}>Add to Cart</button>
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