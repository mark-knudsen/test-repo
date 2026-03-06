const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.teachers = require("./teacher.model.js")(sequelize, Sequelize);
db.students = require("./student.model.js")(sequelize, Sequelize);
db.courses = require("./course.model.js")(sequelize, Sequelize);
db.enrollments = require("./enrollment.model.js")(sequelize, Sequelize);

// ================================
//   Associations (Relationships)
// ================================

// 1:N Teacher -> Course
db.teachers.hasMany(db.courses, {
  foreignKey: "teacherId",
  as: "courses",
  onDelete: "CASCADE"
});

db.courses.belongsTo(db.teachers, { foreignKey: "teacherId",  as: "teacher"});

// N:M Student <-> Course
db.students.belongsToMany(db.courses, {
  through: db.enrollments,
  as: "courses"
});

db.courses.belongsToMany(db.students, {
  through: db.enrollments,
  as: "students"
});

module.exports = db;