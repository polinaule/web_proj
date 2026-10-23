document.addEventListener('DOMContentLoaded', () => {
    const categories = [
        { id: 'soups-container', key: 'soup', title: 'Выберите суп' },
        { id: 'mains-container', key: 'main_course', title: 'Выберите главное блюдо' },
        { id: 'drinks-container', key: 'drink', title: 'Выберите напиток' }
    ];

    categories.forEach(category => {
        const container = document.getElementById(category.id);
        if (!container) return;

        const section = document.createElement('section');
        section.innerHTML = `<h2>${category.title}</h2>`;

        const grid = document.createElement('div');
        grid.className = 'dishes-grid';

        // Фильтруем и сортируем по алфавиту
        const filteredDishes = dishesData
            .filter(dish => dish.category === category.key)
            .sort((a, b) => a.name.localeCompare(b.name));

        // Отрисовываем карточки
        filteredDishes.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'dish-card';
            card.setAttribute('data-dish', dish.keyword);
            
            card.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">
                <p class="price">${dish.price}₽</p>
                <p class="name">${dish.name}</p>
                <p class="weight">${dish.count}</p>
                <button type="button" class="add-btn">Добавить</button>
            `;
            grid.appendChild(card);
        });

        section.appendChild(grid);
        container.appendChild(section);
    });
});
