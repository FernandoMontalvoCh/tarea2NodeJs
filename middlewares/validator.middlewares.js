const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    // [{..., msg}] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = error.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return res.status(400).json({
      status: "error",
      message,
    });
  }
  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 2 })
    .withMessage("Name must be al least 2 characters"),
  body("email").isEmail().withMessage("Must provid a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

module.exports = { createUserValidators };
