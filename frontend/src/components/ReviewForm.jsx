import React, { useState } from 'react';
import '../css/ReviewForm.css';

const ReviewForm = ({ onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating > 0 && comment.trim() !== '') {
            onReviewSubmit({ rating, comment });
            // Reset form
            setRating(0);
            setComment('');
        } else {
            alert('Please provide a rating and a comment.');
        }
    };

    return (
        <div className="review-form-container">
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group star-rating">
                    <label>Your Rating:</label>
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= (hover || rating) ? "on" : "off"}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                <span className="star">&#9733;</span>
                            </button>
                        );
                    })}
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Your Comment:</label>
                    <textarea
                        id="comment"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-review-btn">Submit Review</button>
            </form>
        </div>
    );
};

export default ReviewForm;