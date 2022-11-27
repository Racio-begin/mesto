//  Найти селекторы в DOM  //
const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__btn_action_edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-btn');

const formElement = popupElement.querySelector('.popup__content');
const nameInput = popupElement.querySelector('.popup__username');
const jobInput = popupElement.querySelector('.popup__description');

const nameProfile = document.querySelector('.profile__username');
const jobProfile = document.querySelector('.profile__description');

//  Открыть popup  //
const openPopup = function () {
  popupElement.classList.add('popup_is-opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

//  Закрыть popup  //
const closePopup = function () {
  popupElement.classList.remove('popup_is-opened')
}

//  Закрыть popup по клику вне формы  //
const closePopupByClickOnOverlay = function (event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
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
popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', handleFormSubmit);