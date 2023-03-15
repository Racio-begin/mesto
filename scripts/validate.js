function showInputError(formElement, inputElement, config) {                   // высветить span с ошибкой
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // найти span с нужным классом (id инпута)

  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;                   // вывести текст ошибки (браузерная)
  inputElement.classList.add(config.InputErrorClass);                          // вывести красную обводку инпута
};

function hideInputError(formElement, inputElement, config) {                   // спрятать span с ошибкой
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.InputErrorClass);
};

function checkInputValidity(formElement, inputElement, config) { // проверить валидность
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);           // спрятать ошибку, если валидно
  } else {
    showInputError(formElement, inputElement, config);           // показать ошибку, если невалидно
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

function enableSubmitButton(buttonElement, config) {            // включить кнопку отправки
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
};

function disableSubmitButton(buttonElement, config) {           // выключить кнопку отправки
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

function toggleButtonState(inputList, buttonElement, config) {  // переключатель кнопки сабмита (отправка краточки)
  if (hasInvalidInput(inputList)) {                             // отключить кнопку отправки 
    disableSubmitButton(buttonElement, config);
  } else {                                                      // иначе включить её
    enableSubmitButton(buttonElement, config);
  }
};

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); // получить все инпуты по классу инпута и создать из них массив
  const buttonElement = formElement.querySelector(config.submitButtonSelector);     // получить кнопку сохранения (отправки) в форме

  toggleButtonState(inputList, buttonElement, config);                              // отключить кнопку отправки при пустых полях при загрузке сайта

  inputList.forEach((inputElement) => {                                             // вешаем обработчик на каждый инпут
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);                        // проверить валидность инпута
      toggleButtonState(inputList, buttonElement, config);                          // проверить список инпутов на валидность
    })
  })
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); // получить все формы по классу формы из конфига и создать из них массив
  formList.forEach((formElement) => {                                          // пройтись по всем формам в этом массиве
    setEventListeners(formElement, config);                                    // установить на все формы слушатели
  })
};