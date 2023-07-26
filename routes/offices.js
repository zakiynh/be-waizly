const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('LOGIN DISINI');
});

module.exports = router;