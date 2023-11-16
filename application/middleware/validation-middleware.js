const {body, validationResult} = require('express-validator');
const UserError = require('../helpers/error/UserError');
const validationMiddleware = {};

validationMiddleware.validateEmail = [
    body('email')
        .exists()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email must be valid.'),
];

validationMiddleware.validateRegistrationUsername = [
    body('username')
        .exists()
        .isLength({min: 3})
            .withMessage('Username must have three or more characters.')
        .matches(/^[a-zA-Z]/)
            .withMessage('Username must begin with a letter.')
];

validationMiddleware.validateRegistrationPassword = [
    body('password')
        .exists()
        .isLength({min: 8})
            .withMessage('Password must have eight or more characters.')
        .matches(/[A-Z]/)
            .withMessage('Password must contain at least one uppercase letter.')
        .matches(/[0-9]/)
            .withMessage('Password must contain at least one number.')
        .matches(/[\/\*\-\+\!\@\#\$\^\&\*]/)
            .withMessage('Password must contain at least one special character ( / * - + ! @ # $ ^ & * ).'),
    body('passwordConfirmation')
        .custom((value, {req}) => value === req.body.password)
            .withMessage('Passwords do not match.')
];

validationMiddleware.validateRegistrationAgeCheck = [
    body('age-check')
    .exists()
    .equals("checked")
        .withMessage('You must be 13 years or older to register.'),
];

validationMiddleware.validateRegistrationTOSCheck = [
    body('TOS-check')
    .exists()
    .equals("checked")
        .withMessage('You must agree to the Terms of Service.')
];

validationMiddleware.validateRegistration = [
    ...validationMiddleware.validateEmail,
    ...validationMiddleware.validateRegistrationUsername,
    ...validationMiddleware.validateRegistrationPassword,
    ...validationMiddleware.validateRegistrationAgeCheck
];

validationMiddleware.validatePost = [
];

validationMiddleware.validateSearch = [
];

validationMiddleware.validateLogin = [
    body('username')
        .exists()
        .withMessage('Username is required.'),
    body('password')
        .exists()
        .withMessage('Password is required.')
];

validationMiddleware.validateComment = [
    body('comment')
        .exists()
        .withMessage('Comment is required.')
        .isLength({min: 1})
            .withMessage('Comment must have at least one character.')
        .matches(/^[a-zA-Z0-9\s\.\,\!\?]+$/)
            .withMessage('Comment may only contain letters, numbers, spaces, and punctuation.')
];

validationMiddleware.returnValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error => {
            req.flash('error', error.msg)
        });
        res.redirect(req.originalUrl);
    } else {
        next();
    }
};

module.exports = validationMiddleware;