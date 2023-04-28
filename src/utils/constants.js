//*	Конфиг для удобного редактирования класса FormValidator.js	*//

export const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.button',
	inactiveButtonClass: 'button_inactive',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_visible'
};

//*	Найти селекторы в DOM	*//

export const popupOpenAvatarEdit = document.querySelector('.popup_type_edit-avatar');
export const formEditAvatar = popupOpenAvatarEdit.querySelector('#formEditAvatar');

export const content = document.querySelector('.content');
export const profile = content.querySelector('.profile');
export const avatarEditButton = profile.querySelector('.profile__button-avatar-edit');
export const popupOpenButtonEdit = profile.querySelector('.profile__button-edit');
export const cardAddButton = profile.querySelector('.profile__button-add');

export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const formEditProfile = popupEditProfile.querySelector('#formEditProfile');
export const nameInput = formEditProfile.querySelector('.popup__input_type_username');
export const jobInput = formEditProfile.querySelector('.popup__input_type_description');

export const popupAddCard = document.querySelector('.popup_type_add-card');
export const formAddCard = popupAddCard.querySelector('#formAddCard');

//*	API-константы	*//

export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-64';
export const myToken = 'c467341b-672a-48a9-be5b-ea4a89cc731a';