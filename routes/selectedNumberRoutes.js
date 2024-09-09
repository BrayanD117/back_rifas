const express = require('express');
const router = express.Router();
const SelectedNumberController = require('../controllers/selectedNumberController');

router.post('/selected-numbers', SelectedNumberController.createSelectedNumber);

router.get('/selected-numbers', SelectedNumberController.getAllSelectedNumbers);

router.get('/selected-numbers/:id', SelectedNumberController.getSelectedNumberById);

router.put('/selected-numbers/:id', SelectedNumberController.updateSelectedNumber);

router.delete('/selected-numbers/:id', SelectedNumberController.deleteSelectedNumber);

module.exports = router;
