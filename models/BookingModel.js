module.exports = (sequelize, DataTypes) => {
  const BookingModel = sequelize.define("Booking", {
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    total_price: DataTypes.FLOAT
  });

  BookingModel.associate = (models) => {
    BookingModel.belongsTo(models.userAuth, { foreignKey: "userId" });
    BookingModel.belongsTo(models.Car, { foreignKey: "carId" });
  };

  return BookingModel;
};
