const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./src/models/user.model");

async function seedUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✓ MongoDB connected");

    // Clear existing users (optional - comment out if you want to keep existing users)
    // await User.deleteMany({});
    // console.log("✓ Cleared existing users");

    // Hash passwords
    const hashedPassword1 = await bcrypt.hash("admin123", 10);
    const hashedPassword2 = await bcrypt.hash("student123", 10);

    // Check if users already exist
    const adminExists = await User.findOne({ email: "admin@test.com" });
    const studentExists = await User.findOne({ email: "student@test.com" });

    // Create admin user
    if (!adminExists) {
      await User.create({
        username: "Admin User",
        email: "admin@test.com",
        password: hashedPassword1,
        role: "admin"
      });
      console.log("✓ Admin user created: admin@test.com / admin123");
    } else {
      console.log("✓ Admin user already exists");
    }

    // Create student user
    if (!studentExists) {
      await User.create({
        username: "Student User",
        email: "student@test.com",
        password: hashedPassword2,
        role: "user"
      });
      console.log("✓ Student user created: student@test.com / student123");
    } else {
      console.log("✓ Student user already exists");
    }

    console.log("\n🎉 Database seeding completed!");
    console.log("\n📝 Login Credentials:");
    console.log("─────────────────────────");
    console.log("Admin:");
    console.log("  Email: admin@test.com");
    console.log("  Password: admin123");
    console.log("  Role: Admin");
    console.log("\nStudent:");
    console.log("  Email: student@test.com");
    console.log("  Password: student123");
    console.log("  Role: Student");
    console.log("─────────────────────────\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedUsers();
