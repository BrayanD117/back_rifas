const express = require('express');
const router = express.Router();
const NumberStatusController = require('../controllers/numberStatusController');

router.post('/', NumberStatusController.createNumberStatus);

router.get('/', NumberStatusController.getAllNumberStatuses);

router.get('/:id', NumberStatusController.getNumberStatusById);

router.put('/:id', NumberStatusController.updateNumberStatus);

router.delete('/:id', NumberStatusController.deleteNumberStatus);

module.exports = router;
