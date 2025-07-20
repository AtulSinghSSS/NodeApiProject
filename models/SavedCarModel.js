module.exports = (sequelize, DataTypes) => {
  const SavedCar = sequelize.define("SavedCar", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    carId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  SavedCar.associate = (models) => {
    SavedCar.belongsTo(models.userAuth, {
      foreignKey: 'userId',
      as: 'user'
    });

    SavedCar.belongsTo(models.car, {
      foreignKey: 'carId',
      as: 'car'
    });
  };

  return SavedCar;
};
