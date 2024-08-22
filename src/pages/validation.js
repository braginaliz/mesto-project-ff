document.addEventListener("DOMContentLoaded", () => {
    const form = document.forms['edit-profile'];
    const nameInput = form.elements['name'];
    const descriptionInput = form.elements['description'];
    const submitButton = form.querySelector('.popup__button');

    const patterns = {
      name: /^[a-zA-Zа-яёА-ЯЁ\- ]+$/,
      description: /^[a-zA-Zа-яёА-ЯЁ\- ]+$/
    };

    function validateInput(input) {
      const value = input.value.trim();
      let errorMessage = '';
      
      if (!value) {
        errorMessage = 'Вы пропустили это поле.';
      } else if (value.length < (input.name === 'name' ? 2 : 2) || value.length > (input.name === 'name' ? 40 : 200)) {
        errorMessage = `Минимальное количество символов: 2. Длина текста сейчас: ${value.length}.`;
      } else if (!patterns[input.name].test(value)) {
        errorMessage = 'Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.';
      }
      
      if (errorMessage) {
        input.setCustomValidity(errorMessage);
        input.classList.add('invalid');
      } else {
        input.setCustomValidity('');
        input.classList.remove('invalid');
      }
      
      showError(input, errorMessage);
      toggleSubmitButtonState();
    }

    function showError(input, message) {
      let errorElement = input.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains('error')) {
        errorElement = document.createElement('span');
        errorElement.classList.add('error');
        input.parentNode.insertBefore(errorElement, input.nextSibling);
      }
      errorElement.textContent = message;
    }

    function toggleSubmitButtonState() {
      const isFormValid = form.checkValidity() && !nameInput.classList.contains('invalid') && !descriptionInput.classList.contains('invalid');
      submitButton.disabled = !isFormValid;
    }

    nameInput.addEventListener('input', () => validateInput(nameInput));
    descriptionInput.addEventListener('input', () => validateInput(descriptionInput));

    const popupEdit = document.querySelector('.popup_type_edit');
    popupEdit.querySelector('.popup__close').addEventListener('click', () => {
      nameInput.value = '';
      descriptionInput.value = '';
      nameInput.classList.remove('invalid');
      descriptionInput.classList.remove('invalid');
      toggleSubmitButtonState();
      const errors = popupEdit.querySelectorAll('.error');
      errors.forEach(error => error.remove());
      nameInput.setCustomValidity('');
      descriptionInput.setCustomValidity('');
    });
  });