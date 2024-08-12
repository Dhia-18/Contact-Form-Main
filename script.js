const form = document.querySelector("form");

const firstName = document.getElementById("first-name-input");
const lastName = document.getElementById("last-name-input");
const email = document.getElementById("email-input");
const radioButtons = document.querySelectorAll("input[type=radio]");
const message = document.getElementById("message-input");
const checkbox = document.getElementById("checkbox-input");

const successContainer = document.querySelector(".success-notification-container");
const radioButtonsContainers = document.querySelectorAll(".type-container div");

function showError(input,msg){
    const errorMessage = input.parentElement.querySelector(".error-message");

    input.style.borderColor="var(--red)";
    errorMessage.textContent=`${msg}`;
}

function emailValid(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value);
}

function buttonsChecked(){
    return(radioButtons[0].checked || radioButtons[1].checked);
}

/* Allow users to click on any position of the radioButton div */

radioButtonsContainers.forEach(container=>{
    container.addEventListener("click",()=>{
        /* Reset background color of all containers */
        radioButtonsContainers.forEach(container => {
            container.style.backgroundColor = "";
            container.style.borderColor = "";
        });

        container.querySelector("input[type=radio]").checked=true;

        container.style.backgroundColor="var(--green-200)";
        container.style.borderColor="var(--green-600)";
    });
});

/* Allow users to click on the label in order to check the checkbox */

checkbox.parentElement.querySelector("label").addEventListener("click",()=>{
    checkbox.checked ? checkbox.checked=false : checkbox.checked=true;
});

/* Reset Form */

function resetErrors(){
    const errorMessages = form.querySelectorAll(".error-message");
    const inputs = form.querySelectorAll("input, textarea");

    errorMessages.forEach(error=>{
        error.textContent="";
    });

    inputs.forEach(input => {
        input.style.borderColor = "";
    });
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    resetErrors();

    let isValid = true;

    if(firstName.value===""){
        showError(firstName,"This field is required");
        isValid = false;
    }

    if(lastName.value===""){
        showError(lastName,"This field is required");
        isValid = false;
    }

    if(email.value===""){
        showError(email,"This field is required");
        isValid = false;
    }
    else if(!emailValid()){
        showError(email,"Please enter a valid email address");
        isValid = false;
    }

    if(!buttonsChecked()){
        const errorMessage = radioButtons[0].closest(".type-container").querySelector(".error-message");
        errorMessage.textContent = "Please select a query type";
        isValid = false;
    }

    if(message.value===""){
        showError(message,"This field is required");
        isValid = false;
    }

    if(!checkbox.checked){
        const errorMessage = checkbox.parentElement.querySelector(".error-message");
        errorMessage.textContent="To submit this form, please conset to being contacted";
        isValid = false;
    }

    if(isValid){
        successContainer.classList.remove("hidden");
    }

});
