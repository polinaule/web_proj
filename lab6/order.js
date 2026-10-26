document.addEventListener('DOMContentLoaded', () => {
    const selected = {
        soup: null,
        main_course: null,
        salad: null,
        drink: null,
        dessert: null
    };

    const nothingSelected = document.getElementById('nothing-selected');
    const orderDetails = document.getElementById('order-details');
    
    const summarySoup = document.getElementById('summary-soup');
    const summaryMain = document.getElementById('summary-main');
    const summarySalad = document.getElementById('summary-salad');
    const summaryDrink = document.getElementById('summary-drink');
    const summaryDessert = document.getElementById('summary-dessert');
    
    const summaryTotalBlock = document.getElementById('summary-total-block');
    const summaryPrice = document.getElementById('summary-price');

    const inputSoup = document.getElementById('input-soup');
    const inputMain = document.getElementById('input-main');
    const inputSalad = document.getElementById('input-salad');
    const inputDrink = document.getElementById('input-drink');
    const inputDessert = document.getElementById('input-dessert');

    const modalOverlay = document.getElementById('modal-overlay');
    const modalText = document.getElementById('modal-text');
    const modalClose = document.getElementById('modal-close');

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) {
            const card = e.target.closest('.dish-card');
            const keyword = card.getAttribute('data-dish');
            const dish = dishesData.find(d => d.keyword === keyword);
            
            if (dish) {
                selected[dish.category] = dish;
                updateUI();
            }
        }
    });

    function updateUI() {
        const hasAny = Object.values(selected).some(val => val !== null);

        nothingSelected.style.display = hasAny ? 'none' : 'block';
        orderDetails.style.display = hasAny ? 'block' : 'none';

        summarySoup.textContent = selected.soup ? `${selected.soup.name} ${selected.soup.price}₽` : 'Блюдо не выбрано';
        inputSoup.value = selected.soup ? selected.soup.keyword : '';

        summaryMain.textContent = selected.main_course ? `${selected.main_course.name} ${selected.main_course.price}₽` : 'Блюдо не выбрано';
        inputMain.value = selected.main_course ? selected.main_course.keyword : '';

        summarySalad.textContent = selected.salad ? `${selected.salad.name} ${selected.salad.price}₽` : 'Блюдо не выбрано';
        inputSalad.value = selected.salad ? selected.salad.keyword : '';

        summaryDrink.textContent = selected.drink ? `${selected.drink.name} ${selected.drink.price}₽` : 'Напиток не выбран';
        inputDrink.value = selected.drink ? selected.drink.keyword : '';

        summaryDessert.textContent = selected.dessert ? `${selected.dessert.name} ${selected.dessert.price}₽` : 'Блюдо не выбрано';
        inputDessert.value = selected.dessert ? selected.dessert.keyword : '';

        let total = 0;
        Object.values(selected).forEach(item => { if (item) total += item.price; });

        if (total > 0) {
            summaryTotalBlock.style.display = 'block';
            summaryPrice.textContent = `${total}₽`;
        } else {
            summaryTotalBlock.style.display = 'none';
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

    document.getElementById('order-form').addEventListener('submit', function(e) {
        const hasSoup = !!selected.soup;
        const hasMain = !!selected.main_course;
        const hasSalad = !!selected.salad;
        const hasDrink = !!selected.drink;
        const hasDessert = !!selected.dessert;
        
        let errorMsg = null;

        if (!hasSoup && !hasMain && !hasSalad && !hasDrink && !hasDessert) {
            errorMsg = "Ничего не выбрано. Выберите блюда для заказа";
        } 
        else if ((hasSoup || hasMain || hasSalad) && !hasDrink) {
            errorMsg = "Выберите напиток";
        } 
        else if (hasSoup && !hasMain && !hasSalad) {
            errorMsg = "Выберите главное блюдо/салат/стартер";
        } 
        else if (!hasSoup && !hasMain && hasSalad) {
            errorMsg = "Выберите суп или главное блюдо";
        } 
        else if (!hasSoup && !hasMain && !hasSalad) {
            errorMsg = "Выберите главное блюдо";
        }

        if (errorMsg) {
            e.preventDefault();
            showModal(errorMsg);
        }
    });

    function showModal(text) {
        modalText.textContent = text;
        modalOverlay.style.display = 'flex';
    }

    modalClose.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });
});
