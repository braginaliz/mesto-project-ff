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


        clearValidation(form, inputs, submitButton, inactiveButtonClass);
    });
}

function validateInput(input, inputs, submitButton, inputErrorClass, errorClass) {
    const value = input.value.trim();
    let errorMessage = '';

    const patterns = {
        name: /^[a-zA-Zа-яёА-ЯЁ\- ]{2,30}$/, 
        description: /^[a-zA-Zа-яёА-ЯЁ\- ]{2,200}$/, 
        link: /^(http|https):\/\/[^ "]+$/,
        'avatar-link': /^(http|https):\/\/[^ "]+$/
    };

    // Проверки для разных инпутов
    if (!value) {
        errorMessage = input.dataset.errorRequired || 'Вы пропустили это поле.';
    } else if (input.name === 'place-name' && (value.length < 2 || value.length > 30)) {
        errorMessage = input.dataset.errorLength || `Длина названия должна быть от 2 до 30 символов. Текущая длина: ${value.length}.`;
    } else if ((input.name === 'name' || input.name === 'description') && (value.length < 2 || value.length > (input.name === 'name' ? 40 : 200))) {
        errorMessage = input.dataset.errorLength || `Минимальное количество символов: 2. Длина текста сейчас: ${value.length}.`;
    } else if ((input.name === 'name' || input.name === 'description') && !patterns[input.name].test(value)) {
        errorMessage = input.dataset.errorPattern || 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.';
    } else if ((input.name === 'link' || input.name === 'avatar-link') && !patterns[input.name].test(value)) {
        errorMessage = input.dataset.errorUrl || 'Введите адрес сайта.';
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
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.classList.toggle(errorClass, !!message);
}

function toggleSubmitButtonState(inputs, submitButton) {
    const isFormValid = inputs.every(input => input.checkValidity() && !input.classList.contains('popup__input_type_error'));
    submitButton.disabled = !isFormValid;
}

function clearValidation(form, inputs, submitButton, inactiveButtonClass) {
    inputs.forEach(input => {
        input.setCustomValidity('');
        input.classList.remove('popup__input_type_error');
        const errorElement = input.nextElementSibling;
        errorElement.textContent = '';
        errorElement.classList.remove('popup__error_visible');
    });

    submitButton.disabled = true;
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;  
    }
}