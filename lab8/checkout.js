document.addEventListener('DOMContentLoaded', async () => {
    const API_TOKEN = '670307b2-e7c6-351b-8b00-f70419a78b45';
    const API_URL = `https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api/dishes/my?api_key=${API_TOKEN}`;
    const ORDER_URL = `https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api/orders?api_key=${API_TOKEN}`;

    const orderContents = document.getElementById('order-contents');

    let allDishes = [];
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Ошибка сервера');
        allDishes = await response.json();
    } catch (e) {
        console.error("Ошибка загрузки:", e);
        // Выводим ошибку на страницу, чтобы она не была пустой
        orderContents.innerHTML = `<p style="color:red; text-align:center; grid-column: 1/-1; font-size: 20px;">Не удалось загрузить данные с сервера. Проверьте интернет.</p>`;
        return;
    }

    // Получаем корзину
    let cart = JSON.parse(localStorage.getItem('lunchbox_cart')) || {
        soup: null, main_course: null, salad: null, drink: null, dessert: null
    };

    // 3. Отрисовка карточек состава заказа
    function renderOrder() {
        orderContents.innerHTML = '';
        let hasItems = false;

        Object.keys(cart).forEach(category => {
            const dishId = cart[category];
            if (!dishId) return;

            const dish = allDishes.find(d => d.keyword === dishId);
            if (!dish) return;

            hasItems = true;
            const card = document.createElement('div');
            card.className = 'dish-card';
            card.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}" onerror="this.src='https://placehold.co/400x400/f9f6f3/79553d?text=${encodeURIComponent(dish.name)}';">
                <p class="price">${dish.price}₽</p>
                <p class="name">${dish.name}</p>
                <p class="weight">${dish.count}</p>
                <button type="button" class="remove-btn" data-category="${category}" style="background:#f1eee9; color:#b03f35; border:1px solid #b03f35; font-weight:700;">Удалить</button>
            `;
            orderContents.appendChild(card);
        });

        if (!hasItems) {
            orderContents.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #fff; border-radius: 20px;">
                    <p style="font-size: 20px; margin-bottom: 20px;">Ничего не выбрано. Чтобы добавить блюда в заказ, перейдите на страницу <a href="order.html" style="color: #b03f35; font-weight: 700;">Собрать ланч</a>.</p>
                </div>
            `;
        }
        updateFormSummary();
    }

    // 4. Обновление блока "Оформление заказа"
    function updateFormSummary() {
        let total = 0;
        const summaryMap = {
            soup: { id: 'summary-soup', text: 'Не выбран' },
            main_course: { id: 'summary-main', text: 'Не выбрано' },
            salad: { id: 'summary-salad', text: 'Не выбран' },
            drink: { id: 'summary-drink', text: 'Не выбран' },
            dessert: { id: 'summary-dessert', text: 'Не выбран' }
        };

        Object.keys(summaryMap).forEach(category => {
            const dishId = cart[category];
            const el = document.getElementById(summaryMap[category].id);
            
            if (dishId) {
                const dish = allDishes.find(d => d.keyword === dishId);
                if (dish) {
                    el.textContent = `${dish.name} ${dish.price}₽`;
                    total += dish.price;
                }
            } else {
                el.textContent = summaryMap[category].text;
            }
        });

        document.getElementById('summary-price').textContent = `${total}₽`;
    }

    // 5. Удаление блюда
    orderContents.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const category = e.target.getAttribute('data-category');
            cart[category] = null;
            localStorage.setItem('lunchbox_cart', JSON.stringify(cart));
            renderOrder();
        }
    });

    // 6. Отправка формы
    const form = document.getElementById('checkout-form');
    
    // Управление временем доставки
    const deliveryTypeInputs = document.querySelectorAll('input[name="delivery_type"]');
    const deliveryTimeInput = document.getElementById('delivery_time');
    
    deliveryTypeInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (document.getElementById('asap').checked) {
                deliveryTimeInput.value = '';
                deliveryTimeInput.required = false;
            } else {
                deliveryTimeInput.required = true;
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Валидация (ЛР6)
        const hasSoup = !!cart.soup;
        const hasMain = !!cart.main_course;
        const hasSalad = !!cart.salad;
        const hasDrink = !!cart.drink;

        let errorMsg = null;
        if (!hasSoup && !hasMain && !hasSalad && !hasDrink && !cart.dessert) errorMsg = "Ничего не выбрано.";
        else if (hasSoup && !hasMain && !hasSalad) errorMsg = "Выберите главное блюдо/салат/стартер";
        else if (!hasSoup && !hasMain && hasSalad) errorMsg = "Выберите суп или главное блюдо";
        else if ((hasSoup || hasMain || hasSalad) && !hasDrink) errorMsg = "Выберите напиток";
        else if (!hasSoup && !hasMain && !hasSalad) errorMsg = "Выберите главное блюдо";

        if (errorMsg) {
            alert(errorMsg);
            return;
        }

        // Сбор данных
        const formData = new FormData(form);
        const data = {
            full_name: formData.get('full_name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            delivery_address: formData.get('delivery_address'),
            delivery_type: formData.get('delivery_type'),
            comment: formData.get('comment') || null,
            soup_id: cart.soup ? allDishes.find(d => d.keyword === cart.soup)?.id : null,
            main_course_id: cart.main_course ? allDishes.find(d => d.keyword === cart.main_course)?.id : null,
            salad_id: cart.salad ? allDishes.find(d => d.keyword === cart.salad)?.id : null,
            drink_id: cart.drink ? allDishes.find(d => d.keyword === cart.drink)?.id : null,
            dessert_id: cart.dessert ? allDishes.find(d => d.keyword === cart.dessert)?.id : null,
            subscribe: 0 // По умолчанию
        };

        if (data.delivery_type === 'by_time') {
            data.delivery_time = formData.get('delivery_time');
        }

        try {
            const response = await fetch(ORDER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Ошибка сервера');

            alert("Заказ успешно оформлен!");
            localStorage.removeItem('lunchbox_cart');
            window.location.href = 'index.html';

        } catch (error) {
            console.error(error);
            alert("Не удалось оформить заказ. Попробуйте позже.");
        }
    });

    renderOrder();
});
