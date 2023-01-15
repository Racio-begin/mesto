function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.InputErrorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.InputErrorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {  
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
    })
  })
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config)
  })
}


// function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//     formList.forEach((formElement) => {
//     formElement.addEventListener('input', (evt) => {
//         evt.preventDefault();
//     });
//     setEventListeners(formElement, config);
//   })
// };
