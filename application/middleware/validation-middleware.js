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

validationMiddleware.validateUsername = [
    body('username')
        .exists()
        .isLength({min: 3})
            .withMessage('Username must be 3 or more characters.')
        .matches(/^[a-zA-Z]/)
            .withMessage('Username must begin with a letter.'),
];

validationMiddleware.validatePassword = [
    body('password')
        .exists()
        .isLength({min: 8})
            .withMessage('Password must be 8 or more characters.')
        .matches(/[A-Z]/)
            .withMessage('Password must contain at least one uppercase letter.')
        .matches(/[0-9]/)
            .withMessage('Password must contain at least one number.')
        .matches(/[\/\*\-\+\!\@\#\$\^\&\*]/)
            .withMessage('Password must contain at least one special character ( / * - + ! @ # $ ^ & * ).'),
];

validationMiddleware.validatePasswordConfirmation = [
    body('passwordConfirmation')
        .custom((value, {req}) => value === req.body.password)
            .withMessage('Passwords do not match.')
];

validationMiddleware.validateRegistration = [
    ...validationMiddleware.validateEmail,
    ...validationMiddleware.validateUsername,
    ...validationMiddleware.validatePassword,
    ...validationMiddleware.validatePasswordConfirmation,
    body('age-check')
        .exists()
        .equals("checked")
            .withMessage('You must be 13 years or older to register.'),
    body('TOS-check')
        .exists()
        .equals("checked")
            .withMessage('You must agree to the Terms of Service.')
];

validationMiddleware.validatePost = [
    
];

validationMiddleware.validateSearch = [
];

validationMiddleware.validateLogin = [
];

validationMiddleware.validateComment = [
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