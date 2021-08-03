const express = require('express');

const courseController = require('../controllers/course.controller');
const { handleApiError } = require('../utils/error');

const router = express.Router();

/* Get all courses */
router.get('/', async (req, res, next) => {
  try {
    const result = await courseController.getCourses();
    res.status(200).json(result);
  } catch (err) {
    handleApiError(err, res);
  }
});

/* Create new course */
router.post('/', async (req, res) => {
  try {
    const { name, description, text, coverImageUrl } = req.body;

    const result = await courseController.createCourse(
      name,
      description,
      text,
      coverImageUrl,
      req.user
    );
    res.status(201).json(result);
  } catch (err) {
    handleApiError(err, res);
  }
});

/* Get course Details */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await courseController.getCourseDetails(id);
    res.status(200).json(result);
  } catch (err) {
    handleApiError(err, res);
  }
});

/* Update Course */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, text, coverImageUrl, order } = req.body;

    const result = await courseController.updateCourse(
      id,
      name,
      description,
      text,
      coverImageUrl,
      order,
      req.user
    );

    res.status(200).json(result);
  } catch (err) {
    handleApiError(err, res);
  }
});

module.exports = router;
