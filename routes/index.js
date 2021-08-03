const express = require('express');

const { jwtCheck } = require('../utils/auth');

const router = express.Router();

router.use(jwtCheck);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to Skiller API' });
});

module.exports = router;
