import React, { useState, useMemo } from 'react';
import { Search, Calendar, MapPin, CreditCard, Package, Clock, Star } from 'lucide-react';
import '../../css/myOrder.css';

const MyOrder = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for regular orders
  const [regularOrders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 2890,
      items: [
        { name: 'Custom Chocolate Celebration Cake', price: 1500, quantity: 1, customization: 'Heart shape, "Happy Anniversary" message' },
        { name: 'Vanilla Cupcakes', price: 90, quantity: 12, customization: 'Pink frosting, edible flowers' },
        { name: 'Red Velvet Cake', price: 1200, quantity: 1, customization: 'Round 8-inch, cream cheese frosting' }
      ],
      deliveryAddress: '123 Sweet Street, Apartment 4B, Kathmandu',
      paymentMethod: 'Credit Card',
      specialEvent: true,
      eventType: 'Anniversary',
      eventDate: '2024-01-16'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'In Progress',
      total: 1570,
      items: [
        { name: 'Chocolate Cake', price: 150, quantity: 2, customization: 'Standard' },
        { name: 'Cheesecake', price: 170, quantity: 3, customization: 'New York style' },
        { name: 'Strawberry Tart', price: 140, quantity: 5, customization: 'Fresh strawberries on crust' }
      ],
      deliveryAddress: '456 Baker Avenue, Lalitpur',
      paymentMethod: 'Cash on Delivery',
      specialEvent: false
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-25',
      status: 'Pending',
      total: 680,
      items: [
        { name: 'Vanilla Cupcakes', price: 90, quantity: 6, customization: 'Rainbow frosting' },
        { name: 'Red Velvet Cake', price: 120, quantity: 1, customization: 'Standard' }
      ],
      deliveryAddress: '789 Cake Corner, Bhaktapur',
      paymentMethod: 'Credit Card',
      specialEvent: true,
      eventType: 'Birthday Party',
      eventDate: '2024-01-28'
    }
  ]);

  // Mock data for custom cake orders
  const [customOrders] = useState([
    {
      id: 'CUSTOM-2024-001',
      date: '2024-01-10',
      status: 'Completed',
      customerName: 'Sarah Johnson',
      phone: '+977 9812345678',
      email: 'sarah.johnson@email.com',
      cakeDetails: {
        flavor: 'Vanilla',
        size: '3 pounds',
        shape: 'Heart',
        layers: '2',
        message: 'Happy 25th Birthday Sarah!',
        theme: 'Princess theme',
        colors: 'Pink and gold'
      },
      deliveryDate: '2024-01-12',
      deliveryTime: '14:00',
      deliveryAddress: '321 Royal Street, Kathmandu',
      urgentOrder: false,
      finalPrice: 2500,
      specialInstructions: 'Please add edible pearls and make it extra sweet'
    },
    {
      id: 'CUSTOM-2024-002',
      date: '2024-01-18',
      status: 'Quote Sent',
      customerName: 'Mike Wilson',
      phone: '+977 9876543210',
      email: 'mike.wilson@email.com',
      cakeDetails: {
        flavor: 'Chocolate',
        size: '5 pounds',
        shape: 'Custom Shape (Car)',
        layers: '3',
        message: 'Happy 8th Birthday Alex!',
        theme: 'Race car theme',
        colors: 'Red and black'
      },
      deliveryDate: '2024-01-22',
      deliveryTime: '16:00',
      deliveryAddress: '654 Speed Lane, Patan',
      urgentOrder: true,
      quotedPrice: 3500,
      specialInstructions: 'Make it look like a Ferrari, son loves cars'
    },
    {
      id: 'CUSTOM-2024-003',
      date: '2024-01-22',
      status: 'In Production',
      customerName: 'Emma Davis',
      phone: '+977 9998887776',
      email: 'emma.davis@email.com',
      cakeDetails: {
        flavor: 'Red Velvet',
        size: '4 pounds',
        shape: 'Round',
        layers: '3',
        message: 'Congratulations Graduate!',
        theme: 'Graduation theme',
        colors: 'Navy blue and gold'
      },
      deliveryDate: '2024-01-26',
      deliveryTime: '12:00',
      deliveryAddress: '987 University Road, Kathmandu',
      urgentOrder: false,
      finalPrice: 2800,
      specialInstructions: 'Please include a small graduation cap decoration on top'
    }
  ]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'completed':
        return 'my-order-status--delivered';
      case 'in progress':
      case 'in production':
        return 'my-order-status--progress';
      case 'pending':
      case 'quote sent':
        return 'my-order-status--pending';
      default:
        return 'my-order-status--delivered';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'completed':
        return <Package className="w-3 h-3" />;
      case 'in progress':
      case 'in production':
        return <Clock className="w-3 h-3" />;
      case 'pending':
      case 'quote sent':
        return <Calendar className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Filter orders based on search query
  const filteredRegularOrders = useMemo(() => {
    if (!searchQuery) return regularOrders;
    return regularOrders.filter(order => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      order.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [regularOrders, searchQuery]);

  const filteredCustomOrders = useMemo(() => {
    if (!searchQuery) return customOrders;
    return customOrders.filter(order => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.cakeDetails.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.cakeDetails.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customOrders, searchQuery]);

  return (
    <div className="my-order-page">
      {/* Header */}
      <div className="my-order-header">
        <div className="my-order-container">
          <h1 className="my-order-title">My Orders</h1>
          <p className="my-order-subtitle">Track your cake orders and requests</p>
        </div>
      </div>

      <div className="my-order-content-container">
        {/* Search and Tabs */}
        <div className="my-order-controls">
          <div className="my-order-controls-wrapper">
            {/* Search */}
            <div className="my-order-search-container">
              <Search className="my-order-search-icon" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="my-order-search-input"
              />
            </div>

            {/* Tab Navigation */}
            <div className="my-order-tabs">
              <button 
                className={`my-order-tab ${activeTab === 'orders' ? 'my-order-tab--active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Regular Orders ({filteredRegularOrders.length})
              </button>
              <button 
                className={`my-order-tab ${activeTab === 'custom' ? 'my-order-tab--active' : ''}`}
                onClick={() => setActiveTab('custom')}
              >
                Custom Orders ({filteredCustomOrders.length})
              </button>
            </div>
          </div>
        </div>

        {/* Regular Orders */}
        {activeTab === 'orders' && (
          <div className="my-order-list">
            {filteredRegularOrders.length === 0 ? (
              <div className="my-order-empty">
                <Package className="my-order-empty-icon" />
                <p className="my-order-empty-text">
                  {searchQuery ? 'No orders found matching your search' : 'No orders yet'}
                </p>
                {!searchQuery && (
                  <a href="/" className="my-order-empty-button">
                    Start Shopping
                  </a>
                )}
              </div>
            ) : (
              filteredRegularOrders.map(order => (
                <div key={order.id} className="my-order-card">
                  <div className="my-order-card-content">
                    {/* Order Header */}
                    <div className="my-order-card-header">
                      <div className="my-order-card-header-left">
                        <h3 className="my-order-card-title">{order.id}</h3>
                        <span className={`my-order-status ${getStatusClass(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span>{order.status}</span>
                        </span>
                      </div>
                      <div className="my-order-card-date">{formatDate(order.date)}</div>
                    </div>

                    {/* Order Items */}
                    <div className="my-order-items">
                      <div className="my-order-items-count">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </div>
                      <div className="my-order-items-list">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="my-order-item">
                            <span className="my-order-item-name">{item.name} × {item.quantity}</span>
                            <span className="my-order-item-price">Rs.{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="my-order-items-more">
                            +{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="my-order-details">
                      <div className="my-order-detail-item">
                        <MapPin className="w-4 h-4" />
                        <span className="my-order-detail-text">{order.deliveryAddress}</span>
                      </div>
                      <div className="my-order-detail-item">
                        <CreditCard className="w-4 h-4" />
                        <span>{order.paymentMethod}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="my-order-footer">
                      <div className="my-order-total">
                        Rs.{order.total.toLocaleString()}
                      </div>
                      <div className="my-order-actions">
                        <button className="my-order-btn my-order-btn--secondary">
                          View Details
                        </button>
                        {order.status.toLowerCase() === 'delivered' && (
                          <button className="my-order-btn my-order-btn--primary">
                            Reorder
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Custom Orders */}
        {activeTab === 'custom' && (
          <div className="my-order-list">
            {filteredCustomOrders.length === 0 ? (
              <div className="my-order-empty">
                <Star className="my-order-empty-icon" />
                <p className="my-order-empty-text">
                  {searchQuery ? 'No custom orders found matching your search' : 'No custom orders yet'}
                </p>
                {!searchQuery && (
                  <a href="/customCake" className="my-order-empty-button">
                    Create Custom Cake
                  </a>
                )}
              </div>
            ) : (
              filteredCustomOrders.map(order => (
                <div key={order.id} className="my-order-card">
                  <div className="my-order-card-content">
                    {/* Order Header */}
                    <div className="my-order-card-header">
                      <div className="my-order-card-header-left">
                        <h3 className="my-order-card-title">{order.id}</h3>
                        <span className={`my-order-status ${getStatusClass(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span>{order.status}</span>
                        </span>
                        {order.urgentOrder && (
                          <span className="my-order-status my-order-urgent">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="my-order-card-date">{formatDate(order.date)}</div>
                    </div>

                    {/* Customer & Cake Info */}
                    <div className="my-order-customer-grid">
                      <div>
                        <div className="my-order-customer-name">{order.customerName}</div>
                        <div className="my-order-customer-phone">{order.phone}</div>
                      </div>
                      <div>
                        <div className="my-order-cake-info">
                          {order.cakeDetails.flavor} • {order.cakeDetails.size} • {order.cakeDetails.shape}
                        </div>
                        <div className="my-order-cake-theme">{order.cakeDetails.theme}</div>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="my-order-details">
                      <div className="my-order-detail-item">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(order.deliveryDate)} at {formatTime(order.deliveryTime)}</span>
                      </div>
                      <div className="my-order-detail-item">
                        <MapPin className="w-4 h-4" />
                        <span className="my-order-detail-text">{order.deliveryAddress}</span>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    {order.specialInstructions && (
                      <div className="my-order-instructions">
                        <div className="my-order-instructions-label">Special Instructions:</div>
                        <div className="my-order-instructions-text">"{order.specialInstructions}"</div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="my-order-footer">
                      <div className="my-order-total">
                        {order.finalPrice ? (
                          `Rs.${order.finalPrice.toLocaleString()}`
                        ) : order.quotedPrice ? (
                          `Rs.${order.quotedPrice.toLocaleString()} (Quote)`
                        ) : (
                          'Price Pending'
                        )}
                      </div>
                      <div className="my-order-actions">
                        <button className="my-order-btn my-order-btn--secondary">
                          View Details
                        </button>
                        {order.status.toLowerCase() === 'quote sent' && (
                          <button className="my-order-btn my-order-btn--success">
                            Accept Quote
                          </button>
                        )}
                        {order.status.toLowerCase() === 'completed' && (
                          <button className="my-order-btn my-order-btn--primary">
                            Order Similar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;