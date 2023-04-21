class Api {
	constructor(options) {
		this.url = options.url;
		this.headers = options.headers;
	}

	getInitialCards() {
		return fetch(this.url, {
			headers: this.headers
			}).then(res => {
				if (res.ok) {
					return res.json()
				}
				return Promise.reject('Error');
			})
	}

			
	// 		.then((result) => {
	// 			console.log(result);
	// 		});
	// }

	createCard() {

	}

	deleteCard() {

	}

	// другие методы работы с API
}

export default Api;