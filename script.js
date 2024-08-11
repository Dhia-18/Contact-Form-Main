const firstNameInput = document.getElementById("first-name-input");
const lastNameInput = document.getElementById("last-name-input");
const emailInput = document.getElementById("email-input");
const radioButtons = document.querySelectorAll("input[type=radio]");
const messageInput = document.getElementById("message-input");
const checkboxInput = document.getElementById("checkbox-input");

const successContainer = document.querySelector(".success-notification-container");


const submitButton = document.querySelector("button");

function validEmail(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput.value);
}

function noRadioButtonsChecked() {
    return !Array.from(radioButtons).some(radio => radio.checked);
}

function showError(input,msg){
    const errorMessage = input.parentElement.querySelector(".error-message");

    errorMessage.textContent=`${msg}`;
}

submitButton.addEventListener("click",(e)=>{
    e.preventDefault();

    let bool = true;

    if(firstNameInput.value===""){
        showError(firstNameInput,"This field is required");
        bool=false;
    }
    
    if(lastNameInput.value===""){
        showError(lastNameInput,"This field is required");
        bool=false;
    }

    if(emailInput.input===""){
        showError(emailInput,"This field is required");
        bool=false;
    }
    else if(!validEmail()){
        showError(emailInput,"Please enter a valid email address");
        bool=false;
    }

    if(noRadioButtonsChecked()){
        showError(radioButtons[0].parentElement.parentElement,"Please select a query type");
        bool=false;
    }

    if(messageInput.value===""){
        showError(messageInput,"This field is required");
        bool=false;
    }

    if(!checkboxInput.checked){
        showError(checkboxInput,"To submit this form, please consent to being contacted");
        bool=false;
    }

    if(bool){
        successContainer.classList.remove("hidden");
    }
})