class UserInfo{
	constructor({ nameSelector, infoSelector }) {
		this._name = document.querySelector(nameSelector);
		this._info = document.querySelector(infoSelector);
	};

	getUserInfo() {												// подставить данные пользователя в форму при открытии
		return {
			name: this._name.textContent,
			info: this._info.textContent
		}
	};

	setUserInfo(name, info) {										// отправить данные пользователя на страничку
		this._name.textContent = name;
		this._info.textContent = info;
	};

};

export default UserInfo;