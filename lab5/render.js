// Ждем полной загрузки и построения DOM, чтобы все элементы уже существовали в документе
document.addEventListener('DOMContentLoaded', () => {

    // Ищем главный контейнер, в который будем генерировать меню
    const mainContainer = document.getElementById('menu-container');
    // Guard clause: если контейнера нет на странице — молча выходим, чтобы не ловить TypeError
    if (!mainContainer) return;

    // Декларативное описание категорий меню
    const categories = [
        { key: 'soup', title: 'Выберите суп', filters: [{k: 'fish', n: 'рыбный'}, {k: 'meat', n: 'мясной'}, {k: 'veg', n: 'вегетарианский'}] },
        { key: 'main_course', title: 'Выберите главное блюдо', filters: [{k: 'fish', n: 'рыбное'}, {k: 'meat', n: 'мясное'}, {k: 'veg', n: 'вегетарианское'}] },
        { key: 'salad', title: 'Выберите салат или стартер', filters: [{k: 'fish', n: 'рыбный'}, {k: 'meat', n: 'мясной'}, {k: 'veg', n: 'вегетарианский'}] },
        { key: 'drink', title: 'Выберите напиток', filters: [{k: 'cold', n: 'холодный'}, {k: 'hot', n: 'горячий'}] },
        { key: 'dessert', title: 'Выберите десерт', filters: [{k: 'small', n: 'маленькая порция'}, {k: 'medium', n: 'средняя порция'}, {k: 'large', n: 'большая порция'}] }
    ];

    // Для каждой категории строим отдельную секцию
    categories.forEach(category => {
        // Сама секция
        const section = document.createElement('section');

        // Заголовок категории
        const h2 = document.createElement('h2');
        h2.textContent = category.title; // textContent безопасен: без парсинга HTML
        section.appendChild(h2);

        // Контейнер для кнопок-фильтров
        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'filters';

        // Генерируем кнопки фильтра из конфига категории
        category.filters.forEach(f => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'filter-btn';
            btn.dataset.kind = f.k;
            btn.textContent = f.n;
            filtersDiv.appendChild(btn);
        });
        section.appendChild(filtersDiv);

        // Сетка карточек блюд
        const grid = document.createElement('div');
        grid.className = 'dishes-grid';

        // Берем только блюда нужной категории и сортируем по названию
        // localeCompare корректно сортирует кириллицу с учетом локали
        const filteredDishes = dishesData
            .filter(dish => dish.category === category.key)
            .sort((a, b) => a.name.localeCompare(b.name));

        // Создаем карточку для каждого блюда
        filteredDishes.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'dish-card';
            card.setAttribute('data-dish', dish.keyword); // ключ блюда (используется обработчиком клика в другом файле)
            card.setAttribute('data-kind', dish.kind);    // тип блюда (используется фильтром)

            // innerHTML уместен: шаблон статичный, данные из доверенного dishesData
            // (для пользовательских данных использовали бы textContent/createElement — иначе XSS)
            card.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">
                <p class="price">${dish.price}₽</p>
                <p class="name">${dish.name}</p>
                <p class="weight">${dish.count}</p>
                <button type="button" class="add-btn">Добавить</button>
            `;
            grid.appendChild(card);
        });

        // Обработчик фильтров (делегирование на контейнер кнопок)
        filtersDiv.addEventListener('click', (e) => {
            // Реагируем только на клики по кнопкам фильтра
            if (!e.target.classList.contains('filter-btn')) return;

            const clickedBtn = e.target;
            // Запоминаем состояние ДО снятия класса — это даст toggle-поведение
            const isAlreadyActive = clickedBtn.classList.contains('active');

            // Снимаем активность со всех кнопок фильтра этой категории
            filtersDiv.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));

            if (isAlreadyActive) {
                // Повторный клик по активному фильтру = сброс: показываем все карточки
                grid.querySelectorAll('.dish-card').forEach(c => c.style.display = 'flex');
            } else {
                // Активируем кликнутую кнопку и запоминаем выбранный тип
                clickedBtn.classList.add('active');
                const filterKind = clickedBtn.dataset.kind;

                // Показываем только карточки нужного типа, остальные скрываем
                grid.querySelectorAll('.dish-card').forEach(card => {
                    if (card.dataset.kind === filterKind) {
                        card.style.display = 'flex'; // именно flex — под flex/grid-раскладку карточки
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });

        // Собираем секцию: сетка - секция - контейнер
        section.appendChild(grid);
        mainContainer.appendChild(section);
    });
});
