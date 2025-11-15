import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import '../css/CartPage.css';

// Sample data for items in the cart - this will come from your backend/context
const initialCartItems = [
    { id: 1, title: 'The Midnight Library', author: 'Matt Haig', price: '15.99', cover_image: 'https://via.placeholder.com/70x105.png?text=Book+1', quantity: 2 },
    { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', price: '22.00', cover_image: 'https://via.placeholder.com/70x105.png?text=Book+3', quantity: 1 },
];

const SHIPPING_COST = 5.00;

const CartPage = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, total: 0 });

    useEffect(() => {
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = cartItems.length > 0 ? SHIPPING_COST : 0;
        const total = subtotal + shipping;
        
        setTotals({
            subtotal: subtotal.toFixed(2),
            shipping: shipping.toFixed(2),
            total: total.toFixed(2)
        });

    }, [cartItems]);

    const handleQuantityChange = (itemId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    return (
        <div className="cart-page">
            <Navbar />

            <main className="cart-container">
                <header className="cart-header">
                    <h1>Shopping Cart</h1>
                </header>

                <div className="cart-layout">
                    <div className="cart-items-list">
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={handleRemoveItem}
                                />
                            ))
                        ) : (
                            <div className="empty-cart">
                                <p>Your cart is currently empty.</p>
                                <a href="/" className="browse-books-link">Continue Shopping</a>
                            </div>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <aside className="order-summary">
                            <h2>Order Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${totals.subtotal}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>${totals.shipping}</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>${totals.total}</span>
                            </div>
                            <button className="checkout-btn">Proceed to Checkout</button>
                        </aside>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;