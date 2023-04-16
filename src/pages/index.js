//*	Импорт	*//

// Импортируем константы (конфиг валидации, базовый набор карточек)
import {
	initialCards,
	validationConfig,
	content,
	profile,
	popupEditProfile,
	formEditProfile,
	popupOpenButtonEdit,
	nameInput,
	jobInput,
	popupAddCard,
	cards,
	cardsContent,
	cardAddButton,
	formAddCard,
	titleInput,
	linkInput
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

formPopupAddCard.setEventListeners();
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