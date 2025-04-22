const form = document.getElementById("form");
const firstNameInput = document.getElementById("firstName-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const repeatPasswordInput = document.getElementById("repeat-password-input");
const errorMessage = document.getElementById("error-message")

let users = JSON.parse(localStorage.getItem('users')) || [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let errors = [];
    if (firstNameInput) {
        // Signup form validation
        errors = getSignUpFormErrors(
            firstNameInput.value, 
            emailInput.value, 
            passwordInput.value, 
            repeatPasswordInput.value
        );
        
        if (errors.length === 0) {
            // Check if user already exists
            const userExists = users.some(user => user.email === emailInput.value);
            if (userExists) {
                errors.push("Email already registered");
                emailInput.parentElement.classList.add("incorrect");
            } else {
                // Save new user
                users.push({
                    firstName: firstNameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value
                });
                localStorage.setItem('users', JSON.stringify(users));
                alert("Signup successful! Please login.");
                window.location.href = "login.html"; // Redirect to login page
            }
        }
    } else {
        // Login form validation
        errors = getLoginFormErrors(emailInput.value, passwordInput.value);
        
        if (errors.length === 0) {
            // Check credentials
            const user = users.find(user => user.email === emailInput.value);
            if (!user) {
                errors.push("Email not found");
                emailInput.parentElement.classList.add("incorrect");
            } else if (user.password !== passwordInput.value) {
                errors.push("Incorrect password");
                passwordInput.parentElement.classList.add("incorrect");
            } else {
                alert("Login successful!");
            
                window.location.href = "index.html"; // Redirect after login
            }
        }
    }
    
    if (errors.length > 0) {
        errorMessage.innerText = errors.join(". ");
    } else {
        // If no errors, the form would submit normally
        // form.submit(); // Uncomment this if you want actual form submission
    }
});

//creating an array that will hold the error messages
function getSignUpFormErrors(firstname, email, password, repeatPassword) {
let errors = []
if(firstname === "" || firstname == null){
    errors.push("First name is required")
    firstNameInput.parentElement.classList.add("incorrect")
}
if(email === "" || email == null){
    errors.push("Email is required")
    emailInput.parentElement.classList.add("incorrect")
}
if(password === "" || password == null){
    errors.push("Password is required")
    passwordInput.parentElement.classList.add("incorrect")
}
if(password != repeatPassword){
    errors.push("Password does not match repeated password")
    passwordInput.parentElement.classList.add("incorrect")
    repeatPasswordInput.parentElement.classList.add("incorrect")
}
if(password.length < 8) {
    errors.push("Password should not be less than 8 characters")
    passwordInput.parentElement.classList.add("incorrect")
}
return errors;
}
function getLoginFormErrors(email, password) {
    let errors = []
    if(email === "" || email == null){
        errors.push("Email is required")
        emailInput.parentElement.classList.add("incorrect")
    }
    if(password === "" || password == null){
        errors.push("Password is required")
        passwordInput.parentElement.classList.add("incorrect")
    }
    return errors
}
const allInputs = [firstNameInput, emailInput, passwordInput, repeatPasswordInput].filter(input => input != null)

allInputs.forEach(input => {
    input.addEventListener("input", () => {
        if(input.parentElement.classList.contains("incorrect")){
            input.parentElement.classList.remove("incorrect")
            errorMessage.innerText = ""
        }
       
    })
});