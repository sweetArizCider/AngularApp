import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  description: Joi.string()
    .min(3)
    .max(100),
  price: Joi.number()
    .positive()
    .precision(2)
    .required(),
  image_url: Joi.string()
    .uri()
    .max(255)
    .optional(),
})

export default productSchema;