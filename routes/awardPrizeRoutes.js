const express = require('express');
const router = express.Router();
const AwardPrizeController = require('../controllers/awardPrizeController');

router.post('/', AwardPrizeController.createAwardPrize);

router.get('/', AwardPrizeController.getAllAwardPrizes);

router.get('/:id', AwardPrizeController.getAwardPrizeById);

router.put('/:id', AwardPrizeController.updateAwardPrize);

router.delete('/:id', AwardPrizeController.deleteAwardPrize);

module.exports = router;
