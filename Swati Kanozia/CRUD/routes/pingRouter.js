const express = require('express');
const ping = require('../controller/pingControllers');
const router = express.Router();
//ping router
router.get('/',ping);

module.exports = router;