const db = require('../models/');
const Car = db.car;

exports.addNewCar = async (req, res) => {
  try {
    const { brand, model, seats, price_per_day, available } = req.body;

    const image_url = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`  : null;
        console.log("🖼️ Uploaded image path:", image_url); // 👈 Console log

debugger;
    const car = await Car.create({
      brand,
      model,
      seats,
      price_per_day,
      available: available ?? true,
      image_url
    });

    res.status(201).json({ message: "Car added successfully", car });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.getAvailableCars = async (req, res) => {
  try {
    // Fetch all cars where `available` is true
    const availableCars = await Car.findAll({
      where: { available: true }
    });

    // Return the cars in a structured response
    res.status(200).json({
      success: true,
      message: "Available cars fetched successfully",
      Data: availableCars
    });
  } catch (err) {
    // Handle any errors that occur
    res.status(400).json({
      success: false,
      message: "Failed to fetch available cars",
      error: err.message
    });
  }
};


// exports.getAvailableCars = async (req, res) => {
//   try {
//     // const cars = await Car.findAll({
//     //   where: { available: true },
//     //   attributes: ['id', 'brand', 'model', 'seats', 'price_per_day', 'image_url']
//     // });
//    // res.status(200).json(cars);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch available cars' });
//     }
//   }
// };
