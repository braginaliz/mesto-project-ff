// cards.js
export const initialCards = [
        {
          name: "Архыз",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
        },
        {
          name: "Челябинская область",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
        },
        {
          name: "Иваново",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
        },
        {
          name: "Камчатка",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
        },
        {
          name: "Холмогорский район",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
        },
        {
          name: "Байкал",
          link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
        }

  ];
  
  export function createCard(data, handleDelete, handleLike, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
  
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
  
    deleteButton.addEventListener('click', () => handleDelete(cardElement));
    likeButton.addEventListener('click', () => handleLike(likeButton));
    cardImage.addEventListener('click', (event) => handleImageClick(event, data));
  
    return cardElement;


  }

  

