const express = require('express');
const router = express.Router();
const TransactionStatusController = require('../controllers/transactionStatusController');

router.post('/transaction-statuses', TransactionStatusController.createTransactionStatus);

router.get('/transaction-statuses', TransactionStatusController.getAllTransactionStatuses);

router.get('/transaction-statuses/:id', TransactionStatusController.getTransactionStatusById);

router.put('/transaction-statuses/:id', TransactionStatusController.updateTransactionStatus);

router.delete('/transaction-statuses/:id', TransactionStatusController.deleteTransactionStatus);

module.exports = router;
