const express = require('express');
const router = express.Router();
const DrawTypeController = require('../controllers/drawTypeController');

router.post('/', DrawTypeController.createDrawType);

router.get('/', DrawTypeController.getAllDrawTypes);

router.get('/:id', DrawTypeController.getDrawTypeById);

router.put('/:id', DrawTypeController.updateDrawType);

router.delete('/:id', DrawTypeController.deleteDrawType);

module.exports = router;
