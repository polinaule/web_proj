document.addEventListener('DOMContentLoaded', () => {
    // Объект для хранения выбранных блюд
    const selected = {
        soup: null,
        main_course: null,
        drink: null
    };

    const orderSummaryBox = document.getElementById('order-summary-box');
    const nothingSelected = document.getElementById('nothing-selected');
    const orderDetails = document.getElementById('order-details');
    
    const summarySoup = document.getElementById('summary-soup');
    const summaryMain = document.getElementById('summary-main');
    const summaryDrink = document.getElementById('summary-drink');
    const summaryTotalBlock = document.getElementById('summary-total-block');
    const summaryPrice = document.getElementById('summary-price');

    const inputSoup = document.getElementById('input-soup');
    const inputMain = document.getElementById('input-main');
    const inputDrink = document.getElementById('input-drink');

    // Делегирование событий клика по кнопкам "Добавить"
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) {
            const card = e.target.closest('.dish-card');
            const keyword = card.getAttribute('data-dish');
            
            // Находим блюдо в массиве по data-атрибуту
            const dish = dishesData.find(d => d.keyword === keyword);
            
            if (dish) {
                selected[dish.category] = dish;
                updateUI();
            }
        }
    });

    function updateUI() {
        const hasAny = selected.soup || selected.main_course || selected.drink;

        // Показываем/скрываем общий блок
        nothingSelected.style.display = hasAny ? 'none' : 'block';
        orderDetails.style.display = hasAny ? 'block' : 'none';

        // Обновляем категории
        summarySoup.textContent = selected.soup ? `${selected.soup.name} ${selected.soup.price}₽` : 'Блюдо не выбрано';
        inputSoup.value = selected.soup ? selected.soup.keyword : '';

        summaryMain.textContent = selected.main_course ? `${selected.main_course.name} ${selected.main_course.price}₽` : 'Блюдо не выбрано';
        inputMain.value = selected.main_course ? selected.main_course.keyword : '';

        summaryDrink.textContent = selected.drink ? `${selected.drink.name} ${selected.drink.price}₽` : 'Напиток не выбран';
        inputDrink.value = selected.drink ? selected.drink.keyword : '';

        // Считаем итоговую стоимость
        let total = 0;
        if (selected.soup) total += selected.soup.price;
        if (selected.main_course) total += selected.main_course.price;
        if (selected.drink) total += selected.drink.price;

        if (total > 0) {
            summaryTotalBlock.style.display = 'block';
            summaryPrice.textContent = `${total}₽`;
        } else {
            summaryTotalBlock.style.display = 'none';
        }

        // Подсветка активных карточек
        document.querySelectorAll('.dish-card').forEach(card => {
            const keyword = card.getAttribute('data-dish');
            const isSelected = 
                (selected.soup && selected.soup.keyword === keyword) ||
                (selected.main_course && selected.main_course.keyword === keyword) ||
                (selected.drink && selected.drink.keyword === keyword);

            if (isSelected) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
});
