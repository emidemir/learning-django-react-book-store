import React from 'react';
import '../css/Review.css';

const Review = ({ review }) => {
    const { author, rating, comment, date } = review;

    return (
        <div className="review-card">
            <div className="review-header">
                <span className="review-author">{author}</span>
                <div className="review-rating">
                    <span>{'★'.repeat(rating)}</span>
                    <span>{'☆'.repeat(5 - rating)}</span>
                </div>
            </div>
            <p className="review-comment">{comment}</p>
            <p className="review-date">{date}</p>
        </div>
    );
};

export default Review;