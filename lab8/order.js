document.addEventListener('DOMContentLoaded', () => {
    let selected = {
        soup: null, main_course: null, salad: null, drink: null, dessert: null
    };

    const stickyPanel = document.getElementById('sticky-panel');
    const stickyTotal = document.getElementById('sticky-total');
    const checkoutLink = document.getElementById('checkout-link');

    // 1. Сохранение только ID (ключей) в localStorage
    function saveToStorage() {
        const toSave = {
            soup: selected.soup ? selected.soup.keyword : null,
            main_course: selected.main_course ? selected.main_course.keyword : null,
            salad: selected.salad ? selected.salad.keyword : null,
            drink: selected.drink ? selected.drink.keyword : null,
            dessert: selected.dessert ? selected.dessert.keyword : null
        };
        localStorage.setItem('lunchbox_cart', JSON.stringify(toSave));
    }

    // 2. При открытии страницы восстанавливаем выбор пользователя
    function restoreFromStorage() {
        const savedIds = JSON.parse(localStorage.getItem('lunchbox_cart'));
        if (!savedIds) {
            updateUI();
            return;
        }

        // Сопоставляем ключи из localStorage с объектами, пришедшими с API
        Object.keys(savedIds).forEach(category => {
            const keyword = savedIds[category];
            if (keyword) {
                const dish = dishesData.find(d => d.keyword === keyword);
                if (dish) selected[category] = dish;
            }
        });
        
        updateUI();
    }

    // Клик по кнопке "Добавить"
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) {
            const card = e.target.closest('.dish-card');
            const keyword = card.getAttribute('data-dish');
            const dish = dishesData.find(d => d.keyword === keyword);
            
            if (dish) {
                selected[dish.category] = dish;
                saveToStorage();
                updateUI();
            }
        }
    });

    // Обновление интерфейса (сумма, подсветка, состояние панели)
    function updateUI() {
        let total = 0;
        let hasItems = false;

        Object.values(selected).forEach(item => {
            if (item) {
                total += item.price;
                hasItems = true;
            }
        });

        // Панель скрыта, если ничего не выбрано
        if (hasItems) {
            stickyPanel.style.display = 'flex';
            stickyTotal.textContent = `${total}₽`;
        } else {
            stickyPanel.style.display = 'none';
        }

        // Ссылка неактивна, если состав не соответствует комбо
        if (isValidCombo()) {
            checkoutLink.classList.remove('disabled');
        } else {
            checkoutLink.classList.add('disabled');
        }

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

    // Проверка соответствия комбо
    function isValidCombo() {
        const hasSoup = !!selected.soup;
        const hasMain = !!selected.main_course;
        const hasSalad = !!selected.salad;
        const hasDrink = !!selected.drink;

        if (!hasSoup && !hasMain && !hasSalad && !hasDrink) return false;
        if ((hasSoup || hasMain || hasSalad) && !hasDrink) return false;
        if (hasSoup && !hasMain && !hasSalad) return false;
        if (!hasSoup && !hasMain && hasSalad) return false;
        
        return true; 
    }

    // Ждем, пока render.js загрузит данные с API, и только потом восстанавливаем корзину
    const checkInterval = setInterval(() => {
        if (dishesData && dishesData.length > 0) {
            clearInterval(checkInterval);
            restoreFromStorage();
        }
    }, 100);
});
