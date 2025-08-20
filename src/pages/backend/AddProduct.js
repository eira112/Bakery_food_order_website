import React, { useRef, useState } from 'react';
import { addMenuItem, fileToBase64 } from '../../services/item';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Hand } from 'lucide-react';

export default function AddProduct() {
  const navigate = useNavigate()
  const [item, setItem] = useState({
    id: "",
    productName: "",
    category: "",
    price: "",
    description: "",
    productImage: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleFileChange = async (e) =>{
    const file = e.target.files[0]
    if(file){
      const base64Image = await fileToBase64(file)
      setItem(
        {
              ...item,
              ['productImage']: base64Image
            }
      )
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addMenuItem(item).then((response) => {
      if (response.data) {
        toast.success("Item added successfully");
        setItem({
          id: "",
          productName: "",
          category: "",
          price: "",
          description: "",
          productImage: ""
        })
        navigate("/admin/manageMenu/")
      }
    });
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen py-8 px-4 lg:px-8">
      <main className="w-full max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center lg:items-start mb-8 gap-9">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <a href="#" className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-gray-500 hover:text-yellow-800 hover:border-yellow-800 transition">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Menu
            </a>
            <h1 className="text-2xl font-bold text-gray-900 text-center md:text-left">Add New Product</h1>
          </div>
        </div>

        {/* Alerts */}
        <div className="hidden mb-4 p-4 rounded-lg bg-green-100 text-green-700" id="successAlert">Product added successfully!</div>
        <div className="hidden mb-4 p-4 rounded-lg bg-red-100 text-red-700" id="errorAlert">Please fill in all required fields.</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <form id="addProductForm" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="flex flex-col">
                  <label htmlFor="productName" className="font-semibold text-gray-700">Product Name <span className="text-red-600">*</span></label>
                  <input type="text" id="productName" name="productName" placeholder="Enter product name" className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-800 focus:ring-1 focus:ring-yellow-200" onChange={handleChange} required />
                </div>

                {/* Category */}
                <div className="flex flex-col">
                  <label htmlFor="category" className="font-semibold text-gray-700">Category <span className="text-red-600">*</span></label>
                  <select id="category" name="category" className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-800 focus:ring-1 focus:ring-yellow-200" onChange={handleChange} required>
                    <option value="">Select a category</option>
                    <option value="Cakes">Cakes</option>
                    <option value="Cupcakes">Cupcakes</option>
                    <option value="Tarts">Tarts</option>
                    <option value="Muffins">Muffins</option>
                    <option value="Bars">Bars</option>
                    <option value="Cookies">Cookies</option>
                    <option value="Pastries">Pastries</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>

                {/* Price */}
                <div className="flex flex-col">
                  <label htmlFor="price" className="font-semibold text-gray-700">Price ($) <span className="text-red-600">*</span></label>
                  <input type="number" id="price" name="price" placeholder="0.00" min="0" step="0.01" className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-800 focus:ring-1 focus:ring-yellow-200" onChange={handleChange} required />
                </div>

                {/* Description */}
                <div className="flex flex-col md:col-span-2">
                  <label htmlFor="description" className="font-semibold text-gray-700">Description <span className="text-red-600">*</span></label>
                  <textarea id="description" name="description" placeholder="Enter product description" className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-800 focus:ring-1 focus:ring-yellow-200 resize-y min-h-[100px]" onChange={handleChange} required></textarea>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col md:col-span-2">
                  <label className="font-semibold text-gray-700">Product Image</label>
                  <label className="mt-1 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-yellow-800 hover:bg-yellow-50 transition">
                    <input 
                      type="file" 
                      name="image" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                    />
                    <svg className="mx-auto mb-2 w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"/>
                    </svg>
                    <p className="text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col md:flex-row justify-end gap-3 mt-4">
                <button type="button" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:text-yellow-800 hover:border-yellow-800 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-yellow-800 text-white flex items-center gap-1.5 hover:bg-yellow-900 transition" onClick={handleSubmit}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                  </svg>
                  Add Product
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Panel */}
          <div className="flex flex-col gap-6">
            {/* Product Preview */}
            <div className="preview-card flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full">
              <h3 className="card-title flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
                Product Preview
              </h3>

              <div className="flex-1 flex flex-col justify-start items-center">
                <div className="preview-image-container w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg mb-4 overflow-hidden">
                  {item.productImage.trim().length <0 && <span className="text-gray-400">No image uploaded</span>} 
                  <img src={item.productImage} id="livePreviewImage" className="preview-product-image w-full h-full object-cover" alt="Product"  />
                </div>

                <div className="preview-content w-full flex flex-col gap-2">
                  <div className="preview-name font-semibold text-gray-900 text-lg" id="previewProductName">Product Name</div>
                  <div className="preview-description text-gray-600 text-sm" id="previewProductDescription">Product description will appear here...</div>
                  <div className="preview-details flex justify-between items-center mt-2">
                    <span className="preview-price font-semibold text-green-600 text-lg" id="previewProductPrice">$0.00</span>
                    <span className="preview-category bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium" id="previewProductCategory">Category</span>
                  </div>
                  <div className="preview-stock text-gray-500 text-sm mt-1" id="previewProductStock">Stock: 0 items</div>
                </div>
              </div>
            </div>


            {/* Tips Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Tips for Success
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>Fill all required fields</li>
                <li>Upload clear product images</li>
                <li>Provide detailed descriptions</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
