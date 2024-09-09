const express = require('express');
const router = express.Router();
const EventTypeController = require('../controllers/eventTypeController');

router.post('/event-types', EventTypeController.createEventType);

router.get('/event-types', EventTypeController.getAllEventTypes);

router.get('/event-types/:id', EventTypeController.getEventTypeById);

router.put('/event-types/:id', EventTypeController.updateEventType);

router.delete('/event-types/:id', EventTypeController.deleteEventType);

module.exports = router;
