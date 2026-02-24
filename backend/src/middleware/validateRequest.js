import Joi from "joi";

export const validateChatRequest = (req, res, next) => {
  const schema = Joi.object({
    sessionId: Joi.string().optional(),
    message: Joi.string().min(1).max(2000).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: "Invalid request data",
      details: error.details[0].message,
    });
  }

  next();
};
