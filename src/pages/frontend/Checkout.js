import React, { useState } from 'react';
import '../../css/checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    specialEvent: false,
    eventType: '',
    eventDate: '',
    eventTime: '',
    specialInstructions: ''
  });

  const [cartItems] = useState([
    { id: 1, name: 'Custom Chocolate Celebration Cake', price: 1500, quantity: 1, customization: 'Heart shape, "Happy Anniversary" message' },
    { id: 2, name: 'Vanilla Cupcakes', price: 90, quantity: 12, customization: 'Pink frosting, edible flowers' },
    { id: 3, name: 'Red Velvet Cake', price: 1200, quantity: 1, customization: 'Round 8-inch, cream cheese frosting' }
  ]);

  const eventTypes = [
    'Birthday Party', 'Anniversary', 'Wedding', 'Baby Shower', 'Graduation', 'Corporate Event', 'Holiday Celebration', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 100;
  const specialEventFee = formData.specialEvent ? 200 : 0;
  const total = subtotal + shipping + specialEventFee;

  const handleSubmit = () => {
    console.log('Order submitted:', formData);
    alert('Your order has been placed successfully!');
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
          <div className="checkout-page__form-section">

            {/* Contact Information */}
            <div className="checkout-page__section">
              <h2 className="checkout-page__section-title--first">Contact Information</h2>
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

              <div className="checkout-page__form-row">
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Kathmandu"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="checkout-page__input"
                  />
                </div>
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="44600"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="checkout-page__input"
                  />
                </div>
              </div>

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

            </div>

            {/* Payment */}
            <div className="checkout-page__section">
              <h2 className="checkout-page__section-title">Payment</h2>
              <div className="checkout-page__payment-methods">
                <label className={`checkout-page__payment-option ${formData.paymentMethod === 'card' ? 'checkout-page__payment-option--selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="checkout-page__radio"
                  />
                  Credit/Debit Card
                </label>
                <label className={`checkout-page__payment-option ${formData.paymentMethod === 'cash' ? 'checkout-page__payment-option--selected' : ''}`}>
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

              {formData.paymentMethod === 'card' && (
                <div>
                  <div className="checkout-page__form-group">
                    <label className="checkout-page__label">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="checkout-page__input"
                    />
                  </div>
                  <div className="checkout-page__form-group">
                    <label className="checkout-page__label">Name on Card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      placeholder="John Doe"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className="checkout-page__input"
                    />
                  </div>
                  <div className="checkout-page__form-row">
                    <div className="checkout-page__form-group">
                      <label className="checkout-page__label">Expiry</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="checkout-page__input"
                      />
                    </div>
                    <div className="checkout-page__form-group">
                      <label className="checkout-page__label">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="checkout-page__input"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

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
                  <div className="checkout-page__form-row">
                    <div className="checkout-page__form-group">
                      <label className="checkout-page__label">Event Type</label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="checkout-page__select"
                      >
                        <option value="">Select event type</option>
                        {eventTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
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
                  </div>
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
                  <div className="checkout-page__form-group">
                    <label className="checkout-page__label">Special Instructions</label>
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

            <button className="checkout-page__button" onClick={handleSubmit}>
              Place Order - Rs.{total.toLocaleString()}
            </button>
          </div>

          {/* Order Summary */}
          <div className="checkout-page__order-summary">
            <h2 className="checkout-page__section-title">Order Summary</h2>
            <div className="checkout-page__cart-items-container">
              {cartItems.map((item, index) => (
                <div key={item.id} className={`checkout-page__cart-item ${index === cartItems.length - 1 ? 'checkout-page__cart-item--last' : ''}`}>
                  <div className="checkout-page__item-details">
                    <div className="checkout-page__item-name">{item.name}</div>
                    <div className="checkout-page__item-customization">{item.customization}</div>
                    <div className="checkout-page__item-qty">Qty: {item.quantity}</div>
                  </div>
                  <div className="checkout-page__item-price">
                    Rs.{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-page__total-section">
              <div className="checkout-page__total-row">
                <span>Subtotal</span>
                <span>Rs.{subtotal.toLocaleString()}</span>
              </div>
              <div className="checkout-page__total-row">
                <span>Delivery</span>
                <span>Rs.{shipping}</span>
              </div>
              {formData.specialEvent && (
                <div className="checkout-page__total-row">
                  <span>Event Service</span>
                  <span>Rs.{specialEventFee}</span>
                </div>
              )}
              <div className="checkout-page__total-row checkout-page__final-total">
                <span>Total</span>
                <span>Rs.{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="checkout-page__security-note">
              Your payment information is secure and encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
