import Popup from "../components/Popup.js";

class PopupWithForm extends Popup {
	constructor({ popupSelector, handleFormSubmit }) {
		super(popupSelector);

		this._handleFormSubmit = handleFormSubmit;
		this._form = this._popup.querySelector('.popup__form');
		this._inputList = this._form.querySelectorAll('.popup__input');
	};

	close() {
		super.close();
		this._form.reset();
	};

	_getInputValues() {
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
			this.close();
		})
	};

};

export default PopupWithForm;