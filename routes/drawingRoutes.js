const express = require('express');
const router = express.Router();
const DrawingController = require('../controllers/drawingController');

router.post('/drawings', DrawingController.createDrawing);

router.get('/drawings', DrawingController.getAllDrawings);

router.get('/drawings/:id', DrawingController.getDrawingById);

router.put('/drawings/:id', DrawingController.updateDrawing);

router.delete('/drawings/:id', DrawingController.deleteDrawing);

module.exports = router;
