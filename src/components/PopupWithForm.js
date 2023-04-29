import Popup from "../components/Popup.js";

class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super(popupSelector);

		this._handleFormSubmit = handleFormSubmit;

		this._form = this._popup.querySelector('.popup__form');
		this._inputList = this._form.querySelectorAll('.popup__input');
		this._submitButton = this._form.querySelector('.popup__button-save');
		this._defaultText = this._submitButton.textContent;
	};

	close() {
		super.close();

		this._form.reset();
	};

	_getInputValues() { 				// Собираем содержимое всех инпутов формы
		const formValues = {};
		this._inputList.forEach(input => {
			formValues[input.name] = input.value;
		});

		return formValues;
	};

	setEventListeners() {
		super.setEventListeners();

		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this._getInputValues());
		});
	};

	toggleSaveStatus(status) {	// Запускаем UX при сабмите у всех форм
		if (status) {
			this._submitButton.textContent = "Сохранение..."
		} else (
			this._submitButton.textContent = this._defaultText)
	};

};

export default PopupWithForm;