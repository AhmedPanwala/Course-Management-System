import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
    toast.success("Removed from cart");

    // Dispatch custom event to notify Navbar about cart change
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (!cart.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-lg text-gray-600">Your cart is empty 🛒</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        Your Learning Cart 
      </h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

        {/* ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center"
            >
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">By {item.author}</p>
                <p className="text-xs text-gray-400 mt-1"> {item.duration}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-indigo-600 text-lg">
                  ₹{item.price}
                </span>
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                  title="Remove from cart"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-20">
          <h2 className="text-lg font-bold mb-6 text-gray-800">
            Order Summary
          </h2>

          <div className="space-y-3 mb-6 pb-6 border-b">
            <div className="flex justify-between text-gray-600">
              <span>Total Courses</span>
              <span className="font-semibold">{cart.length}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold">₹{total}</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-lg mb-6 text-indigo-600">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() => navigate("/payment", { state: { total, cart } })}
            className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition"
          >
            Proceed to Payment
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-3 border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
