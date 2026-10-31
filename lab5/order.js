// ждем полной загрузки и построения DOM, чтобы все элементы уже существовали в документе
document.addEventListener('DOMContentLoaded', () => {

    const selected = {
        soup: null,        // суп
        main_course: null, // горячее
        salad: null,       // салат
        drink: null,       // напиток
        dessert: null      // десерт
    };

    // Блок-заглушка "ничего не выбрано" и блок с деталями заказа
    const nothingSelected = document.getElementById('nothing-selected');
    const orderDetails = document.getElementById('order-details');

    // Элементы для отображения выбранного блюда по каждой категории
    const summarySoup = document.getElementById('summary-soup');
    const summaryMain = document.getElementById('summary-main');
    const summarySalad = document.getElementById('summary-salad');
    const summaryDrink = document.getElementById('summary-drink');
    const summaryDessert = document.getElementById('summary-dessert');

    // Блок с итоговой суммой и сам текст суммы
    const summaryTotalBlock = document.getElementById('summary-total-block');
    const summaryPrice = document.getElementById('summary-price');

    // Скрытые/видимые поля формы, куда кладем keyword блюда для отправки на сервер
    const inputSoup = document.getElementById('input-soup');
    const inputMain = document.getElementById('input-main');
    const inputSalad = document.getElementById('input-salad');
    const inputDrink = document.getElementById('input-drink');
    const inputDessert = document.getElementById('input-dessert');

    // Событие всплывает от кнопки к body; работает и для динамически добавленных карточек
    document.body.addEventListener('click', (e) => {
        // Реагируем только если клик пришёлся по кнопке "Добавить"
        if (e.target.classList.contains('add-btn')) {

            // Поднимаемся по дереву от кнопки до карточки блюда
            const card = e.target.closest('.dish-card');

            // Берем ключ блюда из data-атрибута data-dish
            const keyword = card.getAttribute('data-dish');

            // Ищем блюдо в глобальном массиве данных по ключу
            const dish = dishesData.find(d => d.keyword === keyword);

            if (dish) {
                // Записываем блюдо в нужную категорию (перезаписываем, если уже было выбрано)
                selected[dish.category] = dish;
                // Перерисовываем интерфейс из обновленного состояния
                updateUI();
            }
        }
    });

    // Полностью перестраивает отображение на основе объекта selected
    function updateUI() {

        // Проверяем, выбран ли хоть один пункт меню
        const hasAny = Object.values(selected).some(val => val !== null);

        // Переключаем видимость: заглушка ↔ детали заказа
        nothingSelected.style.display = hasAny ? 'none' : 'block';
        orderDetails.style.display = hasAny ? 'block' : 'none';

        // --- Суп ---
        // В summary выводим "Название Цена₽" или заглушку; textContent безопасен (без парсинга HTML)
        summarySoup.textContent = selected.soup ? `${selected.soup.name} ${selected.soup.price}₽` : 'Блюдо не выбрано';
        // В поле формы кладём keyword блюда (именно это значение уйдёт на сервер)
        inputSoup.value = selected.soup ? selected.soup.keyword : '';

        // --- Горячее ---
        summaryMain.textContent = selected.main_course ? `${selected.main_course.name} ${selected.main_course.price}₽` : 'Блюдо не выбрано';
        inputMain.value = selected.main_course ? selected.main_course.keyword : '';

        // --- Салат ---
        summarySalad.textContent = selected.salad ? `${selected.salad.name} ${selected.salad.price}₽` : 'Блюдо не выбрано';
        inputSalad.value = selected.salad ? selected.salad.keyword : '';

        // --- Напиток ---
        summaryDrink.textContent = selected.drink ? `${selected.drink.name} ${selected.drink.price}₽` : 'Напиток не выбран';
        inputDrink.value = selected.drink ? selected.drink.keyword : '';

        // --- Десерт ---
        summaryDessert.textContent = selected.dessert ? `${selected.dessert.name} ${selected.dessert.price}₽` : 'Блюдо не выбрано';
        inputDessert.value = selected.dessert ? selected.dessert.keyword : '';

        // Считаем итоговую сумму по выбранным блюдам
        let total = 0;
        Object.values(selected).forEach(item => { if (item) total += item.price; });

        // Показываем блок итога только если сумма > 0
        if (total > 0) {
            summaryTotalBlock.style.display = 'block';
            summaryPrice.textContent = `${total}₽`;
        } else {
            summaryTotalBlock.style.display = 'none';
        }

        // Подсветка активных карточек: синхронизируем визуальное состояние с моделью
        document.querySelectorAll('.dish-card').forEach(card => {
            // Ключ текущей карточки
            const keyword = card.getAttribute('data-dish');

            // Есть ли это блюдо среди выбранных (сравниваем по keyword)
            const isSelected = Object.values(selected).some(item => item && item.keyword === keyword);

            // Добавляем класс active, если выбрано, иначе снимаем
            if (isSelected) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
});
