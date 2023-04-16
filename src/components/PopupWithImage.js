import Popup from "../components/Popup.js";

class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);

		this._photo = this._popup.querySelector('.popup__photo');
		this._title = this._popup.querySelector('.popup__title-photo');
	};

	open(titleName, linkName) {
		super.open();

		this._photo.src = linkName;
		this._photo.alt = titleName;
		this._title.textContent = titleName;
	};

};

export default PopupWithImage;