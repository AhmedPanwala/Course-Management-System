import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} CourseHub. All rights reserved.
          </p>

          {/* Right */}
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition"
            >
              Contact
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
