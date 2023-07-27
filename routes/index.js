const express = require('express');
const router = express.Router();
const employeeRouter = require('./employees');
const salesRouter = require('./sales');

router.use('/employees', employeeRouter);
router.use('/sales', salesRouter);

module.exports = router;