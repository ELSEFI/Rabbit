import React from "react";
import { Link } from "react-router-dom";

export const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block group">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <div className="w-full h-96 mb-4 overflow-hidden rounded-lg">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
