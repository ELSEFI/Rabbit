import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButton } from "./PayPalButton";

const Cart = {
  products: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://picsum.photos/200?random=1",
    },
    {
      name: "Casual Sneakers",
      size: "42",
      color: "White",
      price: 75,
      image: "https://picsum.photos/200?random=2",
    },
  ],
  totalPrice: 195,
};

export const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    Phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful", details);
    navigate("/order-confirmation");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-6 items-start">
        {/* LEFT SECTION */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl uppercase font-semibold mb-6">Checkout</h2>

          <form onSubmit={handleCreateCheckout}>
            {/* CONTACT DETAILS */}
            <h3 className="text-lg font-medium mb-4">Contact Details</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value="user@example.com"
                className="w-full p-2 border rounded"
                disabled
              />
            </div>

            {/* DELIVERY DETAILS */}
            <h3 className="text-lg font-medium mb-4">Delivery</h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Postal Code</label>
                <input
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                value={shippingAddress.Phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    Phone: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* PAYMENT SECTION */}
            <div className="mt-8">
              {!checkoutId ? (
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded cursor-pointer hover:bg-gray-800 transition-all"
                >
                  Continue to Payment
                </button>
              ) : (
                <div className="mt-8">
                  <h3 className="text-lg mb-4 font-medium">Pay with PayPal</h3>
                  <PayPalButton
                    amount={Cart.totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onError={() => alert("Payment failed. Try again.")}
                  />
                </div>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT SECTION - ORDER SUMMARY */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-medium mb-4">Order Summary</h3>

          <div className="border-t py-4 mb-4">
            {Cart.products.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="text-md font-semibold">{product.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Size: {product.size}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Color: {product.color}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold">
                  ${product.price?.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-lg mb-4">
            <p>Subtotal</p>
            <p>${Cart.totalPrice?.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center text-lg">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between items-center text-lg mt-4 border-t pt-4 font-semibold">
            <p>Total</p>
            <p>${Cart.totalPrice?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
