import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  if (showProductList) {
    // "Home" in the navbar calls this to return to the landing page
    return <ProductList onHomeClick={() => setShowProductList(false)} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Where green meets serenity</p>
        <button className="get-started-btn" onClick={() => setShowProductList(true)}>
          Get Started
        </button>
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
