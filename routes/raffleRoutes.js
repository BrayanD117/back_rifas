const express = require('express');
const router = express.Router();
const RaffleController = require('../controllers/raffleController');

router.post('/raffles', RaffleController.createRaffle);

router.get('/raffles', RaffleController.getAllRaffles);

router.get('/raffles/:id', RaffleController.getRaffleById);

router.put('/raffles/:id', RaffleController.updateRaffle);

router.delete('/raffles/:id', RaffleController.deleteRaffle);

module.exports = router;
