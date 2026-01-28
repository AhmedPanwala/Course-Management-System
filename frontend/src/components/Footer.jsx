import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left */}
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} CourseHub. All rights reserved.
          </p>

          {/* Right */}
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
              Contact
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
