// Создаем класс карточки - "завод" по созданию новых карточек.

class Card {
  constructor(data, template) {
		this._title = data.title;
		this._link = data.link;
		this._template = template;
  };

	_getTemplate() {																						// забираем разметку из HTML и клонируем элемент
		this._cardTemplate = document
		.getElementById(this._template)
		.content
		.querySelector('.element')
		.clodeNode(true);

		// this.buttonLike = this.cardElement.querySelector('.');

		return this._cardTemplate;																	// вернём DOM-элемент карточки
	}

	generateCard() {
		this._element = this._getTemplate(); 																		// Запишем разметку в приватное поле _element,
																																						// так у других элементов появится доступ к ней.
		this._element = this.setEventListeners();																// добавим обработчики

		this._element.querySelector('.element__image').src = this.link;
		this._element.querySelector('.element__place').textContent = this.title;

		return this._element;
	}

	_handleDeleteCard(evt) {
		evt.target.closest('.element').remove();
	}

	_handleLikeCard(evt) {
		evt.target.classList.toggle('elements__button-like_active');
	}

	_handlePreviewCard() {
		elementPhoto.src = link;
		elementPhoto.alt = titleName;
		cardElement.querySelector('.element__place').textContent = titleName;
	}

	setEventListeners() {
		this._element.querySelector('.element__button-bin').addEventListener('click', () => {
			this._handleDeleteCard();
		});

		this._element.querySelector('.element__button-like').addEventListener('click', () => {
			this._handleLikeCard();

		});
		this._element.querySelector('.element__image').addEventListener('click', () => {
			this._handlePreviewCard();
		})
	}

};

export default Card;