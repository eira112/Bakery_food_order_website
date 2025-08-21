import React, { useLayoutEffect, useState } from "react";
import "../../css/cart.css"; // scoped CSS
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getUserById } from "../../services/user";
import { getItemById } from "../../services/item";

function Cart() {
  const id = localStorage.getItem("authToken")
  const navigate = useNavigate()
  const [cartItem, setCartItem] = useState([])

  useLayoutEffect(() => {
  console.log(id);
  if (!id) {
    toast.error("Login first to view cart");
    navigate("/login");
  } else {
    getUserById(id).then(async (response) => {
      if (response.data) {
        const cart = response.data.cart || [];

        // Fetch all items in parallel
        const menuItems = await Promise.all(
          cart.map(async (item,index) => {
            const itemData = (await getItemById(item.itemId)).data;
            itemData[index].quantity = item.quantity
            return itemData[index]
          })
        );

        setCartItem(menuItems);
      
      }
    });
  }
}, [id, navigate]);

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
                      console.log(item)
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
                            <p>No. of Drinks: 1</p>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button className="btn btn-link px-2">
                              <i className="fas fa-minus" style={{ color: "black" }}></i>
                            </button>

                            <input
                              min="1"
                              name="quantity"
                              value={item.quantity}
                              type="number"
                              className="form-control form-control-sm"
                            />

                            <button className="btn btn-link px-2">
                              <i className="fas fa-plus" style={{ color: "black" }}></i>
                            </button>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">Rs. {item.price}</h5>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <button className="delete-btn-cart">
                              <i className="fas fa-trash fa-lg"></i>
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
                      <span className="lead fw-normal">Rs. 250</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout button */}
              <div className="card card-pay-btn">
                <div className="card-body">
                  <form>
                    <input
                      type="submit"
                      className="btn proceed-to-pay-btn"
                      value="Proceed to Checkout"
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
