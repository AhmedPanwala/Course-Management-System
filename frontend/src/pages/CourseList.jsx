import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Auth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const { user } = useContext(Auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [cartItems, setCartItems] = useState(new Set());
  const [purchasedCourses, setPurchasedCourses] = useState(new Set());

  const getCourse = async () => {
    const res = await axios.get("https://course-management-system-2-8hmu.onrender.com/courses");
    setCourses(res.data);
    
    // Initialize cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(new Set(cart.map(item => item._id)));
    
    // Initialize purchased courses from localStorage
    const purchased = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
    setPurchasedCourses(new Set(purchased));
  };

  const isInCart = (id) => {
    return cartItems.has(id);
  };

  const isPurchased = (id) => {
    return purchasedCourses.has(id);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        console.log("Deleting course:", courseId);
        await axios.delete(`http://localhost:5001/api/courses/${courseId}`);
        console.log("Delete successful");
        toast.success("✅ Course deleted successfully");
        setCourses(courses.filter((course) => course._id !== courseId));
      } catch (err) {
        console.error("Delete error:", err);
        toast.error(err.response?.data?.message || "Failed to delete course");
      }
    }
  };


  useEffect(() => {
    getCourse();
  }, []);

  const handleEnroll = (course) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item._id === course._id);
    if (exists) {
      toast.error("Course already in cart");
      return;
    }

    cart.push(course);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Update local state immediately for instant UI feedback
    setCartItems(new Set([...cartItems, course._id]));
    
    toast.success("Added to cart");

    // Dispatch custom event to notify Navbar about cart change
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-12">
        Available Courses
      </h1>

      {/* Filter courses: hide purchased courses for users, show all for admins */}
      {!user?.role === "admin" && purchasedCourses.size > 0 && (
        <div className="max-w-5xl mx-auto mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            ℹ️ You have {purchasedCourses.size} purchased course(s). Visit your library to access them.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses
          .filter(course => {
            // Admins see all courses
            if (user?.role === "admin") return true;
            // Users don't see purchased courses
            return !isPurchased(course._id);
          })
          .map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                By {course.author}
              </p>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {course.desc}
              </p>

              <div className="flex justify-between mb-4">
                <span>⏱ {course.duration}</span>
                <span className="font-bold text-indigo-600">
                  ₹{course.price}
                </span>
              </div>

              {/* ADMIN BUTTONS */}
              {user?.role === "admin" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("/editcourse", { state: { course } })}
                    className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex-1 py-2 px-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                /* USER ADD TO CART BUTTON */
                <button
                  onClick={() => handleEnroll(course)}
                  disabled={isInCart(course._id)}
                  className={`w-full py-2 rounded-lg font-semibold transition
                    ${
                      isInCart(course._id)
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                >
                  {isInCart(course._id) ? "✓ Added to Cart" : "🛒 Add to Cart"}
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
