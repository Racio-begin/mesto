//*  Найти селекторы в DOM  *// 


const popupList = document.querySelectorAll('.popup');
const formList = document.querySelectorAll('.popup__form');
const content = document.querySelector('.content');
const profile = content.querySelector('.profile');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('#formEditProfile');
const popupOpenButtonEdit = profile.querySelector('.profile__button-edit');

const nameInput = formEditProfile.querySelector('.popup__input_type_username');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const nameProfile = profile.querySelector('.profile__username');
const jobProfile = profile.querySelector('.profile__description');
const popupCloseButtonEditProfile = popupEditProfile.querySelector('.popup__button-close');

const cards = document.querySelector('.elements');
const cardsContent = cards.querySelector('.elements__content');
const popupAddCard = document.querySelector('.popup_type_add-card');
const cardAddButton = profile.querySelector('.profile__button-add');
const formAddCard = popupAddCard.querySelector('#formAddCard');
const titleInput = formAddCard.querySelector('.popup__input_type_title');
const linkInput = formAddCard.querySelector('.popup__input_type_link');
const popupCloseButtonAddCard = popupAddCard.querySelector('.popup__button-close');

const popupImage = document.querySelector('.popup_type_zoom-image');
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageTitle = popupImage.querySelector('.popup__title-photo');
const popupCloseButtonOpenImage = popupImage.querySelector('.popup__button-close');


//* Шаблон карточки *// 


const cardTemplate = document.querySelector('#elements__template').content;


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

// Создать карточку 

function deleteCard(evt) {
  evt.target.closest('.element').remove();
};

function likeCard(evt) {
  evt.target.classList.toggle('elements__button-like_active');
};

function createCard(titleName, linkName) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const elementPhoto = cardElement.querySelector('.element__image');

  elementPhoto.src = linkName;
  elementPhoto.alt = titleName;
  cardElement.querySelector('.element__place').textContent = titleName;

  cardElement.querySelector('.element__button-like').addEventListener('click', likeCard);
  cardElement.querySelector('.element__button-bin').addEventListener('click', deleteCard);

  cardElement.querySelector('.element__image').addEventListener('click', () => {
    openPopupImage(linkName, titleName);
  });

  return cardElement;
};

initialCards.forEach(function (item) {                      // перебираем массив карточек
  addCard(cardsContent, createCard(item.title, item.link)); // вставляем карточку (записываем карточку, которая возвращает функцию)
});

// Добавить карточку 

function addCard(container, dataCard) {
  container.prepend(dataCard);
};

// Получить данные карточки 

function submitAddCardsForm(evt) {
  evt.preventDefault();
  addCard(cardsContent, createCard(titleInput.value, linkInput.value));
  evt.target.reset();
  closePopup(popupAddCard);
  //popupList - а чего его нельзя то? просто не работает :(
};

// Открыть карточку 

function openPopupImage(linkName, titleName) {
  popupImagePhoto.src = linkName;
  popupImagePhoto.alt = titleName;
  popupImageTitle.textContent = titleName;
  openPopup(popupImage);
};


// Установить слушатели // 


// Редактировать профиль 

formEditProfile.addEventListener('submit', handleFormSubmit);

// Открыть (закрыть) popup профиля 

popupOpenButtonEdit.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEditProfile);
});

// Добавить карточки 

formAddCard.addEventListener('submit', submitAddCardsForm);

cardAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  titleInput.value = '';
  linkInput.value = '';
  // enableValidation(validationConfig);
  disableSubmitButton(popupAddCard);
});


// Валидация форм //


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

enableValidation(validationConfig);