import Joi from "joi";

/**
 * Multipart form data required:
 * image: binary image upload
 * derivatives: JSON object with keys
 */
export default {
  image: Joi.object({
    filename: Joi.string().required(),
    path: Joi.string().required(),
    headers: Joi.object().unknown().required(),
    bytes: Joi.number().required()
  }).required(),
  derivatives: Joi.object().unknown().required()
};
