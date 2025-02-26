import Joi from "@hapi/joi";

export const productValidator = Joi.object({
  name: Joi.string().min(6).max(255).required().messages({
    "string.empty": "Product name must not be empty",
    "any.required": "Product name is required",
    "string.min": "Product name must be at least 6 characters",
    "string.max": "Product name must not be over 255 characters",
  }),
  type: Joi.string().min(6).max(255).required().messages({
    "string.empty": "Product type must not be empty",
    "any.required": "Product type is required",
    "string.min": "Product type must be at least 6 characters",
    "string.max": "Product type must not be over 255 characters",
  }),
  image: Joi.string().required().messages({
    "any.required": "Image is required",
  }),
  unit: Joi.string().required().messages({
    "string.empty": "Product unit must not be empty",
    "any.required": "Product unit is required",
  }),
  description: Joi.string().min(6).max(1000).allow("").messages({
    "string.min": "Product description must be at least 6 characters",
    "string.max": "Product description must not be over 1000 characters",
  }),
  price: Joi.number().required().messages({
    "string.empty": "Product price must not be empty",
    "any.required": "Product price is required",
  }),
  opening_stock: Joi.number().required().messages({
    "any.required": "Product opening stock is required",
  }),
  stock_in: Joi.number().required().messages({
    "any.required": "Product stock in is required",
  }),
  stock_out: Joi.number().required().messages({
    "any.required": "Product stock out is required",
  }),
  closing_stock: Joi.number().required().messages({
    "any.required": "Product closing stock is required",
  }),
});
