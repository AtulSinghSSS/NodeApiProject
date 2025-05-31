
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define("Car", {
    brand: { type: DataTypes.STRING },
    model: { type: DataTypes.STRING},
    seats: { type: DataTypes.STRING },
    price_per_day: {type: DataTypes.FLOAT},
    image_url: {
      type: DataTypes.STRING,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return Car;
};
