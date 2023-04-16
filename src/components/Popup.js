class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._popupList = document.querySelectorAll('.popup');
	};

	open() {
		this._popup.classList.add('popup_opened');											// добавляем попапу класс для отображения
		document.addEventListener('keydown', this._handleEscClose);			// добавляем слушатель клавиш
	};

	close() {
		this._popup.classList.remove('popup_opened');										// удаляем попапу класс для отображения
		document.removeEventListener('keydown', this._handleEscClose);	// удаляем слушатель клавиш
	};

	_handleEscClose = (evt) => {
		if (evt.key === 'Escape') {
			this.close();
		}
	}

	setEventListeners() {
		this._popupList.forEach(() => {																																	// итерируем массив. объявляя каждый попап в переменную popup
			this._popup.addEventListener('click', (evt) => {																							// на каждый попап устанавливаем слушателя события
				const targetClassList = evt.target.classList;																								// запишем в переменную класс элемента, на котором произошло событие
				if (targetClassList.contains('popup') || targetClassList.contains('popup__button-close')) {	// проверяем наличие класса попапа ИЛИ кнопки закрытия
					this.close();																																							// если один из классов присутствует, то закрываем попап
				}
			})
		});
	};

};

export default Popup;