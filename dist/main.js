(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p:""},t={};function n(e,t,n,o){var r=document.querySelector("#card-template").content.cloneNode(!0),c=r.querySelector(".card__image"),p=r.querySelector(".card__title"),d=r.querySelector(".card__delete-button"),a=r.querySelector(".card__like-button");return c.src=e.link,c.alt=e.name,p.textContent=e.name,d.addEventListener("click",(function(){return t(r)})),a.addEventListener("click",(function(){return n(a)})),c.addEventListener("click",(function(t){return o(t,e)})),r}function o(e){e.remove()}function r(e){e.classList.toggle("card__like-button_is-active")}function c(e){if(function(e){return"Escape"===e.key}(e)){var t=document.querySelector(".popup_is-opened");t&&a(t)}}function p(e){e.target.classList.contains("popup")&&a(e.target),e.target.classList.contains("popup__close")&&a(e.target.closest(".popup"))}function d(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),document.addEventListener("click",p)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),document.removeEventListener("click",p)}e.r(t),e.d(t,{O:()=>a,q:()=>d});const u=e.p+"6666407ac3aa5af1d5de.jpg",i=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}];document.addEventListener("DOMContentLoaded",(function(){document.querySelector(".profile__image").style.backgroundImage="url(".concat(u,")"),i.forEach((function(e){var c=n(e,o,r,t.handleImageClick);y.append(c)}))}));var l=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__add-button"),m=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),y=(document.querySelector(".popup_type_image"),document.querySelector(".places__list")),f=document.forms["edit-profile"],v=document.forms["new-place"],k=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),S=f.querySelector(".popup__input_type_name"),q=f.querySelector(".popup__input_type_description"),b=v.querySelector(".popup__input_type_card-name"),L=v.querySelector(".popup__input_type_url");l.addEventListener("click",(function(){S.value=k.textContent,q.value=g.textContent,d(m)})),v.addEventListener("submit",(function(e){e.preventDefault();var c=n({name:b.value,link:L.value},o,r,t.handleImageClick);y.prepend(c),v.reset(),a(_)})),f.addEventListener("submit",(function(e){e.preventDefault(),k.textContent=S.value,g.textContent=q.value,a(m)})),s.addEventListener("click",(function(){d(_)}))})();