const express = require('express');
const router = express.Router();
const SaleController = require('../controllers/saleController');

router.post('/', SaleController.createSale);

router.get('/', SaleController.getAllSales);

router.get('/:id', SaleController.getSaleById);

router.put('/:id', SaleController.updateSale);

router.delete('/:id', SaleController.deleteSale);

module.exports = router;
