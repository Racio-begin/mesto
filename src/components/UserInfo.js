class UserInfo{
	constructor({nameSelector, InfoSelector}) {
		this._userName = document.querySelector(nameSelector);
		this._userInfo = document.querySelector(InfoSelector);
	};

	getUserInfo() {
		return {
			name: this._userName.textContent,
			info: this._userInfo.textContent
		}
	}

	setUserInfo(name, info) {
		this._userName.textContent = name,
		this._userInfo.textContent = info
	}

};

export default UserInfo;