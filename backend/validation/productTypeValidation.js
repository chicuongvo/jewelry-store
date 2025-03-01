import Joi from "@hapi/joi";

export const createProductTypeValidator = Joi.object({
  name: Joi.string().min(2).max(255).required().messages({
    "any.required": "Product type name is required",
    "string.min": "Product type name must be at least 2 characters",
    "string.max": "Product type name must not be over 255 characters",
    "string.empty": "Product type name must not be empty",
  }),
  profit_rate: Joi.number().min(0.1).max(0.5).required().messages({
    "any.required": "Product type name is required",
    "number.min": "Profit rate must be greater than or equal 0.1",
    "number.max": "Profit rate must not less than or equa 0.5",
  }),
});

export const updateProductTypeValidator = Joi.object({
  name: Joi.string().min(2).max(255).messages({
    "string.min": "Product type name must be at least 2 characters",
    "string.max": "Product type name must not be over 255 characters",
    "string.empty": "Product type name must not be empty",
  }),
  profit_rate: Joi.number().min(0.1).max(0.5).messages({
    "number.min": "Profit rate must be greater than or equal 0.1",
    "number.max": "Profit rate must not less than or equa 0.5",
  }),
});
