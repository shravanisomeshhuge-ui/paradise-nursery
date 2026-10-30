import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

// Simple generated thumbnail (pot + leaves) so every plant has an image without hosting files.
// Replace `image` with real photo URLs from your lab if you prefer.
const thumb = (leaf, pot) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="#eef3ea"/>
      <ellipse cx="100" cy="85" rx="22" ry="55" fill="${leaf}"/>
      <ellipse cx="70" cy="100" rx="18" ry="45" fill="${leaf}" transform="rotate(-35 70 100)" opacity="0.9"/>
      <ellipse cx="130" cy="100" rx="18" ry="45" fill="${leaf}" transform="rotate(35 130 100)" opacity="0.9"/>
      <path d="M60 140 H140 L130 188 H70 Z" fill="${pot}"/>
      <rect x="55" y="132" width="90" height="14" rx="4" fill="${pot}"/>
    </svg>`
  );

const categories = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', description: 'Produces oxygen at night and filters indoor air.', cost: 15, image: thumb('#3f7d4e', '#b86b4b') },
      { name: 'Spider Plant', description: 'Easy to grow and known for removing common pollutants.', cost: 12, image: thumb('#6aa84f', '#c98b5e') },
      { name: 'Peace Lily', description: 'Elegant white blooms and strong air-cleaning ability.', cost: 18, image: thumb('#2e6b45', '#a35d44') },
      { name: 'Boston Fern', description: 'Adds humidity and removes formaldehyde from the air.', cost: 20, image: thumb('#4f9a5b', '#b86b4b') },
      { name: 'Rubber Plant', description: 'Large glossy leaves that absorb airborne toxins.', cost: 17, image: thumb('#285c3a', '#8f5a45') },
      { name: 'Aloe Vera', description: 'Cleans the air and its gel soothes minor burns.', cost: 14, image: thumb('#7fb069', '#c98b5e') },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', description: 'Calming scent that helps with relaxation and sleep.', cost: 20, image: thumb('#8e7cc3', '#b86b4b') },
      { name: 'Jasmine', description: 'Sweet floral fragrance that lifts the mood.', cost: 18, image: thumb('#5aa469', '#a35d44') },
      { name: 'Rosemary', description: 'Fresh herbal aroma and a handy kitchen herb.', cost: 15, image: thumb('#4c8a5a', '#c98b5e') },
      { name: 'Mint', description: 'Cooling scent, grows quickly, ideal for teas.', cost: 12, image: thumb('#6fcf97', '#b86b4b') },
      { name: 'Lemon Balm', description: 'Light citrus scent that eases stress.', cost: 14, image: thumb('#a3c964', '#8f5a45') },
      { name: 'Gardenia', description: 'Rich perfumed flowers that fill a room.', cost: 22, image: thumb('#2f7a55', '#a35d44') },
    ],
  },
  {
    category: 'Low-Light Plants',
    plants: [
      { name: 'ZZ Plant', description: 'Thrives in dim rooms and needs little water.', cost: 25, image: thumb('#245c3c', '#8f5a45') },
      { name: 'Pothos', description: 'Trailing vines that grow well in shade.', cost: 10, image: thumb('#59a86b', '#c98b5e') },
      { name: 'Cast Iron Plant', description: 'Nearly indestructible, tolerates deep shade.', cost: 19, image: thumb('#1f5035', '#b86b4b') },
      { name: 'Chinese Evergreen', description: 'Patterned leaves that do well in low light.', cost: 16, image: thumb('#4f9a6a', '#a35d44') },
      { name: 'Parlor Palm', description: 'Compact palm suited to dim corners.', cost: 21, image: thumb('#3c8d4f', '#c98b5e') },
      { name: 'Dracaena', description: 'Tall, slender and tolerant of low light.', cost: 23, image: thumb('#2d6e48', '#8f5a45') },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // total number of items (sum of quantities) shown on the cart icon
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <span className="brand">Paradise Nursery</span>
        <div className="nav-links">
          <button className="nav-link" onClick={onHomeClick}>Home</button>
          <button
            className={`nav-link ${!showCart ? 'active' : ''}`}
            onClick={() => setShowCart(false)}
          >
            Plants
          </button>
          <button
            className={`nav-link cart-icon ${showCart ? 'active' : ''}`}
            onClick={() => setShowCart(true)}
            aria-label={`Cart, ${totalQuantity} items`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h3l2.7 11.6a2 2 0 0 0 2 1.4h7.6a2 2 0 0 0 2-1.5L21 7H6" />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-page">
          {categories.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p className="desc">{plant.description}</p>
                    <div className="price">${plant.cost}</div>
                    <button
                      className="btn add-btn"
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
