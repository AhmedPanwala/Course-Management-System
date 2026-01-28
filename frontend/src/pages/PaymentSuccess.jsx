import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Home, BookOpen } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { total = 0, itemCount = 0, cart = [] } = location.state || {};

  useEffect(() => {
    // Save purchased courses to localStorage
    if (cart && cart.length > 0) {
      const purchased = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
      const newPurchased = [
        ...purchased,
        ...cart.map(course => course._id)
      ];
      localStorage.setItem("purchasedCourses", JSON.stringify(newPurchased));
    }

    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, cart]);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
            <CheckCircle className="w-20 h-20 text-green-600 relative" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Your courses have been added to your library. Happy learning!
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Courses Purchased:</span>
            <span className="font-bold text-gray-800">{itemCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-bold text-lg text-green-600">₹{total}</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-8 text-left">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <span className="text-gray-700 text-sm">Lifetime course access</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <span className="text-gray-700 text-sm">Learn at your own pace</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <span className="text-gray-700 text-sm">Certificate upon completion</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-linear-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Start Learning
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Auto Redirect Message */}
        <p className="text-xs text-gray-500 mt-6">
          Redirecting to home in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
