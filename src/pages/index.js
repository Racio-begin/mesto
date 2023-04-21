//*	Импорт	*//

// Импортируем стили (для работы с WebPack)
import './index.css';

// Импортируем константы (конфиг валидации, базовый набор карточек)
import {
	initialCards,
	validationConfig,
	formEditProfile,
	popupOpenButtonEdit,
	nameInput,
	jobInput,
	cardAddButton,
	formAddCard
}
	from "../utils/constants.js";

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

// Импортируем класс с API
import Api from '../components/Api.js';

//*	Функции	*//

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
	headers: {
		authorization: 'c467341b-672a-48a9-be5b-ea4a89cc731a',
		'Content-Type': 'application/json'
	}
});

api.getInitialCards().then(console.log);

// Отрисовать базовый набор карточек

const сardList = new Section({
	items: initialCards,
	renderer: (data) => {
		const card = createCard(data.title, data.link, '#elements__template');
		сardList.addItem(card);
	}
},
	'.elements__content');

сardList.renderItems();

// Установить имя и информацию о пользователе

const userInfo = new UserInfo({
	nameSelector: '.profile__username',
	infoSelector: '.profile__description'
});

// Функции отрытия/закрытия попапов

const popupWithImage = new PopupWithImage('.popup_type_zoom-image');

const formPopupAddCard = new PopupWithForm({
	popupSelector: '.popup_type_add-card',
	handleFormSubmit: (data) => {
		сardList.addItem(createCard(data.title, data.link, '#elements__template'));
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

function createCard(title, link, template) {
	const card = new Card(title, link, template, () => popupWithImage.open(title, link));
	return card.generateCard();
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

formPopupAddCard.setEventListeners();
popupWithImage.setEventListeners();
formPopupEditProfile.setEventListeners();


//* Валидация форм *//

const validatorEditProfile = new FormValidator(validationConfig, formEditProfile);
const validatorAddCard = new FormValidator(validationConfig, formAddCard);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();