const express = require('express');
const router = express.Router();
const DrawingController = require('../controllers/drawingController');

router.post('/', DrawingController.createDrawing);

router.get('/', DrawingController.getAllDrawings);

router.get('/:id', DrawingController.getDrawingById);

router.put('/:id', DrawingController.updateDrawing);

router.delete('/:id', DrawingController.deleteDrawing);

module.exports = router;
