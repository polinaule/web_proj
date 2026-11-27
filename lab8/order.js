document.addEventListener('DOMContentLoaded', () => {
    // Читаем сохраненный заказ из localStorage
    let selected = JSON.parse(localStorage.getItem('lunchbox_cart')) || {
        soup: null, main_course: null, salad: null, drink: null, dessert: null
    };

    const stickyPanel = document.getElementById('sticky-panel');
    const stickyTotal = document.getElementById('sticky-total');
    const checkoutLink = document.getElementById('checkout-link');

    // Функция сохранения в localStorage (сохраняем ТОЛЬКО ключи)
    function saveToStorage() {
        localStorage.setItem('lunchbox_cart', JSON.stringify(selected));
    }

    // Обработка клика по "Добавить"
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) {
            const card = e.target.closest('.dish-card');
            const keyword = card.getAttribute('data-dish');
            const dish = dishesData.find(d => d.keyword === keyword);
            
            if (dish) {
                // Перезаписываем категорию
                selected[dish.category] = dish;
                saveToStorage();
                updateUI();
            }
        }
    });

    // Обновление интерфейса
    function updateUI() {
        let total = 0;
        let hasItems = false;

        // Проверяем, какие блюда выбраны и считаем сумму
        Object.values(selected).forEach(item => {
            if (item) {
                total += item.price;
                hasItems = true;
            }
        });

        // Управление панелью
        if (hasItems) {
            stickyPanel.style.display = 'flex';
            stickyTotal.textContent = `${total}₽`;
        } else {
            stickyPanel.style.display = 'none';
        }

        // Проверка на соответствие комбо (ЛР6)
        if (isValidCombo()) {
            checkoutLink.classList.remove('disabled');
        } else {
            checkoutLink.classList.add('disabled');
        }

        // Подсветка карточек
        document.querySelectorAll('.dish-card').forEach(card => {
            const keyword = card.getAttribute('data-dish');
            const isSelected = Object.values(selected).some(item => item && item.keyword === keyword);
            if (isSelected) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // Функция проверки валидности комбо (по правилам ЛР6)
    function isValidCombo() {
        const hasSoup = !!selected.soup;
        const hasMain = !!selected.main_course;
        const hasSalad = !!selected.salad;
        const hasDrink = !!selected.drink;

        // Условия валидности (должно совпадать с проверкой в checkout)
        if (!hasSoup && !hasMain && !hasSalad && !hasDrink) return false; // Ничего нет
        if ((hasSoup || hasMain || hasSalad) && !hasDrink) return false; // Нет напитка
        if (hasSoup && !hasMain && !hasSalad) return false; // Только суп
        if (!hasSoup && !hasMain && hasSalad) return false; // Только салат
        
        return true; 
    }

    // При загрузке страницы: восстанавливаем состояние из localStorage
    // (ждем, пока render.js отрисует карточки)
    const checkInterval = setInterval(() => {
        if (dishesData && dishesData.length > 0) {
            clearInterval(checkInterval);
            updateUI();
        }
    }, 100);
});
