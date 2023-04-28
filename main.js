(()=>{"use strict";var t={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".button",inactiveButtonClass:"button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible"},e=document.querySelector(".popup_type_edit-avatar").querySelector("#formEditAvatar"),n=document.querySelector(".content").querySelector(".profile"),r=n.querySelector(".profile__button-avatar-edit"),o=n.querySelector(".profile__button-edit"),i=n.querySelector(".profile__button-add"),u=document.querySelector(".popup_type_edit-profile").querySelector("#formEditProfile"),a=u.querySelector(".popup__input_type_username"),c=u.querySelector(".popup__input_type_description"),l=document.querySelector(".popup_type_add-card").querySelector("#formAddCard");function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==s(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==s(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===s(o)?o:String(o)),r)}var o}const p=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._url=e.url,this._headers=e.headers}var e,n;return e=t,(n=[{key:"getInitialCards",value:function(){return fetch("".concat(this._url,"/cards"),{method:"GET",headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Error: набор карточек с сервера не получен")}))}},{key:"getUserData",value:function(){return fetch("".concat(this._url,"/users/me"),{method:"GET",headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Error: данные о пользователе с сервера не получены")}))}},{key:"updateUserData",value:function(t){return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t.username,about:t.description})}).then((function(t){return t.ok?t.json():Promise.reject("Error: новые данные о пользователе не отправлены на сервер")}))}},{key:"sendingCard",value:function(t,e){return fetch("".concat(this._url,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:e})}).then((function(t){return t.ok?t.json():Promise.reject("Error: новая карточка не отправлена на сервер")}))}},{key:"likeCard",value:function(t){return fetch("".concat(this._url,"/cards/").concat(t,"/likes"),{method:"PUT",headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Error: лайк не отправлен на сервер")}))}},{key:"unlikeCard",value:function(t){return fetch("".concat(this._url,"/cards/").concat(t,"/likes"),{method:"DELETE",headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Error: лайк не пришел с сервера")}))}},{key:"deleteCard",value:function(t){return fetch("".concat(this._url,"/cards/").concat(t),{method:"DELETE",headers:this._headers}).then((function(t){return t.ok?t.json():Promise.reject("Error: карточка не удалена с сервера")}))}},{key:"updateUserAvatar",value:function(t){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t.avatar})}).then((function(t){return t.ok?t.json():Promise.reject("Error: новый аватар пользователя не отправлен на сервер")}))}}])&&f(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==y(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==y(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===y(o)?o:String(o)),r)}var o}var d=function(){function t(e,n,r,o,i,u,a){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._cardData=e,this._name=e.name,this._link=e.link,this.likes=e.likes,this._likesCounter=e.likes.length,this._cardId=e._id,this._owner=e.owner,this.userId=n,this._template=r,this._openPopupImage=o,this._handleLike=i,this._handleUnlike=u,this._handleDeleteYourCard=a}var e,n;return e=t,(n=[{key:"_getTemplate",value:function(){var t=document.querySelector(this._template).content.querySelector(".element").cloneNode(!0);return this._likeCardButton=t.querySelector(".element__button-like"),this._buttonBin=t.querySelector(".element__button-bin"),this._elementImage=t.querySelector(".element__image"),t}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._elementImage.src=this._link,this._element.querySelector(".element__place").textContent=this._name,this._elementImage.alt=this._name,this._like=this._element.querySelector(".element__button-like"),this._counter=this._element.querySelector(".element__like-counter"),this.countLikes(this._cardData),this.userId!==this._cardData.owner._id&&(this._buttonBin.style.display="none"),this._setEventListeners(),this._element}},{key:"_setEventListeners",value:function(){var t=this;this._buttonBin.addEventListener("click",(function(){t._handleDeleteYourCard(t,t._cardId)})),this._likeCardButton.addEventListener("click",(function(){t._handleLikeCard()})),this._elementImage.addEventListener("click",(function(){t._openPopupImage(t._name,t._link)}))}},{key:"handleDeleteCard",value:function(){this._element.remove(),this._element=null}},{key:"ifCardLiked",value:function(){var t=this;return this._likes.some((function(e){return e._id===t.userId}))}},{key:"_handleLikeCard",value:function(){this.ifCardLiked()?this._handleUnlike(this._cardId):this._handleLike(this._cardId)}},{key:"countLikes",value:function(t){this._likes=t.likes,0===this._likes.length?this._counter.textContent="0":this._counter.textContent=this._likes.length,this.ifCardLiked()?this._like.classList.add("elements__button-like_active"):this._like.classList.remove("elements__button-like_active")}}])&&h(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();const m=d;function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==b(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==b(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===b(o)?o:String(o)),r)}var o}const _=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formSelector=e.formSelector,this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=n}var e,n;return e=t,(n=[{key:"_showInputError",value:function(t){var e=this._formElement.querySelector(".".concat(t.id,"-error"));e.classList.add(this._errorClass),e.textContent=t.validationMessage,t.classList.add(this._inputErrorClass)}},{key:"_hideInputError",value:function(t){var e=this._formElement.querySelector(".".concat(t.id,"-error"));e.classList.remove(this._errorClass),e.textContent="",t.classList.remove(this._inputErrorClass)}},{key:"hideAllInputErrors",value:function(){var t=this;this._inputList.forEach((function(e){t._hideInputError(e)}))}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"disableSubmitButton",value:function(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.disabled=!0}},{key:"_enableSubmitButton",value:function(){this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.disabled=!1}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?this.disableSubmitButton():this._enableSubmitButton()}},{key:"_setEventListeners",value:function(){var t=this;this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector),this.toggleButtonState(),this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t.toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&v(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function S(t){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(t)}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,k(r.key),r)}}function k(t){var e=function(t,e){if("object"!==S(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==S(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===S(e)?e:String(e)}const E=function(){function t(e){var n,r,o,i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,o=function(t){"Escape"===t.key&&i.close()},(r=k(r="_handleEscClose"))in n?Object.defineProperty(n,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[r]=o,this._popup=document.querySelector(e)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var t=this;this._popup.addEventListener("click",(function(e){var n=e.target.classList;(n.contains("popup")||n.contains("popup__button-close"))&&t.close()}))}}])&&g(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==w(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==w(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===w(o)?o:String(o)),r)}var o}function P(){return P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=C(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},P.apply(this,arguments)}function O(t,e){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},O(t,e)}function C(t){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},C(t)}const L=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&O(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=C(r);if(o){var n=C(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===w(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._photo=e._popup.querySelector(".popup__photo"),e._name=e._popup.querySelector(".popup__title-photo"),e}return e=u,(n=[{key:"open",value:function(t,e){P(C(u.prototype),"open",this).call(this),this._photo.alt=t,this._name.textContent=t,this._photo.src=e}}])&&j(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(E);function I(t){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function T(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==I(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==I(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===I(o)?o:String(o)),r)}var o}function q(){return q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=x(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},q.apply(this,arguments)}function B(t,e){return B=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},B(t,e)}function x(t){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},x(t)}const R=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&B(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=x(r);if(o){var n=x(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===I(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._handleFormSubmit=e,n._form=n._popup.querySelector(".popup__form"),n._inputList=n._form.querySelectorAll(".popup__input"),n._submitButton=n._form.querySelector(".popup__button-save"),n}return e=u,(n=[{key:"close",value:function(){q(x(u.prototype),"close",this).call(this),this._form.reset()}},{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){t[e.name]=e.value})),t}},{key:"setEventListeners",value:function(){var t=this;q(x(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){e.preventDefault(),t._handleFormSubmit(t._getInputValues()),t.close()}))}},{key:"toggleSaveStatus",value:function(t){t?(this._defaultText=this._submitButton.textContent,this._submitButton.textContent="Сохранение..."):this._submitButton.textContent=this._defaultText}}])&&T(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(E);function D(t){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},D(t)}function A(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==D(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==D(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===D(o)?o:String(o)),r)}var o}function U(){return U="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=N(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},U.apply(this,arguments)}function V(t,e){return V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},V(t,e)}function N(t){return N=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},N(t)}const J=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&V(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=N(r);if(o){var n=N(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===D(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._handleDelete=e,n._buttonSubmit=n._popup.querySelector(".popup__form"),n}return e=u,(n=[{key:"open",value:function(t,e){U(N(u.prototype),"open",this).call(this),this._card=t,this._cardId=e}},{key:"setEventListeners",value:function(){var t=this;U(N(u.prototype),"setEventListeners",this).call(this),this._buttonSubmit.addEventListener("submit",(function(e){e.preventDefault(),t._handleDelete(t._card,t._cardId)}))}}])&&A(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(E);function z(t){return z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},z(t)}function F(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==z(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==z(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===z(o)?o:String(o)),r)}var o}const G=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=e,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"addItem",value:function(t){this._container.append(t)}},{key:"addItemBeginning",value:function(t){this._container.prepend(t)}},{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){e._renderer(t)}))}}])&&F(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function H(t){return H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},H(t)}function M(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==H(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==H(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===H(o)?o:String(o)),r)}var o}const Y=function(){function t(e){var n=e.nameSelector,r=e.aboutSelector,o=e.avatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=document.querySelector(n),this._about=document.querySelector(r),this._avatar=document.querySelector(o)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,about:this._about.textContent}}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.about,r=t.avatar,o=t._id;this._name.textContent=e,this._about.textContent=n,this._avatar.src=r,this.userId=o}}])&&M(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function $(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var K,Q=new p({url:"https://mesto.nomoreparties.co/v1/cohort-64",headers:{authorization:"c467341b-672a-48a9-be5b-ea4a89cc731a","Content-Type":"application/json"}});Promise.all([Q.getUserData(),Q.getInitialCards()]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,u,a=[],c=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(a.push(r.value),a.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(e,n)||function(t,e){if(t){if("string"==typeof t)return $(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?$(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];K=o._id,X.setUserInfo(o),W.renderItems(i)})).catch((function(t){console.log(t,"Промисы catch (index)")}));var W=new G((function(t){var e=rt(t);W.addItem(e)}),".elements__content"),X=new Y({nameSelector:".profile__username",aboutSelector:".profile__description",avatarSelector:".profile__avatar"}),Z=new L(".popup_type_zoom-image"),tt=new R(".popup_type_add-card",(function(t){tt.toggleSaveStatus(!0),Q.sendingCard(t.title,t.link).then((function(t){W.addItemBeginning(rt(t)),tt.close()})).catch((function(t){console.log(t,"Error: новая карточка не отправлена на сервер (index)")})).finally((function(){return tt.toggleSaveStatus(!1)}))})),et=new R(".popup_type_edit-profile",(function(t){et.toggleSaveStatus(!0),Q.updateUserData(t).then((function(t){X.setUserInfo(t),et.close()})).catch((function(t){console.log(t,"Error: новые данные о пользователе не отправлены на сервер (index)")})).finally((function(){return et.toggleSaveStatus(!1)}))})),nt=new R(".popup_type_edit-avatar",(function(t){nt.toggleSaveStatus(!0),Q.updateUserAvatar(t).then((function(t){X.setUserInfo(t),nt.close()})).catch((function(t){console.log(t,"Error: новый аватар пользователя не отправлен на сервер (index)")})).finally((function(){return nt.toggleSaveStatus(!1)}))}));function rt(t){var e=new m(t,K,"#elements__template",(function(){return Z.open(t.name,t.link)}),(function(t){Q.likeCard(t).then((function(t){return e.countLikes(t)})).catch((function(t){console.log(t,"Error: лайк не отправлен на сервер (index)")}))}),(function(t){Q.unlikeCard(t).then((function(t){return e.countLikes(t)})).catch((function(t){console.log(t,"Error: лайк не пришел с сервера (index)")}))}),(function(t,e){ot.open(t,e)}));return e.generateCard()}var ot=new J(".popup_type_delete-card",(function(t,e){Q.deleteCard(e).then((function(){t.handleDeleteCard(),ot.close()})).catch((function(t){console.log(t,"Error: карточка не удалена с сервера (index)")}))}));r.addEventListener("click",(function(){nt.open(),it.hideAllInputErrors(),it.disableSubmitButton()})),o.addEventListener("click",(function(){a.value=X.getUserInfo().name,c.value=X.getUserInfo().about,et.open(),ut.hideAllInputErrors(),ut.toggleButtonState()})),i.addEventListener("click",(function(){at.hideAllInputErrors(),at.disableSubmitButton(),tt.open()})),nt.setEventListeners(),tt.setEventListeners(),et.setEventListeners(),Z.setEventListeners(),ot.setEventListeners();var it=new _(t,e),ut=new _(t,u),at=new _(t,l);it.enableValidation(),ut.enableValidation(),at.enableValidation()})();
//# sourceMappingURL=main.js.map