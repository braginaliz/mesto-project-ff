import './pages/index.css';
import './components/validation.js';
import { openModal, closeModal } from './components/modal.js';
import { getUserInfo, getInitialCards, updateUserInfo, updateAvatar, createCard } from './components/api.js';
import { createCardElement } from './components/card.js'; // Импортируем функцию

// Константы
const cardForm = document.querySelector('.popup_type_new-card .popup__form');
const profileForm = document.querySelector('.popup_type_edit .popup__form');
const avatarEditPopupForm = document.forms['edit-avatar'];
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const avatarEditPopup = document.querySelector('.popup_type_avatar-edit');
const imagePopup = document.querySelector('.popup_type_image');
const cardListElement = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

let currentUser = null;

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  openModal(editPopup);
});

// Обработка отправки формы редактирования профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const saveButton = profileForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  saveButton.disabled = true;

  const name = profileForm.name.value;
  const about = profileForm.description.value;

  updateUserInfo(name, about)
    .then(updatedUser => {
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closeModal(editPopup);
    })
    .catch(err => console.error(err))
    .finally(() => {
      saveButton.textContent = 'Сохранить';
      saveButton.disabled = false;
    });
});

// Открытие попапа добавления новой карточки
profileAddButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

// Обработка отправки формы новой карточки
cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const saveButton = cardForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  saveButton.disabled = true;

  const name = cardForm.querySelector('.popup__input_type_card-name').value;
  const link = cardForm.querySelector('.popup__input_type_url').value;

  createCard(name, link)
    .then(newCard => {
      const cardElement = createCardElement(newCard, currentUser);
      cardListElement.prepend(cardElement);
      closeModal(cardForm.closest('.popup')); 
    })
    .catch(err => console.error(err))
    .finally(() => {
      saveButton.textContent = 'Сохранить';
      saveButton.disabled = false;
    });
});

// Открытие попапа редактирования аватара
avatarEditButton.addEventListener('click', () => {
  openModal(avatarEditPopup);
});

// Обработка отправки формы редактирования аватара
avatarEditPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const saveButton = avatarEditPopupForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  saveButton.disabled = true;

  const avatarLink = avatarEditPopupForm.elements['avatar-link'].value;

  updateAvatar(avatarLink)
    .then(updatedUser => {
      profileImage.style.backgroundImage = `url(${updatedUser.avatar})`;
      closeModal(avatarEditPopup);
    })
    .catch(err => console.error(err))
    .finally(() => {
      saveButton.textContent = 'Сохранить';
      saveButton.disabled = false;
    });
});

// Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    currentUser = user;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;

    cards.forEach(cardData => {
      const cardElement = createCardElement(cardData, currentUser); // Передаем currentUser
      cardListElement.appendChild(cardElement);
    });
  })
  .catch(err => console.error('Ошибка при загрузке данных:', err));