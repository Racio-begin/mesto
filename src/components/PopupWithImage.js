import Popup from "../components/Popup.js";

class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);

		this._photo = this._popup.querySelector('.popup__photo');
		this._title = this._popup.querySelector('.popup__title-photo');
	};

	open(title, link) {
		super.open();

		this._photo.src = link;
		this._photo.alt = title;
		this._title.textContent = title;
	};

};

export default PopupWithImage;