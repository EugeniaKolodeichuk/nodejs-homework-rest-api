import Joi from "joi";
import mongoose from "mongoose";

const { Types } = mongoose;

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone");

const patchSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const querySchema = Joi.object({
  limit: Joi.string().min(5).max(100).optional(),
  skip: Joi.number().min(0).optional(),
  filter: Joi.string().pattern(new RegExp("(favorite)")).optional(),
});

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateCreate = async (req, res, next) => {
  try {
    await postSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message.replace(/"/g, "") });
  }
  next();
};

export const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

export const validateUpdateFavorite = async (req, res, next) => {
  try {
    await patchSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(400).json({ message: "Missing field favorite" });
  }
  next();
};

export const validateId = (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }
  next();
};

export const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query);
  } catch (err) {
    return res.status(400).json({ message: err.message.replace(/"/g, "") });
  }
  next();
};

export const validateRegistration = async (req, res, next) => {
  try {
    await registrationSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: "Bad Request" });
  }
  next();
};

export const validateLogin = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: "Bad Request" });
  }
  next();
};
