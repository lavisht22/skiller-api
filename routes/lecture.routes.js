const express = require('express');

const lectureController = require('../controllers/lecture.controller');
const { handleApiError } = require('../utils/error');

const router = express.Router();

/* Create new lecture */
router.post('/', async (req, res) => {
  try {
    const { courseId, name, description, text, videoUrl } = req.body;

    const result = await lectureController.createLecture(
      courseId,
      name,
      description,
      text,
      videoUrl,
      req.user
    );
    res.status(201).json(result);
  } catch (err) {
    handleApiError(err, res);
  }
});

/* Get lecture Details */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await lectureController.getLectureDetails(id);
    res.status(200).json(result);
  } catch (err) {
    handleApiError(err, res);
  }
});

/* Update Lecture */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, text, videoUrl } = req.body;

    const result = await lectureController.updateLecture(
      id,
      name,
      description,
      text,
      videoUrl,
      req.user
    );

    res.status(200).json(result);
  } catch (err) {
    handleApiError(err, res);
  }
});

module.exports = router;
