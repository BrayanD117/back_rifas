const express = require('express');
const router = express.Router();
const TelemetryController = require('../controllers/telemetryController');

router.post('/', TelemetryController.createTelemetry);

router.get('/', TelemetryController.getAllTelemetries);

router.get('/:id', TelemetryController.getTelemetryById);

router.put('/:id', TelemetryController.updateTelemetry);

router.delete('/:id', TelemetryController.deleteTelemetry);

module.exports = router;
