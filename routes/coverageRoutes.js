const express = require('express');
const router = express.Router();
const CoverageController = require('../controllers/coverageController');

router.post('/', CoverageController.createCoverage);

router.get('/', CoverageController.getAllCoverages);

router.get('/:id', CoverageController.getCoverageById);

router.put('/:id', CoverageController.updateCoverage);

router.delete('/:id', CoverageController.deleteCoverage);

module.exports = router;
