import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { CreditCard, Lock, User, Mail, Phone, MapPin, Shield, Loader, Smartphone, Building2 } from "lucide-react";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { total = 0, cart = [] } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("card"); // card, upi, netbanking, wallet

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    bankName: "",
    accountNumber: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";

    // Payment method validation
    if (paymentMethod === "card") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Card must be 16 digits";
      }
      if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Format: MM/YY";
      }
      if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
      else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "CVV must be 3-4 digits";
      }
    } else if (paymentMethod === "upi") {
      if (!formData.upiId.trim()) newErrors.upiId = "UPI ID is required";
      else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) {
        newErrors.upiId = "Invalid UPI ID format";
      }
    } else if (paymentMethod === "netbanking") {
      if (!formData.bankName.trim()) newErrors.bankName = "Bank name is required";
      if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 4)
        .replace(/(\d{2})(\d{0,2})/, "$1/$2");
    }

    // Allow only numbers for CVV
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    // Allow only numbers for phone
    if (name === "phone") {
      formattedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [name]: formattedValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart
      localStorage.removeItem("cart");
      
      // Dispatch custom event to notify Navbar about cart change
      window.dispatchEvent(new Event("cartUpdated"));
      
      toast.success("🎉 Payment successful!");
      navigate("/payment-success", { state: { total, itemCount: cart.length, cart: cart } });
    } catch (err) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!total) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No items to checkout</p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT - PAYMENT FORM */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <CreditCard className="w-8 h-8 text-indigo-600" />
                <h2 className="text-3xl font-bold text-gray-800">Payment Details</h2>
              </div>

              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  Personal Information
                </h3>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.fullName
                          ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                          : "border-gray-300 focus:outline-none focus:border-indigo-500"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                          errors.email
                            ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                            : "border-gray-300 focus:outline-none focus:border-indigo-500"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                          errors.phone
                            ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                            : "border-gray-300 focus:outline-none focus:border-indigo-500"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  Address
                </h3>

                <div className="space-y-4">
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.address
                          ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                          : "border-gray-300 focus:outline-none focus:border-indigo-500"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* City & Zip */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                          errors.city
                            ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                            : "border-gray-300 focus:outline-none focus:border-indigo-500"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Zip Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="10001"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                          errors.zipCode
                            ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                            : "border-gray-300 focus:outline-none focus:border-indigo-500"
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENT METHOD SELECTION */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  Payment Method
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Credit/Debit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-lg border-2 transition text-center ${
                      paymentMethod === "card"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-1 text-indigo-600" />
                    <span className="text-sm font-semibold">Card</span>
                  </button>

                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-lg border-2 transition text-center ${
                      paymentMethod === "upi"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    <Smartphone className="w-6 h-6 mx-auto mb-1 text-indigo-600" />
                    <span className="text-sm font-semibold">UPI</span>
                  </button>

                  {/* Net Banking */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-3 rounded-lg border-2 transition text-center ${
                      paymentMethod === "netbanking"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    <Building2 className="w-6 h-6 mx-auto mb-1 text-indigo-600" />
                    <span className="text-sm font-semibold">Net Banking</span>
                  </button>

                  {/* Wallet */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("wallet")}
                    className={`p-3 rounded-lg border-2 transition text-center ${
                      paymentMethod === "wallet"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    <Lock className="w-6 h-6 mx-auto mb-1 text-indigo-600" />
                    <span className="text-sm font-semibold">Wallet</span>
                  </button>
                </div>
              </div>

              {/* Payment Details Based on Method */}
              {paymentMethod === "card" && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    Card Information
                  </h3>

                  <div className="space-y-4">
                    {/* Card Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors font-mono ${
                          errors.cardNumber
                            ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                            : "border-gray-300 focus:outline-none focus:border-indigo-500"
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors font-mono ${
                            errors.expiryDate
                              ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                              : "border-gray-300 focus:outline-none focus:border-indigo-500"
                          }`}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength="4"
                          className={`w-full px-4 py-3 rounded-lg border-2 transition-colors font-mono ${
                            errors.cvv
                              ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                              : "border-gray-300 focus:outline-none focus:border-indigo-500"
                          }`}
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Payment */}
              {paymentMethod === "upi" && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-indigo-600" />
                    UPI Payment
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      UPI ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="yourname@upi"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.upiId
                          ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                          : "border-gray-300 focus:outline-none focus:border-indigo-500"
                      }`}
                    />
                    {errors.upiId && (
                      <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">Enter your registered UPI ID (e.g., 9876543210@okhdfcbank)</p>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === "netbanking" && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                    Net Banking
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Bank <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                          errors.bankName
                            ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                            : "border-gray-300 focus:outline-none focus:border-indigo-500"
                        }`}
                      >
                        <option value="">Choose a bank...</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="AXIS">Axis Bank</option>
                        <option value="KOTAK">Kotak Bank</option>
                      </select>
                      {errors.bankName && (
                        <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        placeholder="Enter your account number"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                          errors.accountNumber
                            ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                            : "border-gray-300 focus:outline-none focus:border-indigo-500"
                        }`}
                      />
                      {errors.accountNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Wallet Payment */}
              {paymentMethod === "wallet" && (
                <div className="mb-8">
                  <div className="bg-linear-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-purple-600" />
                      Wallet Payment
                    </h3>
                    <p className="text-gray-700 mb-3">Available Balance: <span className="font-bold text-lg text-purple-600">₹5,000</span></p>
                    <p className="text-sm text-gray-600">Click "Complete Payment" to pay ₹{total} from your wallet</p>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                <p className="text-sm text-blue-800">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 disabled:from-indigo-400 disabled:to-blue-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Complete Payment
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="w-full mt-3 border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Back to Cart
              </button>
            </form>
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 sticky top-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b max-h-96 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between text-gray-700">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">By {item.author}</p>
                    </div>
                    <span className="font-semibold text-indigo-600">₹{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span>₹{Math.round(total * 0.18)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
              </div>

              <div className="bg-linear-to-r from-indigo-50 to-blue-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{Math.round(total + total * 0.18)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>100% Secure & Protected</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>SSL Encrypted Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
