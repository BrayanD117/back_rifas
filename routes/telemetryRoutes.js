const express = require('express');
const router = express.Router();
const TelemetryController = require('../controllers/telemetryController');

router.post('/telemetries', TelemetryController.createTelemetry);

router.get('/telemetries', TelemetryController.getAllTelemetries);

router.get('/telemetries/:id', TelemetryController.getTelemetryById);

router.put('/telemetries/:id', TelemetryController.updateTelemetry);

router.delete('/telemetries/:id', TelemetryController.deleteTelemetry);

module.exports = router;
