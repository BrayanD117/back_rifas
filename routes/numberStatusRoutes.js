const express = require('express');
const router = express.Router();
const NumberStatusController = require('../controllers/numberStatusController');

router.post('/number-statuses', NumberStatusController.createNumberStatus);

router.get('/number-statuses', NumberStatusController.getAllNumberStatuses);

router.get('/number-statuses/:id', NumberStatusController.getNumberStatusById);

router.put('/number-statuses/:id', NumberStatusController.updateNumberStatus);

router.delete('/number-statuses/:id', NumberStatusController.deleteNumberStatus);

module.exports = router;
