import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';

import { useLocation } from 'react-router-dom'
import '../css/ReviewsPage.css';

const ReviewsPage = () => {
    const [reviews, setReviews] = useState({});
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

    const handleReviewSubmit = (newReview) => {
        // Here you would send the review to your backend API.
        // For now, we'll just add it to the local state for demonstration.
        const reviewToAdd = {
            id: reviews.length + 1, // temporary ID
            author: 'CurrentUser', // This would come from user session
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
        };
        
        setReviews([reviewToAdd, ...reviews]);
        console.log('New review submitted:', reviewToAdd);
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