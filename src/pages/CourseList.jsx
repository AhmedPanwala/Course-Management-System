import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CourseList = () => {
  const [courses, setCourses] = useState([])

  const getCourse = async () => {
    const res = await axios.get("http://localhost:3000/courses")
    setCourses(res.data)
  }

  useEffect(() => {
    getCourse()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        Available Courses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            {/* Image */}
            <img
              src={course.image}
              alt={course.title}
              className="h-48 w-full object-cover"
            />

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-1">
                {course.title}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                By {course.author}
              </p>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {course.desc}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  ⏱ {course.duration}
                </span>

                <span className="text-lg font-bold text-indigo-600">
                  ₹{course.price}
                </span>
              </div>

              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseList
