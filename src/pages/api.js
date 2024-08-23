const baseUrl = 'https://nomoreparties.co/v1/';
const token = '8544872e-8d10-49db-8eda-44512f4edb01';
const cohortId = 'wff-cohort-20';

let currentUser = null;

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

// Функции для постановки и снятия лайка
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

function updateUserProfile(user) {
  document.querySelector('.profile__title').textContent = user.name;
  document.querySelector('.profile__description').textContent = user.about;
  document.querySelector('.profile__image').style.backgroundImage = `url(${user.avatar})`;
}

function updateUserProfileOnServer(name, about) {
  return fetch(`${baseUrl}${cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, about })
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

function setLoadingState(button, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = button.dataset.initialText;
  }
}

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
    closePopup(document.querySelector('.popup_type_new-card'));
    cardForm.reset();
  }).catch(err => {
    console.error(err);
  }).finally(() => {
    setLoadingState(cardSubmitButton, false);
  });
});

function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  likeCount.textContent = cardData.likes.length;

  // Состояние лайка для текущего пользователя
  if (cardData.likes.some(like => like._id === currentUser._id)) {
    likeButton.classList.add('card__like-button_active');
  }

  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('card__like-button_active')) {
      removeLike(cardData._id).then(updatedCard => {
        likeButton.classList.remove('card__like-button_active');
        likeCount.textContent = updatedCard.likes.length;
      }).catch(err => {
        console.error('Ошибка при удалении лайка:', err);
      });
    } else {
      addLike(cardData._id).then(updatedCard => {
        likeButton.classList.add('card__like-button_active');
        likeCount.textContent = updatedCard.likes.length;
      }).catch(err => {
        console.error('Ошибка при добавлении лайка:', err);
      });
    }
  });

  if (cardData.owner._id === currentUser._id) {
    const deleteButton = cardElement.querySelector('card__delete-button');
    deleteButton.style.display = 'card__delete-button'; // Показать кнопку удаления

    deleteButton.addEventListener('click', () => handleDeleteCard(cardData._id, cardElement));
  }

  return cardElement;
}

function handleDeleteCard(cardId, cardElement) {
  const confirmationPopup = document.querySelector('.popup_type_confirm');
  confirmationPopup.classList.add('popup_opened');

  const confirmButton = confirmationPopup.querySelector('.popup__confirm-button');
  confirmButton.addEventListener('click', function onConfirm() {
    deleteCard(cardId).then(() => {
      cardElement.remove();
      closePopup(confirmationPopup);
      confirmButton.removeEventListener('click', onConfirm);
    }).catch(err => {
      console.error('Ошибка при удалении карточки:', err);
    });
  });
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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

// Логика для отправки формы обновления аватара
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');
const avatarSubmitButton = avatarForm.querySelector('.popup__button');

// Сохраняем начальный текст кнопки
avatarSubmitButton.dataset.initialText = avatarSubmitButton.textContent;

avatarEditButton.addEventListener('click', () => {
  openPopup(avatarPopup);
});

avatarPopup.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(avatarPopup);
});

avatarForm.addEventListener('submit', function(event) {
  event.preventDefault();
  setLoadingState(avatarSubmitButton, true);
  const avatarUrl = avatarInput.value;

  isValidImageUrl(avatarUrl).then(isValid => {
    if (isValid) {
      updateAvatarOnServer(avatarUrl).then(updatedUser => {
        document.querySelector('.profile__image').style.backgroundImage = `url(${updatedUser.avatar})`;
        closePopup(avatarPopup);
      }).catch(err => {
        console.error('Ошибка при обновлении аватара:', err);
      }).finally(() => {
        setLoadingState(avatarSubmitButton, false);
      });
    } else {
      alert('Пожалуйста, введите корректную ссылку на изображение.');
      setLoadingState(avatarSubmitButton, false);  // Отключаем состояние загрузки при ошибке введенного URL
    }
  });
});

// Основные переменные
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach(btn => {
  btn.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

function isValidImageUrl(url) {
  return fetch(url, { method: 'HEAD' }).then(res => {
    if (!res.ok) {
      return false;
    }
    const contentType = res.headers.get('Content-Type');
    return contentType && contentType.startsWith('image/');
  }).catch(() => false);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

fetchUserInfo().then(user => {
  currentUser = user;
  updateUserProfile(user);
}).catch(err => {
  console.error('Ошибка при загрузке данных пользователя:', err);
});