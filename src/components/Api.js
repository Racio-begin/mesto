class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	};

	_getResponseData(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	};

	getInitialCards() {
		return fetch(`${this._url}/cards`, {
			method: "GET",
			headers: this._headers
		})
			.then((res) =>
				this._getResponseData(res)
			)
	};

	getUserData() {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
			headers: this._headers
		})
			.then((res) =>
				this._getResponseData(res)
			)
	};

	updateUserData(userData) {
		return fetch(`${this._url}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name: userData["username"],
				about: userData["description"]
			})
		})
			.then((res) =>
				this._getResponseData(res)
			)
	};

	sendingCard(name, link) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ name, link }),
		})
			.then((res) =>
				this._getResponseData(res)
			)
	};

	likeCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: "PUT",
			headers: this._headers
		})
			.then((res) =>
				this._getResponseData(res)
			)
	};

	unlikeCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: "DELETE",
			headers: this._headers
		})
			.then((res) =>
				this._getResponseData(res)
			)
	};

	deleteCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: "DELETE",
			headers: this._headers
		})
			.then((res) =>
				this._getResponseData(res)
			)
	};

	updateUserAvatar(data) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar: data["avatar"]
			})
		})
			.then((res) =>
				this._getResponseData(res)
			)
	};

};

export default Api;