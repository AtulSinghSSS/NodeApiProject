const db = require('../models');
const Booking = db.booking;
const Car = db.car;
const SavedCar = db.SavedCar;

exports.createBooking = async (req, res) => {
  try {
    const { userId, carId, start_date, end_date } = req.body;

    const car = await Car.findByPk(carId);
    if (!car || !car.available) {
      return res.status(400).json({ message: "Car is not available" });
    }

    const days = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24));
    const total_price = days * car.price_per_day;

    const booking = await Booking.create({
      userId, carId, start_date, end_date, total_price
    });

    await car.update({ available: false });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    console.log("dsfhsgfg");
    const bookings = await Booking.findAll({});
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// exports.getSavedCars = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const savedCars = await SavedCar.findAll({
//       where: { userId },
//       include: [
//         {
//           model: Car,
//           as: 'car'
//         }
//       ]
//     });

//     res.status(200).json({
//       success: true,
//       message: "Saved cars fetched successfully",
//       data: savedCars.map(entry => entry.car)
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch saved cars",
//       error: err.message
//     });
//   }
// };