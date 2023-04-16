//*	Импорт	*//

// Импортируем константы (конфиг валидации, базовый набор карточек)
import { initialCards, validationConfig } from "../utils/constants.js";

// Импортируем файлы с заготовленными классами карточки и валидации форм
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// Испортируем класс Section
import Section from "../components/Section.js";

// Импортируем классы по работе с попапами
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

// Импортируем класс с информацией о пользователе
import UserInfo from "../components/UserInfo.js";


//*	Найти селекторы в DOM	*//

// const popupList = document.querySelectorAll('.popup');
// const formList = document.querySelectorAll('.popup__form');
// const inputList = document.querySelectorAll('.popup__input');
const content = document.querySelector('.content');
const profile = content.querySelector('.profile');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('#formEditProfile');
const popupOpenButtonEdit = profile.querySelector('.profile__button-edit');

const nameInput = formEditProfile.querySelector('.popup__input_type_username');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
// const nameProfile = profile.querySelector('.profile__username');
// const jobProfile = profile.querySelector('.profile__description');

const popupAddCard = document.querySelector('.popup_type_add-card');
const cards = document.querySelector('.elements');
const cardsContent = cards.querySelector('.elements__content');
const cardAddButton = profile.querySelector('.profile__button-add');
const formAddCard = popupAddCard.querySelector('#formAddCard');
const titleInput = formAddCard.querySelector('.popup__input_type_title');
const linkInput = formAddCard.querySelector('.popup__input_type_link');

const popupImage = document.querySelector('.popup_type_zoom-image');
// const popupImagePhoto = popupImage.querySelector('.popup__photo');
// const popupImageTitle = popupImage.querySelector('.popup__title-photo');

// const popupButtonSaveElement = popupAddCard.querySelector('.popup__button-save');


//* Отрисовать базовый набор карточек *//

const сardList = new Section(
	{
		items: initialCards,
		renderer: (data) => {
			const card = new Card(
				data,
				'#elements__template',
				() => popupWithImage.open(data.title, data.link));

			const cardElement = card.generateCard();

			сardList.addItem(cardElement);
		}
	}, '.elements__content');

сardList.renderItems();

//* Функция установки имени и информации о пользователе *//

const userInfo = new UserInfo({
	nameSelector: '.profile__username',
	infoSelector: '.profile__description'
});

//* Функции отрытия/закрытия попапов *//

const popupWithImage = new PopupWithImage('.popup_type_zoom-image');

const formPopupAddCard = new PopupWithForm({
	popupSelector: '.popup_type_add-card',
	handleFormSubmit: (data) => {
		сardList.addItem(createCard(data, '#elements__template'));
		formPopupAddCard.close();
	}
});

const formPopupEditProfile = new PopupWithForm({
	popupSelector: '.popup_type_edit-profile',
	handleFormSubmit: (data) => {
		userInfo.setUserInfo(data.name, data.info);
	}
});

//	Функция создания карточки

const createCard = (data, template, openPopupImage) => {
	const card = new Card(data, template, openPopupImage);
	return card.generateCard();
};

// Добавление карточки

const addCard = (data, item) => {
	const card = createCard(data,
		'#elements__template',
		() => popupWithImage.open(data.title, data.link));

	item.prepend(card);
};

// Наполнение новой карточки и её вставка

function submitAddCardsForm(evt) {
	evt.preventDefault();
	const cardElement = {
		title: titleInput.value,
		link: linkInput.value,
	};

	addCard(cardElement, cardsContent);
	formAddCard.reset();
	formPopupAddCard.close();
};

//* Установить слушатели *// 

// Открыть (закрыть) popup профиля

popupOpenButtonEdit.addEventListener('click', () => {
	formPopupEditProfile.open();

	nameInput.value = userInfo.getUserInfo().name;
	jobInput.value = userInfo.getUserInfo().info;

	validatorEditProfile.hideAllInputErrors();
	validatorEditProfile.toggleButtonState();
});


// Открыть (закрыть) popup добавления карточки

cardAddButton.addEventListener('click', () => {
	formPopupAddCard.open();
	validatorAddCard.hideAllInputErrors();
	validatorAddCard.disableSubmitButton();
});

// Слушатели классов

popupWithImage.setEventListeners();
formPopupEditProfile.setEventListeners();

// Добавить карточку

formAddCard.addEventListener('submit', submitAddCardsForm);

// Редактировать профиль 

formEditProfile.addEventListener('submit', popupOpenButtonEdit);


//* Валидация форм *//

const validatorEditProfile = new FormValidator(validationConfig, formEditProfile);
const validatorAddCard = new FormValidator(validationConfig, formAddCard);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();