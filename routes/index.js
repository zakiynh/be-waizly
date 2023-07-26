const express = require('express');
const router = express.Router();
const employeeRouter = require('./employees');

router.use('/users', employeeRouter);
// router.use('/employees', employeeRouter);

module.exports = router;