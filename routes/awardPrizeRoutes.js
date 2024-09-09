const express = require('express');
const router = express.Router();
const AwardPrizeController = require('../controllers/awardPrizeController');

router.post('/award-prizes', AwardPrizeController.createAwardPrize);

router.get('/award-prizes', AwardPrizeController.getAllAwardPrizes);

router.get('/award-prizes/:id', AwardPrizeController.getAwardPrizeById);

router.put('/award-prizes/:id', AwardPrizeController.updateAwardPrize);

router.delete('/award-prizes/:id', AwardPrizeController.deleteAwardPrize);

module.exports = router;
