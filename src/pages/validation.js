// validation.js

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

function validateInput(input, inputs, submitButton, inputErrorClass, errorClass) {
    const value = input.value.trim();
    let errorMessage = '';

    const patterns = {
        name: /^[a-zA-Zа-яёА-ЯЁ\- ]+$/,
        description: /^[a-zA-Zа-яёА-ЯЁ\- ]+$/
    };

    switch (input.name) {
        case 'name':
            if (!value) {
                errorMessage = 'Вы пропустили это поле.';
            } else if (value.length < 2 || value.length > 40) {
                errorMessage = `Минимальное количество символов: 2. Длина текста сейчас: ${value.length}.`;
            } else if (!patterns.name.test(value)) {
                errorMessage = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.';
            }
            break;
        case 'description':
            if (!value) {
                errorMessage = 'Вы пропустили это поле.';
            } else if (value.length < 2 || value.length > 200) {
                errorMessage = `Минимальное количество символов: 2. Длина текста сейчас: ${value.length}.`;
            } else if (!patterns.description.test(value)) {
                errorMessage = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.';
            }
            break;
        case 'place-name':
            if (!value) {
                errorMessage = 'Вы пропустили это поле.';
            } else if (!patterns.name.test(value)) {
                errorMessage = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.';
            }
            break;
        case 'link':
            if (!value) {
                errorMessage = 'Вы пропустили это поле.';
            } else {
                try {
                    new URL(value);
                } catch {
                    errorMessage = 'Введите адрес сайта.';
                }
            }
            break;
    }

    if (errorMessage) {
        input.setCustomValidity(errorMessage);
        input.classList.add(inputErrorClass);
    } else {
        input.setCustomValidity('');
        input.classList.remove(inputErrorClass);
    }

    showError(input, errorMessage, errorClass);
    toggleSubmitButtonState(inputs, submitButton);
}

function showError(input, message, errorClass) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains(errorClass)) {
        errorElement = document.createElement('span');
        errorElement.classList.add(errorClass);
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
}

function toggleSubmitButtonState(inputs, submitButton) {
    const isFormValid = inputs.every(input => input.checkValidity() && !input.classList.contains('popup__input_type_error'));
    submitButton.disabled = !isFormValid;
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