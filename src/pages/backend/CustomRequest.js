import { useEffect, useState } from "react";
import { Search, Calendar, Package, Clock, CheckCircle, XCircle, Eye, ChevronDown, ChevronUp, MessageSquare, Phone, Mail, MapPin, Image } from "lucide-react";
import { getAllPendingCustomOrder, handleStatusChange } from "../../services/order";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CustomRequest = () => {
  const navigate=useNavigate();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedRequest, setExpandedRequest] = useState(null);

  useEffect(() => {
    getAllPendingCustomOrder().then((response)=>{
      setRequests(response);
      setFilteredRequests(response);
    })
    
  }, []);

  // Filter requests based on search and status
  useEffect(() => {
    let filtered = requests;

    if (searchQuery) {
      filtered = filtered.filter(request =>
        request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.cakeType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(request => request.status === selectedStatus);
    }

    setFilteredRequests(filtered);
  }, [searchQuery, selectedStatus, requests]);

  const handleStatusUpdate = (requestId, newStatus, price = 0, notes = "") => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: newStatus, 
            estimatedPrice: price,
            adminNotes: notes,
            processedAt: new Date()
          } 
        : request
    ));
    const updates = {
    status: newStatus,
    estimatedPrice: price,
    adminNotes: notes,
    processedAt: new Date().toISOString() // better for storing in JSON
    };

    handleStatusChange(requestId,updates).then((response)=>{
      
      console.log("changed the status");
    })
    
    // If accepted, you would typically move this to ManageCustomCake
    if (newStatus === 'accepted') {
      toast.success("The order is accepted and notified to the user.");
      navigate('/admin/customRequest');
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      accepted: "bg-green-100 text-green-800 border-green-200",
      declined: "bg-red-100 text-red-800 border-red-200"
    };

    const statusIcons = {
      pending: Clock,
      accepted: CheckCircle,
      declined: XCircle
    };

    const Icon = statusIcons[status];

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const RequestRow = ({ request }) => {
    const isExpanded = expandedRequest === request.id;
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [estimatedPrice, setEstimatedPrice] = useState("");
    const [adminNotes, setAdminNotes] = useState("");
    
    const handleAccept = () => {
      if (!estimatedPrice) {
        alert("Please enter an estimated price");
        return;
      }
      handleStatusUpdate(request.id, 'accepted', parseFloat(estimatedPrice), adminNotes);
      setShowAcceptModal(false);
      setEstimatedPrice("");
      setAdminNotes("");
    };

    const handleDecline = () => {
      const reason = prompt("Reason for declining (optional):");
      handleStatusUpdate(request.id, 'declined', 0, reason || "Declined by admin");
    };
    
    return (
      <>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="px-4 py-3">
            <div className="font-medium text-gray-900">{request.id}</div>
            <div className="text-xs text-gray-500">
              {new Date(request.submittedAt).toLocaleTimeString()}
            </div>
            {request.urgentOrder && (
              <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                Urgent
              </span>
            )}
          </td>
          <td className="px-4 py-3">
            <div className="font-medium text-gray-900">{request.customerName}</div>
            <div className="text-xs text-gray-500">{request.email}</div>
            <div className="text-xs text-gray-500">{request.phone}</div>
          </td>
          <td className="px-4 py-3">
            <div className="text-sm text-gray-900">
              <div className="text-xs text-gray-500">{request.flavor} • {request.size}</div>
              <div className="text-xs text-gray-500">{request.shape} • {request.layers} layer(s)</div>
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="text-sm text-gray-900">
              {new Date(request.deliveryDate).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500">{request.deliveryTime}</div>
          </td>
          <td className="px-4 py-3">
            {getStatusBadge(request.status)}
            {request.estimatedPrice > 0 && (
              <div className="text-sm font-medium text-gray-900 mt-1">
                Rs. {request.estimatedPrice}
              </div>
            )}
          </td>
          <td className="px-4 py-3">
            <div className="flex space-x-2">
              <button 
                onClick={() => setExpandedRequest(isExpanded ? null : request.id)}
                className="text-blue-600 hover:text-blue-800 transition flex items-center text-xs"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                {isExpanded ? 'Less' : 'View'}
              </button>
              {request.status === 'pending' && (
                <>
                  <button
                    onClick={() => setShowAcceptModal(true)}
                    className="text-green-600 hover:text-green-800 transition text-xs px-2 py-1 border border-green-300 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={handleDecline}
                    className="text-red-600 hover:text-red-800 transition text-xs px-2 py-1 border border-red-300 rounded"
                  >
                    Decline
                  </button>
                </>
              )}
            </div>
          </td>
        </tr>
        
        {/* Expanded Details */}
        {isExpanded && (
          <tr>
            <td colSpan="6" className="px-4 py-4 bg-gray-50 border-t">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Customer Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Customer Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Name:</span> {request.customerName}</div>
                    <div><span className="font-medium">Email:</span> {request.email}</div>
                    <div><span className="font-medium">Phone:</span> {request.phone}</div>
                  </div>
                </div>

                {/* Cake Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Cake Specifications
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Flavor:</span> {request.flavor}</div>
                    <div><span className="font-medium">Size:</span> {request.size}</div>
                    <div><span className="font-medium">Shape:</span> {request.shape}</div>
                    <div><span className="font-medium">Layers:</span> {request.layers}</div>
                    {request.message && <div><span className="font-medium">Message:</span> "{request.message}"</div>}
                    {request.theme && <div><span className="font-medium">Theme:</span> {request.theme}</div>}
                    {request.colors && <div><span className="font-medium">Colors:</span> {request.colors}</div>}
                  </div>
                </div>

                {/* Delivery & Special Requirements */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Delivery & Requirements
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Date:</span> {new Date(request.deliveryDate).toLocaleDateString()}</div>
                    <div><span className="font-medium">Time:</span> {request.deliveryTime}</div>
                    <div><span className="font-medium">Address:</span> {request.deliveryAddress}</div>
                    {request.dietaryRestrictions && <div><span className="font-medium">Dietary:</span> {request.dietaryRestrictions}</div>}
                    {request.specialDecorations && (
                      <div><span className="font-medium">Decorations:</span> {request.specialDecorations}</div>
                    )}
                    {request.additionalInstructions && (
                      <div><span className="font-medium">Instructions:</span> {request.additionalInstructions}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reference Photo Section */}
              {request.referencePhoto && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Image className="w-4 h-4 mr-2" />
                    Reference Photo
                  </h4>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <img 
                      src={request.referencePhoto} 
                      alt="Reference cake design" 
                      className="max-w-full h-auto rounded-lg shadow-sm max-h-64 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div style={{ display: 'none' }} className="text-gray-500 text-sm italic">
                      Reference photo could not be loaded
                    </div>
                  </div>
                </div>
              )}

              {request.adminNotes && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-900">Admin Notes:</div>
                  <div className="text-blue-800 text-sm">{request.adminNotes}</div>
                </div>
              )}
            </td>
          </tr>
        )}

        {/* Accept Modal */}
        {showAcceptModal && (
          <tr>
            <td colSpan="6">
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Accept Custom Cake Request</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Price (Rs.) *
                    </label>
                    <input
                      type="number"
                      value={estimatedPrice}
                      onChange={(e) => setEstimatedPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="2500"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes for Customer
                    </label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="We'll start working on your cake..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAccept}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Accept Request
                    </button>
                    <button
                      onClick={() => setShowAcceptModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        )}
      </>
    );
  };

  const DateSection = ({ title, requests, isToday = false }) => {
    if (requests.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Calendar className="w-4 h-4 mr-2 text-gray-600" />
          <h2 className={`text-lg font-semibold ${isToday ? 'text-yellow-800' : 'text-gray-700'}`}>
            {title} ({requests.length})
          </h2>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Request ID</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Customer</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Cake Details</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Delivery Date</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Status</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map(request => (
                <RequestRow key={request.id} request={request} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Group requests by date
  const groupRequestsByDate = (requests) => {
    const today = new Date();
    const groups = {
      today: [],
      older: {}
    };

    requests.forEach(request => {
      const requestDate = new Date(request.submittedAt);
      const isToday = requestDate.toDateString() === today.toDateString();

      if (isToday) {
        groups.today.push(request);
      } else {
        const dateKey = requestDate.toDateString();
        if (!groups.older[dateKey]) {
          groups.older[dateKey] = [];
        }
        groups.older[dateKey].push(request);
      }
    });

    return groups;
  };

  const groupedRequests = groupRequestsByDate(filteredRequests);

  return (
    <main className="flex-1 min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 md:mb-0">
          🎂 Custom Cake Requests
        </h1>
        <div className="text-sm text-gray-600">
          Total Requests: {filteredRequests.length}
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by customer name, request ID, email, or cake type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div className="md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests grouped by date */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No custom cake requests found</p>
        </div>
      ) : (
        <>
          <DateSection
            title="Today"
            requests={groupedRequests.today}
            isToday={true}
          />
          {Object.entries(groupedRequests.older)
            .sort(([a], [b]) => new Date(b) - new Date(a))
            .map(([date, requests]) => (
              <DateSection
                key={date}
                title={new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                requests={requests}
              />
            ))}
        </>
      )}
    </main>
  );
};

export default CustomRequest;