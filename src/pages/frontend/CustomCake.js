import React, { useState, useEffect } from 'react';
import { fileToBase64} from '../../services/item';
import '../../css/customCake.css';
import {placeCustomOrder} from '../../services/order';
import { useNavigate} from 'react-router';

const CustomCake = () => {
  const navigate=useNavigate();
  const authToken = localStorage.getItem('authToken');
  const [formData, setFormData] = useState({
    userID:'',
    customerName: '',
    email: '',
    phone: '',
    flavor: '',
    size: '',
    shape: 'round',
    layers: '1',
    theme: '',
    colors: '',
    message: '',
    specialDecorations: '',
    referencePhoto: null,
    additionalInstructions: '',
    
    // Delivery Details
    deliveryDate: '',
    deliveryTime: '',
    deliveryAddress: '',
    city: '',
    status:'pending',
    estimatedPrice: '',
    adminNotes:'',
    processedAt:''
  });


  const flavors = [
    'Vanilla',
    'Chocolate',
    'Red Velvet',
    'Strawberry',
    'Lemon',
    'Carrot',
    'Funfetti',
    'Black Forest',
    'Tiramisu',
    'Cheesecake',
    'Custom Flavor (specify in instructions)'
  ];

  const sizes = [
    '1 pound',
    '2 pounds',
    '3 pounds',
    '4 pounds',
    '5 pounds',
    'Custom size (specify in instructions)'
  ];

  const shapes = [
    'Round',
    'Square', 
    'Rectangle',
    'Heart',
    'Number/Letter',
    'Custom Shape (specify in instructions)'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (authToken) {
      setFormData(prev => ({
        ...prev,
        userID: authToken
      }));
    }
  }, [authToken]);

  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    if(file){
      const base64Image = await fileToBase64(file)
      setFormData(prev => ({
        ...prev,
        ['referencePhoto']: base64Image
      }));
    }
    
  };

  const handleSubmit = () => {
    placeCustomOrder(formData).then((response)=>{
      alert('Your custom cake request has been submitted! We will contact you within 24 hours with pricing and confirmation.');
      navigate('/home');
    })
    
  };

  return (
    <div className="custom-cake-page">
      {/* Header */}
      <div className="custom-cake-header">
        <div className="custom-cake-container">
          <h1 className="custom-cake-header-title">🧁 Custom Cake 🎂</h1>
          <p className="custom-cake-header-subtitle">Let's whisk up something amazing together!</p>
        </div>
      </div>

      <div className="custom-cake-container">
        <div className="custom-cake-content">
          {/* Pricing Notice */}
          <div className="custom-cake-price-notice">
            <div className="custom-cake-price-notice-title">Custom Pricing</div>
            <div className="custom-cake-price-notice-text">
              Each custom cake is uniquely priced based on your specifications. 
              We'll contact you within 24 hours with a detailed quote and timeline.
            </div>
          </div>

          {/* Main Form */}
          <div className="custom-cake-section">
            <h2 className="custom-cake-first-section-title">
              <span>👤</span> Contact Information
            </h2>
            <div className="custom-cake-form-row">
              <div className="custom-cake-form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="customerName"
                  placeholder="John Doe"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="custom-cake-form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+977 98XXXXXXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="custom-cake-form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <h2 className="custom-cake-section-title">
              <span>🍰</span> Cake Details
            </h2>
            <div className="custom-cake-form-row">
              <div className="custom-cake-form-group">
                <label>Flavor *</label>
                <select
                  name="flavor"
                  value={formData.flavor}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select flavor</option>
                  {flavors.map(flavor => (
                    <option key={flavor} value={flavor}>{flavor}</option>
                  ))}
                </select>
              </div>
              <div className="custom-cake-form-group">
                <label>Size *</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="custom-cake-form-row">
              <div className="custom-cake-form-group">
                <label>Shape *</label>
                <select
                  name="shape"
                  value={formData.shape}
                  onChange={handleInputChange}
                  required
                >
                  {shapes.map(shape => (
                    <option key={shape} value={shape.toLowerCase()}>{shape}</option>
                  ))}
                </select>
              </div>
              <div className="custom-cake-form-group">
                <label>Layers</label>
                <select
                  name="layers"
                  value={formData.layers}
                  onChange={handleInputChange}
                >
                  <option value="1">Single Layer</option>
                  <option value="2">2 Layers</option>
                  <option value="3">3 Layers</option>
                  <option value="4">4+ Layers</option>
                </select>
              </div>
            </div>

            <h2 className="custom-cake-section-title">
              <span>🎨</span> Design
            </h2>
            <div className="custom-cake-form-group">
              <label>Message on Cake</label>
              <input
                type="text"
                name="message"
                placeholder="e.g. Happy Birthday Sarah!"
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>

            <div className="custom-cake-form-row">
              <div className="custom-cake-form-group">
                <label>Theme/Style</label>
                <input
                  type="text"
                  name="theme"
                  placeholder="e.g. Princess theme, elegant, rustic"
                  value={formData.theme}
                  onChange={handleInputChange}
                />
              </div>
              <div className="custom-cake-form-group">
                <label>Colors</label>
                <input
                  type="text"
                  name="colors"
                  placeholder="e.g. Pink and gold"
                  value={formData.colors}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="custom-cake-form-group">
              <label>Special Decorations</label>
              <textarea
                name="specialDecorations"
                placeholder="Describe any specific decorations you'd like..."
                value={formData.specialDecorations}
                onChange={handleInputChange}
              />
            </div>

            <h2 className="custom-cake-section-title">
              <span>📝</span> Additional Details
            </h2>
            <div className="custom-cake-form-group">
              <label>Reference Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="custom-cake-form-group">
              <label>Special Instructions</label>
              <textarea
                name="additionalInstructions"
                placeholder="Any dietary restrictions, allergies, or other requirements..."
                value={formData.additionalInstructions}
                onChange={handleInputChange}
              />
            </div>

            <h2 className="custom-cake-section-title">
              <span>🚚</span> Delivery
            </h2>
            <div className="custom-cake-form-row">
              <div className="custom-cake-form-group">
                <label>Date *</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="custom-cake-form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="custom-cake-form-group">
              <label>Address *</label>
              <textarea
                name="deliveryAddress"
                placeholder="Full address"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                required
              />
            </div>


            <button 
              onClick={handleSubmit}
              className="custom-cake-button"
            >
              🎂 Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCake;
