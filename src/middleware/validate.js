const ApiError = require('../utils/apiError');

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    params: req.params,
    query: req.query,
    body: req.body,
  });

  if (!result.success) {
    const errorMessage = result.error.issues.map((issue) => issue.message).join(', ');
    return next(new ApiError(400, errorMessage));
  }

  Object.assign(req, result.data);
  return next();
};

module.exports = validate;
