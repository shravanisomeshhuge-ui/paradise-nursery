import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [notice, setNotice] = useState('');

  // cost of one line item (unit price x quantity)
  const calculateItemTotal = (item) => item.cost * item.quantity;

  // total for the whole cart
  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // dropping below 1 removes the item
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    setNotice('Checkout is coming soon. Thank you for shopping at Paradise Nursery!');
  };

  return (
    <div className="cart-page">
      <div className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">Your cart is empty. Add a plant to get started.</div>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <div>Unit price: ${item.cost}</div>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name}`}>
                  −
                </button>
                <span>{item.quantity}</span>
                <button className="qty-btn" onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name}`}>
                  +
                </button>
              </div>
              <div className="item-total">Total: ${calculateItemTotal(item)}</div>
            </div>
            <button className="btn delete-btn" onClick={() => handleRemove(item)}>
              Delete
            </button>
          </div>
        ))
      )}

      <div className="cart-actions">
        <button className="btn continue-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="btn checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
      {notice && <div className="notice" role="status">{notice}</div>}
    </div>
  );
}

export default CartItem;
