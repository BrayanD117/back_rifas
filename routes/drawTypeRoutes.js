const express = require('express');
const router = express.Router();
const DrawTypeController = require('../controllers/drawTypeController');

router.post('/draw-types', DrawTypeController.createDrawType);

router.get('/draw-types', DrawTypeController.getAllDrawTypes);

router.get('/draw-types/:id', DrawTypeController.getDrawTypeById);

router.put('/draw-types/:id', DrawTypeController.updateDrawType);

router.delete('/draw-types/:id', DrawTypeController.deleteDrawType);

module.exports = router;
