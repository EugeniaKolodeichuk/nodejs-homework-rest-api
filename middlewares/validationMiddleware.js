const Joi = require("joi");
const { Types } = require("mongoose");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(30).required(),
      phone: Joi.number().min(3).required(),
      favorite: Joi.bool(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "Missing required name field",
        status: validationResult.error.details,
      });
    }

    next();
  },

  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().min(3).max(30).required(),
      phone: Joi.number().min(3).required(),
      favorite: Joi.bool(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "Missing fields",
        status: validationResult.error.details,
      });
    }
    next();
  },
  validateUpdateFavorite: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.bool().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "Missing field favorite",
        status: validationResult.error.details,
      });
    }
    next();
  },

  validateId: (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.contactId)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    next();
  },
};
