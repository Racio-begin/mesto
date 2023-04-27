class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}

	getInitialCards() {
		return fetch(`${this._url}/cards`, {
			method: "GET",
			headers: this._headers
		})
			.then(res => {
				if (res.ok) {
					return res.json()
				}
				return Promise.reject('Error: набор карточек с сервера не получен');
			})
	};

	getUserData() {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
			headers: this._headers
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject('Error: данные о пользователе с сервера не получены');
			});
	}

	updateUserData(userData) {
		return fetch(`${this._url}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name: userData["username"],
				about: userData["description"]
			})
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return Promise.reject('Error: новые данные о пользователя не отправлены на сервер');
				}
			});
	}

	sendingCard(name, link) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ name, link }),
		})
			.then(res => {
				if (res.ok) {
					return res.json()
				}
				return Promise.reject('Error: новая карточка не отправлена на сервер');
			})
	};

	likeCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: "PUT",
			headers: this._headers
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject('Error: лайк не отправлен на сервер');
			});
	}

	unlikeCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: "DELETE",
			headers: this._headers
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject('Error: лайк не пришел с сервера');
			});
	}

};

export default Api;



