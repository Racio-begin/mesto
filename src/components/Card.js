// Создаем класс карточки - "завод" по созданию новых карточек

class Card {
	constructor(data, template, openPopupImage) {
		this._name = data.name;
		this._link = data.link;

		this._template = template;

		this._openPopupImage = openPopupImage;
	};

	_getTemplate() {										// забираем разметку из HTML и клонируем элемент

		const cardElement = document
			.querySelector(this._template)
			.content
			.querySelector('.element')
			.cloneNode(true);

		this._likeCardButton = cardElement.querySelector('.element__button-like');
		this._elementImage = cardElement.querySelector('.element__image');

		return cardElement;								// вернём DOM-элемент карточки
	};

	// Подготовка карточки к публикации
	// Метод наполняет карточки данными и функциональностью

	generateCard() {

		this._element = this._getTemplate(); 		// Запишем разметку в приватное поле _element, так у других элементов появится доступ к ней.

		this._elementImage.src = this._link;
		this._element.querySelector('.element__place').textContent = this._name;
		this._elementImage.alt = this._name;

		this._setEventListeners();							// Добавим слушателей

		return this._element;
	};

	_setEventListeners() {					// Установка слушателей событий на создаваемую карточку

		this._element.querySelector('.element__button-bin').addEventListener('click', () => {
			this._handleDeleteCard();
		});

		this._likeCardButton.addEventListener('click', () => {
			this._handleLikeCard();
		});

		this._elementImage.addEventListener('click', () => {
			this._openPopupImage(this._name, this._link);
		})
	};

	_handleDeleteCard() {
		this._element.remove();
		this._element = null;
	};

	_handleLikeCard() {
		this._likeCardButton.classList.toggle('elements__button-like_active');
	};

};

export default Card;