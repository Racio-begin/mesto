//  Найти селекторы в DOM  //
const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');

const formElement = popupElement.querySelector('.popup__content');
const nameInput = popupElement.querySelector('.popup__input_type_username');
const jobInput = popupElement.querySelector('.popup__input_type_description');

const nameProfile = document.querySelector('.profile__username');
const jobProfile = document.querySelector('.profile__description');

//  Открыть popup  //
const openPopup = function () {
  popupElement.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

//  Закрыть popup  //
const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}

//  Обработчик «отправки» формы, хотя пока она никуда отправляться не будет  //
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup();
}

//  Объявить слушателей  //
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);