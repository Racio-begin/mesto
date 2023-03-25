//*  Импорт  *//

// Импортируем набор заготовленных карточек
import initialCards from "./cards.js"

// Импортируем конфиг валидации
import validationConfig from "./validationConfig.js";

// Импортируем файлы с заготовленными классами карточки и валидации форм
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//*  Найти селекторы в DOM  *//

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
// const popupCloseButtonEditProfile = popupEditProfile.querySelector('.popup__button-close');

const popupAddCard = document.querySelector('.popup_type_add-card');
const cards = document.querySelector('.elements');
const cardsContent = cards.querySelector('.elements__content');
const cardAddButton = profile.querySelector('.profile__button-add');
const formAddCard = popupAddCard.querySelector('#formAddCard');
const titleInput = formAddCard.querySelector('.popup__input_type_title');
const linkInput = formAddCard.querySelector('.popup__input_type_link');
// const popupCloseButtonAddCard = popupAddCard.querySelector('.popup__button-close');

const popupImage = document.querySelector('.popup_type_zoom-image');
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageTitle = popupImage.querySelector('.popup__title-photo');
// const popupCloseButtonOpenImage = popupImage.querySelector('.popup__button-close');

const popupButtonSaveElement = popupAddCard.querySelector('.popup__button-save');


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

function closeByEsc(event) {
	if (event.key === "Escape") {
		const openedPopup = document.querySelector('.popup_opened');
		closePopup(openedPopup);
	}
};

// Закрыть popup, оверлей (универсальная функция для всех)

popupList.forEach((popup) => {                                                                  // итерируем массив. объявляя каждый попап в переменную popup
	popup.addEventListener('click', (evt) => {                                                    // на каждый попап устанавливаем слушателя события
		const targetClassList = evt.target.classList;                                               // запишем в переменную класс элемента, на котором произошло событие
		if (targetClassList.contains('popup') || targetClassList.contains('popup__button-close')) { // проверяем наличие класса попапа ИЛИ кнопки закрытия
			closePopup(popup);                                                                        // если один из классов присутствует, то закрываем попап
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

//*  Создание базового набора карточек  *// 

initialCards.forEach((data) => {
	const card = new Card(data, '#elements__template', openPopupImage);							// передаём объект аргументом
	const cardElement = card.generateCard();
	cardsContent.prepend(cardElement) // или append?
});

// Добавление карточки

const addCard = (data, item) => {
	const card = new Card(data, '#elements__template', openPopupImage);
	const cardElement = card.generateCard();
  item.prepend(cardElement);
};

// Создание новой карточки 

function submitAddCardsForm(event) {
	event.preventDefault();

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

	// toggleButtonState(inputList, popupButtonSaveElement, validationConfig);

	// enableValidation(validationConfig);
});

// Добавить карточки 

formAddCard.addEventListener('submit', submitAddCardsForm);

cardAddButton.addEventListener('click', () => {
	openPopup(popupAddCard);

	titleInput.value = '';
	linkInput.value = '';
	// titleInput.reset();
	// linkInput.reset();
	// popupAddCard.reset();
	// cardAddButton.reset();

	validatorAddCard._disableSubmitButton(popupButtonSaveElement);
	validatorAddCard._hideInputError(inputList);
});

//* Валидация форм *//

const validatorEditProfile = new FormValidator(validationConfig, formEditProfile);
const validatorAddCard = new FormValidator(validationConfig, formAddCard);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();


        //* Экспорт *//



// function deleteCard(evt) {
//   evt.target.closest('.element').remove();
// };

// function likeCard(evt) {
//   evt.target.classList.toggle('elements__button-like_active');
// };

// function createCard(titleName, linkName) {
//   const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

//   const elementPhoto = cardElement.querySelector('.element__image');
//   elementPhoto.src = linkName;
//   elementPhoto.alt = titleName;
//   cardElement.querySelector('.element__place').textContent = titleName;

//   cardElement.querySelector('.element__button-like').addEventListener('click', likeCard);
//   cardElement.querySelector('.element__button-bin').addEventListener('click', deleteCard);

//   cardElement.querySelector('.element__image').addEventListener('click', () => {
//     openPopupImage(linkName, titleName);
//   });

//   return cardElement;
// };

// initialCards.forEach(function (item) {                      // перебираем массив карточек
//   addCard(cardsContent, createCard(item.title, item.link)); // вставляем карточку (записываем карточку, которая возвращает функцию)
// });