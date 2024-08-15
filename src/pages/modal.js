// modal.js

function isEscapeKey(evt) {
    return evt.key === 'Escape';
  }
  
  function handleEscapeKey(evt) {
    if (isEscapeKey(evt)) {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closeModal(openedPopup);
      }
    }
  }
  
  function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      closeModal(evt.target);
    }
    if (evt.target.classList.contains('popup__close')) {
      closeModal(evt.target.closest('.popup'));
    }
  }
  
  export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('click', handleOverlayClick);
  }
  
  export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscapeKey);
    document.removeEventListener('click', handleOverlayClick);
  }