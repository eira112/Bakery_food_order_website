import React, { useEffect, useLayoutEffect, useState } from "react";
import "../../css/description.css"; // scoped css
import { useParams } from "react-router";
import { getItemById } from "../../services/item";
import { handleAddToCart } from "../../services/cart";
import { getUserById } from "../../services/user";

function Description() {
  const {id} = useParams()
  const userId = localStorage.getItem("authToken")
  const [quantity, setQuantity] = useState(1);
  const [item,setItem] = useState({})

  useLayoutEffect(()=>{
    setQuantity(1)
    if(id){
      getItemById(id).then(
        (response)=>{
          if(response.data.length>0){
            setItem(response.data[0])
          }
        }
      )
    }

  },[])

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  
  return (
    <div className="description-page">
      <main>
        <section className="menu-item-description">
          <div className="menu-item-image">
            <img src={item.productImage} alt="Menu Item" />
          </div>

          <div className="menu-item-info">
            <h2>{item.productName}</h2>
            <p className="description">
              {item.description}
            </p>
            <p className="price">Rs. {item.price}</p>

            <div className="quantity-selector">
              <button className="quantity-btn" onClick={decrementQuantity}>
                -
              </button>
              <input type="number" value={quantity} min="1" readOnly />
              <button className="quantity-btn" onClick={incrementQuantity}>
                +
              </button>
            </div>

            <button className="add-to-cart-btn" onClick={()=>handleAddToCart(userId,quantity,id,item.price)}>
              Add to Cart
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Description;
