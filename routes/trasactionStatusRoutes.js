const express = require('express');
const router = express.Router();
const TransactionStatusController = require('../controllers/transactionStatusController');

router.post('/', TransactionStatusController.createTransactionStatus);

router.get('/', TransactionStatusController.getAllTransactionStatuses);

router.get('/:id', TransactionStatusController.getTransactionStatusById);

router.put('/:id', TransactionStatusController.updateTransactionStatus);

router.delete('/:id', TransactionStatusController.deleteTransactionStatus);

module.exports = router;
