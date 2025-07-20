// app.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

const authRoutes = require("./routes/auth.routes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/BookingRoutes");
const savedCarRoutes = require("./routes/SavedCarRoutes");

const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./Swagger/swagger');

app.use(bodyParser.json());
db.sequelize.sync().then(() => {
  console.log("Database synced.");
});




const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static('uploads'));

app.use("/api", authRoutes);
app.use("/api", carRoutes);
app.use("/api",bookingRoutes)
app.use("/api",savedCarRoutes)
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

