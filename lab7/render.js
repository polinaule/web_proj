// Глобальная переменная, куда загрузятся данные с API
let dishesData = [];

// токен из задания
const API_TOKEN = '670307b2-e7c6-351b-8b00-f70419a78b45';
const API_BASE_URL = 'https://web-basics-api-gagashaggy.msk1.amvera.tech';
const API_URL = `${API_BASE_URL}/labs/api/dishes/default?api_key=${API_TOKEN}`;

// 1. Функция загрузки данных
async function loadDishes() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        
        const data = await response.json();
        dishesData = data; 
        
        renderMenu();
        
    } catch (error) {
        console.error("Не удалось загрузить блюда:", error);
        alert("Не удалось загрузить меню. Проверьте интернет или токен.");
    }
}

// 2. Функция отрисовки
function renderMenu() {
    const mainContainer = document.getElementById('menu-container');
    if (!mainContainer) return;
    
    mainContainer.innerHTML = '';

    const categories = [
        { key: 'soup', title: 'Выберите суп', filters: [{k: 'fish', n: 'рыбный'}, {k: 'meat', n: 'мясной'}, {k: 'veg', n: 'вегетарианский'}] },
        { key: 'main_course', title: 'Выберите главное блюдо', filters: [{k: 'fish', n: 'рыбное'}, {k: 'meat', n: 'мясное'}, {k: 'veg', n: 'вегетарианское'}] },
        { key: 'salad', title: 'Выберите салат или стартер', filters: [{k: 'fish', n: 'рыбный'}, {k: 'meat', n: 'мясной'}, {k: 'veg', n: 'вегетарианский'}] },
        { key: 'drink', title: 'Выберите напиток', filters: [{k: 'cold', n: 'холодный'}, {k: 'hot', n: 'горячий'}] },
        { key: 'dessert', title: 'Выберите десерт', filters: [{k: 'small', n: 'маленькая порция'}, {k: 'medium', n: 'средняя порция'}, {k: 'large', n: 'большая порция'}] }
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
            .filter(dish => dish.category === category.key)
            .sort((a, b) => a.name.localeCompare(b.name));

        filteredDishes.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'dish-card';
            card.setAttribute('data-dish', dish.keyword);
            card.setAttribute('data-kind', dish.kind);
            
            // --- ЛОГИКА БЕЗОПАСНОЙ ЗАГРУЗКИ КАРТИНКИ ---
            let imageUrl = dish.image || '';
            if (!imageUrl.startsWith('http')) {
                imageUrl = API_BASE_URL + (imageUrl.startsWith('/') ? '' : '/') + imageUrl;
            }
            imageUrl = imageUrl.replace('http://', 'https://');

            // Если с сервера картинка не придет, она попробует загрузить локальную (dish.keyword.png)
            // Если и локальной нет, покажет заглушку
            const fallbackLocal = `${dish.keyword}.png`;
            const fallbackPlaceholder = `https://placehold.co/400x400/f0f0f0/333?text=${encodeURIComponent(dish.name)}`;

            card.innerHTML = `
                <img src="${imageUrl}" alt="${dish.name}" 
                     onerror="this.onerror=null; this.src='${fallbackLocal}'; this.onerror=function(){this.src='${fallbackPlaceholder}'};">
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
                
                grid.querySelectorAll('.dish-card').forEach(card => {
                    if (card.dataset.kind === filterKind) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });

        section.appendChild(grid);
        mainContainer.appendChild(section);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadDishes();
});
