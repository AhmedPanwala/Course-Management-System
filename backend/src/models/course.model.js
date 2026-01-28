const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    desc: String,
    price: Number,
    duration: String,
    image: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
