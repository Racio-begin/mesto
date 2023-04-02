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
	formSelector:					'.popup__form',
	inputSelector:				'.popup__input',
	submitButtonSelector:	'.button',
	inactiveButtonClass:	'button_inactive',
	inputErrorClass:			'popup__input_type_error',
	errorClass:						'popup__input-error_visible'
};