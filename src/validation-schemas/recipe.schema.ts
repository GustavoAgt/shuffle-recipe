import Joi from "joi";

const recipeSchema = Joi.object().keys({
  title: Joi.string().required(),
  cookingDuration: Joi.number().required(),
  description: Joi.string().required(),
  user: Joi.object().required(),
});

export { recipeSchema };
