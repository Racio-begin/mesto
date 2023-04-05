//*	Импорт	*//

// Импортируем константы (конфиг валидации, базовый набор карточек)
import { initialCards, validationConfig } from "../utils/constants.js";

// Импортируем файлы с заготовленными классами карточки и валидации форм
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// Испортируем класс Section
import Section from "../components/Section.js";

// Импортируем классы по работе с попапами
// import Popup from "./Popup.js";
// import PopupWithForm from "./PopupWithForm.js";
// import PopupWithImage from "./PopupWithImage.js";

// Импортируем класс с информацией о пользователе
// import UserInfo from "./UserInfo.js";


//*	Найти селекторы в DOM	*//

const popupList = document.querySelectorAll('.popup');
const formList = document.querySelectorAll('.popup__form');
const inputList = document.querySelectorAll('.popup__input');
const content = document.querySelector('.content');
const profile = content.querySelector('.profile');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('#formEditProfile');
const popupOpenButtonEdit = profile.querySelector('.profile__button-edit');

const nameInput = formEditProfile.querySelector('.popup__input_type_username');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const nameProfile = profile.querySelector('.profile__username');
const jobProfile = profile.querySelector('.profile__description');

const popupAddCard = document.querySelector('.popup_type_add-card');
const cards = document.querySelector('.elements');
const cardsContent = cards.querySelector('.elements__content');
const cardAddButton = profile.querySelector('.profile__button-add');
const formAddCard = popupAddCard.querySelector('#formAddCard');
const titleInput = formAddCard.querySelector('.popup__input_type_title');
const linkInput = formAddCard.querySelector('.popup__input_type_link');

const popupImage = document.querySelector('.popup_type_zoom-image');
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageTitle = popupImage.querySelector('.popup__title-photo');

const popupButtonSaveElement = popupAddCard.querySelector('.popup__button-save');

const validatorEditProfile = new FormValidator(validationConfig, formEditProfile);
const validatorAddCard = new FormValidator(validationConfig, formAddCard);


//* Функции отрытия/закрытия попапов *// 

// Открыть/закрыть popup

function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closeByEsc);
};

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closeByEsc);
};

// Закрыть popup, Escape

function closeByEsc(evt) {
	if (evt.key === "Escape") {
		const openedPopup = document.querySelector('.popup_opened');
		closePopup(openedPopup);
	}
};

// Закрыть popup, оверлей (универсальная функция для всех)

popupList.forEach((popup) => {																											// итерируем массив. объявляя каждый попап в переменную popup
	popup.addEventListener('click', (evt) => {																		// на каждый попап устанавливаем слушателя события
		const targetClassList = evt.target.classList;																								// запишем в переменную класс элемента, на котором произошло событие
		if (targetClassList.contains('popup') || targetClassList.contains('popup__button-close')) {	// проверяем наличие класса попапа ИЛИ кнопки закрытия
			closePopup(popup);																																				// если один из классов присутствует, то закрываем попап
		}
	})
});

//*  Обработчик «отправки» формы  *// 

function handleFormSubmit(evt) {
	evt.preventDefault();
	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;
	closePopup(popupEditProfile);
};

//*  Работа с карточками  *// 

//	Создание базового набора карточек

// initialCards.forEach((data) => {
// 	const card = createCard(data, '#elements__template', openPopupImage);
// 	cardsContent.prepend(card);
// });

// const createCard = (data, template, openPopupImage) => {
// 	const card = new Card(data, template, openPopupImage);
// 	return card.generateCard();
// };

const сardList = new Section(
	{
		items: initialCards, renderer: (item) => {
			const card = new Card(item, '#elements__template', openPopupImage);

			const cardElement = card.generateCard();

			сardList.addItem(cardElement);
		}
	}, '.elements__content');

//	Функция создания карточки

сardList.renderItems();

// Добавление карточки

const addCard = (data, item) => {
	const card = createCard(data, '#elements__template', openPopupImage);
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
	closePopup(popupAddCard);
};

// Открыть карточку (используем в классе "Card")

function openPopupImage(titleName, linkName) {
	popupImagePhoto.src = linkName;
	popupImagePhoto.alt = titleName;
	popupImageTitle.textContent = titleName;
	openPopup(popupImage);
};

//* Установить слушатели *// 

// Редактировать профиль 

formEditProfile.addEventListener('submit', handleFormSubmit);

// Открыть (закрыть) popup профиля

popupOpenButtonEdit.addEventListener('click', () => {
	openPopup(popupEditProfile);

	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;

	validatorEditProfile.hideAllInputErrors();
	validatorEditProfile.toggleButtonState();
});

// Добавить карточки 

formAddCard.addEventListener('submit', submitAddCardsForm);

// Открыть (закрыть) popup добавления карточки

cardAddButton.addEventListener('click', () => {
	openPopup(popupAddCard);

	titleInput.value = '';	// todo: решить через reset
	linkInput.value = '';

	validatorAddCard.hideAllInputErrors();
	validatorAddCard.disableSubmitButton();
});

//* Валидация форм *//

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();