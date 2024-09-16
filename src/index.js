//index.js

import './pages/index.css';
import './components/validation.js';
import { openModal, closeModal } from './components/modal.js';
import { getUserInfo, getInitialCards, updateUserInfo, updateAvatar, createCard, deleteCard, likeCard, dislikeCard } from './components/api.js';

// Получение элементов DOM
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
  saveButton.disabled = true; // Отключаем кнопку

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
      saveButton.textContent = 'Сохранить'; // Восстанавливаем текст кнопки
      saveButton.disabled = false; // Включаем кнопку
    });
});

// Открытие попапа добавления новой карточки
profileAddButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

// Обработка отправки формы новой карточки
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const saveButton = cardForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  saveButton.disabled = true; // Отключаем кнопку

  const name = cardForm.querySelector('.popup__input_type_card-name').value;
  const link = cardForm.querySelector('.popup__input_type_url').value;

  createCard(name, link)
    .then(newCard => {
      const cardElement = createCardElement(newCard);
      cardListElement.prepend(cardElement);
      closeModal(newCard.closest('.popup'));
    })
    .catch(err => console.error(err))
    .finally(() => {
      saveButton.textContent = 'Сохранить'; // Восстанавливаем текст кнопки
      saveButton.disabled = false; // Включаем кнопку
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
  saveButton.disabled = true; // Отключаем кнопку

  const avatarLink = avatarEditPopupForm.elements['avatar-link'].value;

  updateAvatar(avatarLink)
    .then(updatedUser => {
      profileImage.style.backgroundImage = `url(${updatedUser.avatar})`;
      closeModal(avatarEditPopup);
    })
    .catch(err => console.error(err))
    .finally(() => {
      saveButton.textContent = 'Сохранить'; // Восстанавливаем текст кнопки
      saveButton.disabled = false; // Включаем кнопку
    });
});

// Создание карточки элемента
function createCardElement(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // Открытие попапа с изображением
  cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

  // Проверка на лайки
  if (Array.isArray(cardData.likes) && cardData.likes.some(like => like._id === currentUser._id)) {
    likeButton.classList.add('card__like-button_active');
  }
  likeCount.textContent = cardData.likes.length;

  // Лайк карточки
  likeButton.addEventListener('click', () => {
    const action = likeButton.classList.contains('card__like-button_active') ? dislikeCard : likeCard;
    action(cardData._id).then(updatedCard => {
      likeButton.classList.toggle('card__like-button_active');
      likeCount.textContent = updatedCard.likes.length;
    }).catch(err => {
      console.error('Ошибка при работе с лайком:', err);
    });
  });

  // Удаление карточки
  if (cardData.owner && cardData.owner._id === currentUser._id) {
    deleteButton.style.display = 'block'; // Показать кнопку удаления только для владельца карточки
    deleteButton.addEventListener('click', () => handleDeleteCard(cardData._id, cardElement));
  }

  return cardElement;
}

// Открытие попапа изображения
function openImagePopup(link, name) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = link;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

// Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    currentUser = user;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;

    cards.forEach(cardData => {
      const cardElement = createCardElement(cardData);
      cardListElement.appendChild(cardElement);
    });
  })
  .catch(err => console.error('Ошибка при загрузке данных:', err));

// Удаление карточки
function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId).then(() => {
    cardElement.remove();
  }).catch(err => {
    console.error('Ошибка при удалении карточки:', err);
  });
}