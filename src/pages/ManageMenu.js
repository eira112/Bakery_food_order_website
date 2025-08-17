
import "../css/manageMenuStyle.css";

const menuData = [
  {
    id: 1,
    name: "Chocolate Cake",
    image: "https://via.placeholder.com/40",
    description: "Rich chocolate cake with creamy frosting",
    category: "Cakes",
    price: 35.0,
    stock: 10
  },
  {
    id: 2,
    name: "Vanilla Cupcakes",
    image: "https://via.placeholder.com/40",
    description: "Soft vanilla cupcakes with buttercream",
    category: "Cupcakes",
    price: 3.5,
    stock: 24
  },
  {
    id: 3,
    name: "Strawberry Tart",
    image: "https://via.placeholder.com/40",
    description: "Fresh strawberry tart with a flaky crust",
    category: "Tarts",
    price: 25.0,
    stock: 8
  },
  {
    id: 4,
    name: "Blueberry Muffins",
    image: "https://via.placeholder.com/40",
    description: "Moist blueberry muffins with a crumb topping",
    category: "Muffins",
    price: 2.75,
    stock: 30
  },
  {
    id: 5,
    name: "Lemon Bars",
    image: "https://via.placeholder.com/40",
    description: "Tangy lemon bars with a shortbread crust",
    category: "Bars",
    price: 2.0,
    stock: 40
  }
];

export default function ManageMenu() {
  return (
    <div className="manage-menu-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Cafe Cottage Admin</h2>
        <p className="sidebar-subtitle">Manage your bakery</p>
        <nav className="sidebar-nav">
          <a href="#" className="active">Manage Menu</a>
          <a href="#">Manage Orders</a>
          <a href="#">Manage Custom Orders</a>
        </nav>
        <div className="sidebar-logout">
          <a href="#">Logout</a>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <div className="main-header">
          <h1>Manage Menu</h1>
          <button className="add-product-btn">Add Product</button>
        </div>

        <table className="menu-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {menuData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img src={item.image} alt={item.name} className="menu-img" />
                </td>
                <td>{item.description}</td>
                <td><span className="category-tag">{item.category}</span></td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
