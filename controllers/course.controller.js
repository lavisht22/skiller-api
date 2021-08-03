const Joi = require('joi');

const db = require('../models');
const {
  BadRequestError,
  NotFoundError,
  InternalServerError,
} = require('../errors');

async function createCourse(name, description, user) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
  });

  const result = schema.validate({
    name,
    description,
  });

  if (result.error) {
    throw new BadRequestError(result.error);
  }

  const course = await db.Course.create({
    name,
    description,
    createdBy: user.sub,
    order: [],
  });

  return course;
}

async function getCourses(user) {
  const courses = await db.Course.findAll({
    where: { createdBy: user.sub },
    attributes: { exclude: ['order'] },
  });

  return courses;
}

module.exports = { createCourse, getCourses };
