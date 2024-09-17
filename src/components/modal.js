// modal.js

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

export { openModal, closeModal };