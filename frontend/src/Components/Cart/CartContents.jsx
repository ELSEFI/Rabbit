import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const cartProducts = [
  {
    id: 1,
    name: "T-Shirt",
    size: "sm",
    color: "red",
    quantity: 3,
    price: 250,
    image: "https://picsum.photos/200?random=1",
  },
  {
    id: 2,
    name: "Jeans",
    size: "xl",
    color: "blue",
    quantity: 2,
    price: 60,
    image: "https://picsum.photos/200?random=2",
  },
];

export const CartContents = () => {
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          {/* LEFT: Image + Info */}
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 text-lg font-medium hover:bg-gray-100">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 text-lg font-medium hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Price + Delete */}
          <div className="flex flex-col items-end justify-between h-full">
            <p className="font-semibold text-gray-800">
              ${product.price.toLocaleString()}
            </p>
            <button className="mt-2 hover:text-red-700">
              <RiDeleteBin3Line className="h-5 w-5 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
