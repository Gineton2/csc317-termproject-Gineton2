/** Form Validation

ALL forms should be in <form> tags. If your form is built using <table> tags this needs to be removed.

FORM VALIDATION DONE VIA HTML5 IS NOT ALLOWED UNLESS OTHERWISE STATED, LATER WE CAN ADD THEM IN TO SIMPLIFY THE VALIDATION.

Students are required to add JavaScript to their registration form per the specifications below:
    ❖ registration.html – for guests to register accounts
        o require the user to enter a username that begins with a character ([a-zA-Z]).
        o require the user to enter a username that is 3 or more alphanumeric characters.
        o require the user to enter a password that is 8 or more characters AND contains at least 1 upper case letter AND 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * ).
        o require that the password and confirm password inputs are the same. o require the user to enter an email that is valid.
    ▪ This one CAN BE done with the type attribute set to “email” o require the user to select that they are 13+ years of age.
    ▪ This one CAN BE done with the HTML attribute require o require the user to select TOS and Privacy rules.
    ▪ This one CAN BE done with the HTML attribute require
When implementing the above requirements think about what happens when these requirements are not met. Some of these requirements can be verified as the user types and some can be verified when the user clicks the submit button. 

These design choices I leave up to you. If the data is invalid the form SHOULD NOT BE submitted. If the data is valid, simply let the page refresh or show a message saying the form was submitted.
**/

function validateForm(){

}


function validateUserName(){}

// require the user to enter a username that begins with a character ([a-zA-Z]).
function validateUserNameInitialChar(){}

// require the user to enter a username that is 3 or more alphanumeric characters.
function validateUserNameLength(){}

// require the user to enter a password that is 8 or more characters AND contains at least 1 upper case letter AND 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * ).
function validatePassword(){}

// require that the password and confirm password inputs are the same. 
function validatePasswordMatch(){}

// require the user to enter an email that is valid.
function validateEmail(){}
