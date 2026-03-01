import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { BookOpen, DollarSign, User, Clock, FileText, Image, Loader } from "lucide-react";

const EditCourse = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // course passed via Link
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState(state?.course || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate all fields
    if (!formData.title?.toString().trim()) newErrors.title = "Title is required";
    if (!formData.author?.toString().trim()) newErrors.author = "Author is required";
    
    const priceStr = String(formData.price || "").trim();
    if (!priceStr) newErrors.price = "Price is required";
    else if (isNaN(priceStr)) newErrors.price = "Price must be a number";
    
    if (!formData.duration?.toString().trim()) newErrors.duration = "Duration is required";
    if (!formData.image?.toString().trim()) newErrors.image = "Image URL is required";
    if (!formData.desc?.toString().trim()) newErrors.desc = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // Debug log

    // Validate synchronously without using state
    const newErrors = {};
    if (!formData.title?.toString().trim()) newErrors.title = "Title is required";
    if (!formData.author?.toString().trim()) newErrors.author = "Author is required";
    
    const priceStr = String(formData.price || "").trim();
    if (!priceStr) newErrors.price = "Price is required";
    else if (isNaN(priceStr)) newErrors.price = "Price must be a number";
    
    if (!formData.duration?.toString().trim()) newErrors.duration = "Duration is required";
    if (!formData.image?.toString().trim()) newErrors.image = "Image URL is required";
    if (!formData.desc?.toString().trim()) newErrors.desc = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors below");
      console.log("Validation failed with errors:", newErrors); // Debug log
      return;
    }

    console.log("Validation passed, sending update..."); // Debug log
    setErrors({});
    setLoading(true);
    try {
      console.log("Submitting course data:", formData); // Debug log
      const response = await axios.put(
        `https://course-management-system-2-8hmu.onrender.com/courses/${formData._id}`,
        formData
      );
      console.log("Update response:", response); // Debug log
      toast.success("✅ Course updated successfully!");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      console.error("Update error:", error); // Debug log
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!formData._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No course selected to edit</p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-indigo-600 to-blue-600 px-8 py-8">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white">Edit Course</h2>
            </div>
            <p className="text-indigo-100">Update course details below</p>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            
            {/* Course Title - EDITABLE */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                placeholder="e.g., Advanced React Development"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                  errors.title
                    ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                    : "border-gray-300 focus:outline-none focus:border-indigo-500"
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Author & Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Author - EDITABLE */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author || ""}
                  onChange={handleChange}
                  placeholder="e.g., John Doe"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    errors.author
                      ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                      : "border-gray-300 focus:outline-none focus:border-indigo-500"
                  }`}
                />
                {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
              </div>

              {/* Price - EDITABLE */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 text-indigo-600" />
                  Price (₹)
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleChange}
                  placeholder="e.g., 999"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    errors.price
                      ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                      : "border-gray-300 focus:outline-none focus:border-indigo-500"
                  }`}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
            </div>

            {/* Duration & Image URL Row - EDITABLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duration - EDITABLE */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration || ""}
                  onChange={handleChange}
                  placeholder="e.g., 6 weeks"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    errors.duration
                      ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                      : "border-gray-300 focus:outline-none focus:border-indigo-500"
                  }`}
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>

              {/* Image URL - EDITABLE */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Image className="w-4 h-4 text-indigo-600" />
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image || ""}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                    errors.image
                      ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                      : "border-gray-300 focus:outline-none focus:border-indigo-500"
                  }`}
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              </div>
            </div>

            {/* Description - EDITABLE */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Course Description
              </label>
              <textarea
                name="desc"
                value={formData.desc || ""}
                onChange={handleChange}
                placeholder="Write a compelling description of your course..."
                rows="4"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors resize-none ${
                  errors.desc
                    ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                    : "border-gray-300 focus:outline-none focus:border-indigo-500"
                }`}
              />
              {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 disabled:from-indigo-400 disabled:to-blue-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Updating Course...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5" />
                    Update Course
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
