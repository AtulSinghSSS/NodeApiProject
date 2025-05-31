const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const userAuth = sequelize.define("userAuth", {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    mobile: { type: DataTypes.STRING,  allowNull: true },
    gender: { type: DataTypes.STRING, allowNull: true },
  });

  // Hash password before saving new user
  userAuth.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  return userAuth;
};
