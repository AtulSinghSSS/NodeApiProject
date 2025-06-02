const express = require('express');
const router = express.Router();
const savedCarController = require('../controllers/SavedCarController');

router.post('/save-car', savedCarController.saveCar);
router.get('/saved-cars/:userId', savedCarController.getSavedCars);

module.exports = router;
