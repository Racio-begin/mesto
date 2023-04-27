// Создаем класс карточки - "завод" по созданию новых карточек

class Card {
	constructor(data, userId, template, openPopupImage, handleLike, handleUnlike, handleDeleteYourCard) {
		this._cardData = data;

		this._name = data.name;
		this._link = data.link;
		this.likes = data.likes;
		this._likesCounter = data.likes.length;
		this._cardId = data._id;
		this._owner = data.owner;

		this.userId = userId;

		this._template = template;

		this._openPopupImage = openPopupImage;
		this._handleLike = handleLike;
		this._handleUnlike = handleUnlike;
		this._handleDeleteYourCard = handleDeleteYourCard;
	};

	_getTemplate() {										// забираем разметку из HTML и клонируем элемент

		const cardElement = document
			.querySelector(this._template)
			.content
			.querySelector('.element')
			.cloneNode(true);

		this._likeCardButton = cardElement.querySelector('.element__button-like');
		this._buttonBin = cardElement.querySelector('.element__button-bin');
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

		this._like = this._element.querySelector('.element__button-like');
		this._counter = this._element.querySelector('.elements__like-counter');
		this.countLikes(this._cardData);

		if (this.userId !== this._cardData.owner._id) {
			this._buttonBin.style.display = 'none'
		};

		this._setEventListeners();							// Добавим слушателей

		return this._element;
	};

	_setEventListeners() {					// Установка слушателей событий на создаваемую карточку

		this._buttonBin.addEventListener('click', () => {
			this._handleDeleteYourCard(this, this._cardId);
		});

		this._likeCardButton.addEventListener('click', () => {
			this._handleLikeCard();
		});

		this._elementImage.addEventListener('click', () => {
			this._openPopupImage(this._name, this._link);
		})
	};

	handleDeleteCard() {
		this._element.remove();
		this._element = null;
	};

	ifCardLiked() {
		return this._likes.some(item => item._id === this.userId);
	};

	_handleLikeCard() {
		// this._likeCardButton.classList.toggle('elements__button-like_active');
		if (this.ifCardLiked()) {
			this._handleUnlike(this._cardId)
		} else {
			this._handleLike(this._cardId)
		}
	};

	countLikes(card) {
		this._likes = card.likes;
		if (this._likes.length === 0) {
			this._counter.textContent = '0';
		} else {
			this._counter.textContent = this._likes.length
		};

		if (this.ifCardLiked()) {
			this._like.classList.add('elements__button-like_active');
		} else {
			this._like.classList.remove('elements__button-like_active');
		};
	};

};

export default Card;