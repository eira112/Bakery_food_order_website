import React, { useState } from "react";
import "../../css/description.css"; // scoped css

function Description() {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} items to cart!`);
  };

  return (
    <div className="description-page">
      <main>
        <section className="menu-item-description">
          <div className="menu-item-image">
            <img src="https://via.placeholder.com/800x600" alt="Menu Item" />
          </div>

          <div className="menu-item-info">
            <h2>Menu Item Name</h2>
            <p className="description">
              A delightful dish that combines the freshest ingredients with
              unique flavors. Perfect for any occasion.
            </p>
            <p className="price">$12.99</p>

            <div className="quantity-selector">
              <button className="quantity-btn" onClick={decrementQuantity}>
                -
              </button>
              <input type="number" value={quantity} min="1" readOnly />
              <button className="quantity-btn" onClick={incrementQuantity}>
                +
              </button>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Description;
