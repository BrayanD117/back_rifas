const express = require('express');
const router = express.Router();
const RaffleController = require('../controllers/raffleController');

router.post('/', RaffleController.createRaffle);

router.get('/', RaffleController.getAllRaffles);

router.get('/active', RaffleController.getActiveRaffles);

router.get('/:id', RaffleController.getRaffleById);

router.put('/:id', RaffleController.updateRaffle);

router.delete('/:id', RaffleController.deleteRaffle);

module.exports = router;
