import { IoMdClose } from "react-icons/io";
import { CartContents } from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";

export const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };
  return (
    <div
      className={`fixed top-0 right-0 w-4/5 sm:w-2/3 md:w-[28rem] lg:w-[32rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* CLOSE BUTTON */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600 cursor-pointer" />
        </button>
      </div>

      {/* CART CONTENTS */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CartContents />
      </div>

      {/* CHECKOUT BUTTON */}
      <div className="p-4 bg-white sticky bottom-0">
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer"
        >
          Checkout
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shipping, taxes and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};
