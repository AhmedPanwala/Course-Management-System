import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { v4 as randomId } from "uuid";
import { BookOpen, DollarSign, User, Clock, FileText, Image, Loader } from 'lucide-react'

const AddCourse = () => {
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  let [addCourses, setAddCourses] = useState({
    title: "",
    image: "",
    price: "",
    author: "",
    desc: "",
    duration: "",
    id: randomId()
  })

  let { title, image, price, author, desc, duration } = addCourses

  const validateForm = () => {
    const newErrors = {}

    if (!title.trim()) newErrors.title = "Course title is required"
    if (!image.trim()) newErrors.image = "Image URL is required"
    if (!price.trim()) newErrors.price = "Price is required"
    else if (isNaN(price)) newErrors.price = "Price must be a number"
    if (!author.trim()) newErrors.author = "Author name is required"
    if (!desc.trim()) newErrors.desc = "Description is required"
    if (!duration.trim()) newErrors.duration = "Duration is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  let handleChange = (e) => {
    let name = e.target.name
    setAddCourses({ ...addCourses, [name]: e.target.value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the errors below")
      return
    }

    setLoading(true)
    try {
      let res = await axios.post("https://course-management-system-2-8hmu.onrender.com/courses", addCourses)

      if (res.status === 201) {
        toast.success(" Course successfully added!")
        navigate('/')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add course")
      console.error("Add course error:", err)
    } finally {
      setLoading(false)
    }
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
              <h2 className="text-3xl font-bold text-white">Add New Course</h2>
            </div>
            <p className="text-indigo-100">Create an amazing learning experience for students</p>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            
            {/* Course Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={title}
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
              {/* Author */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  Author Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={author}
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

              {/* Price */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 text-indigo-600" />
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="price"
                  value={price}
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

            {/* Duration & Image URL Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duration */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  Duration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  value={duration}
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

              {/* Image URL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Image className="w-4 h-4 text-indigo-600" />
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="image"
                  value={image}
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

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Course Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="desc"
                value={desc}
                onChange={handleChange}
                placeholder="Write a compelling description of your course..."
                rows="4"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors resize-none ${
                  errors.desc
                    ? "border-red-400 bg-red-50 focus:outline-none focus:border-red-500"
                    : "border-gray-300 focus:outline-none focus:border-indigo-500"
                }`}
              ></textarea>
              {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc}</p>}
              <p className="text-xs text-gray-500 mt-1">{desc.length}/500 characters</p>
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
                    Adding Course...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5" />
                    Add Course
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCourse
