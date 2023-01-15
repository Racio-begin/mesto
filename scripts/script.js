//  Найти селекторы в DOM  // 

 
const popupElement = document.querySelectorAll('.popup');
const form = document.querySelectorAll('.popup__form');
const profile = document.querySelector('.profile'); 
const content = document.querySelector('.content'); 

const popupEditProfile = document.querySelector('.popup_edit-profile'); 
const formEditProfile = popupEditProfile.querySelector('#formEditProfile'); 
const popupOpenButtonEdit = profile.querySelector('.profile__button-edit'); 

const nameInput = formEditProfile.querySelector('.popup__input_type_username'); 
const jobInput = formEditProfile.querySelector('.popup__input_type_description'); 
const nameProfile = profile.querySelector('.profile__username'); 
const jobProfile = profile.querySelector('.profile__description'); 
const popupCloseButtonEditProfile = popupEditProfile.querySelector('.popup__button-close'); 

const cards = document.querySelector('.elements__content'); 
const popupAddCard = document.querySelector('.popup_add-card'); 
const cardAddButton = profile.querySelector('.profile__button-add'); 
const formAddCard = popupAddCard.querySelector('#formAddCard'); 
const titleInput = formAddCard.querySelector('.popup__input_type_title'); 
const linkInput = formAddCard.querySelector('.popup__input_type_link'); 
const popupCloseButtonAddCard = popupAddCard.querySelector('.popup__button-close'); 

const popupImage = document.querySelector('.popup_image'); 
const popupImagePhoto = popupImage.querySelector('.popup__photo'); 
const popupImageTitle = popupImage.querySelector('.popup__title-photo'); 
const popupCloseButtonOpenImage = popupImage.querySelector('.popup__button-close'); 


// Шаблоны // 


const cardTemplate = document.querySelector('#elements__template').content; 
let newCard = cardTemplate.querySelector('.elements__element'); 


// Функции отрытия/закрытия попапов // 


// Закрыть popup, Escape

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Открыть/закрыть popup

function openPopup(popup) { 
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown', closeByEsc)
}; 

function closePopup(popup) { 
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc)
};

// Закрыть popup, оверлей

popupElement.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});


//  Обработчик «отправки» формы, хотя пока она никуда отправляться не будет  // 


function handleFormSubmit(evt) { 
  evt.preventDefault(); 
  nameProfile.textContent = nameInput.value; 
  jobProfile.textContent = jobInput.value; 
  popupEditProfileClose(); 
}; 

function popupEditProfileClose() { 
  closePopup(popupEditProfile); 
}; 

// Создать карточку 

function generateCard(titleName, linkName) { 
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true); 
  const elementPhoto = cardElement.querySelector('.elements__image'); 
  elementPhoto.src = linkName; 
  elementPhoto.alt = titleName; 

  cardElement.querySelector('.elements__place').textContent = titleName; 
  cardElement.querySelector('.elements__button-bin').addEventListener('click', function (evt) { 
    const deleteButton = evt.target.closest('.elements__element'); 
    deleteButton.remove(); 
  }); 
 
  cardElement.querySelector('.elements__button-like').addEventListener('click', function (evt) { 
    evt.target.classList.toggle('elements__button-like_active'); 
  }); 

   cardElement.querySelector('.elements__image').addEventListener('click', () => { 
    openPopupImage(linkName, titleName); 
  }); 

  newCard = cardElement; 
}; 

for (let i = 0; i < initialCards.length; i++) { 
  generateCard(initialCards[i].title, initialCards[i].link); 
  addCard(newCard); 
}; 

// Добавить карточку 

function addCard(newCard) { 
  cards.prepend(newCard); 
}; 

// Получить данные карточки 

function submitAddCardsForm(evt) { 
  evt.preventDefault(); 
  const titleName = titleInput.value; 
  const linkName = linkInput.value; 
  popupAddCardClose(); 

  generateCard(titleName, linkName); 

  addCard(newCard); 

  titleInput.value = titleInput.ariaPlaceholder;  
  linkInput.value = linkInput.ariaPlaceholder; 
}; 

function popupAddCardClose() { 
  closePopup(popupAddCard); 
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

popupCloseButtonEditProfile.addEventListener('click', popupEditProfileClose); 
formEditProfile.addEventListener('submit', handleFormSubmit); 

// Открыть (закрыть) popup профиля 

popupOpenButtonEdit.addEventListener('click', () => { 
  nameInput.value = nameProfile.textContent; 
  jobInput.value = jobProfile.textContent; 
  openPopup(popupEditProfile); 
}); 

 
function popupImageClose() { 
  closePopup(popupImage); 
}; 

popupCloseButtonOpenImage.addEventListener('click', popupImageClose); 

// Добавить карточки 

formAddCard.addEventListener('submit', submitAddCardsForm); 

cardAddButton.addEventListener('click', () => { 
  openPopup(popupAddCard); 
}); 

popupCloseButtonAddCard.addEventListener('click', popupAddCardClose);


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