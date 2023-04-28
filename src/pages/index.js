//*	Импорт	*//

// Импортируем стили (для работы с WebPack)
import './index.css';

// Импортируем константы (конфиг валидации, базовый набор карточек)
import {
	validationConfig,
	avatarEditButton,
	formEditAvatar,
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
import PopupWithDeleteCard from "../components/PopupWithDeleteCard.js";

// Испортируем класс Section
import Section from "../components/Section.js";

// Импортируем класс с информацией о пользователе
import UserInfo from "../components/UserInfo.js";


//*	Функции	*//

// Инициировать переменную с ID

let userId;

// Зашить токен с адресом сервера в запросы

const api = new Api({
	url: baseUrl,
	headers: {
		authorization: myToken,
		'Content-Type': 'application/json'
	}
});

// Установить промисы для получения данных пользователя и карточек

Promise.all([api.getUserData(), api.getInitialCards()])
	.then(([userData, cardsData]) => {
		userId = userData._id;
		userInfo.setUserInfo(userData);
		сardList.renderItems(cardsData);
	})
	// .catch(console.log('Промисы catch (index)'));
	.catch((err) => {
		console.log(err, 'Промисы catch (index)'); // выведем ошибку в консоль
	});

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
		formPopupAddCard.toggleSaveStatus(true);
		api.sendingCard(data['title'], data['link'])
			.then((result) => {
				сardList.addItemBeginning(createCard(result));
				formPopupAddCard.close();
			})
			.catch((err) => {
				console.log(err, 'Error: новая карточка не отправлена на сервер (index)');
			})
			.finally(() => formPopupAddCard.toggleSaveStatus(false))
	}
);

const formPopupEditProfile = new PopupWithForm(
	'.popup_type_edit-profile',
	(userData) => {
		formPopupEditProfile.toggleSaveStatus(true);
		api.updateUserData(userData)
			.then((data) => {
				userInfo.setUserInfo(data);
				formPopupEditProfile.close()
			})
			.catch((err) => {
				console.log(err, 'Error: новые данные о пользователе не отправлены на сервер (index)');
			})
			.finally(() => formPopupEditProfile.toggleSaveStatus(false))
	}
);

const formPopupEditAvatar = new PopupWithForm(
	'.popup_type_edit-avatar',
	(data) => {
		formPopupEditAvatar.toggleSaveStatus(true);
		api.updateUserAvatar(data)
			.then((res) => {
				userInfo.setUserInfo(res)
				formPopupEditAvatar.close()
			})
			.catch((err) => {
				console.log(err, 'Error: новый аватар пользователя не отправлен на сервер (index)');
			})
			.finally(() => formPopupEditAvatar.toggleSaveStatus(false))
	})

//	Функция создания карточки

function createCard(data) {
	const card = new Card(
		data,
		userId,
		'#elements__template',
		() => popupWithImage.open(data.name, data.link),
		(cardId) => {
			api.likeCard(cardId)
				.then((res) => card.countLikes(res))
				.catch((err) => {
					console.log(err, 'Error: лайк не отправлен на сервер (index)');
				})
		},
		(cardId) => {
			api.unlikeCard(cardId)
				.then((res) => card.countLikes(res))
				.catch((err) => {
					console.log(err, 'Error: лайк не пришел с сервера (index)');
				})
		},
		(card, cardId) => { formPopupDelete.open(card, cardId) }
	);

	return card.generateCard();
};

//	Функция "умного" удаления карточки

const formPopupDelete = new PopupWithDeleteCard(
	'.popup_type_delete-card',
	(card, cardId) => {
		api.deleteCard(cardId)
			.then(() => {
				card.handleDeleteCard();
				formPopupDelete.close();
			})
			.catch((err) => {
				console.log(err, 'Error: карточка не удалена с сервера (index)');
			})
	}
);


//* Cлушатели *// 

// Открыть (закрыть) popup редактирования аватара пользователя

avatarEditButton.addEventListener('click', () => {
	formPopupEditAvatar.open();

	validatorEditAvatar.hideAllInputErrors();
	validatorEditAvatar.disableSubmitButton();
});

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

formPopupEditAvatar.setEventListeners();
formPopupAddCard.setEventListeners();
formPopupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
formPopupDelete.setEventListeners();

//* Валидация форм *//

const validatorEditAvatar = new FormValidator(validationConfig, formEditAvatar);
const validatorEditProfile = new FormValidator(validationConfig, formEditProfile);
const validatorAddCard = new FormValidator(validationConfig, formAddCard);

validatorEditAvatar.enableValidation();
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();


//*	Тест - проверка связи с сервером	*//

// api.getInitialCards().then(console.log);

// api.getUserData().then(console.log);