import Joi from "joi";
export const register = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(2).required(),
});
export default register;
