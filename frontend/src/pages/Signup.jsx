import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader, Check } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const { username, email, password, confirmPassword } = formData;

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    else if (username.length < 3) newErrors.username = "Username must be at least 3 characters";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

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
      await axios.post("https://course-management-system-2-8hmu.onrender.com/auth/register", formData);

      toast.success("✨ Account created successfully!");
      toast("Redirecting to login...", { icon: "⏳" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = password ? {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
  } : null;

  const strengthScore = passwordStrength
    ? Object.values(passwordStrength).filter(Boolean).length
    : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT BRANDING SECTION */}
          <div className="hidden lg:flex items-center justify-center bg-linear-to-br from-indigo-50 to-blue-50 px-10 py-12">
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full">
                  <span className="text-3xl font-bold text-white">🚀</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-indigo-900 mb-4">
                CourseHub
              </h1>
              <p className="text-gray-700 text-lg font-medium mb-2">
                Start Your Learning Journey
              </p>
              <p className="text-gray-600">
                Join thousands of learners worldwide
              </p>
              <div className="mt-8 pt-8 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="text-xl">🎯</span>
                  <span>Learn from experts</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="text-xl">💼</span>
                  <span>Boost your career</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <span className="text-xl">🏅</span>
                  <span>Earn certificates</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIGNUP SECTION */}
          <div className="flex items-center justify-center px-6 py-12 sm:px-10">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <div className="lg:hidden text-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-600 mb-2">
                  CourseHub
                </h1>
                <p className="text-gray-600">Start Learning Today</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600 mb-8">
                Join our community of learners and grow your skills
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                      errors.username
                        ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                        : "border-gray-300 focus:outline-none focus:border-indigo-500"
                    }`}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {errors.username}
                    </p>
                  )}
                </div>

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
                      placeholder="Create a strong password"
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
                  {password && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${strengthScore >= 1 ? "bg-red-500" : "bg-gray-300"}`}></div>
                        <div className={`w-2 h-2 rounded-full ${strengthScore >= 2 ? "bg-yellow-500" : "bg-gray-300"}`}></div>
                        <div className={`w-2 h-2 rounded-full ${strengthScore >= 3 ? "bg-blue-500" : "bg-gray-300"}`}></div>
                        <div className={`w-2 h-2 rounded-full ${strengthScore >= 4 ? "bg-green-500" : "bg-gray-300"}`}></div>
                        <span className="text-xs font-medium text-gray-600 ml-2">
                          {strengthScore === 1 && "Weak"}
                          {strengthScore === 2 && "Fair"}
                          {strengthScore === 3 && "Good"}
                          {strengthScore === 4 && "Strong"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {passwordStrength && (
                          <>
                            <div className="flex items-center gap-1">
                              {passwordStrength.length ? (
                                <Check size={14} className="text-green-500" />
                              ) : (
                                <span className="text-gray-400">✗</span>
                              )}
                              <span className={passwordStrength.length ? "text-green-600" : "text-gray-500"}>
                                At least 8 chars
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {passwordStrength.uppercase ? (
                                <Check size={14} className="text-green-500" />
                              ) : (
                                <span className="text-gray-400">✗</span>
                              )}
                              <span className={passwordStrength.uppercase ? "text-green-600" : "text-gray-500"}>
                                Uppercase
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {passwordStrength.lowercase ? (
                                <Check size={14} className="text-green-500" />
                              ) : (
                                <span className="text-gray-400">✗</span>
                              )}
                              <span className={passwordStrength.lowercase ? "text-green-600" : "text-gray-500"}>
                                Lowercase
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {passwordStrength.numbers ? (
                                <Check size={14} className="text-green-500" />
                              ) : (
                                <span className="text-gray-400">✗</span>
                              )}
                              <span className={passwordStrength.numbers ? "text-green-600" : "text-gray-500"}>
                                Numbers
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors pr-10 ${
                        errors.confirmPassword
                          ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                          : "border-gray-300 focus:outline-none focus:border-indigo-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      {errors.confirmPassword}
                    </p>
                  )}
                  {password && confirmPassword && password === confirmPassword && (
                    <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-medium">
                      <Check size={16} />
                      <span>Passwords match</span>
                    </div>
                  )}
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    I want to<span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                      style={{
                        borderColor: formData.role === "user" ? "#4f46e5" : undefined,
                        backgroundColor: formData.role === "user" ? "#f0f4ff" : undefined,
                      }}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={formData.role === "user"}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="ml-3 flex-1 font-medium text-gray-800">
                        <span className="block">👨‍🎓 Learn courses</span>
                        <span className="text-xs text-gray-500">Browse and enroll in courses</span>
                      </span>
                    </label>
                    <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                      style={{
                        borderColor: formData.role === "admin" ? "#4f46e5" : undefined,
                        backgroundColor: formData.role === "admin" ? "#f0f4ff" : undefined,
                      }}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={formData.role === "admin"}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="ml-3 flex-1 font-medium text-gray-800">
                        <span className="block">👨‍💼 Teach courses</span>
                        <span className="text-xs text-gray-500">Create and publish courses</span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Signup Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-6"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Login Link */}
              <p className="text-sm text-center mt-6">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
