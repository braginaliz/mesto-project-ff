(()=>{var t={547:()=>{function t(t,e,n){var r=t.every((function(t){return t.checkValidity()&&!t.classList.contains(n.inputErrorClass)}));e.disabled=!r,e.classList.toggle(n.inactiveButtonClass,!r)}document.addEventListener("DOMContentLoaded",(function(){var e,n,r,o,a,c,i;n=(e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}).formSelector,r=e.inputSelector,o=e.submitButtonSelector,a=e.inactiveButtonClass,c=e.inputErrorClass,i=e.errorClass,document.querySelectorAll(n).forEach((function(e){var n=Array.from(e.querySelectorAll(r)),u=e.querySelector(o);t(n,u,{inactiveButtonClass:a}),n.forEach((function(e){e.addEventListener("input",(function(){!function(e,n,r,o,a){var c=e.value.trim(),i="",u={name:/^[a-zA-Zа-яёА-ЯЁ\- ]{2,30}$/,description:/^[a-zA-Zа-яёА-ЯЁ\- ]{2,200}$/,link:/^(http|https):\/\/[^ "]+$/,"avatar-link":/^(http|https):\/\/[^ "]+$/};c?"place-name"===e.name&&(c.length<2||c.length>30)?i=e.dataset.errorLength||"Длина названия должна быть от 2 до 30 символов. Текущая длина: ".concat(c.length,"."):"name"!==e.name&&"description"!==e.name||!(c.length<2||c.length>("name"===e.name?40:200))?"name"!==e.name&&"description"!==e.name||u[e.name].test(c)?"link"!==e.name&&"avatar-link"!==e.name||u[e.name].test(c)||(i=e.dataset.errorUrl||"Введите адрес сайта."):i=e.dataset.errorPattern||"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.":i=e.dataset.errorLength||"Минимальное количество символов: 2. Длина текста сейчас: ".concat(c.length,"."):i=e.dataset.errorRequired||"Вы пропустили это поле.",i?(e.setCustomValidity(i),e.classList.add(o)):(e.setCustomValidity(""),e.classList.remove(o)),function(t,e,n){var r=t.nextElementSibling;r.textContent=e,r.classList.toggle(n,!!e)}(e,i,a),t(n,r,{inputErrorClass:o})}(e,n,u,c,i)}))}))}))}))}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,n),a.exports}(()=>{"use strict";function t(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r),document.removeEventListener("click",o)}function e(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",r),document.addEventListener("click",o)}function r(e){if(function(t){return"Escape"===t.key}(e)){var n=document.querySelector(".popup_is-opened");n&&t(n)}}function o(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&t(e.target.closest(".popup"))}n(547);var a={baseUrl:"https://nomoreparties.co/v1/",headers:{authorization:"8544872e-8d10-49db-8eda-44512f4edb01","Content-Type":"application/json"}},c="wff-cohort-20";function i(t){return fetch("".concat(a.baseUrl).concat(c,"/cards/likes/").concat(t),{method:"PUT",headers:{Authorization:a.headers.authorization}}).then((function(t){return l(t)}))}function u(t){return fetch("".concat(a.baseUrl).concat(c,"/cards/likes/").concat(t),{method:"DELETE",headers:{Authorization:a.headers.authorization}}).then((function(t){return l(t)}))}function l(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var d=document.querySelector(".popup_type_new-card .popup__form"),p=document.querySelector(".popup_type_edit .popup__form"),f=document.forms["edit-avatar"],m=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__add-button"),h=document.querySelector(".profile__avatar-edit-button"),v=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),b=document.querySelector(".popup_type_avatar-edit"),S=document.querySelector(".popup_type_image"),g=document.querySelector(".places__list"),k=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),q=document.querySelector(".profile__image"),L=null;function E(t){var n=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),r=n.querySelector(".card__image"),o=n.querySelector(".card__delete-button"),s=n.querySelector(".card__like-button"),d=n.querySelector(".card__like-count");return r.src=t.link,r.alt=t.name,n.querySelector(".card__title").textContent=t.name,r.addEventListener("click",(function(){return n=t.link,r=t.name,o=S.querySelector(".popup__image"),a=S.querySelector(".popup__caption"),o.src=n,a.textContent=r,void e(S);var n,r,o,a})),Array.isArray(t.likes)&&t.likes.some((function(t){return t._id===L._id}))&&s.classList.add("card__like-button_active"),d.textContent=t.likes.length,s.addEventListener("click",(function(){(s.classList.contains("card__like-button_active")?u:i)(t._id).then((function(t){s.classList.toggle("card__like-button_active"),d.textContent=t.likes.length})).catch((function(t){console.error("Ошибка при работе с лайком:",t)}))})),t.owner&&t.owner._id===L._id&&(o.style.display="block",o.addEventListener("click",(function(){return function(t,e){(function(t){return fetch("".concat(a.baseUrl).concat(c,"/cards/").concat(t),{method:"DELETE",headers:{Authorization:a.headers.authorization}}).then((function(t){return l(t)}))})(t).then((function(){e.remove()})).catch((function(t){console.error("Ошибка при удалении карточки:",t)}))}(t._id,n)}))),n}m.addEventListener("click",(function(){p.name.value=k.textContent,p.description.value=C.textContent,e(v)})),p.addEventListener("submit",(function(e){e.preventDefault();var n,r,o=p.querySelector(".popup__button");o.textContent="Сохранение...",o.disabled=!0,(n=p.name.value,r=p.description.value,fetch("".concat(a.baseUrl).concat(c,"/users/me"),{method:"PATCH",headers:a.headers,body:JSON.stringify({name:n,about:r})}).then((function(t){return l(t)}))).then((function(e){k.textContent=e.name,C.textContent=e.about,t(v)})).catch((function(t){return console.error(t)})).finally((function(){o.textContent="Сохранить",o.disabled=!1}))})),_.addEventListener("click",(function(){e(y)})),d.addEventListener("submit",(function(e){e.preventDefault();var n,r,o=d.querySelector(".popup__button");o.textContent="Сохранение...",o.disabled=!0,(n=d.querySelector(".popup__input_type_card-name").value,r=d.querySelector(".popup__input_type_url").value,fetch("".concat(a.baseUrl).concat(c,"/cards"),{method:"POST",headers:a.headers,body:JSON.stringify({name:n,link:r})}).then((function(t){return l(t)}))).then((function(e){var n=E(e);g.prepend(n),t(e.closest(".popup"))})).catch((function(t){return console.error(t)})).finally((function(){o.textContent="Сохранить",o.disabled=!1}))})),h.addEventListener("click",(function(){e(b)})),f.addEventListener("submit",(function(e){e.preventDefault();var n,r=f.querySelector(".popup__button");r.textContent="Сохранение...",r.disabled=!0,(n=f.elements["avatar-link"].value,fetch("".concat(a.baseUrl).concat(c,"/users/me/avatar"),{method:"PATCH",headers:a.headers,body:JSON.stringify({avatar:n})}).then((function(t){return l(t)}))).then((function(e){q.style.backgroundImage="url(".concat(e.avatar,")"),t(b)})).catch((function(t){return console.error(t)})).finally((function(){r.textContent="Сохранить",r.disabled=!1}))})),Promise.all([fetch("".concat(a.baseUrl).concat(c,"/users/me"),{headers:{Authorization:a.headers.authorization}}).then((function(t){return l(t)})),fetch("".concat(a.baseUrl).concat(c,"/cards"),{headers:{Authorization:a.headers.authorization}}).then((function(t){return l(t)}))]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(i.push(r.value),i.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(e,n)||function(t,e){if(t){if("string"==typeof t)return s(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];L=o,k.textContent=o.name,C.textContent=o.about,q.style.backgroundImage="url(".concat(o.avatar,")"),a.forEach((function(t){var e=E(t);g.appendChild(e)}))})).catch((function(t){return console.error("Ошибка при загрузке данных:",t)}))})()})();