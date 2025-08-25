import React, { useEffect, useState } from 'react';
import '../../css/checkout.css';
import { getUserById } from '../../services/user';
import { getItemById } from '../../services/item';
import OrderSummaryRow from './OrderSummaryRow';
import { emptyCart, placeOrder } from '../../services/order';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Checkout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    paymentMethod: '',
    orderDate: new Date().toISOString(),
    specialEvent: false,
    eventDate: '',
    eventTime: '',
    specialInstructions: '',
    status: 'pending',
    orderItems: '',
    subtotal: '',
    shipping: '',
    specialEventFee: '',
    total: ''
  });

  const [error, setError] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    paymentMethod: '',
    eventDate: '',
    eventTime: ''
  });

  const [cartItems, setCartItems] = useState([]);

  // Load user and cart data
  useEffect(() => {
    let userId = localStorage.getItem("authToken");

    if (userId) {
      getUserById(userId).then((response) => {
        if (response.data) {
          setFormData((prev) => ({
            ...prev,
            orderItems: response.data.cart,
            email: response.data.email
          }));

          Promise.all(
            response.data.cart.map(async (data) => {
              const res = await getItemById(data.itemId);
              if (res.data.length > 0) {
                return {
                  name: res.data[0].productName,
                  price: data.price,
                  quantity: data.quantity,
                };
              }
              return null;
            })
          ).then((items) => {
            setCartItems(items.filter(Boolean)); // remove nulls
          });
        }
      });
    } else {
      navigate("/signup");
    }
  }, []);

  // Calculate totals
  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = 100;
    const specialEventFee = formData.specialEvent ? 200 : 0;
    const total = subtotal + shipping + specialEventFee;

    setFormData((prev) => ({
      ...prev,
      subtotal,
      shipping,
      specialEventFee,
      total,
    }));
  }, [cartItems, formData.specialEvent]);

  // Handle input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit order
  const handleSubmit = () => {
    let hasError = false;

    let validationError = {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      paymentMethod: '',
      eventDate: '',
      eventTime: ''
    };

    if (formData.email.trim() === '') {
      validationError.email = "Please enter your email";
      hasError = true;
    }
    if (formData.firstName.trim() === '') {
      validationError.firstName = "Please enter your first name";
      hasError = true;
    }
    if (formData.lastName.trim() === '') {
      validationError.lastName = "Please enter your last name";
      hasError = true;
    }
    if (formData.address.trim() === '') {
      validationError.address = "Please enter your address";
      hasError = true;
    }
    if (formData.phone.trim() === '') {
      validationError.phone = "Please enter your phone number";
      hasError = true;
    }
    if (formData.paymentMethod.trim() === '') {
      validationError.paymentMethod = "Please select a payment method";
      hasError = true;
    }

    if (formData.specialEvent === true) {
      if (formData.eventDate.trim() === '') {
        validationError.eventDate = "Please enter date to be delivered";
        hasError = true;
      }
      if (formData.eventTime.trim() === '') {
        validationError.eventTime = "Please enter time to be delivered";
        hasError = true;
      }
    }

    setError(validationError);

    if (!hasError) {
      placeOrder(formData).then(() => {
        let userId = localStorage.getItem("authToken");
        emptyCart(userId).then((response)=>{
          console.log("cart emptied");
          toast.success("Order placed successfully");
          navigate('/home');
        })
        
      });
    }
  };

  return (
    <div className="checkout-page">
      <header className="checkout-page__header">
        <div className="checkout-page__container">
          <h1 className="checkout-page__header-title">Checkout</h1>
        </div>
      </header>

      <div className="checkout-page__container">
        <div className="checkout-page__content">
          {/* Form Section */}
          <div className="checkout-page__form-section">
            {/* Contact Information */}
            <div className="checkout-page__section">
              <h2 className="checkout-page__section-title--first">
                Contact Information
              </h2>
              <div className="checkout-page__form-group">
                <label className="checkout-page__label">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="checkout-page__input"
                />
              </div>

              {/* Delivery Address */}
              <h2 className="checkout-page__section-title">Delivery Address</h2>
              <div className="checkout-page__form-row">
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="checkout-page__input"
                  />
                </div>
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="checkout-page__input"
                  />
                </div>
              </div>
              {error.firstName && <p className="error">{error.firstName}</p>}
              {error.lastName && <p className="error">{error.lastName}</p>}

              <div className="checkout-page__form-group">
                <label className="checkout-page__label">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="123 Sweet Street, Apartment 4B"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="checkout-page__input"
                />
              </div>
              {error.address && <p className="error">{error.address}</p>}

              <div className="checkout-page__form-group">
                <label className="checkout-page__label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+977 98XXXXXXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="checkout-page__input"
                />
              </div>
              {error.phone && <p className="error">{error.phone}</p>}
            </div>

            {/* Payment */}
            <div className="checkout-page__section">
              <h2 className="checkout-page__section-title">Payment</h2>
              <div className="checkout-page__payment-methods">
                <label
                  className={`checkout-page__payment-option ${
                    formData.paymentMethod === 'esewa'
                      ? 'checkout-page__payment-option--selected'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="esewa"
                    checked={formData.paymentMethod === 'esewa'}
                    onChange={handleInputChange}
                    className="checkout-page__radio"
                  />
                  Pay Using Esewa
                </label>

                <label
                  className={`checkout-page__payment-option ${
                    formData.paymentMethod === 'cash'
                      ? 'checkout-page__payment-option--selected'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="checkout-page__radio"
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>
            {error.paymentMethod && <p className="error">{error.paymentMethod}</p>}

            {/* Special Event */}
            <div className="checkout-page__section">
              <h2 className="checkout-page__section-title">Special Event</h2>
              <div className="checkout-page__form-group">
                <label className="checkout-page__checkbox-label">
                  <input
                    type="checkbox"
                    name="specialEvent"
                    checked={formData.specialEvent}
                    onChange={handleInputChange}
                    className="checkout-page__checkbox"
                  />
                  This is for a special event
                </label>
              </div>

              {formData.specialEvent && (
                <div className="checkout-page__special-event-section">
                  <div className="checkout-page__form-group">
                    <label className="checkout-page__label">Event Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="checkout-page__input"
                    />
                  </div>
                  {error.eventDate && <p className="error">{error.eventDate}</p>}

                  <div className="checkout-page__form-group">
                    <label className="checkout-page__label">Delivery Time</label>
                    <input
                      type="time"
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleInputChange}
                      className="checkout-page__input"
                    />
                  </div>
                  {error.eventTime && <p className="error">{error.eventTime}</p>}

                  <div className="checkout-page__form-group">
                    <label className="checkout-page__label">
                      Special Instructions
                    </label>
                    <textarea
                      name="specialInstructions"
                      placeholder="Any special requests..."
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      className="checkout-page__textarea"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-page__order-summary">
            <h2 className="checkout-page__section-title">Order Summary</h2>
            <div className="checkout-page__cart-items-container">
              <OrderSummaryRow items={cartItems} />
            </div>

            <div className="checkout-page__total-section">
              <div className="checkout-page__total-row">
                <span>Subtotal</span>
                <span>Rs.{formData.subtotal.toLocaleString()}</span>
              </div>
              <div className="checkout-page__total-row">
                <span>Delivery</span>
                <span>Rs.{formData.shipping}</span>
              </div>
              {formData.specialEvent && (
                <div className="checkout-page__total-row">
                  <span>Event Service</span>
                  <span>Rs.{formData.specialEventFee}</span>
                </div>
              )}
              <div className="checkout-page__total-row checkout-page__final-total">
                <span>Total</span>
                <span>Rs.{formData.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="checkout-page__security-note">
              Your payment information is secure and encrypted
            </div>

            <button className="checkout-page__button" onClick={handleSubmit}>
              Place Order - Rs.{formData.total.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
