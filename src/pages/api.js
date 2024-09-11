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
    button.textContent = button.dataset.initialText || 'Сохранить'; // Восстановление текста кнопки
    button.disabled = false;
  }
}

// Получение информации о пользователе
export function getUserInfo() {
  return fetch(`${baseUrl}${cohortId}/users/me`, {
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    currentUser = data; // Сохраняем текущего пользователя
    return data;
  });
}

// Обновление информации о пользователе
export function updateUserInfo(name, about) {
  return fetch(`${baseUrl}${cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Обновление аватара пользователя
export function updateAvatar(avatar) {
  return fetch(`${baseUrl}${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      avatar: avatar,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Получение карточек
export function getInitialCards() {
  return fetch(`${baseUrl}${cohortId}/cards`, {
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Создание карточки
export function createCard(name, link) {
  return fetch(`${baseUrl}${cohortId}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Удаление карточки
export function deleteCard(cardId) {
  return fetch(`${baseUrl}${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Поставить лайк карточке
export function likeCard(cardId) {
  return fetch(`${baseUrl}${cohortId}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Убрать лайк с карточки
export function dislikeCard(cardId) {
  return fetch(`${baseUrl}${cohortId}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Функции работы с DOM
function updateUserProfile(user) {
  document.querySelector('.profile__title').textContent = user.name;
  document.querySelector('.profile__description').textContent = user.about;
  document.querySelector('.profile__image').style.backgroundImage = `url(${user.avatar})`;
}

function createCardElement(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  // Открытие попапа с изображением при клике на картинку
  cardImage.addEventListener('click', () => {
    openImagePopup(cardData.link, cardData.name);
  });

  if (Array.isArray(cardData.likes) && cardData.likes.some(like => like._id === currentUser._id)) {
    likeButton.classList.add('card__like-button_active');
  }

  likeCount.textContent = cardData.likes ? cardData.likes.length : 0;

  likeButton.addEventListener('click', () => {
    const action = likeButton.classList.contains('card__like-button_active') ? dislikeCard : likeCard;
    action(cardData._id).then(updatedCard => {
      likeButton.classList.toggle('card__like-button_active');
      likeCount.textContent = updatedCard.likes.length;
    }).catch(err => {
      console.error('Ошибка при работе с лайком:', err);
    });
  });

  if (cardData.owner && cardData.owner._id === currentUser._id) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.style.display = 'block';

    deleteButton.addEventListener('click', () => handleDeleteCard(cardData._id, cardElement));
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
  popup.classList.remove('popup_is-opened');
  if (form) form.reset();
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

// Функция для открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  openPopup(imagePopup);
}

// Загрузка данных пользователя и карточек
getUserInfo().then(user => {
  currentUser = user;
  updateUserProfile(user);
  return getInitialCards();
}).then(cards => {
  cards.forEach(cardData => {
    const cardElement = createCardElement(cardData);
    document.querySelector('.places__list').appendChild(cardElement);
  });
}).catch(err => {
  console.error('Ошибка при загрузке данных:', err);
});

// Обработчики форм
const cardForm = document.querySelector('.popup_type_new-card .popup__form');
const profileForm = document.querySelector('.popup_type_edit .popup__form');
const avatarEditPopupForm = document.forms['edit-avatar'];

// Обработчик формы карточки
cardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  setLoadingState(cardForm.querySelector('.popup__button'), true);
  const cardName = cardForm.querySelector('.popup__input_type_card-name').value;
  const cardLink = cardForm.querySelector('.popup__input_type_url').value;

  createCard(cardName, cardLink).then(newCard => {
    const cardElement = createCardElement(newCard);
    document.querySelector('.places__list').prepend(cardElement);
    closePopup(cardForm.closest('.popup'), cardForm);
  }).catch(err => {
    console.error(err);
  }).finally(() => {
    setLoadingState(cardForm.querySelector('.popup__button'), false);
  });
});

// Обработчик формы профиля
profileForm.addEventListener('submit', function(event) {
  event.preventDefault();
  setLoadingState(profileForm.querySelector('.popup__button'), true);
  const name = profileForm.querySelector('.popup__input_type_name').value;
  const about = profileForm.querySelector('.popup__input_type_description').value;

  updateUserInfo(name, about).then(updatedUser => {
    updateUserProfile(updatedUser);
    closePopup(profileForm.closest('.popup'));
  }).catch(err => {
    console.error('Ошибка при обновлении профиля:', err);
  }).finally(() => {
    setLoadingState(profileForm.querySelector('.popup__button'), false);
  });
});

// Обработчик формы аватара
avatarEditPopupForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const newAvatarLink = avatarEditPopupForm.querySelector('.popup__input_type_avatar-link').value;

  setLoadingState(avatarEditPopupForm.querySelector('.popup__button'), true);
  updateAvatar(newAvatarLink)
    .then(updatedUser => {
      const profileImageDiv = document.querySelector('.profile__image');
      profileImageDiv.style.backgroundImage = `url(${updatedUser.avatar})`;
      avatarEditPopupForm.reset();
      closePopup(avatarEditPopupForm.closest('.popup'));
    })
    .catch(err => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      setLoadingState(avatarEditPopupForm.querySelector('.popup__button'), false);
    });
});

// Закрытие попапов
document.querySelectorAll('.popup__close').forEach(btn => {
  btn.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});