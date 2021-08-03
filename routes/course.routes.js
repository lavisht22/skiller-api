const express = require('express');

const courseController = require('../controllers/course.controller');
const { handleApiError } = require('../utils/error');

const router = express.Router();

/* Get all courses */
router.get('/', async (req, res, next) => {
  try {
    const result = await courseController.getCourses(req.user);
    res.status(200).json(result);
  } catch (err) {
    handleApiError(err, res);
  }
});

/* Create new course */
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    const result = await courseController.createCourse(
      name,
      description,
      req.user
    );
    res.status(201).json(result);
  } catch (err) {
    handleApiError(err, res);
  }
});

module.exports = router;
