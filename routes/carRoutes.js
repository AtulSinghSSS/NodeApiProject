const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const upload = require("../middlewares/MulterMiddleware");

router.post("/addNewCar",upload.single('image'), carController.addNewCar);
router.get("/getAllCar",carController.getAvailableCars)
//router.post("/available", carController.getAvailableCars);

module.exports = router;
    