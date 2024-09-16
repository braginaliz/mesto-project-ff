//api.js
const baseUrl = 'https://nomoreparties.co/v1/';
const token = '8544872e-8d10-49db-8eda-44512f4edb01';
const cohortId = 'wff-cohort-20';

export function getUserInfo() {
  return fetch(`${baseUrl}${cohortId}/users/me`, {
    headers: {
      Authorization: token,
    }
  }).then(res => checkResponse(res));
}

export function getInitialCards() {
  return fetch(`${baseUrl}${cohortId}/cards`, {
    headers: {
      Authorization: token,
    }
  }).then(res => checkResponse(res));
}

export function updateUserInfo(name, about) {
  return fetch(`${baseUrl}${cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      name,
      about,
    })
  }).then(res => checkResponse(res));
}

export function updateAvatar(avatar) {
  return fetch(`${baseUrl}${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      avatar,
    })
  }).then(res => checkResponse(res));
}

export function createCard(name, link) {
  return fetch(`${baseUrl}${cohortId}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      name,
      link,
    })
  }).then(res => checkResponse(res));
}

export function deleteCard(cardId) {
  return fetch(`${baseUrl}${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    }
  }).then(res => checkResponse(res));
}

export function likeCard(cardId) {
  return fetch(`${baseUrl}${cohortId}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      Authorization: token,
    }
  }).then(res => checkResponse(res));
}

export function dislikeCard(cardId) {
  return fetch(`${baseUrl}${cohortId}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    }
  }).then(res => checkResponse(res));
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}