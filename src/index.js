
// index.js

import './pages/index.css'; 
import { initialCards, createCard } from './pages/card.js';
import { openModal, closeModal, isEscapeKey } from './pages/modal.js';
import avatarImg from './images/avatar.jpg';

document.addEventListener('DOMContentLoaded', () => {
  const profileImageDiv = document.querySelector('.profile__image');
  profileImageDiv.style.backgroundImage = `url(${avatarImg})`;
});


// Глобальные константы и переменные: DOM-элементы
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const cardListElement = document.querySelector('.places__list');
const editPopupForm = document.forms['edit-profile'];
const newCardPopupForm = document.forms['new-place'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputEditName = editPopupForm.querySelector('.popup__input_type_name');
const inputEditDescription = editPopupForm.querySelector('.popup__input_type_description');
const inputCardName = newCardPopupForm.querySelector('.popup__input_type_card-name');
const inputCardLink = newCardPopupForm.querySelector('.popup__input_type_url');
const modalImageContent = imagePopup.querySelector('.popup__image');
const modalImageCaption = imagePopup.querySelector('.popup__caption');

// Функции добавления карточек на страницу
function renderCards() {
  initialCards.forEach(data => {
    const cardElement = createCard(data, handleDelete, handleLike, handleImageClick);
    cardListElement.append(cardElement);
  });
}

// Обработчики события удаления, лайка, открытия попапа изображения
function handleDelete(cardElement) {
  cardElement.remove();
}

function handleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

function handleImageClick(event, data) {
  modalImageContent.src = data.link;
  modalImageContent.alt = data.name;
  modalImageCaption.textContent = data.name;
  openModal(imagePopup);
}

// Обработчики открытия и закрытия попапов
profileEditButton.addEventListener('click', () => {
  inputEditName.value = profileName.textContent;
  inputEditDescription.value = profileDescription.textContent;
  openModal(editPopup);
});

newCardPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCardData = { name: inputCardName.value, link: inputCardLink.value };
  const cardElement = createCard(newCardData, handleDelete, handleLike, handleImageClick);
  cardListElement.prepend(cardElement);
  newCardPopupForm.reset();
  closeModal(newCardPopup);
});

editPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputEditName.value;
  profileDescription.textContent = inputEditDescription.value;
  closeModal(editPopup);
});

profileAddButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

// Закрытие попапов по клику на оверлей или крестику, а также по нажатию на Escape
function closeAnyModal(event) {
  if (event.target.classList.contains('popup')) {
    closeModal(event.target);
  }
  if (event.target.classList.contains('popup__close')) {
    closeModal(event.target.closest('.popup'));
  }
}

document.addEventListener('click', closeAnyModal);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
});