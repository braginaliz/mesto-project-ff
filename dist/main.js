(()=>{var e={531:()=>{document.addEventListener("DOMContentLoaded",(function(){var e=document.forms["edit-profile"],t=e.elements.name,n=e.elements.description,r=e.querySelector(".popup__button"),o={name:/^[a-zA-Zа-яёА-ЯЁ\- ]+$/,description:/^[a-zA-Zа-яёА-ЯЁ\- ]+$/};function i(e){var t=e.value.trim(),n="";t?t.length<(e.name,2)||t.length>("name"===e.name?40:200)?n="Минимальное количество символов: 2. Длина текста сейчас: ".concat(t.length,"."):o[e.name].test(t)||(n="Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы."):n="Вы пропустили это поле.",n?(e.setCustomValidity(n),e.classList.add("invalid")):(e.setCustomValidity(""),e.classList.remove("invalid")),function(e,t){var n=e.nextElementSibling;n&&n.classList.contains("error")||((n=document.createElement("span")).classList.add("error"),e.parentNode.insertBefore(n,e.nextSibling)),n.textContent=t}(e,n),c()}function c(){var o=e.checkValidity()&&!t.classList.contains("invalid")&&!n.classList.contains("invalid");r.disabled=!o}t.addEventListener("input",(function(){return i(t)})),n.addEventListener("input",(function(){return i(n)}));var a=document.querySelector(".popup_type_edit");a.querySelector(".popup__close").addEventListener("click",(function(){t.value="",n.value="",t.classList.remove("invalid"),n.classList.remove("invalid"),c(),a.querySelectorAll(".error").forEach((function(e){return e.remove()})),t.setCustomValidity(""),n.setCustomValidity("")}))}))}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="",(()=>{"use strict";var e={};function t(e,t,n,r){var o=document.querySelector("#card-template").content.cloneNode(!0),i=o.querySelector(".card__image"),c=o.querySelector(".card__title"),a=o.querySelector(".card__delete-button"),d=o.querySelector(".card__like-button");return i.src=e.link,i.alt=e.name,c.textContent=e.name,a.addEventListener("click",(function(){return t(o)})),d.addEventListener("click",(function(){return n(d)})),i.addEventListener("click",(function(t){return r(t,e)})),o}function r(e){e.remove()}function o(e){e.classList.toggle("card__like-button_is-active")}function i(e){if(function(e){return"Escape"===e.key}(e)){var t=document.querySelector(".popup_is-opened");t&&d(t)}}function c(e){e.target.classList.contains("popup")&&d(e.target),e.target.classList.contains("popup__close")&&d(e.target.closest(".popup"))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i),document.addEventListener("click",c)}function d(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i),document.removeEventListener("click",c)}n.r(e),n.d(e,{O:()=>d,q:()=>a});const s=n.p+"6666407ac3aa5af1d5de.jpg",u=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}];n(531),document.addEventListener("DOMContentLoaded",(function(){document.querySelector(".profile__image").style.backgroundImage="url(".concat(s,")"),u.forEach((function(n){var i=t(n,r,o,e.handleImageClick);y.append(i)}))}));var l=document.querySelector(".profile__edit-button"),p=document.querySelector(".profile__add-button"),m=document.querySelector(".popup_type_edit"),v=document.querySelector(".popup_type_new-card"),y=(document.querySelector(".popup_type_image"),document.querySelector(".places__list")),_=document.forms["edit-profile"],f=document.forms["new-place"],k=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),L=_.querySelector(".popup__input_type_name"),S=_.querySelector(".popup__input_type_description"),q=f.querySelector(".popup__input_type_card-name"),b=f.querySelector(".popup__input_type_url");l.addEventListener("click",(function(){L.value=k.textContent,S.value=g.textContent,a(m)})),f.addEventListener("submit",(function(n){n.preventDefault();var i=t({name:q.value,link:b.value},r,o,e.handleImageClick);y.prepend(i),f.reset(),d(v)})),_.addEventListener("submit",(function(e){e.preventDefault(),k.textContent=L.value,g.textContent=S.value,d(m)})),p.addEventListener("click",(function(){a(v)}))})()})();