const express = require('express');

const { jwtCheck } = require('../utils/auth');
const courseRouter = require('./course.routes');
const lectureRouter = require('./lecture.routes');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to Skiller API' });
});

router.use('/courses', courseRouter);
router.use(jwtCheck);
router.use('/lectures', lectureRouter);

module.exports = router;
