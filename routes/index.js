const express = require('express');
const router = express.Router();
const userRouter = require('./offices');
const officeRouter = require('./users');


router.use('/users', userRouter);
router.use('/offices', officeRouter);

module.exports = router;