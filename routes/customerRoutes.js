const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

router.post('/customers', CustomerController.createCustomer);

router.get('/customers', CustomerController.getAllCustomers);

router.get('/customers/:id', CustomerController.getCustomerById);

router.put('/customers/:id', CustomerController.updateCustomer);

router.delete('/customers/:id', CustomerController.deleteCustomer);

module.exports = router;
