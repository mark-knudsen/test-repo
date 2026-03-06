module.exports = app => {
  const courses = require("../controllers/course.controller.js");
  const router = require("express").Router();


  // Create a new Course
  router.post("/", courses.create);
  
  // Retrieve all Courses
  router.get("/", courses.findAll);

  // Retrieve a single Course with id
  router.get("/:id", courses.findOne);

  // Update a Course with id
  router.put("/:id", courses.update);

  // Delete a Course with id
  router.delete("/:id", courses.delete);

  // Delete all Courses
  router.delete("/", courses.deleteAll);

  // Create a new Enrollment for a Student in a Course
  router.post("/:courseId/enroll/:studentId", courses.enrollStudent);

  app.use("/api/courses", router);
};