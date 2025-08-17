import "../css/addProductStyle.css";

export default function AddProduct() {
  return (
    <div className="add-product-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Cafe Cottage Admin</h2>
        <p className="sidebar-subtitle">Manage your bakery</p>
        <nav className="sidebar-nav">
          <a href="#">Manage Menu</a>
          <a href="#" className="active">Add Product</a>
          <a href="#">Manage Orders</a>
          <a href="#">Manage Custom Orders</a>
        </nav>
        <div className="sidebar-logout">
          <a href="#">Logout</a>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <h1 className="form-title">Add New Product</h1>

        <form className="add-product-form">
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" placeholder="Enter product name" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Enter product description"></textarea>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select>
              <option value="">Select category</option>
              <option value="Cakes">Cakes</option>
              <option value="Cupcakes">Cupcakes</option>
              <option value="Tarts">Tarts</option>
              <option value="Muffins">Muffins</option>
              <option value="Bars">Bars</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" placeholder="0.00" />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input type="number" placeholder="0" />
            </div>
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" />
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn">Add Product</button>
          </div>
        </form>
      </main>
    </div>
  );
}
