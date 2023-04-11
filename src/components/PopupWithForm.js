import Popup from "../components/Popup.js";

class PopupWithForm extends Popup {
	constructor({popupSelector, handleFormSubmit}) {
		super(popupSelector);

		// this._popupSelector = popupSelector;
		this._handleFormSubmit = handleFormSubmit;

		this._formList = this._popup.querySelector('.popup__form');
		this._inputList = this._formList.querySelector('.popup__input');
	};

	_getInputValues() {
		this._formValues = {};

		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});

		return this._formValues;
	};

	setEventListeners() {
		super.setEventListeners();
		this._formList.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this._getInputValues());
		})
	};

	close() {
		super.close();
		this._formList.reset();
	};
};

export default PopupWithForm;