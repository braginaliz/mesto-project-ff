// card.js

export function createCard(data, handleDelete, handleLike, handleImageClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener("click", () => handleDelete(cardElement));
  likeButton.addEventListener("click", () => handleLike(likeButton));
  cardImage.addEventListener("click", (event) => handleImageClick(event, data));

  return cardElement;
}

export function handleDelete(cardElement) {
  cardElement.remove();
}

export function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
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
