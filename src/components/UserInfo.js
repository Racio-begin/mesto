class UserInfo {
	constructor({ nameSelector, aboutSelector, avatarSelector }) {
		this._name = document.querySelector(nameSelector);
		this._about = document.querySelector(aboutSelector);
		this._avatar = document.querySelector(avatarSelector);
	};

	getUserInfo() {																// подставить данные пользователя в форму при открытии
		return ({
			name: this._name.textContent,
			about: this._about.textContent
		});
	};

	setUserInfo({ name, about, avatar, _id }) {		// отправить данные пользователя на страничку
		this._name.textContent = name;
		this._about.textContent = about;
		this._avatar.src = avatar;
		this.userId = _id;
	};

};

export default UserInfo;