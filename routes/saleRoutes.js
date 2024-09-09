const express = require('express');
const router = express.Router();
const SaleController = require('../controllers/saleController');

router.post('/sales', SaleController.createSale);

router.get('/sales', SaleController.getAllSales);

router.get('/sales/:id', SaleController.getSaleById);

router.put('/sales/:id', SaleController.updateSale);

router.delete('/sales/:id', SaleController.deleteSale);

module.exports = router;
