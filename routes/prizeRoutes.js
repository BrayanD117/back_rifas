const express = require('express');
const router = express.Router();
const PrizeController = require('../controllers/PrizeController');

router.post('/prizes', PrizeController.createPrize);

router.get('/prizes', PrizeController.getAllPrizes);

router.get('/prizes/:id', PrizeController.getPrizeById);

router.put('/prizes/:id', PrizeController.updatePrize);

router.delete('/prizes/:id', PrizeController.deletePrize);

module.exports = router;
