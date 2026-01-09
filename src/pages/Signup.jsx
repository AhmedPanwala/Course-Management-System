
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
const SignUp = () => {
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    id: v4(),
    role: "user",
  });
  let { username, email, password, confirmPassword } = formData;

  let handleChange = (e) => {
    let name = e.target.name;
    setFormData({ ...formData, [name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (
      username.trim() &&
      email.trim() &&
      password.trim().length &&
      confirmPassword.trim()
    ) {
      if (password == confirmPassword) {
        let alreadyExist = await axios.get(
          `http://localhost:3000/users?email=${email}`
        );
        if (alreadyExist.data.length > 0) {
          toast.error("User already exist");
        } else {
          console.log(formData);

          let res = await axios.post("http://localhost:3000/users", formData);
          if (res.status == 201) {
            toast.success("Sucessfully crerated");
            navigate("/login");
          }
        }
      }
    }
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-amber-600">
          Create Account
        </h2>

        {/* Username */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;

