import React, { useState } from 'react';
import { ChevronDown, Upload, ArrowLeft, Star, Info } from 'lucide-react';

export default function CoffeeCottageDashboard() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('0.00');
  const [category, setCategory] = useState('');
  const [stockQuantity, setStockQuantity] = useState('0');
  const [description, setDescription] = useState('Enter product description');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-2">Coffee Cottage</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>
        
        <nav className="mt-8">
          <div className="px-6 py-3 bg-orange-50 border-r-4 border-orange-500 text-orange-700 font-medium flex items-center">
            <div className="w-4 h-4 bg-orange-500 rounded-sm mr-3"></div>
            Manage Menu
          </div>
          
          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 flex items-center cursor-pointer">
            <div className="w-4 h-4 bg-blue-500 rounded-sm mr-3"></div>
            Manage Orders
          </div>
          
          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 flex items-center cursor-pointer">
            <div className="w-4 h-4 bg-teal-500 rounded-full mr-3"></div>
            Custom Orders
          </div>
          
          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 flex items-center cursor-pointer">
            <div className="w-4 h-4 bg-purple-500 rounded-sm mr-3"></div>
            Customers
          </div>
          
          <div className="px-6 py-3 text-gray-600 hover:bg-gray-50 flex items-center cursor-pointer">
            <div className="w-4 h-4 bg-gray-500 rounded-sm mr-3"></div>
            Analytics
          </div>
        </nav>
        
        <div className="absolute bottom-6 left-6">
          <div className="text-gray-600 hover:bg-gray-50 flex items-center cursor-pointer px-0 py-2">
            <ArrowLeft className="w-4 h-4 mr-3" />
            Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-6">
          <div className="flex items-center text-gray-600 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm">Back to Menu</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select a category</option>
                      <option value="coffee">Coffee</option>
                      <option value="tea">Tea</option>
                      <option value="pastries">Pastries</option>
                      <option value="sandwiches">Sandwiches</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Stock Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Product Image */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8">
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center">
                  <span className="mr-2">+</span>
                  Add Product
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Product Preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Product Preview</h3>
                <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
                <p className="text-gray-500">No image uploaded</p>
              </div>
              
              <h4 className="font-medium text-gray-800 mb-2">
                {productName || 'Product Name'}
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                {description === 'Enter product description' ? 'Product description will appear here...' : description}
              </p>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-green-600">
                  ${price}
                </span>
                <span className="text-sm text-gray-500">
                  {category || 'Category'}
                </span>
              </div>
              
              <p className="text-sm text-gray-500">
                Stock: {stockQuantity} Items
              </p>
            </div>

            {/* Tips for Success */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-gray-700 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Tips for Success</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Use high-quality images (minimum 800x600px) for better customer appeal
                  </p>
                </div>
                
                <div className="flex items-start">
                  <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Write detailed descriptions including ingredients and allergen information
                  </p>
                </div>
                
                <div className="flex items-start">
                  <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Set competitive pricing by researching similar products in your area
                  </p>
                </div>
                
                <div className="flex items-start">
                  <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Keep stock levels updated to avoid disappointing customers
                  </p>
                </div>
                
                <div className="flex items-start">
                  <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Choose the most specific category to help customers find your products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}