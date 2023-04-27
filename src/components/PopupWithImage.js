import Popup from "../components/Popup.js";

class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);

		this._photo = this._popup.querySelector('.popup__photo');
		this._name = this._popup.querySelector('.popup__title-photo');
	};

	open(name, link) {
		super.open();

		this._photo.alt = name;
		this._name.textContent = name;
		this._photo.src = link;
	};

};

export default PopupWithImage;