const express = require('express');
const router = express.Router();
const SelectedNumberController = require('../controllers/selectedNumberController');

router.post('/', SelectedNumberController.createSelectedNumber);

router.get('/', SelectedNumberController.getAllSelectedNumbers);

router.get('/:id', SelectedNumberController.getSelectedNumberById);

router.put('/:id', SelectedNumberController.updateSelectedNumber);

router.delete('/:id', SelectedNumberController.deleteSelectedNumber);

module.exports = router;
