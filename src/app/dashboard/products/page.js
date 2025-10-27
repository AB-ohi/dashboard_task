"use client";

import { useState, useEffect } from 'react';
import { X, Filter, ShoppingCart } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  
  const fetchProducts = async () => {
      try {
          setLoading(true);
          const response = await fetch('https://fakestoreapi.com/products');
          if (!response.ok) throw new Error('Failed to fetch products');
          
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data);
          
          const uniqueCategories = ['all', ...new Set(data.map(p => p.category))];
          setCategories(uniqueCategories);
          
          setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
      fetchProducts();
    }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };
  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 font-semibold">Error: {error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Product Catalog</h1>
          <p className="text-gray-600">Browse our amazing collection of products</p>
        </div>
        <div className="mb-6 bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={20} className="text-purple-600" />
            <h3 className="font-semibold text-gray-800">Filter by Category</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => openModal(product)}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer group overflow-hidden"
              >
                <div className="relative h-64 bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    ${product.price}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-purple-600 font-semibold uppercase mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                    <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="max-h-96 object-contain"
                  />
                </div>
                <div>
                  <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold uppercase mb-4">
                    {selectedProduct.category}
                  </span>
                  
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {selectedProduct.title}
                  </h2>

                  <div className="flex items-center gap-4 mb-6">
                    <p className="text-4xl font-bold text-purple-600">
                      ${selectedProduct.price}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold text-gray-700">
                        {selectedProduct.rating?.rate || 'N/A'}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({selectedProduct.rating?.count || 0} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                    <button 
                      onClick={closeModal}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;