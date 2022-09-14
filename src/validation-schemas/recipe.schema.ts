import Joi from "joi";

const recipeSchema = Joi.object().keys({
  title: Joi.string().required(),
  duration: Joi.required(),
  description: Joi.string().required(),
  user: Joi.object().required(),
});

export { recipeSchema };
