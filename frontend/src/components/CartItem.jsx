import React from 'react';
import '../css/CartItem.css';

const CartItem = ({ book, itemID, onQuantityChange, onRemove, quantity }) => {
    const { id, title, author, price, cover_image } = book;

    const handleQuantityUpdate = (newQuantity) => {
        // Ensure quantity is at least 1
        if (newQuantity >= 1) {
            onQuantityChange(id, newQuantity);
        }
    };

    return (
        <div className="cart-item-card">
            <img src={cover_image} alt={`${title} cover`} className="cart-item-cover" />
            <div className="cart-item-details">
                <h3 className="cart-item-title">{title}</h3>
                <p className="cart-item-author">by {author.name}</p>
                <p className="cart-item-price">${price}</p>
            </div>
            <div className="cart-item-quantity-controls">
                <button onClick={() => handleQuantityUpdate(quantity - 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityUpdate(quantity + 1)}>+</button>
            </div>
            <p className="cart-item-subtotal">${(price * quantity).toFixed(2)}</p>
            <button className="cart-item-remove-btn" onClick={() => onRemove(itemID)}>
                &times;
            </button>
        </div>
    );
};

export default CartItem;