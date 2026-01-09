import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Auth } from "../context/AuthContext";
const Navbar = () => {
  let { user, logout } = useContext(Auth);
  

  const linkClasses =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-xl font-bold text-indigo-600 hover:text-indigo-700"
          >
            CourseHub
          </Link>

          {/* Links */}
          <div className="flex items-center space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Courses
            </NavLink>

            {user?.role == "admin" && (
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                Add Course
              </NavLink>
            )}

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Cart
            </NavLink>

            {user ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                Login
              </NavLink>
            )}

            {!user && (
              <NavLink
                to="/signup"
                className="ml-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                Sign Up
              </NavLink>
            )}

            {user && <div>{user?.username}</div>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;