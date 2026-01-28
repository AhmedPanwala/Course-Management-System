import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import { Eye, EyeOff, Loader } from "lucide-react";

const Login = () => {
  const { login } = useContext(Auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const { email, password, role } = formData;

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        formData
      );

      login(res.data.user);
      localStorage.setItem("token", res.data.token);
      toast.success("🎉 Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT BRANDING SECTION */}
          <div className="hidden lg:flex items-center justify-center bg-linear-to-br from-indigo-50 to-blue-50 px-10 py-12">
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full">
                  <span className="text-3xl font-bold text-white">📚</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-indigo-900 mb-4">
                CourseHub
              </h1>
              <p className="text-gray-700 text-lg font-medium mb-2">
                Learn. Manage. Grow.
              </p>
              <p className="text-gray-600">
                A modern learning platform for everyone
              </p>
              <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="text-xl">✨</span>
                  <span>Thousands of courses</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="text-xl">👥</span>
                  <span>Expert instructors</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="text-xl">🏆</span>
                  <span>Certificates included</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT LOGIN SECTION */}
          <div className="flex items-center justify-center px-6 py-12 sm:px-10">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-600 mb-2">
                  CourseHub
                </h1>
                <p className="text-gray-600">Learn. Manage. Grow.</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 mb-8">
                Sign in to access your courses and learning dashboard
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                      errors.email
                        ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                        : "border-gray-300 focus:outline-none focus:border-indigo-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors pr-10 ${
                        errors.password
                          ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                          : "border-gray-300 focus:outline-none focus:border-indigo-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Login As<span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                      style={{
                        borderColor: role === "admin" ? "#4f46e5" : undefined,
                        backgroundColor: role === "admin" ? "#f0f4ff" : undefined,
                      }}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={role === "admin"}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="ml-3 flex-1 font-medium text-gray-800">
                        <span className="block">👨‍💼 Admin</span>
                        <span className="text-xs text-gray-500">Create and manage courses</span>
                      </span>
                    </label>
                    <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                      style={{
                        borderColor: role === "user" ? "#4f46e5" : undefined,
                        backgroundColor: role === "user" ? "#f0f4ff" : undefined,
                      }}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={role === "user"}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="ml-3 flex-1 font-medium text-gray-800">
                        <span className="block">👨‍🎓 Student</span>
                        <span className="text-xs text-gray-500">Browse and enroll in courses</span>
                      </span>
                    </label>
                  </div>
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {errors.role}
                    </p>
                  )}
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-6"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Signup Link */}
              <p className="text-sm text-center mt-6">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors"
                >
                  Create one now
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
