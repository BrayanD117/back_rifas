const express = require('express');
const router = express.Router();
const EventTypeController = require('../controllers/eventTypeController');

router.post('/', EventTypeController.createEventType);

router.get('/', EventTypeController.getAllEventTypes);

router.get('/:id', EventTypeController.getEventTypeById);

router.put('/:id', EventTypeController.updateEventType);

router.delete('/:id', EventTypeController.deleteEventType);

module.exports = router;
