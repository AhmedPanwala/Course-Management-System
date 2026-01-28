import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(Auth);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    // Initial load
    updateCartCount();

    // Listen for cart updates from other components
    window.addEventListener("cartUpdated", updateCartCount);

    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const navLink =
    "px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition";

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 tracking-tight"
        >
          CourseHub
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          <NavLink to="/" className={navLink}>
            Courses
          </NavLink>

          {/* ADD COURSE - ADMIN ONLY */}
          {user?.role === "admin" && (
            <NavLink to="/add" className={navLink}>
             Add Course
            </NavLink>
          )}

          {/* CART ICON (ONLY FOR USERS) */}
          {user?.role !== "admin" && (
            <NavLink to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          )}

          {/* USER / AUTH */}
          {user ? (
            <>
              <span className="text-sm text-gray-600 font-medium">
                {user.username}
              </span>
              <button
                onClick={logout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLink}>
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
