// // ManageOrders.jsx
// import "../../css/manageOrderStyle.css"
// import React, { useState } from 'react';

// export default function ManageOrder() {
//   const [activeNav, setActiveNav] = useState('Manage Order');
//   const [orders, setOrders] = useState([
//     { id: 1, customer: 'Alice', items: 'Cake x2', total: '$20', status: 'Pending' },
//     { id: 2, customer: 'Bob', items: 'Cookie x5', total: '$15', status: 'Completed' },
//     { id: 3, customer: 'Charlie', items: 'Cake x1, Cookie x2', total: '$18', status: 'Pending' }
//   ]);

//   const navClick = (label, e) => {
//     e.preventDefault();
//     if(label === 'Logout') {
//       window.alert('Logout to be implemented');
//       return;
//     }
//     setActiveNav(label);
//   };

//   const updateStatus = (id, newStatus) => {
//     setOrders(prev => prev.map(order => order.id === id ? {...order, status: newStatus} : order));
//   };

//   return (
//     <div className="container">
//       <main className="main-content">
//         <div className="header">
//           <h2 className="page-title">Manage Orders</h2>
//         </div>
//         <div className="orders-table-container">
//           <table className="orders-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Customer</th>
//                 <th>Items</th>
//                 <th>Total</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map(order => (
//                 <tr key={order.id}>
//                   <td>{order.id}</td>
//                   <td>{order.customer}</td>
//                   <td>{order.items}</td>
//                   <td>{order.total}</td>
//                   <td>{order.status}</td>
//                   <td>
//                     {order.status !== 'Completed' && <button className="btn btn-primary" onClick={()=>updateStatus(order.id,'Completed')}>Mark Completed</button>}
//                     {order.status !== 'Cancelled' && <button className="btn btn-secondary" onClick={()=>updateStatus(order.id,'Cancelled')}>Cancel</button>}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }
export default function ManageOrder() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 text-center">
        Coffee Cottage Admin
      </h1>
    </div>
  );
}
