

import './pages/index.css';
import { handleDelete, handleLike } from './pages/card.js';
import { openModal, closeModal, handleImageClick } from './pages/modal.js';
import avatarImg from './images/avatar.jpg';
import initialCards from './pages/cards.js';
import './pages/validation.js';
import './pages/api.js';

document.addEventListener('DOMContentLoaded', () => {
  const profileImageDiv = document.querySelector('.profile__image');
  profileImageDiv.style.backgroundImage = `url(${avatarImg})`;

  renderCards();
});

// Глобальные константы и переменные: DOM-элементы
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const avatarEditPopup = document.querySelector('.popup_type_avatar-edit');
const imagePopup = document.querySelector('.popup_type_image');
const cardListElement = document.querySelector('.places__list');
const editPopupForm = document.forms['edit-profile'];
const newCardPopupForm = document.forms['new-place'];
const avatarEditPopupForm = document.forms['edit-avatar'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputEditName = editPopupForm.querySelector('.popup__input_type_name');
const inputEditDescription = editPopupForm.querySelector('.popup__input_type_description');
const inputCardName = newCardPopupForm.querySelector('.popup__input_type_card-name');
const inputCardLink = newCardPopupForm.querySelector('.popup__input_type_url');
const inputAvatarLink = avatarEditPopupForm.querySelector('.popup__input_type_avatar-link');

// Функции добавления карточек на страницу
function renderCards() {
  initialCards.forEach(data => {
    const cardElement = createCard(data, handleDelete, handleLike, handleImageClick);
    cardListElement.append(cardElement);
  });
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

// Обработчик для кнопки редактирования аватарки
avatarEditButton.addEventListener('click', () => {
  openModal(avatarEditPopup);
});

// Обработчик формы редактирования аватарки
avatarEditPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newAvatarLink = inputAvatarLink.value;

  // Обновить аватар пользователя
  const profileImageDiv = document.querySelector('.profile__image');
  profileImageDiv.style.backgroundImage = `url(${newAvatarLink})`;

  // Закрыть попап и очистить форму
  avatarEditPopupForm.reset();
  closeModal(avatarEditPopup);
});