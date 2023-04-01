class FormValidator {
	constructor(config, formElement) {
		this._formSelector = config.formSelector
		this._inputSelector = config.inputSelector
		this._submitButtonSelector = config.submitButtonSelector
		this._inactiveButtonClass = config.inactiveButtonClass
		this._inputErrorClass = config.inputErrorClass
		this._errorClass = config.errorClass

		this._formElement = formElement
	}

	_showInputError(inputElement) {																												// высветить span с ошибкой
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);	// найти span с нужным классом (id инпута)

		errorElement.classList.add(this._errorClass);
		errorElement.textContent = inputElement.validationMessage;													// вывести текст ошибки (браузерная)
		inputElement.classList.add(this._inputErrorClass);																	// вывести красную обводку инпута
	};

	_hideInputError(inputElement) {																												// спрятать span с ошибкой
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = '';
		inputElement.classList.remove(this._inputErrorClass);
	};

	hideAllInputErrors() {
		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement)
		})
	};

	_checkInputValidity(inputElement) {			// проверить валидность
		if (inputElement.validity.valid) {
			this._hideInputError(inputElement);	// спрятать ошибку, если валидно
		} else {
			this._showInputError(inputElement);	// показать ошибку, если невалидно
		}
	};

	_hasInvalidInput() {
		return this._inputList.some((inputElement) => !inputElement.validity.valid);
	};

	disableSubmitButton() {													// выключить кнопку отправки
		this._buttonElement.classList.add(this._inactiveButtonClass);
		this._buttonElement.disabled = true;
	};

	_enableSubmitButton() {													// включить кнопку отправки
		this._buttonElement.classList.remove(this._inactiveButtonClass);
		this._buttonElement.disabled = false;
	};

	toggleButtonState() {							// переключатель кнопки форм
		if (this._hasInvalidInput()) {	// отключить кнопку (отправки данных пользователя или создания карточки) 
			this.disableSubmitButton();
		} else {												// иначе включить её
			this._enableSubmitButton();
		}
	};

	_setEventListeners() {
		this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));	// получить все инпуты по классу инпута и создать из них массив
		this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);			// получить кнопку сохранения (отправки) в форме

		this.toggleButtonState();																																// отключить кнопку отправки при пустых полях при загрузке сайта

		this._inputList.forEach((inputElement) => {																							// вешаем обработчик на каждый инпут
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);																							// проверить валидность инпута
				this.toggleButtonState();																														// проверить список инпутов на валидность
			})
		})
	};

	enableValidation() { 					// Запуск валидации
		this._setEventListeners();
	};

};

export default FormValidator;