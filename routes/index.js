const express = require('express');
const router = express.Router();

const roleRoutes = require('../routes/roleRoutes');
const userRoutes = require('../routes/userRoutes');
const customerRoutes = require('../routes/customerRoutes');
const coverageRoutes = require('../routes/coverageRoutes');
const authorityRoutes = require('../routes/authorityRoutes');
const raffleRoutes = require('../routes/raffleRoutes');
const eventTypeRoutes = require('../routes/eventTypeRoutes');
const telemetryRoutes = require('../routes/telemetryRoutes');
const transactionStatusRoutes = require('../routes/trasactionStatusRoutes');
const transactionRoutes = require('../routes/transactionRoutes');
const numberStatusRoutes = require('../routes/numberStatusRoutes');
const selectedNumberRoutes = require('../routes/selectedNumberRoutes');
const saleRoutes = require('../routes/saleRoutes');
const drawTypeRoutes = require('../routes/drawTypeRoutes');
const drawingRoutes = require('../routes/drawingRoutes');
const prizeRoutes = require('../routes/prizeRoutes');
const awardPrizeRoutes = require('../routes/awardPrizeRoutes');

router.use('/roles', roleRoutes);
router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/coverages', coverageRoutes);
router.use('/authorities', authorityRoutes);
router.use('/raffles', raffleRoutes);
router.use('/event-types', eventTypeRoutes);
router.use('/telemetries', telemetryRoutes);
router.use('/transaction-statuses', transactionStatusRoutes);
router.use('/transactions', transactionRoutes);
router.use('/number-statuses', numberStatusRoutes);
router.use('/selected-numbers', selectedNumberRoutes);
router.use('/sales', saleRoutes);
router.use('/draw-types', drawTypeRoutes);
router.use('/drawings', drawingRoutes);
router.use('/prizes', prizeRoutes);
router.use('/award-prizes', awardPrizeRoutes);

module.exports = router;