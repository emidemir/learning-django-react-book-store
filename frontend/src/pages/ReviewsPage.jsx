import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';

import { useLocation } from 'react-router-dom'
import '../css/ReviewsPage.css';

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const location = useLocation()
    const {bookID, bookTitle} = location.state || {}

    const authToken = localStorage.getItem("access_token");

    useEffect(()=>{
        const getReviews = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews/?book_id=${bookID}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }
            })
            const data = await response.json();

            if (response.ok){
                setReviews(data);
                // setReviews({
                //     id: data.id,
                //     rating: data.rating,
                //     comment: data.comment,
                //     date: data.created_at,
                //     author: data.commenter_username
                // })
            }else{
                alert("Reviews could not be fetched: " + JSON.stringify(data))
            }
        }

        getReviews()
    },[authToken, bookID])

    const getReviews = async (currentBookID, currentAuthToken) => {
        if (!currentBookID || !currentAuthToken) return;

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews/?book_id=${currentBookID}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentAuthToken}`,
            }
        });
        const data = await response.json();

        if (response.ok){
            setReviews(data);
        } else {
            console.error("Reviews could not be fetched:", data);
            alert("Reviews could not be fetched: " + JSON.stringify(data));
        }
    };

    // Call getReviews inside useEffect for initial load
    useEffect(()=>{
        getReviews(bookID, authToken);
    },[authToken, bookID])

    // Use getReviews to resynchronize state after POST
    const handleReviewSubmit = async ({ rating, comment }) => {
        if (!bookID || !authToken) {
            alert("Error: Cannot submit review without valid authentication or book data.");
            return;
        }

        const URL = `${process.env.REACT_APP_BACKEND_URL}/reviews/?book_id=${bookID}`;
        const payload = {rating, comment };
        
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Review submitted successfully!");
                await getReviews(bookID, authToken);
                // The server returns the created object, including the 'author' and 'id'
                // Prepend the new review to the local state for immediate display
                setReviews(prevReviews => [data, ...prevReviews]); 

            } else {
                console.error("Submission Error:", data);
                // Display specific validation errors if available
                alert("Failed to submit review: " + (data.non_field_errors || JSON.stringify(data)));
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("A network error occurred during submission.");
        }
    };

    return (
        <div className="reviews-page">
            <Navbar />

            <main className="reviews-container">
                <header className="reviews-header">
                    <h1>Reviews for "{bookTitle}"</h1>
                </header>
                
                <div className="reviews-layout">
                    <div className="review-list-section">
                        <h2>Customer Reviews</h2>
                        <div className="review-list">
                            {reviews.length > 0 ? (
                                reviews.map(review => (
                                    <Review key={review.id} review={review} />
                                ))
                            ) : (
                                <p>No reviews yet. Be the first to write one!</p>
                            )}
                        </div>
                    </div>

                    <aside className="review-form-section">
                        <ReviewForm onReviewSubmit={handleReviewSubmit} />
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ReviewsPage;