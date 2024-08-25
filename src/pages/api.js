// API константы
const baseUrl = 'https://nomoreparties.co/v1/';
const token = '8544872e-8d10-49db-8eda-44512f4edb01';
const cohortId = 'wff-cohort-20';

let currentUser = null;

// Функция для установки состояния загрузки кнопки
function setLoadingState(button, isLoading, loadingText = 'Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.initialText;
    button.disabled = false;
  }
}

// API функции
function fetchUserInfo() {
  return fetch(`${baseUrl}${cohortId}/users/me`, {
    headers: {
      authorization: token
    }
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

function fetchCards() {
  return fetch(`${baseUrl}${cohortId}/cards`, {
    headers: {
      authorization: token
    }
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

function addLike(cardId) {
  return fetch(`${baseUrl}${cohortId}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: token
    }
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

function removeLike(cardId) {
  return fetch(`${baseUrl}${cohortId}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

function addNewCard(name, link) {
  return fetch(`${baseUrl}${cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, link })
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

function deleteCard(cardId) {
  return fetch(`${baseUrl}${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

// Функции работы с DOM
function updateUserProfile(user) {
  document.querySelector('.profile__title').textContent = user.name;
  document.querySelector('.profile__description').textContent = user.about;
  document.querySelector('.profile__image').style.backgroundImage = `url(${user.avatar})`;
}

function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  if (Array.isArray(cardData.likes) && cardData.likes.some(like => like._id === currentUser._id)) {
    likeButton.classList.add('card__like-button_active');
  }

  if (!cardData.likes) {
    cardData.likes = [];
  }
  likeCount.textContent = cardData.likes.length;

  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('card__like-button_active')) {
      removeLike(cardData._id).then(updatedCard => {
        likeButton.classList.remove('card__like-button_active');
        likeCount.textContent = Array.isArray(updatedCard.likes) ? updatedCard.likes.length : 0;
      }).catch(err => {
        console.error('Ошибка при удалении лайка:', err);
      });
    } else {
      addLike(cardData._id).then(updatedCard => {
        likeButton.classList.add('card__like-button_active');
        likeCount.textContent = Array.isArray(updatedCard.likes) ? updatedCard.likes.length : 0;
      }).catch(err => {
        console.error('Ошибка при добавлении лайка:', err);
      });
    }
  });

  if (cardData.owner && cardData.owner._id === currentUser._id) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (deleteButton) {
      deleteButton.style.display = 'block'; // Показать кнопку удаления

      deleteButton.addEventListener('click', () => handleDeleteCard(cardData._id, cardElement));
    }
  }

  return cardElement;
}

function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId).then(() => {
    cardElement.remove();
  }).catch(err => {
    console.error('Ошибка при удалении карточки:', err);
  });
}

function closePopup(popup, form = null) {
  popup.classList.remove('popup_opened');
  if (form) {
    form.reset();
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Работа с формами
const cardForm = document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardForm.querySelector('.popup__input_type_url');
const cardSubmitButton = cardForm.querySelector('.popup__button');

// Сохраняем начальный текст кнопки
cardSubmitButton.dataset.initialText = cardSubmitButton.textContent;

cardForm.addEventListener('submit', function(event) {
  event.preventDefault();
  setLoadingState(cardSubmitButton, true);
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  addNewCard(cardName, cardLink).then(newCard => {
    const cardElement = createCard(newCard);
    document.querySelector('.places__list').prepend(cardElement);
    closePopup(document.querySelector('.popup_type_new-card'), cardForm);
  }).catch(err => {
    console.error(err);
  }).finally(() => {
    setLoadingState(cardSubmitButton, false);
  });
});

// Функции профиля
const profileForm = document.querySelector('.popup_type_edit .popup__form');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const aboutInput = profileForm.querySelector('.popup__input_type_description');
const profileSubmitButton = profileForm.querySelector('.popup__button');

// Сохраняем начальный текст кнопки
profileSubmitButton.dataset.initialText = profileSubmitButton.textContent;

profileForm.addEventListener('submit', function(event) {
  event.preventDefault();
  setLoadingState(profileSubmitButton, true);
  const name = nameInput.value;
  const about = aboutInput.value;

  updateUserProfileOnServer(name, about).then(updatedUser => {
    updateUserProfile(updatedUser);
    closePopup(profileForm.closest('.popup'));
  }).catch(err => {
    console.error('Ошибка при обновлении профиля:', err);
  }).finally(() => {
    setLoadingState(profileSubmitButton, false);
  });
});

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(btn => {
  btn.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

// Функции обновления аватара
const avatarEditPopupForm = document.forms['edit-avatar'];
const inputAvatarLink = avatarEditPopupForm.querySelector('.popup__input_type_avatar-link');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const avatarEditPopup = document.querySelector('.popup_type_avatar-edit');

avatarEditButton.addEventListener('click', () => {
  openPopup(avatarEditPopup);
});

// Функция для обновления аватара на сервере
function updateAvatarOnServer(avatarUrl) {
  return fetch(`${baseUrl}${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar: avatarUrl })
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

// Обработчик формы редактирования аватарки
avatarEditPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newAvatarLink = inputAvatarLink.value;

  setLoadingState(avatarEditPopupForm.querySelector('.popup__button'), true); // Установка состояния загрузки
  updateAvatarOnServer(newAvatarLink)
    .then(updatedUser => {
      const profileImageDiv = document.querySelector('.profile__image');
      profileImageDiv.style.backgroundImage = `url(${updatedUser.avatar})`; // Обновление аватара на странице
      avatarEditPopupForm.reset(); // Очистка формы
      closePopup(avatarEditPopup); // Закрытие попапа
    })
    .catch(err => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      setLoadingState(avatarEditPopupForm.querySelector('.popup__button'), false); // Сброс состояния загрузки
    });
});

// Загрузка данных пользователя и карточек
fetchUserInfo().then(user => {
  currentUser = user;
  updateUserProfile(user);
  return fetchCards();
}).then(cards => {
  cards.forEach(cardInfo => {
    const cardElement = createCard(cardInfo);
    document.querySelector('.places__list').appendChild(cardElement);
  });
}).catch(err => {
  console.error('Ошибка при загрузке данных:', err);
});