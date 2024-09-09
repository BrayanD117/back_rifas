const express = require('express');
const router = express.Router();
const CoverageController = require('../controllers/coverageController');

router.post('/coverages', CoverageController.createCoverage);

router.get('/coverages', CoverageController.getAllCoverages);

router.get('/coverages/:id', CoverageController.getCoverageById);

router.put('/coverages/:id', CoverageController.updateCoverage);

router.delete('/coverages/:id', CoverageController.deleteCoverage);

module.exports = router;
