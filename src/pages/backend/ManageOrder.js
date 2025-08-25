import { useEffect, useState } from "react";
import { Search, Calendar, Package, Clock, CheckCircle, XCircle, Eye, ChevronUp } from "lucide-react";
import "../../css/manageOrder.css"; // <-- scoped CSS

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD-001",
        customerName: "John Doe",
        customerEmail: "john@example.com",
        items: [
          { name: "Pizza Margherita", quantity: 2, price: 15.99 },
          { name: "Coke", quantity: 1, price: 2.50 },
          { name: "Garlic Bread", quantity: 1, price: 4.99 }
        ],
        total: 39.47,
        status: "pending",
        createdAt: new Date(),
        phone: "+1234567890",
        address: "123 Main St, City, State 12345",
        notes: "Extra cheese on pizza"
      },
      {
        id: "ORD-002",
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        items: [
          { name: "Burger Deluxe", quantity: 3, price: 12.99 },
          { name: "French Fries", quantity: 2, price: 4.50 },
          { name: "Chocolate Shake", quantity: 2, price: 5.99 }
        ],
        total: 62.95,
        status: "preparing",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        phone: "+1234567891",
        address: "456 Oak Ave, City, State 12345",
        notes: "No pickles on burgers"
      },
      {
        id: "ORD-003",
        customerName: "Mike Johnson",
        customerEmail: "mike@example.com",
        items: [
          { name: "Chicken Pasta", quantity: 1, price: 16.99 },
          { name: "Caesar Salad", quantity: 2, price: 8.50 },
          { name: "Iced Tea", quantity: 1, price: 2.99 }
        ],
        total: 36.98,
        status: "pending",
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        phone: "+1234567892",
        address: "789 Pine Rd, City, State 12345",
        notes: ""
      },
      {
        id: "ORD-004",
        customerName: "Sarah Wilson",
        customerEmail: "sarah@example.com",
        items: [
          { name: "Sushi Combo", quantity: 1, price: 24.99 },
          { name: "Miso Soup", quantity: 2, price: 4.50 },
          { name: "Green Tea", quantity: 1, price: 2.99 }
        ],
        total: 37.48,
        status: "preparing",
        createdAt: new Date(Date.now() - 45 * 60 * 1000),
        phone: "+1234567893",
        address: "321 Elm St, City, State 12345",
        notes: "Spicy mayo on the side"
      },
      {
        id: "ORD-005",
        customerName: "Alex Brown",
        customerEmail: "alex@example.com",
        items: [
          { name: "Steak Dinner", quantity: 1, price: 28.99 },
          { name: "Mashed Potatoes", quantity: 1, price: 5.99 },
          { name: "Red Wine", quantity: 1, price: 12.00 }
        ],
        total: 46.98,
        status: "pending",
        createdAt: new Date(Date.now() - 10 * 60 * 1000),
        phone: "+1234567894",
        address: "654 Maple Dr, City, State 12345",
        notes: "Medium rare steak"
      },
      {
        id: "ORD-006",
        customerName: "Lisa Davis",
        customerEmail: "lisa@example.com",
        items: [
          { name: "Veggie Pizza", quantity: 1, price: 14.99 },
          { name: "Side Salad", quantity: 1, price: 6.50 }
        ],
        total: 21.49,
        status: "cancelled",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        phone: "+1234567895",
        address: "987 Cedar Lane, City, State 12345",
        notes: "Cancelled due to ingredient unavailability"
      }
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }

    setFilteredOrders(filtered);
  }, [searchQuery, selectedStatus, orders]);

  const groupOrdersByDate = (orders) => {
    const today = new Date();
    const activeOrders = orders.filter(order => order.status !== 'completed');

    const groups = { today: [], older: {} };

    activeOrders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const isToday = orderDate.toDateString() === today.toDateString();

      if (isToday) {
        groups.today.push(order);
      } else {
        const dateKey = orderDate.toDateString();
        if (!groups.older[dateKey]) groups.older[dateKey] = [];
        groups.older[dateKey].push(order);
      }
    });

    return groups;
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusBadge = (status) => {
    const statusIcons = {
      pending: Clock,
      preparing: Package,
      completed: CheckCircle,
      cancelled: XCircle
    };
    const Icon = statusIcons[status];
    return (
      <span className={`status-badge ${status}`}>
        <Icon className="icon-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const OrderRow = ({ order }) => {
    const isExpanded = expandedOrder === order.id;

    return (
      <>
        <tr className="mo-row">
          <td className="mo-td">
            <div className="mo-strong">{order.id}</div>
            <div className="mo-xs mo-muted">
              {new Date(order.createdAt).toLocaleTimeString()}
            </div>
          </td>
          <td className="mo-td">
            <div className="mo-strong">{order.customerName}</div>
            <div className="mo-sm mo-muted">{order.customerEmail}</div>
            <div className="mo-xs mo-muted">{order.phone}</div>
          </td>
          <td className="mo-td">
            <div className="mo-sm mo-dark">
              {order.items.slice(0, 2).map((item, index) => (
                <div key={index} className="mb-1">
                  {item.quantity}x {item.name}
                </div>
              ))}
              {order.items.length > 2 && (
                <div className="mo-xs mo-muted">
                  +{order.items.length - 2} more items
                </div>
              )}
            </div>
          </td>
          <td className="mo-td">
            <div className="mo-strong">${order.total}</div>
          </td>
          <td className="mo-td">
            {getStatusBadge(order.status)}
          </td>
          <td className="mo-td">
            <div className="mo-actions">
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                className="mo-view-btn"
              >
                {isExpanded ? <ChevronUp className="icon-4 mr-1" /> : <Eye className="icon-4 mr-1" />}
                {isExpanded ? 'Less' : 'View'}
              </button>
              <select
                value={order.status}
                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                className="mo-status-select"
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </td>
        </tr>
        {isExpanded && (
          <tr>
            <td colSpan="6" className="mo-expanded-cell">
              <div className="mo-details-grid">
                <div>
                  <h4 className="mo-section-title">Order Details</h4>
                  <div className="mo-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="mo-item">
                        <div>
                          <span className="mo-strong">{item.name}</span>
                          <span className="mo-muted ml-2">x{item.quantity}</span>
                        </div>
                        <span className="mo-strong">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="mo-total-row">
                      <span>Total</span>
                      <span>${order.total}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mo-section-title">Customer Information</h4>
                  <div className="mo-customer">
                    <div><span className="mo-label">Name:</span><span className="mo-value">{order.customerName}</span></div>
                    <div><span className="mo-label">Email:</span><span className="mo-value">{order.customerEmail}</span></div>
                    <div><span className="mo-label">Phone:</span><span className="mo-value">{order.phone}</span></div>
                    <div><span className="mo-label">Address:</span><span className="mo-value">{order.address}</span></div>
                    {order.notes && (
                      <div><span className="mo-label">Notes:</span><span className="mo-value">{order.notes}</span></div>
                    )}
                    <div>
                      <span className="mo-label">Order Time:</span>
                      <span className="mo-value">{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        )}
      </>
    );
  };

  const DateSection = ({ title, orders, isToday = false }) => {
    if (orders.length === 0) return null;

    return (
      <div className="mo-date-section">
        <div className="mo-date-header">
          <Calendar className="icon-4 mr-2 text-gray-600" />
          <h2 className={`mo-date-title ${isToday ? 'is-today' : ''}`}>
            {title} ({orders.length})
          </h2>
        </div>
        <div className="mo-table-wrap">
          <table className="mo-table">
            <thead className="mo-thead">
              <tr>
                <th className="mo-th">Order ID</th>
                <th className="mo-th">Customer</th>
                <th className="mo-th">Items</th>
                <th className="mo-th">Total</th>
                <th className="mo-th">Status</th>
                <th className="mo-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const groupedOrders = groupOrdersByDate(filteredOrders);

  return (
    <main className="manage-order-page">
      <div className="mo-header">
        <h1 className="mo-title">Manage Orders</h1>
        <div className="mo-total">Total Orders: {filteredOrders.length}</div>
      </div>

      <div className="mo-panel">
        <div className="mo-controls">
          <div className="mo-search">
            <Search className="mo-search-icon" />
            <input
              type="text"
              placeholder="Search by customer name, order ID, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mo-input"
            />
          </div>
          <div className="mo-status">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="mo-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="mo-empty">
          <Package className="icon-12 mo-empty-icon" />
          <p className="mo-empty-text">No orders found</p>
        </div>
      ) : (
        <>
          <DateSection title="Today" orders={groupedOrders.today} isToday={true} />
          {Object.entries(groupedOrders.older)
            .sort(([a], [b]) => new Date(b) - new Date(a))
            .map(([date, orders]) => (
              <DateSection
                key={date}
                title={new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                orders={orders}
              />
            ))}
        </>
      )}
    </main>
  );
};

export default ManageOrder;
