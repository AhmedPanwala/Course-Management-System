const Course = require("../models/course.model");

// GET ALL COURSES
exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

// ADD COURSE (ADMIN)
exports.addCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
};

// UPDATE COURSE
exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update course" });
  }
};

// DELETE COURSE
exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully", deletedCourse: deleted });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete course" });
  }
};
