//*	Базовый набор карточек	*//

export const initialCards = [
	{
		title: 'Зайцевский пруд',
		link: 'https://sun9-79.userapi.com/impg/64LhMndtVdhl7np3M2KXZ5sLVFy_bdOiu1jr8A/4XLnddsY0R0.jpg?size=1600x1200&quality=96&sign=7be5879c0ca9c94c5a45d0ceb825a7b4&type=album'
	},
	{
		title: 'Озеро Лесное',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		title: 'Калужские леса',
		link: 'https://sun9-58.userapi.com/impg/U1erxQU6RULtRDhsmcRnglkMX-_C5ywykGiwgQ/7vYGy02gTO8.jpg?size=1080x810&quality=96&sign=b70178fbf754bf438a90c1c66d3b5846&type=album'
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

//*	API-константы	*//

export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-64';
export const myToken = 'c467341b-672a-48a9-be5b-ea4a89cc731a';