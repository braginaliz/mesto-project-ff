import './pages/index.css';
import { openModal, closeModal } from './pages/modal.js';
import './pages/validation.js';
import './pages/api.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const avatarEditPopup = document.querySelector('.popup_type_avatar-edit');
const imagePopup = document.querySelector('.popup_type_image');
const cardListElement = document.querySelector('.places__list');
const editPopupForm = document.forms['edit-profile'];
const newCardPopupForm = document.forms['new-place'];
const avatarEditPopupForm = document.forms['edit-avatar'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputEditName = editPopupForm.querySelector('.popup__input_type_name');
const inputEditDescription = editPopupForm.querySelector('.popup__input_type_description');
const inputCardName = newCardPopupForm.querySelector('.popup__input_type_card-name');
const inputCardLink = newCardPopupForm.querySelector('.popup__input_type_url');
const inputAvatarLink = avatarEditPopupForm.querySelector('.popup__input_type_avatar-link');

profileEditButton.addEventListener('click', () => {
  inputEditName.value = profileName.textContent;
  inputEditDescription.value = profileDescription.textContent;
  openModal(editPopup);
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

avatarEditButton.addEventListener('click', () => {
  openModal(avatarEditPopup);
});

avatarEditPopupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newAvatarLink = inputAvatarLink.value;
  const profileImageDiv = document.querySelector('.profile__image');
  profileImageDiv.style.backgroundImage = `url(${newAvatarLink})`;
  avatarEditPopupForm.reset();
  closeModal(avatarEditPopup);
});

// Функции добавления карточек на страницу

  function createCardElement(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    // Открытие попапа с изображением при клике на картинку
    cardImage.addEventListener('click', () => {
        openImagePopup(cardData.link, cardData.name); // Вызываем функцию открытия попапа
    });

  return cardElement;
}

// Закрытие попапов
document.querySelectorAll('.popup__close').forEach(btn => {
  btn.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closeModal(popup);
  });
});

function openImagePopup(imageSrc, imageAlt) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  openPopup(imagePopup);
}

// Закрытие попапов
document.querySelectorAll('.popup__close').forEach(btn => {
  btn.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closeModal(popup);
  });
});

