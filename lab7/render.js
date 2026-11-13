const myLocalData = [
  { category: "soup", count: "350 г", image: "gazpacho.png", keyword: "gaspacho", kind: "veg", name: "Гаспачо", price: 195 },
  { category: "soup", count: "330 г", image: "mushroomsoup.png", keyword: "mushroom_soup", kind: "veg", name: "Грибной суп-пюре", price: 185 },
  { category: "soup", count: "330 г", image: "norwegiansoup.png", keyword: "norwegian_soup", kind: "fish", name: "Норвежский суп", price: 270 },
  { category: "soup", count: "350 г", image: "fishsoup.png", keyword: "ukha", kind: "fish", name: "Уха", price: 250 },
  { category: "soup", count: "350 г", image: "borscht.png", keyword: "borsch", kind: "meat", name: "Борщ", price: 250 },
  { category: "soup", count: "350 г", image: "chickensoup.png", keyword: "chicken_soup", kind: "meat", name: "Куриный суп", price: 220 },
  { category: "main_course", count: "350 г", image: "chickenbuckwheat.png", keyword: "chicken_buckwheat", kind: "meat", name: "Курица с гречкой", price: 420 },
  { category: "main_course", count: "380 г", image: "salmonrice.png", keyword: "salmon_rice", kind: "fish", name: "Лосось с рисом", price: 590 },
  { category: "main_course", count: "400 г", image: "pastavegetables.png", keyword: "pasta_vegetables", kind: "veg", name: "Паста с овощами", price: 380 },
  { category: "main_course", count: "420 г", image: "beefpotatoes.png", keyword: "beef_potatoes", kind: "meat", name: "Говядина с картофелем", price: 520 },
  { category: "main_course", count: "280 г", image: "tunasalad.png", keyword: "tuna_salad_main", kind: "fish", name: "Салат с тунцом", price: 350 },
  { category: "main_course", count: "300 г", image: "vegetablesauce.png", keyword: "veg_ragu", kind: "veg", name: "Овощное рагу", price: 210 },
  { category: "salad", count: "250 г", image: "tunasalad.png", keyword: "tuna_salad_real", kind: "fish", name: "Салат с тунцом", price: 350 },
  { category: "salad", count: "250 г", image: "caesarchicken.png", keyword: "caesar_chicken", kind: "meat", name: "Цезарь с курицей", price: 320 },
  { category: "salad", count: "200 г", image: "olivier.png", keyword: "olivier", kind: "meat", name: "Оливье", price: 220 },
  { category: "salad", count: "220 г", image: "avocadosalad.png", keyword: "avocado_salad", kind: "veg", name: "Салат с авокадо", price: 280 },
  { category: "salad", count: "230 г", image: "greeksalad.png", keyword: "greek_salad", kind: "veg", name: "Греческий салат", price: 290 },
  { category: "salad", count: "200 г", image: "vitaminsalad.png", keyword: "vitamin_salad", kind: "veg", name: "Витаминный салат", price: 200 },
  { category: "drink", count: "300 мл", image: "orangejuice.png", keyword: "orange_juice", kind: "cold", name: "Апельсиновый сок", price: 120 },
  { category: "drink", count: "300 мл", image: "applejuice.png", keyword: "apple_juice", kind: "cold", name: "Яблочный сок", price: 90 },
  { category: "drink", count: "300 мл", image: "carrotjuice.png", keyword: "carrot_juice", kind: "cold", name: "Морковный сок", price: 110 },
  { category: "drink", count: "300 мл", image: "cappuccino.png", keyword: "cappuccino", kind: "hot", name: "Капучино", price: 300 },
  { category: "drink", count: "300 мл", image: "greentea.png", keyword: "green_tea", kind: "hot", name: "Зеленый чай", price: 90 },
  { category: "drink", count: "300 мл", image: "blacktea.png", keyword: "black_tea", kind: "hot", name: "Черный чай", price: 90 },
  { category: "dessert", count: "50 г", image: "macaron.png", keyword: "macaron", kind: "small", name: "Макарон", price: 150 },
  { category: "dessert", count: "80 г", image: "eclair.png", keyword: "eclair", kind: "small", name: "Эклер", price: 120 },
  { category: "dessert", count: "100 г", image: "potatocake.png", keyword: "potato_cake", kind: "small", name: "Пирожное Картошка", price: 220 },
  { category: "dessert", count: "150 г", image: "tiramisu.png", keyword: "tiramisu", kind: "medium", name: "Тирамису", price: 240 },
  { category: "dessert", count: "160 г", image: "cheesecacke.png", keyword: "cheesecake", kind: "medium", name: "Чизкейк", price: 270 },
  { category: "dessert", count: "250 г", image: "chocolatecake.png", keyword: "chocolate_cake", kind: "large", name: "Шоколадный торт", price: 380 }
];

let dishesData = [];
// токен
const API_TOKEN = '670307b2-e7c6-351b-8b00-f70419a78b45';
const API_BASE_URL = 'https://web-basics-api-gashagaggy.msk1.amvera.tech';
const API_URL = `https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api/dishes/my?api_key=${API_TOKEN}`;

async function loadDishes() {
    try {
        console.log("Делаем запрос к API...");
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Проверяем, прислал ли сервер блюда
        const isCorrectData = data && data.some(d => d.keyword === 'gaspacho');

        if (isCorrectData) {
            console.log("Данные получены с API! Подставляем локальные картинки по ключу.");
            
            // Сопоставляем данные с сервера с локальными картинками
            dishesData = data.map(apiDish => {
                const localDish = myLocalData.find(d => d.keyword === apiDish.keyword);
                return {
                    ...apiDish,
                    // Если локальное совпадение — берем правильный файл. Если нет — ставим заглушку.
                    image: localDish ? localDish.image : `https://placehold.co/400x400/f9f6f3/79553d?text=${encodeURIComponent(apiDish.name)}`
                };
            });
        } else {
            console.warn("API вернул неправильные данные. Берем локальный массив.");
            dishesData = myLocalData;
        }
    } catch (error) {
        console.error("Ошибка API:", error);
        dishesData = myLocalData;
    }
    
    renderMenu();
}

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
            
            const placeholder = `https://placehold.co/400x400/f9f6f3/79553d?text=${encodeURIComponent(dish.name)}`;
            
            card.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}" onerror="this.onerror=null; this.src='${placeholder}';">
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
                    card.style.display = (card.dataset.kind === filterKind) ? 'flex' : 'none';
                });
            }
        });

        section.appendChild(grid);
        mainContainer.appendChild(section);
    });
}

document.addEventListener('DOMContentLoaded', loadDishes);
