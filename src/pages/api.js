const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
    headers: {
        authorization: '8544872e-8d10-49db-8eda-44512f4edb01',
        'Content-Type': 'application/json'
    }
};

const handleResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

const handleError = (err) => {
    console.error(err);
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then(handleResponse)
    .catch(handleError);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then(handleResponse)
    .catch(handleError);
};

export const updateUserInfo = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data),
    })
    .then(handleResponse)
    .catch(handleError);
};

export const addNewCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data),
    })
    .then(handleResponse)
    .catch(handleError);
};

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse)
    .catch(handleError);
};

export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(handleResponse)
    .catch(handleError);
};

export const unlikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse)
    .catch(handleError);
};