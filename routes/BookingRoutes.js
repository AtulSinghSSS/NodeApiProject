const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/BookingController");

router.post('/CreateBookings', bookingController.createBooking);
router.get('/GetAllBookings', bookingController.getAllBookings);

module.exports = router;
    