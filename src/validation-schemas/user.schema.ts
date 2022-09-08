import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const JoiPassword = Joi.extend(joiPasswordExtendCore);

const userSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(15).required(),
  password: JoiPassword.string().noWhiteSpaces().min(8).required(),
});

export { userSchema };
