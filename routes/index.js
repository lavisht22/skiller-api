const express = require('express');

const { jwtCheck } = require('../utils/auth');
const courseRouter = require('./course.routes');

const router = express.Router();

router.use(jwtCheck);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to Skiller API', ...req.user });
});

router.use('/courses', courseRouter);

module.exports = router;
