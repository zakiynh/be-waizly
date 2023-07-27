const express = require('express');
const router = express.Router();
const SalesController = require('../controller/salesController');

router.get('/', SalesController.getAllSales);
router.get('/:id', SalesController.getByIdSales);
router.post('/', SalesController.addSales);
router.put('/:id', SalesController.updateSales);
router.delete('/:id', SalesController.deleteSales);

module.exports = router;