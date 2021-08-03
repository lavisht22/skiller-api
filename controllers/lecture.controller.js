const Joi = require('joi');

const db = require('../models');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

async function createLecture(
  courseId,
  name,
  description,
  text,
  videoUrl,
  user
) {
  const schema = Joi.object().keys({
    courseId: Joi.string().uuid().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    text: Joi.any(),
    videoUrl: Joi.string(),
  });

  const result = schema.validate({
    courseId,
    name,
    description,
    text,
    videoUrl,
  });

  if (result.error) {
    throw new BadRequestError(result.error);
  }

  const course = await db.Course.findOne({ where: { id: courseId } });

  if (!course) {
    throw new NotFoundError('Course does not exists.');
  }

  if (course.createdBy !== user.sub) {
    throw new ForbiddenError(
      'You do not have permissions to create lectures for this course'
    );
  }

  const transaction = await db.sequelize.transaction();

  const lecture = await db.Lecture.create(
    {
      courseId,
      name,
      description,
      text,
      videoUrl,
      createdBy: user.sub,
      order: [],
    },
    { transaction }
  );

  course.order = [...course.order, lecture.id];

  await course.save({ transaction });

  await transaction.commit();

  return lecture;
}

async function getLectureDetails(id) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
  });

  const result = schema.validate({
    id,
  });

  if (result.error) {
    throw new BadRequestError(result.error);
  }

  const lecture = await db.Lecture.findOne({ where: { id } });

  if (!lecture) {
    throw new NotFoundError('Lecture does not exist');
  }

  return lecture;
}

async function updateLecture(id, name, description, text, videoUrl, user) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    name: Joi.string(),
    description: Joi.string(),
    text: Joi.any(),
    videoUrl: Joi.string(),
  });

  const result = schema.validate({
    id,
    name,
    description,
    text,
    videoUrl,
  });

  if (result.error) {
    throw new BadRequestError(result.error);
  }

  const lecture = await db.Lecture.findOne({ where: { id } });

  if (!lecture) {
    throw new NotFoundError('Lecture does not exist');
  }

  if (lecture.createdBy !== user.sub) {
    throw new ForbiddenError('You are not allowed to perform this operation');
  }

  if (name) {
    lecture.name = name;
  }

  if (description) {
    lecture.description = description;
  }

  if (text) {
    lecture.text = text;
  }

  if (videoUrl) {
    lecture.videoUrl = videoUrl;
  }

  await lecture.save();

  return lecture;
}

module.exports = { createLecture, getLectureDetails, updateLecture };
