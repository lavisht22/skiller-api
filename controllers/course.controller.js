const Joi = require('joi');

const db = require('../models');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

async function createCourse(name, description, text, coverImageUrl, user) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    text: Joi.any(),
    coverImageUrl: Joi.string(),
  });

  const result = schema.validate({
    name,
    description,
    text,
    coverImageUrl,
  });

  if (result.error) {
    throw new BadRequestError(result.error);
  }

  const course = await db.Course.create({
    name,
    description,
    text,
    coverImageUrl,
    createdBy: user.sub,
    order: [],
  });

  return course;
}

async function getCourses() {
  const courses = await db.Course.findAll({
    attributes: { exclude: ['order'] },
  });

  return courses;
}

async function getCourseDetails(id) {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
  });

  const result = schema.validate({
    id,
  });

  if (result.error) {
    throw new BadRequestError(result.error);
  }

  const course = await db.Course.findOne({ where: { id } });

  if (!course) {
    throw new NotFoundError('Course does not exist');
  }

  return course;
}

async function updateCourse(
  id,
  name,
  description,
  text,
  coverImageUrl,
  order,
  user
) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    name: Joi.string(),
    description: Joi.string(),
    text: Joi.any(),
    coverImageUrl: Joi.string(),
    order: Joi.array().items(Joi.string().uuid()),
  });

  const result = schema.validate({
    id,
    name,
    description,
    text,
    coverImageUrl,
    order,
  });

  if (result.error) {
    throw new BadRequestError(result.error);
  }

  const course = await db.Course.findOne({ where: { id } });

  if (!course) {
    throw new NotFoundError('Course does not exist');
  }

  if (course.createdBy !== user.sub) {
    throw new ForbiddenError('You are not allowed to perform this operation');
  }

  if (name) {
    course.name = name;
  }

  if (description) {
    course.description = description;
  }

  if (text) {
    course.text = text;
  }

  if (coverImageUrl) {
    course.coverImageUrl = coverImageUrl;
  }

  if (order) {
    course.order = order;
  }

  await course.save();

  return course;
}

module.exports = { createCourse, getCourses, getCourseDetails, updateCourse };
