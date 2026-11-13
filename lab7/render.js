let dishesData = [];

const API_TOKEN = '670307b2-e7c6-351b-8b00-f70419a78b45';
const API_BASE_URL = 'https://web-basics-api-gagashaggy.msk1.amvera.tech';
const API_URL = `${API_BASE_URL}/labs/api/dishes/default?api_key=${API_TOKEN}`;

async function loadDishes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        
        const data = await response.json();
        dishesData = data; 
        renderMenu();
    } catch (error) {
        console.error("Ошибка загрузки:", error);
        alert("Не удалось загрузить меню.");
    }
}

function renderMenu() {
    const mainContainer = document.getElementById('menu-container');
    if (!mainContainer) return;
    mainContainer.innerHTML = '';

    const categories = [
        { keys: ['soup'], title: 'Выберите суп', filters: [{k: 'fish', n: 'рыбный'}, {k: 'meat', n: 'мясной'}, {k: 'veg', n: 'вегетарианский'}] },
        { keys: ['main_course', 'main'], title: 'Выберите главное блюдо', filters: [{k: 'fish', n: 'рыбное'}, {k: 'meat', n: 'мясное'}, {k: 'veg', n: 'вегетарианское'}] },
        { keys: ['salad'], title: 'Выберите салат или стартер', filters: [{k: 'fish', n: 'рыбный'}, {k: 'meat', n: 'мясной'}, {k: 'veg', n: 'вегетарианский'}] },
        { keys: ['drink'], title: 'Выберите напиток', filters: [{k: 'cold', n: 'холодный'}, {k: 'hot', n: 'горячий'}] },
        { keys: ['dessert'], title: 'Выберите десерт', filters: [{k: 'small', n: 'маленькая'}, {k: 'medium', n: 'средняя'}, {k: 'large', n: 'большая'}] }
    ];

    categories.forEach(category => {
        const section = document.createElement('section');
        const h2 = document.createElement('h2');
        h2.textContent = category.title;
        section.appendChild(h2);

        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'filters';
        category.filters.forEach(f => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'filter-btn';
            btn.dataset.kind = f.k;
            btn.textContent = f.n;
            filtersDiv.appendChild(btn);
        });
        section.appendChild(filtersDiv);

        const grid = document.createElement('div');
        grid.className = 'dishes-grid';

        const filteredDishes = dishesData
            .filter(dish => category.keys.includes(dish.category))
            .sort((a, b) => a.name.localeCompare(b.name));

        filteredDishes.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'dish-card';
            card.setAttribute('data-dish', dish.keyword);
            card.setAttribute('data-kind', dish.kind);
            
            // --- ФИКС КАРТИНОК ---
            let imgUrl = dish.image || '';
            // Если ссылка относительная (без http), добавляем домен API
            if (imgUrl && !imgUrl.startsWith('http')) {
                imgUrl = API_BASE_URL + (imgUrl.startsWith('/') ? '' : '/') + imgUrl;
            }
            // Меняем http на https
            imgUrl = imgUrl.replace('http://', 'https://');
            
            // Локальная картинка на случай, если серверная не загрузится
            const localFallback = `${dish.keyword}.png`; 
            const placeholder = `https://placehold.co/400x400/f9f6f3/79553d?text=${encodeURIComponent(dish.name)}`;
            
            card.innerHTML = `
                <img src="${imgUrl}" alt="${dish.name}" 
                     onerror="this.onerror=null; this.src='${localFallback}'; this.onerror=function(){this.src='${placeholder}'};">
                <p class="price">${dish.price}₽</p>
                <p class="name">${dish.name}</p>
                <p class="weight">${dish.count}</p>
                <button type="button" class="add-btn">Добавить</button>
            `;
            grid.appendChild(card);
        });

        filtersDiv.addEventListener('click', (e) => {
            if (!e.target.classList.contains('filter-btn')) return;
            const clickedBtn = e.target;
            const isAlreadyActive = clickedBtn.classList.contains('active');
            
            filtersDiv.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            
            if (isAlreadyActive) {
                grid.querySelectorAll('.dish-card').forEach(c => c.style.display = 'flex');
            } else {
                clickedBtn.classList.add('active');
                const filterKind = clickedBtn.dataset.kind;
                grid.querySelectorAll('.dish-card').forEach(c => {
                    c.style.display = (c.dataset.kind === filterKind) ? 'flex' : 'none';
                });
            }
        });

        section.appendChild(grid);
        mainContainer.appendChild(section);
    });
}

document.addEventListener('DOMContentLoaded', loadDishes);
