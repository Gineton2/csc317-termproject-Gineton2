const {body, validationResult, query} = require('express-validator');
const validationMiddleware = {};
const path = require('path');

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
    ...validationMiddleware.validateRegistrationAgeCheck,
    ...validationMiddleware.validateRegistrationTOSCheck
];

validationMiddleware.validatePostTitle = [
    body('title')
    .trim()
    .exists()
    .notEmpty()
        .withMessage('Title is required.')
    .isLength({min: 1, max: 50})
        .withMessage('Title must be between 1 and 50 characters long.'),
// shall a description be required to post?
body('description')
    .exists()
        .withMessage('Description is required.'),
];

validationMiddleware.validatePostImage = [
    body('imageUpload')
        .custom((value, {req}) => {
            if(!req.file){
                return false;
            }
            const fileExt = path.extname(req.file.originalname).toLowerCase();
            const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

            return validExtensions.includes(fileExt);
        })
            .withMessage('Image must be a valid image file type: .jpg, .jpeg, .png, .gif')
]

validationMiddleware.validateUsePolicyCheck = [
    body('use-policy-check')
    .exists()
    .equals("checked")
        .withMessage('You must agree to the Use Policy.')
];

validationMiddleware.validatePost = [
    ...validationMiddleware.validatePostTitle,
    ...validationMiddleware.validatePostImage,
    ...validationMiddleware.validateUsePolicyCheck
];

validationMiddleware.validateSearch = [
    query('search')
        .trim()
        .exists()
        .withMessage('Search term is required.')
        .isLength({min: 1, max : 80})
            .withMessage('Search term must have between one and 80 characters.')
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
        console.log(errors);
        let errorMessage = errors.array().map(error => error.msg).join('\n');
        req.flash('error', errorMessage);
        res.redirect('back');
    }
    else {
        next();
    }
};

module.exports = validationMiddleware;