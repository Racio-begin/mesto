// Создаем класс отрисовки элементов на странице (как базового набора карточек, так и новых)

class Section {
	constructor(renderer, containerSelector) {
		this._renderer = renderer;

		this._container = document.querySelector(containerSelector);
	};

	addItem(item) { 										// метод, который принимает DOM-элемент и добавляет его в контейнер
		this._container.append(item);
	};

	addItemBeginning(item) {
		this._container.prepend(item);
	};

	renderItems(cards) {								// метод, отвечающий за отрисовку всех элементов
			cards.forEach(item => {
					this._renderer(item);
			});
	}

};

export default Section;