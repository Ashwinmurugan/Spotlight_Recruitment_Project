const { body, validationResult } = require("express-validator");

// Middleware for validating login input
exports.validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8-16 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware for validating actor profile update
exports.validateActorProfile = [
  body("bio")
    .optional()
    .isLength({ max: 1500 })
    .withMessage("Bio cannot exceed 1500 characters"),
  body("experience")
    .optional()
    .isString()
    .withMessage("Experience must be a string"),
  body("profile_video")
    .optional()
    .isURL()
    .withMessage("Invalid profile video URL"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware for validating production registration
exports.validateProductionRegistration = [
  body("production_name").notEmpty().withMessage("Name is required"),
  body("bio").notEmpty().withMessage("Bio is required"),
  body("license").optional().withMessage("License may required"),
  body("socialLinks.instagram")
    .optional()
    .isURL()
    .withMessage("Invalid Instagram URL"),
  body("socialLinks.youtube")
    .optional()
    .isURL()
    .withMessage("Invalid YouTube URL"),
  body("socialLinks.facebook")
    .optional()
    .isURL()
    .withMessage("Invalid Facebook URL"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
