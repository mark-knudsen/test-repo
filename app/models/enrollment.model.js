module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define("Enrollment", {}, {
    timestamps: false
  });

  return Enrollment;
};