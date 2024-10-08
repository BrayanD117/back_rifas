const express = require('express');
const router = express.Router();
const CityController = require('../controllers/cityController');

router.post('/', CityController.createCity);

router.get('/', CityController.getAllCities);

router.get('/:id', CityController.getCityById);

router.put('/:id', CityController.updateCity);

router.delete('/:id', CityController.deleteCity);

module.exports = router;