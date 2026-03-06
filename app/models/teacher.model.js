module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("Teacher", {
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false 
    }
  });

  return Teacher;
};