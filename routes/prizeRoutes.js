const express = require('express');
const router = express.Router();
const PrizeController = require('../controllers/PrizeController');

router.post('/', PrizeController.createPrize);

router.get('/', PrizeController.getAllPrizes);

router.get('/:id', PrizeController.getPrizeById);

router.put('/:id', PrizeController.updatePrize);

router.delete('/:id', PrizeController.deletePrize);

module.exports = router;
