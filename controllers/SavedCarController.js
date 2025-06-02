const db = require('../models');
const SavedCar = db.SavedCar;
const Car = db.car;

exports.saveCar = async (req, res) => {
  try {
    const { userId, carId, isActive, isDeleted} = req.body;
console.log("Saving car for user:", userId, "Car ID:", carId, "isActive:", isActive, "isDelete:", isDelete);
    if(isActive && !isDeleted) {
        const alreadySaved = await SavedCar.findOne({ where: { userId, carId } });
        // if (alreadySaved) {
        // return res.status(409).json({ message: 'Car already saved by this user.' });
        // }
        if (alreadySaved.isDeleted) {
            await alreadySaved.update({ isDeleted: false, isActive: true });
            return res.status(200).json({ message: 'Car re-saved successfully.', alreadySaved });
        }
        else if (alreadySaved) {
        return res.status(409).json({ message: 'Car already saved by this user.' });
        }
        else{
            const saved = await SavedCar.create({ userId, carId });
        }
        res.status(201).json({ message: 'Car saved successfully', saved });
    }else{
        const savedCar = await SavedCar.findOne({ where: { userId, carId } });
        if (!savedCar) {
            return res.status(404).json({ message: 'Saved car not found.' });
        }

        if (isDeleted) {
            await savedCar.update({ isDeleted: true });
            return res.status(200).json({ message: 'Car deleted from saved list successfully.' });
        } else {
            await savedCar.update({ isActive });
            return res.status(200).json({ message: 'Car status updated successfully.', savedCar });
        }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSavedCars = async (req, res) => {
  try {
     console.log("Fetching saved cars for user1:", req.params.userId);
    const { userId } = req.params;
    console.log("Fetching saved cars for user:", userId);
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // const savedCars = await SavedCar.findAll({
    //   where: { userId },
    //   include: [
    //     {
    //       model: Car,
    //       attributes: ['id', 'brand', 'model', 'price_per_day', 'image_url']
    //     //   as: 'car'
    //     }
    //   ]
    // });
    const savedCars = await SavedCar.findAll({
      where: { userId }
    });
    console.log("Saved cars fetched:", savedCars);
    if (savedCars.length === 0) {
      return res.status(404).json({ message: 'No saved cars found for this user.' });
    }
    const carIds = savedCars.map(entry => entry.carId);
    console.log("Car IDs to fetch:", carIds);
    if (carIds.length === 0) {
      return res.status(404).json({ message: 'No cars saved for this user.' });
    }
    const cars = await Car.findAll({
        where: {
            id: carIds
        }
        });
        console.log("Cars fetched:", cars);
    if (cars.length === 0) {    
      return res.status(404).json({ message: 'No cars found for the saved entries.' });
    }
    res.status(200).json({
      success: true,
      data: cars
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
