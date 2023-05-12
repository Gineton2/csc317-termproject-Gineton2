/** Form Validation
registration.html – for guests to register accounts

Some of these requirements can be verified as the user types and some can be verified when the user clicks the submit button. 

If the data is invalid the form SHOULD NOT BE submitted. If the data is valid, simply let the page refresh or show a message saying the form was submitted.
**/

const form = document.getElementsByTagName('form')[0];
const email = document.getElementById('email-registration');
const username = document.getElementById('username-registration');
const password = document.getElementById('password-registration');
const passwordConfirmation = document.getElementById('password-confirmation-registration');

const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const passwordConfirmationError = document.getElementById('password-confirmation-error');


function validateForm(event){
    event.preventDefault();

    let formIsValid = true;

    // email, age-check, and TOS validation performed with HTML5
    formIsValid= validateUsername() && formIsValid; formIsValid= validatePassword() && formIsValid;

    if (formIsValid){
        form.submit();
    }
}

function validateUsername(){
    return (validateUsernameInitialChar() &&
    validateUsernameLength());
}

// require the user to enter a Username that begins with a character ([a-zA-Z]).
function validateUsernameInitialChar(){
    const regex = /^[a-zA-Z]/;
    const isValid = regex.test(username.value)
    if (!isValid){
        usernameError.textContent = 'Username must begin with a letter.';
    }
    return isValid;
}

// require the user to enter a Username that is 3 or more alphanumeric characters.
function validateUsernameLength(){
    const isValid = username.value.length >= 3;
    if (!isValid){
        usernameError.textContent = 'Username must be 3 or more characters.';
    }
    return isValid;
}

// require the user to enter a password that is 8 or more characters AND contains at least 1 upper case letter AND 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * ).
function validatePassword(){
    return true;
    // (validatePasswordLength() &&
    //     validatePasswordUpper() &&
    //     validatePasswordNumber() &&
    //     validatePasswordSpecial() &&
    //     validatePasswordMatch());
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