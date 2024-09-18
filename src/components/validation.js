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

        clearValidation(form, inputs, submitButton, inactiveButtonClass, inputErrorClass, errorClass); 
    }); 
} 

function validateInput(input, inputs, submitButton, inputErrorClass, errorClass) { 
    const value = input.value.trim(); 
    let errorMessage = ''; 

    const minLength = parseInt(input.dataset.minlength, 10); 
    const maxLength = parseInt(input.dataset.maxlength, 10); 
    const pattern = input.dataset.pattern; 

    if (!value) { 
        errorMessage = input.dataset.errorRequired || 'Вы пропустили это поле.'; 
    } else if (minLength && value.length < minLength) { 
        errorMessage = input.dataset.errorLength || `Минимальное количество символов: ${minLength}. Текущая длина: ${value.length}.`; 
    } else if (maxLength && value.length > maxLength) { 
        errorMessage = input.dataset.errorLength || `Максимальное количество символов: ${maxLength}. Текущая длина: ${value.length}.`; 
    } else if (input.type === 'url' && !isValidURL(value)) { 
        errorMessage = input.dataset.errorUrl || 'Введите корректный адрес сайта.'; 
    } else if (pattern && !new RegExp(pattern).test(value)) { 
        errorMessage = input.dataset.errorPattern || 'Недопустимые символы.'; 
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

export function clearValidation(form, inputs, submitButton, inactiveButtonClass, inputErrorClass, errorClass) { 
    inputs.forEach(input => { 
        input.setCustomValidity(''); 
        input.classList.remove(inputErrorClass);

        const errorElement = input.nextElementSibling; 
        errorElement.textContent = ''; 
        errorElement.classList.remove(errorClass);
        input.value = ''; 
    }); 

    submitButton.disabled = true; 
} 

// Функция для проверки URL
function isValidURL(string) { 
    try { 
        new URL(string); 
        return true; 
    } catch (_) { 
        return false;   
    } 
}