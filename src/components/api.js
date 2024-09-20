import { config } from '../utils/config.js'; 

const cohortId = 'wff-cohort-20'; 

export function getUserInfo() { 
    return fetch(`${config.baseUrl}${cohortId}/users/me`, { 
        headers: { 
            Authorization: config.headers.authorization, 
        } 
    }).then(res => checkResponse(res)); 
} 

export function getInitialCards() { 
    return fetch(`${config.baseUrl}${cohortId}/cards`, { 
        headers: { 
            Authorization: config.headers.authorization, 
        } 
    }).then(res => checkResponse(res)); 
} 

export function updateUserInfo(name, about) { 
    return fetch(`${config.baseUrl}${cohortId}/users/me`, { 
        method: 'PATCH', 
        headers: config.headers, 
        body: JSON.stringify({ 
            name, 
            about, 
        }) 
    }).then(res => checkResponse(res)); 
} 

export function updateAvatar(avatar) { 
    return fetch(`${config.baseUrl}${cohortId}/users/me/avatar`, { 
        method: 'PATCH', 
        headers: config.headers, 
        body: JSON.stringify({ 
            avatar, 
        }) 
    }).then(res => checkResponse(res)); 
} 

export function createCard(name, link) { 
    return fetch(`${config.baseUrl}${cohortId}/cards`, { 
        method: 'POST', 
        headers: config.headers, 
        body: JSON.stringify({ 
            name, 
            link, 
        }) 
    }).then(res => checkResponse(res)); 
} 

export function deleteCard(cardId) { 
    return fetch(`${config.baseUrl}${cohortId}/cards/${cardId}`, { 
        method: 'DELETE', 
        headers: { 
            Authorization: config.headers.authorization, 
        } 
    }).then(res => checkResponse(res)); 
} 

export function likeCard(cardId) { 
    return fetch(`${config.baseUrl}${cohortId}/cards/likes/${cardId}`, { 
        method: 'PUT', 
        headers: { 
            Authorization: config.headers.authorization, 
        } 
    }).then(res => checkResponse(res)); 
} 

export function dislikeCard(cardId) { 
    return fetch(`${config.baseUrl}${cohortId}/cards/likes/${cardId}`, { 
        method: 'DELETE', 
        headers: { 
            Authorization: config.headers.authorization, 
        } 
    }).then(res => checkResponse(res)); 
} 

function checkResponse(res) { 
    if (res.ok) { 
        return res.json(); 
    } 
    return Promise.reject(`Ошибка: ${res.status}`); 
} 