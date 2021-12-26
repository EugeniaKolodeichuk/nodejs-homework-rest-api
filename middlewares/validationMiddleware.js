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
  if (!Types.ObjectId.isValid(req.params.contactId)) {
    return res.status(400).json({ message: "Invalid ObjectId" });
  }
  next();
};
