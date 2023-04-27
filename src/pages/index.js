//*	Импорт	*//

// Импортируем стили (для работы с WebPack)
import './index.css';

// Импортируем константы (конфиг валидации, базовый набор карточек)
import {
	validationConfig,
	formEditProfile,
	popupOpenButtonEdit,
	nameInput,
	jobInput,
	cardAddButton,
	formAddCard,
	baseUrl,
	myToken
}
	from "../utils/constants.js";

// Импортируем класс с API
import Api from '../components/Api.js';

// Импортируем файлы с заготовленными классами карточки и валидации форм
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// Импортируем классы по работе с попапами
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

// Испортируем класс Section
import Section from "../components/Section.js";

// Импортируем класс с информацией о пользователе
import UserInfo from "../components/UserInfo.js";


//*	Функции	*//

let userId;

const api = new Api({
	url: baseUrl,
	headers: {
		authorization: myToken,
		'Content-Type': 'application/json'
	}
});

// api.getInitialCards().then(console.log);

// api.getUserData().then(console.log);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    сardList.renderItems(cardsData);
  })
  .catch(console.log);

// Отрисовать базовый набор карточек

const сardList = new Section(
	(data) => {
		const card = createCard(data);
		сardList.addItem(card);
	},
	'.elements__content');

// Установить имя и информацию о пользователе

const userInfo = new UserInfo({
	nameSelector: '.profile__username',
	aboutSelector: '.profile__description',
	avatarSelector: '.profile__avatar'
});

// Функции отрытия/закрытия попапов

const popupWithImage = new PopupWithImage('.popup_type_zoom-image');

const formPopupAddCard = new PopupWithForm(
	'.popup_type_add-card',
	(data) => {
		// api.sendingCard(cardData)
		api.sendingCard(data['title'], data['link'])
		.then ((result) => {
			сardList.addItemBeginning(createCard(result));
			formPopupAddCard.close();
		})
		.catch(console.log)
	}
);

const formPopupEditProfile = new PopupWithForm(
	'.popup_type_edit-profile',
	(userData) => {
		api.updateUserData(userData)
		.then((data) => {
			userInfo.setUserInfo(data);
			formPopupEditProfile.close()
		})
		.catch(console.log)
	}
);

//	Функция создания карточки

function createCard(data) {
	const card = new Card(
		data,
		'#elements__template',
		() => popupWithImage.open(data.name, data.link));
	return card.generateCard();
};


//* Установить слушатели *// 

// Открыть (закрыть) popup профиля

popupOpenButtonEdit.addEventListener('click', () => {
	nameInput.value = userInfo.getUserInfo().name;
	jobInput.value = userInfo.getUserInfo().about;

	formPopupEditProfile.open();

	validatorEditProfile.hideAllInputErrors();
	validatorEditProfile.toggleButtonState();

});

// Открыть (закрыть) popup добавления карточки

cardAddButton.addEventListener('click', () => {
	validatorAddCard.hideAllInputErrors();
	validatorAddCard.disableSubmitButton();

	formPopupAddCard.open();
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