import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import '../css/CartPage.css';

const SHIPPING_COST = 5.00;

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, total: 0 });

    const authToken = localStorage.getItem("access_token");

    useEffect(() => {
        const getChartItems = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/items/`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }
            })

            const data = await response.json()

            if (response.ok){
                setCartItems(data);
            }else{
                alert("Failed to fetch cart items: " + JSON.stringify(data))
            }

        }
        getChartItems()
    }, [authToken])

    useEffect(() => {
        const subtotal = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
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

    const handleRemoveItem = async (itemId) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            }
        })
        if (response.ok){
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        }else{
            alert("Something went wrong while deleting the item: " + JSON.stringify(await response.json()))
        }
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
                            cartItems.map(cartItem => (
                                <CartItem
                                    key={cartItem.id}
                                    book={cartItem.book}
                                    itemID={cartItem.id}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={handleRemoveItem}
                                    quantity={cartItem.quantity}
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

export default ShoppingCart;