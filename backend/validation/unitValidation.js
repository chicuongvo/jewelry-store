import Joi from "@hapi/joi";

export const createUnitValidator = Joi.object({
  unit_id: Joi.string()
    .pattern(/^[A-Za-z0-9\s]+$/)
    .message({
      "string.empty": "Unit id must not be empty",
      "string.pattern.base": "Unit id is not valid",
    }),
  name: Joi.string()
    .min(1)
    .max(10)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "any.required": "Unit name is required",
      "string.empty": "Unit name must not be empty",
      "string.min": "Unit name must be at least 1 character",
      "string.max": "Unit name must not be over 10 characters",
      "string.pattern.base": "Unit name is not valid",
    }),
});

export const updateUnitValidator = Joi.object({
  unit_id: Joi.string()
    .pattern(/^[A-Za-z0-9\s]+$/)
    .message({
      "string.empty": "Unit id must not be empty",
      "string.pattern.base": "Unit id is not valid",
    }),
  name: Joi.string()
    .min(1)
    .max(10)
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
      "string.empty": "Unit name must not be empty",
      "string.min": "Unit name must be at least 1 character",
      "string.max": "Unit name must not be over 10 characters",
      "string.pattern.base": "Unit name is not valid",
    }),
});
