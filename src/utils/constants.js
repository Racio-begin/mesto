//*	Базовый набор карточек	*//

export const initialCards = [
	{
		title: 'Карелия',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		title: 'Озеро Лесное',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		title: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		title: 'Остров Ольхон',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		title: 'Тайга',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		title: 'Долина Оюнсу',
		link: 'https://www.tarmashev.com/images/puzzle/small_65_o.jpg'
	}
];


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

export const content = document.querySelector('.content');
export const profile = content.querySelector('.profile');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const formEditProfile = popupEditProfile.querySelector('#formEditProfile');
export const popupOpenButtonEdit = profile.querySelector('.profile__button-edit');
export const nameInput = formEditProfile.querySelector('.popup__input_type_username');
export const jobInput = formEditProfile.querySelector('.popup__input_type_description');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const cardAddButton = profile.querySelector('.profile__button-add');
export const formAddCard = popupAddCard.querySelector('#formAddCard');