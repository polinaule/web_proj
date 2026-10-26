const dishesData = [
    // --- СУПЫ (6 шт: 2 рыбы, 2 мяса, 2 вег) ---
    { keyword: 'gaspacho', name: 'Гаспачо', price: 195, category: 'soup', count: '350 г', image: 'gazpacho.png', kind: 'veg' },
    { keyword: 'mushroom_soup', name: 'Грибной суп-пюре', price: 185, category: 'soup', count: '330 г', image: 'mushroomsoup.png', kind: 'veg' },
    { keyword: 'norwegian_soup', name: 'Норвежский суп', price: 270, category: 'soup', count: '330 г', image: 'norwegiansoup.png', kind: 'fish' },
    { keyword: 'ukha', name: 'Уха', price: 250, category: 'soup', count: '350 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Уха', kind: 'fish' },
    { keyword: 'borsch', name: 'Борщ', price: 250, category: 'soup', count: '350 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Борщ', kind: 'meat' },
    { keyword: 'chicken_soup', name: 'Куриный суп', price: 220, category: 'soup', count: '350 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Куриный+суп', kind: 'meat' },

    // --- ГЛАВНЫЕ БЛЮДА (6 шт: 2 рыбы, 2 мяса, 2 вег) ---
    { keyword: 'chicken_buckwheat', name: 'Курица с гречкой', price: 420, category: 'main_course', count: '350 г', image: 'chickenbuckwheat.png', kind: 'meat' },
    { keyword: 'salmon_rice', name: 'Лосось с рисом', price: 590, category: 'main_course', count: '380 г', image: 'salmonrice.png', kind: 'fish' },
    { keyword: 'pasta_vegetables', name: 'Паста с овощами', price: 380, category: 'main_course', count: '400 г', image: 'pastavegetables.png', kind: 'veg' },
    { keyword: 'beef_potatoes', name: 'Говядина с картофелем', price: 520, category: 'main_course', count: '420 г', image: 'beefpotatoes.png', kind: 'meat' },
    { keyword: 'tuna_salad', name: 'Салат с тунцом', price: 350, category: 'main_course', count: '280 г', image: 'tunasalad.png', kind: 'fish' },
    { keyword: 'veg_ragu', name: 'Овощное рагу', price: 210, category: 'main_course', count: '300 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Рагу', kind: 'veg' },

    // --- САЛАТЫ И СТАРТЕРЫ (6 шт: 1 рыба, 1 мясо, 4 вег) ---
    { keyword: 'tuna_salad_real', name: 'Салат с тунцом', price: 350, category: 'salad', count: '250 г', image: 'tunasalad.png', kind: 'fish' },
    { keyword: 'caesar_chicken', name: 'Цезарь с курицей', price: 320, category: 'salad', count: '250 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Цезарь', kind: 'meat' },
    { keyword: 'olivier', name: 'Оливье', price: 220, category: 'salad', count: '200 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Оливье', kind: 'veg' },
    { keyword: 'avocado_salad', name: 'Салат с авокадо', price: 280, category: 'salad', count: '220 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Авокадо', kind: 'veg' },
    { keyword: 'greek_salad', name: 'Греческий салат', price: 290, category: 'salad', count: '230 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Греческий', kind: 'veg' },
    { keyword: 'vitamin_salad', name: 'Витаминный салат', price: 200, category: 'salad', count: '200 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Витаминный', kind: 'veg' },

    // --- НАПИТКИ (6 шт: 3 холодных, 3 горячих) ---
    { keyword: 'orange_juice', name: 'Апельсиновый сок', price: 120, category: 'drink', count: '300 мл', image: 'orangejuice.jpg', kind: 'cold' },
    { keyword: 'apple_juice', name: 'Яблочный сок', price: 90, category: 'drink', count: '300 мл', image: 'applejuice.jpg', kind: 'cold' },
    { keyword: 'carrot_juice', name: 'Морковный сок', price: 110, category: 'drink', count: '300 мл', image: 'carrotjuice.png', kind: 'cold' },
    { keyword: 'cappuccino', name: 'Капучино', price: 180, category: 'drink', count: '300 мл', image: 'https://placehold.co/400x400/f0f0f0/333?text=Капучино', kind: 'hot' },
    { keyword: 'green_tea', name: 'Зеленый чай', price: 90, category: 'drink', count: '300 мл', image: 'https://placehold.co/400x400/f0f0f0/333?text=Зелёный+чай', kind: 'hot' },
    { keyword: 'black_tea', name: 'Черный чай', price: 90, category: 'drink', count: '300 мл', image: 'https://placehold.co/400x400/f0f0f0/333?text=Чёрный+чай', kind: 'hot' },

    // --- ДЕСЕРТЫ (6 шт: 3 маленьких, 2 средних, 1 большой) ---
    { keyword: 'macaron', name: 'Макарон', price: 150, category: 'dessert', count: '50 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Макарон', kind: 'small' },
    { keyword: 'eclair', name: 'Эклер', price: 120, category: 'dessert', count: '80 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Эклер', kind: 'small' },
    { keyword: 'potato_cake', name: 'Пирожное "Картошка"', price: 220, category: 'dessert', count: '100 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Пирожное', kind: 'small' },
    { keyword: 'tiramisu', name: 'Тирамису', price: 240, category: 'dessert', count: '150 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Тирамису', kind: 'medium' },
    { keyword: 'cheesecake', name: 'Чизкейк', price: 270, category: 'dessert', count: '160 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Чизкейк', kind: 'medium' },
    { keyword: 'chocolate_cake', name: 'Шоколадный торт', price: 380, category: 'dessert', count: '250 г', image: 'https://placehold.co/400x400/f0f0f0/333?text=Торт', kind: 'large' }
];
