/** Form Validation
registration.html – for guests to register accounts

Some of these requirements can be verified as the user types and some can be verified when the user clicks the submit button. 

If the data is invalid the form SHOULD NOT BE submitted. If the data is valid, simply let the page refresh or show a message saying the form was submitted.
**/

// Potentioal improvements: 
// - Separate error handling to separate functions. 
// - Use an array to store/iterate through validation functions and/or error messages.

const form = document.getElementsByTagName('form')[0];
const email = document.getElementById('email-registration');
const username = document.getElementById('username-registration');
const password = document.getElementById('password-registration');
const passwordConfirmation = document.getElementById('password-confirmation-registration');

const emailError = document.getElementById('email-error');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const passwordConfirmationError = document.getElementById('password-confirmation-error');


function validateForm(event){
    event.preventDefault();

    let formIsValid = true;

    // age-check and TOS validation performed with HTML5
    formIsValid = validateEmail() && formIsValid;
    formIsValid = validateUsername() && formIsValid; 
    formIsValid = validatePassword() && formIsValid;

    if (formIsValid){
        form.submit();
    }
}

function validateEmail(){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    isValid = regex.test(email.value);
    if (!isValid){
        emailError.textContent = 'Please enter a valid email address.';
    } else {
        emailError.textContent = '';
    }
    return isValid;
}

function validateUsername(){
    isValid = validateUsernameInitialChar() &&
        validateUsernameLength();
    if (isValid){
        usernameError.textContent = '';
    }
    return isValid;
}

// require the user to enter a Username that begins with a character ([a-zA-Z]).
function validateUsernameInitialChar(){
    const regex = /^[a-zA-Z]/;
    const isValid = regex.test(username.value)
    if (!isValid){
        usernameError.textContent = 'Username must begin with a letter.';
    } else {
        usernameError.textContent = '';
    }
    return isValid;
}

// require the user to enter a Username that is 3 or more alphanumeric characters.
function validateUsernameLength(){
    const isValid = username.value.length >= 3;
    if (!isValid){
        usernameError.textContent = 'Username must be 3 or more characters.';
    } else {
        usernameError.textContent = '';
    }
    return isValid;
}

// require the user to enter a password that is 8 or more characters AND contains at least 1 upper case letter AND 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * ).
function validatePassword(){
    const isValid = (validatePasswordLength() && 
        validatePasswordUpper() &&
        validatePasswordNumber() &&
        validatePasswordSpecial() &&
        validatePasswordMatch());
    if (isValid){
        passwordError.textContent = '';
        passwordConfirmationError.textContent = '';
    }
    return isValid;
}

function validatePasswordLength(){
    // 8 or more characters
    const isValid = password.value.length >= 8;
    if (!isValid){
        passwordError.textContent = 'Password must be 8 or more characters.';
    } else {
        passwordError.textContent = '';
    }
    return isValid;
}

function validatePasswordUpper(){
    // contains at least 1 upper case letter
    const isValid = password.value.match(/[A-Z]/);
    if (!isValid){
        passwordError.textContent = 'Password must contain at least 1 upper case letter.';
    } else {
        passwordError.textContent = '';
    }
    return isValid;
}

function validatePasswordNumber(){
    // contains at least 1 number
    const isValid = password.value.match(/[0-9]/);
    if (!isValid){
        passwordError.textContent = 'Password must contain at least one number.';
    } else {
        passwordError.textContent = '';
    }
    return isValid;
}

function validatePasswordSpecial(){
    // contains at least 1 of the following special characters ( / * - + ! @ # $ ^ & * )
    const isValid = password.value.match(/[\/\*\-\+\!\@\#\$\^\&\*]/);
    if (!isValid){
        passwordError.textContent = 'Password must contain at least one special character.';
    } else {
        passwordError.textContent = '';
    }
    return isValid;
}

function validatePasswordMatch(){
    // require that the password and confirm password inputs are the same. 
    const isValid = password.value === passwordConfirmation.value;
    if (!isValid){
        passwordConfirmationError.textContent = 'Passwords do not match.';
    } else {
        passwordConfirmationError.textContent = '';
    }
    return isValid;
}

email.addEventListener('input', validateEmail);
username.addEventListener('input', validateUsername);
password.addEventListener('input', validatePassword);
passwordConfirmation.addEventListener('input', validatePassword);

document.getElementById('registration').addEventListener('submit', validateForm);
