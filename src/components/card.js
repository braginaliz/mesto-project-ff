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


