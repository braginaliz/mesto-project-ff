function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('click', handleModalClose);
}

function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleModalClose);
}

function handleKeydown(evt) {
  if (isEscapeKey(evt)) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function handleModalClose(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closeModal(evt.target.closest('.popup'));
  }
}

export function openImagePopup(link, name) {
  const imagePopup = document.querySelector('.popup_type_image');
  const imageElement = imagePopup.querySelector('.popup__image');
  const captionElement = imagePopup.querySelector('.popup__caption');

  imageElement.src = link;
  imageElement.alt = name;  // Добавление alt для доступности
  captionElement.textContent = name;

  openModal(imagePopup);  // Открыть попап с изображением
}

export { openModal, closeModal };