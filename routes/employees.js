const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/employeeController');

router.post('/register', EmployeeController.register);
router.post('/login', EmployeeController.login);

router.get('/', EmployeeController.getAllEmployee);
router.get('/:id', EmployeeController.getByIdEmployee);
router.post('/', EmployeeController.addEmployee);
router.put('/:id', EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);

module.exports = router;