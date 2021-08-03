const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lecture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lecture.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      courseId: DataTypes.UUID,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      text: DataTypes.TEXT,
      videoUrl: DataTypes.STRING,
      createdBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Lecture',
    }
  );
  return Lecture;
};
