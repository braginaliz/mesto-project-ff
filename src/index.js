// index.js

import './pages/index.css';
import { createCard, handleDelete, handleLike } from './pages/card.js';
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
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const cardListElement = document.querySelector('.places__list');
const editPopupForm = document.forms['edit-profile'];
const newCardPopupForm = document.forms['new-place'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputEditName = editPopupForm.querySelector('.popup__input_type_name');
const inputEditDescription = editPopupForm.querySelector('.popup__input_type_description');
const inputCardName = newCardPopupForm.querySelector('.popup__input_type_card-name');
const inputCardLink = newCardPopupForm.querySelector('.popup__input_type_url');

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


document.addEventListener("DOMContentLoaded", () => {
  const validationConfig = {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
  };

  enableValidation(validationConfig);
});

function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach(form => {
      const inputs = Array.from(form.querySelectorAll(inputSelector));
      const submitButton = form.querySelector(submitButtonSelector);

      inputs.forEach(input => {
          input.addEventListener('input', () => {
              validateInput(input, inputs, submitButton, inputErrorClass, errorClass);
          });
      });

      // Очистка валидации при закрытии попапа
      const closeButton = form.closest('.popup').querySelector('.popup__close');
      closeButton.addEventListener('click', () => {
          clearValidation(form, inputs, submitButton, inactiveButtonClass);
      });
  });
}

function clearValidation(form, inputs, submitButton, inactiveButtonClass) {
  inputs.forEach(input => {
      input.setCustomValidity('');
      input.classList.remove('popup__input_type_error');
      if (input.nextElementSibling && input.nextElementSibling.classList.contains(inactiveButtonClass)) {
          input.nextElementSibling.remove();
      }
  });
  
  submitButton.disabled = true;
}

