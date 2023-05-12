/** Form Validation
registration.html – for guests to register accounts

Some of these requirements can be verified as the user types and some can be verified when the user clicks the submit button. 

If the data is invalid the form SHOULD NOT BE submitted. If the data is valid, simply let the page refresh or show a message saying the form was submitted.
**/

const form = document.getElementsByTagName('form')[0];
const email = document.getElementById('email-registration');
const userName = document.getElementById('username-registration');
const password = document.getElementById('password-registration');


function validateForm(event){
    event.preventDefault();

    // email, age-check, and TOS validation performed with HTML5
    validateUserName();
    validatePassword();
}

function validateUserName(){
    validateUserNameInitialChar();
    validateUserNameLength();
}

// require the user to enter a username that begins with a character ([a-zA-Z]).
function validateUserNameInitialChar(){}

// require the user to enter a username that is 3 or more alphanumeric characters.
function validateUserNameLength(){}

// require the user to enter a password that is 8 or more characters AND contains at least 1 upper case letter AND 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * ).
function validatePassword(){
    validatePasswordLength();
    validatePasswordUpper();
    validatePasswordNumber();
    validatePasswordSpecial();
    validatePasswordMatch();
}

function validatePasswordLength(){
    // 8 or more characters
}

function validatePasswordUpper(){
    // contains at least 1 upper case letter
}

function validatePasswordNumber(){
    // contains at least 1 number
}

function validatePasswordSpecial(){
    // contains at least 1 of the following special characters ( / * - + ! @ # $ ^ & * )
}

function validatePasswordMatch(){
    // require that the password and confirm password inputs are the same. 
}

document.getElementById('registration').addEventListener('submit', validateForm);