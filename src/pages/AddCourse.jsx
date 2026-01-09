import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { v4 as randomId } from "uuid";

const AddCourse = () => {
  let navigate = useNavigate()

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

  let handleChange = (e) => {
    let name = e.target.name
    setAddCourses({ ...addCourses, [name]: e.target.value })
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    if (
      title.trim() &&
      image.trim() &&
      price.trim() &&
      author.trim() &&
      desc.trim() &&
      duration.trim()
    ) {
      let res = await axios.post("http://localhost:3000/courses", addCourses)

      if (res.status === 201) {
        toast.success("Course successfully added")
        navigate('/')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add New Course
        </h2>

        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="image"
          value={image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="price"
          value={price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="author"
          value={author}
          onChange={handleChange}
          placeholder="Author Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="desc"
          value={desc}
          onChange={handleChange}
          placeholder="Course Description"
          rows="3"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <input
          type="text"
          name="duration"
          value={duration}
          onChange={handleChange}
          placeholder="Duration (e.g. 6 weeks)"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  )
}

export default AddCourse
