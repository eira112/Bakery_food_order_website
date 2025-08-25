import React, { useEffect, useState } from "react";
import "../../css/cart.css"; // scoped CSS
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getUserById } from "../../services/user";
import { getItemById } from "../../services/item";
import { updateUserCart } from "../../services/cart";
import { Trash2 } from "lucide-react";

function Cart() {
  const id = localStorage.getItem("authToken")
  const navigate = useNavigate()
  const [cartItem, setCartItem] = useState([])
  const [currentUser, setUser] = useState({})
  const [total,setTotal] = useState(0)

  useEffect(() => {
  console.log(id);
  if (!id) {
    toast.error("Login first to view cart");
    navigate("/login");
  } else {
    let sum = 0
    getUserById(id).then(async (response) => {
      if (response.data) {
        setUser(response.data)
        const cart = response.data.cart || [];
        // Fetch all items in parallel
        const menuItems = await Promise.all(
          cart.map(async (item,index) => {
            const itemData = (await getItemById(item.itemId)).data;
            console.log(itemData)
            itemData[0].quantity += item.quantity
            sum = sum + item.quantity * parseInt(itemData[0].price)
            return itemData[0]
          })
        );
        setTotal(sum)
        setCartItem(menuItems);
      
      }
    });
  }
}, [id, navigate]);

const increaseQty = async (itemId) => {
  let sum = 0
  setUser(prevUser => {
    const updatedCart = prevUser.cart.map(item => {
      if (item.itemId.trim() === itemId.trim()) {
        sum = parseInt(item.price)
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    
    updateUserCart(id,updatedCart)
    return { ...prevUser, cart: updatedCart };
  });
  setTotal(prev=>prev= prev+sum)
};


const decreaseQty = (itemId) => {
  let sum = 0
  setUser(prevUser => {
    const updatedCart = prevUser.cart.map(item => {
      if (item.itemId.trim() === itemId.trim() && item.quantity > 1) {
        console.log(item.price)
        sum = parseInt(item.price)
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updateUserCart(id,updatedCart)
    return { ...prevUser, cart: updatedCart };
  });
  setTotal(prev=>prev= prev-sum)
};

const handleDelete = async (index,price) => {
  const updatedCart = cartItem.filter((_, i) => i !== index);
  const updatedUserCart = currentUser.cart.filter((_,i)=> i!==index)
  setCartItem(updatedCart);
  setTotal((prev)=>prev-price)
  await updateUserCart(id, updatedUserCart);
};


  return (
    <div className="cart-page">
      <section className="h-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
              </div>

              {/* Example cart item */}
              <div className="card rounded-3 mb-4">
                {
                  cartItem.map(
                    (item,index)=>{
                      return(
                        <div className="card-body p-4" key={index}>
                        <div className="row d-flex justify-content-between align-items-center">
                          <div className="col-md-2 col-lg-1 col-xl-2">
                            <img
                              src={item.productImage}
                              className="img-fluid rounded-3 cart-img"
                              alt="Cart item"
                            />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <p className="lead fw-normal mb-2">{item.productName}</p>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button className="btn btn-link px-2">
                              <i className="fas fa-minus" style={{ color: "black" }}></i>
                            </button>

                            <div className="quantity-controls">
                              <button className="qty-btn" onClick={() => decreaseQty(item.id)}>-</button>
                              <span className="qty-display">{currentUser.cart[index].quantity}</span>
                              <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
                            </div>


                            <button className="btn btn-link px-2">
                              <i className="fas fa-plus" style={{ color: "black" }}></i>
                            </button>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">Rs. {currentUser.cart[index].quantity*parseInt(item.price)}</h5>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <button className="delete-btn-cart" onClick={()=>handleDelete(index,currentUser.cart[index].quantity*parseInt(item.price))}>
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                      )

                    }
                  )
                }
              </div>

              {/* Order total */}
              <div className="card mb-5">
                <div className="card-body p-4">
                  <div className="float-end">
                    <p className="mb-0 me-5 d-flex align-items-center">
                      <span className="text-muted me-2">Order total:</span>
                      <span className="lead fw-normal">Rs. {total}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout button */}
              <div className="card card-pay-btn">
                <div className="card-body">
                  <form>
                    <input
                      type="button"
                      className="btn proceed-to-pay-btn"
                      value="Proceed to Checkout"
                      onClick={()=>navigate("/checkout")}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
