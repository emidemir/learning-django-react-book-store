import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';
import '../css/ReviewsPage.css';

// Sample data for existing reviews - this will come from your backend
const initialReviews = [
    { id: 1, author: 'Jane Doe', rating: 5, comment: 'An absolute masterpiece! I couldn\'t put it down. The characters are so well-developed.', date: '2025-10-22' },
    { id: 2, author: 'John Smith', rating: 4, comment: 'A very thought-provoking read. The ending was a bit unexpected but satisfying. Highly recommend.', date: '2025-10-15' },
    { id: 3, author: 'Emily White', rating: 3, comment: 'It was an okay book. The plot felt a bit slow in the middle, but the concept was interesting.', date: '2025-10-05' },
];

// Sample book title for context
const bookTitle = "The Midnight Library";

const ReviewsPage = () => {
    const [reviews, setReviews] = useState(initialReviews);

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