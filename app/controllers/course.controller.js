const db = require("../models");
const Course = db.courses;
const Teacher = db.teachers;
const Student = db.students;

exports.create = (req, res) => {
  
  Course.create(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Course.findAll({
    include: [
      {
        model: Teacher,
        as: "teacher"
      },
      {
        model: Student,
        as: "students",
        through: { attributes: [] }
      }
    ]
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};


// Find a single Course with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Course with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Course with id=" + id
      });
    });
};



// Update a Course by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Course.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Course with id=" + id
      });
    });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Course.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Course with id=" + id
      });
    });
};


// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
  Course.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Courses were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all courses."
      });
    });
};

// Enroll a Student in a Course
exports.enrollStudent = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.courseId);
    const student = await Student.findByPk(req.params.studentId);

    if (!course || !student) {
      return res.status(404).send({ message: "Course or Student not found" });
    }

    await course.addStudent(student);

    res.send({ message: "Student enrolled successfully" });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};