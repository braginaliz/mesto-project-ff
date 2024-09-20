import { deleteCard, likeCard, dislikeCard } from './api.js'; 
import { openImagePopup } from '../index.js'; 

export function createCardElement(cardData, currentUser) { 
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
    const cardImage = cardElement.querySelector('.card__image'); 
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    const likeButton = cardElement.querySelector('.card__like-button'); 
    const likeCount = cardElement.querySelector('.card__like-count'); 

    cardImage.src = cardData.link; 
    cardImage.alt = cardData.name;   
    cardElement.querySelector('.card__title').textContent = cardData.name; 

    cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name)); 

    if (Array.isArray(cardData.likes) && cardData.likes.some(like => like._id === currentUser._id)) { 
        likeButton.classList.add('card__like-button_active'); 
    } 
    likeCount.textContent = cardData.likes.length; 

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
        deleteButton.style.display = 'block'; 
        deleteButton.addEventListener('click', () => handleDeleteCard(cardData._id, cardElement));  
    } else { 
        deleteButton.style.display = 'none'; 
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