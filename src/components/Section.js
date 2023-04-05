// Создаем класс отрисовки элементов на странице (как базового набора карточек, так и новых)

class Section{
	constructor({ items, renderer }, containerSelector) {
		this._renderedItems = items;
		this._renderer = renderer;

		this._container = document.querySelector(containerSelector);
	};

	addItem(item) { 												// метод, который принимает DOM-элемент и добавляет его в контейнер
		this._container.append(item);
	};

	renderItems() {														// метод, отвечающий за отрисовку всех элементов
		this._renderedItems.forEach((item) => {
			this._renderer(item);
		});
	};

};


export default Section;