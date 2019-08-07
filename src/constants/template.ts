const drinkId = 'drink';
const drinkName = 'Drink';
const drinkOptions = [
  {
    'id': 'cokeClassic',
    'name': 'Coca Cola Classic',
    'price': 1.29,
    'cal': 140,
  },
  {
    'id': 'cokeZero',
    'name': 'Coca Cola Zero',
    'price': 1.29,
    'cal': 0,
  },
  {
    'id': 'cokeDiet',
    'name': 'Coca Cola Diet',
    'price': 1.29,
    'cal': 0,
  },
  {
    'id': 'brio',
    'name': 'Brio',
    'price': 1.29,
    'cal': 160,
  },
  {
    'id': 'fanta',
    'name': 'Fanta Orange',
    'price': 1.29,
    'cal': 150,
  },
  {
    'id': 'canadaDry',
    'name': 'Canada Dry',
    'price': 1.29,
    'cal': 130,
  },
  {
    'id': 'sprite',
    'name': 'Sprite',
    'price': 1.29,
    'cal': 140,
  },
  {
    'id': 'barqRootbeer',
    'name': 'Barqs Root Beer',
    'price': 1.29,
    'cal': 150,
  },
  {
    'id': 'nestea',
    'name': 'Nestea Iced Tea',
    'price': 1.29,
    'cal': 140,
  },
  {
    'id': 'whiteMilk',
    'name': 'White Milk',
    'price': 2.09,
    'cal': 160,
  },
  {
    'id': 'chocoMilk',
    'name': 'Chocolate Milk',
    'price': 2.09,
    'cal': 190,
  },
  {
    'id': 'water',
    'name': 'Dasani Bottled Water',
    'price': 1.99,
    'cal': 0,
  },
];
const pizzaDrinkOption = {
  'id': drinkId,
  'name': drinkName,
  'type': 'multiple',
  'rules': {
    'required': true,
    'minNum': 1,
    'maxNum': 2,
  },
  'options': drinkOptions,
};
const sauceId = 'sauce';
const sauceName = 'Sauce';
const sauceOptions = [
  {
    'id': 'blueCheese',
    'name': 'Blue Cheese',
    'price': 0.89,
    'cal': 200,
  },
  {
    'id': 'buffaloBlueCheese',
    'name': 'Buffalo Blue Cheese',
    'price': 0.89,
    'cal': 160,
  },
  {
    'id': 'cheddarJalapeno',
    'name': 'Cheddar Jalapeno',
    'price': 0.89,
    'cal': 150,
  },
  {
    'id': 'creamyDill',
    'name': 'Creamy Dill',
    'price': 0.89,
    'cal': 200,
  },
  {
    'id': 'creamyGarlic',
    'name': 'Creamy Garlic',
    'price': 0.89,
    'cal': 350,
  },
  {
    'id': 'honeyGarlic',
    'name': 'Honey Garlic',
    'price': 0.89,
    'cal': 70,
  },
  {
    'id': 'honeyMustard',
    'name': 'Honey Mustard',
    'price': 0.89,
    'cal': 190,
  },
  {
    'id': 'hot',
    'name': 'Franks Red Hot Sauce',
    'price': 0.89,
    'cal': 10,
  },
  {
    'id': 'marinara',
    'name': 'Italian Marinara',
    'price': 0.89,
    'cal': 25,
  },
  {
    'id': 'mild',
    'name': 'Mild Sauce',
    'price': 0.89,
    'cal': 50,
  },
  {
    'id': 'ranch',
    'name': 'Peppercorn Ranch',
    'price': 0.89,
    'cal': 220,
  },
  {
    'id': 'srirachaGarlic',
    'name': 'Sriracha Creamy Garlic',
    'price': 0.89,
    'cal': 170,
  },
  {
    'id': 'sweetChiliThai',
    'name': 'Sweet Chili Thai',
    'price': 0.89,
    'cal': 80,
  },
  {
    'id': 'bbq',
    'name': 'Texas BBQ (Contains Gluten)',
    'price': 0.89,
    'cal': 70,
  },
];
const pizzaSauceOption = {
  'id': sauceId,
  'name': sauceName,
  'type': 'multiple',
  'rules': {
    'required': false,
  },
  'options': sauceOptions,
};
const sizeOption = (smallPrice: number, mediumPrice: number, largePrice: number, xlPrice: number) => {
  return {
    'id': 'size',
    'name': 'Size of Pizza',
    'type': 'single',
    'rules': {
      'required': true,
    },
    'options': [{
      'id': 'small',
      'name': 'Small',
      'price': smallPrice,
      'cal': '',
    },
      {
        'id': 'medium',
        'name': 'Medium',
        'price': mediumPrice,
        'cal': '',
      },
      {
        'id': 'large',
        'name': 'Large',
        'price': largePrice,
        'cal': '',
      },
      {
        'id': 'xlarge',
        'name': 'Extra Large',
        'price': xlPrice,
        'cal': '',
      },
    ],
  };
};

const pizza_staples = {
  'id': 'chickenBruschetta',
  'briefDetail': {
    'pic': 'pizzaChickenBruschetta.png',
    'name': 'Chicken Bruschetta',
    'desc': 'Topped with grilled chicken, roasted garlic, Italiano blend seasoning, bruschetta, parmesan and mozzarella. A little taste of Italy.',
    'cal': '200-270 Cal/slice',
    'price': 14.49,
  },
  'options': [
    {
      'id': 'size',
      'name': 'size',
      'type': 'single',
      'rules': {
        'required': true,
      },
      'options': [{
        'id': 'small',
        'name': 'Small',
        'price': 0,
        'cal': '',
      },
        {
          'id': 'medium',
          'name': 'Medium',
          'price': 2,
          'cal': '',
        },
        {
          'id': 'large',
          'name': 'Large',
          'price': 4.5,
          'cal': '',
        },
        {
          'id': 'xlarge',
          'name': 'Extra Large',
          'price': 8.1,
          'cal': '',
        },
      ],
    },
    pizzaSauceOption,
    pizzaDrinkOption,
  ],
};


export const pizzaPizzaTemplate = {
  'data': {
    'menuPage': {
      'details': [
        {
          'category': 'Pizza',
          'foodOptions': [
            {
              'id': 'chickenBruschetta',
              'briefDetail': {
                'pic': 'pizzaChickenBruschetta.png',
                'name': 'Chicken Bruschetta',
                'desc': 'Topped with grilled chicken, roasted garlic, Italiano blend seasoning, bruschetta, parmesan and mozzarella. A little taste of Italy.',
                'price': 14.49,
              },
              'options': [
                sizeOption(0, 2, 4.5, 8.1),
                pizzaSauceOption,
                pizzaDrinkOption,
              ],

            },
            {
              'id': 'canadian',
              'briefDetail': {
                'pic': 'pizzaCanadian.png',
                'name': 'Canadian Eh!',
                'desc': 'Topped with classic pepperoni, fresh mushrooms, bacon crumble and mozzarella cheese. Made by a proudly Canadian company. Tip: Try with cheddar jalapeno dipping sauce.',
                'price': 11.99,
              },
              'options': [
                sizeOption(0, 2, 4.5, 8.1),
                pizzaSauceOption,
                pizzaDrinkOption,
              ],
            },
            {
              'id': 'hawaiian',
              'briefDetail': {
                'pic': 'pizzaHawaiian.png',
                'name': 'Tropical Hawaiian',
                'desc': 'Topped with pineapples, bacon crumble, bacon strips, and mozzarella cheese.',
                'price': 12.99,
              },
              'options': [
                sizeOption(0, 2, 4.5, 8.1),
                pizzaSauceOption,
                pizzaDrinkOption,
              ],
            },
            {
              'id': 'pepperoni',
              'briefDetail': {
                'pic': 'pizzaPepperoni.png',
                'name': 'Pepperoni',
                'desc': 'A classic fave. Tip: try it with a dip. ',
                'price': 8.99,
              },
              'options': [
                sizeOption(0, 2, 4.5, 8.1),
                pizzaSauceOption,
                pizzaDrinkOption,
              ],
            },
            {
              'id': 'meatSupreme',
              'briefDetail': {
                'pic': 'pizzaMeatSupreme.png',
                'name': 'Meat Supreme',
                'desc': 'Topped with classic pepperoni, bacon crumble, salami, spicy Italian sausage, mozzarella cheese, and Italiano blend seasoning. For the meat-lover in you.',
                'price': 13.49,
              },
              'options': [
                sizeOption(0, 2, 5, 9),
                pizzaSauceOption,
                pizzaDrinkOption,
              ],
            },
            {
              'id': 'gardenVeggie',
              'briefDetail': {
                'pic': 'pizzaGardenVeggie.png',
                'name': 'Garden Veggie',
                'desc': 'Made with fresh mushrooms, green peppers, roma tomatoes, and mozzarella cheese.',
                'price': 11.99,
              },
              'options': [
                sizeOption(0, 2, 4.5, 8.1),
                pizzaSauceOption,
                pizzaDrinkOption,
              ],
            },
            {
              'id': 'baconCheeseburger',
              'briefDetail': {
                'pic': 'pizzaBaconDblCheeseburger.png',
                'name': 'Bacon Double Cheeseburger',
                'desc': 'Topped with ground beef, bacon crumble and four-cheese blend. Tip: Try with Honey Mustard dipping sauce.',
                'price': 10.49,
              },
              'options': [
                sizeOption(0, 2, 4.5, 8.1),
                pizzaSauceOption,
                pizzaDrinkOption,
              ],
            },
            {
              'id': 'loadedClassic',
              'briefDetail': {
                'pic': 'pizzaLoadedClassic.png',
                'name': 'Loaded Classic',
                'desc': 'Topped with New York style pepperoni, Italian ham, red onion, fresh mushrooms, green olives and mozzarella cheese. Tip: Try with Italian marinara or creamy garlic dipping sauce.',
                'price': 14.99,
              },
              'options': [
                sizeOption(0, 2, 4.5, 8.1),
                pizzaSauceOption,
                pizzaDrinkOption,
              ],
            },
            {
              'id': 'chipotleChicken',
              'briefDetail': {
                'pic': 'pizzaChipotleChicken.png',
                'name': 'Chipotle Chicken',
                'desc': 'Topped with bacon strips, bacon crumble and four-cheese blend. Tip: Try with Buffalo blue cheese dipping sauce.',
                'price': 11.49,
              },
              'options': [
                sizeOption(0, 2, 4.5, 8.1),
                pizzaSauceOption,
                pizzaDrinkOption,
              ],
            },
            {
              'id': 'hotNSpicy',
              'briefDetail': {
                'pic': 'pizzaHotnSpicy.png',
                'name': 'Hot N Spicy',
                'desc': 'Topped with spicy Italian sausage, hot banana peppers, and Mozzarella Cheese.',
                'price': 10.49,
              },
              'options': [
                sizeOption(0, 2, 4.5, 8.1),
              ],
            },
            {
              'id': 'greek',
              'briefDetail': {
                'pic': 'pizzaGreek.png',
                'name': 'Greek',
                'desc': 'Topped with kalamata olives, spinach, red onions, and feta cheese.',
                'price': 13.49,
              },
              'options': [
                sizeOption(0, 2, 4.5, 8.1),
                pizzaSauceOption,
                pizzaDrinkOption,
              ],
            },
          ],
        },
        {
          'category': 'Wings',
          'foodOptions': [
            {
              'id': 'wingsClassicTen',
              'briefDetail': {
                'pic': 'wingsClassic.png',
                'name': 'Classic Wings (10 pc)',
                'desc': 'Raised without antibiotics & sourced from Canadian farms.',
                'price': 9.99,
              },
              'options': [],
            },
            {
              'id': 'wingsClassicTwenty',
              'briefDetail': {
                'pic': 'wingsClassic.png',
                'name': 'Classic Wings (20 pc)',
                'desc': 'Raised without antibiotics & sourced from Canadian farms.',
                'price': 19.49,
              },
              'options': [],
            },
            {
              'id': 'wingsBreadedTen',
              'briefDetail': {
                'pic': 'wingsClassic.png',
                'name': 'Breaded Wings (10 pc)',
                'desc': 'Raised without antibiotics & sourced from Canadian farms.',
                'price': 9.99,
              },
              'options': [],
            },
            {
              'id': 'wingsBreadedTwenty',
              'briefDetail': {
                'pic': 'wingsClassic.png',
                'name': 'Breaded Wings (20 pc)',
                'desc': 'Raised without antibiotics & sourced from Canadian farms.',
                'price': 19.49,
              },
              'options': [],
            },
            {
              'id': 'chickenBitesTen',
              'briefDetail': {
                'pic': 'wings10Bites.png',
                'name': 'Chicken Bites (10 pc)',
                'desc': 'Boneless chunks of 100% white breast meat, raised without antibiotics and sourced from Canadian farms.',
                'price': 9.99,
              },
              'options': [],
            },
            {
              'id': 'chickenBitesTwenty',
              'briefDetail': {
                'pic': 'wings20Bites.png',
                'name': 'Chicken Bites (20 pc)',
                'desc': 'Boneless chunks of 100% white breast meat, raised without antibiotics and sourced from Canadian farms.',
                'price': 19.49,
              },
              'options': [],
            },
            {
              'id': 'chickenStrips',
              'briefDetail': {
                'pic': 'wingsChickenStrips.png',
                'name': 'Chicken Strips (6 pc)',
                'desc': 'Tenders made with a 100% White Breast Meat Chicken. Raised without antibiotics and sourced from Canadian farms.',
                'price': 8.49,
                'cals': '370',
              },
              'options': [],
            },
          ],
        },
        {
          'category': 'Salads',
          'foodOptions': [
            {
              'id': 'baconCaesar',
              'briefDetail': {
                'pic': 'saladBaconChickenCeasar.png',
                'name': 'Bacon Chicken Caesar',
                'desc': 'Fresh crisp romaine lettuce, bacon strips, parmesan cheese, and croutons. Comes with a salad dressing of your choice.',
                'price': 6.99,
              },
              'options': [],
            },
            {
              'id': 'grilledChickenCaesar',
              'briefDetail': {
                'pic': 'saladGrilledChicken.png',
                'name': 'Grilled Chicken Caesar',
                'desc': 'Fresh crisp romaine lettuce, grilled chicken, parmesan cheese, and croutons. Comes with a salad dressing of your choice.',
                'price': 6.99,
              },
              'options': [],
            },
            {
              'id': 'crispyChickenCaesar',
              'briefDetail': {
                'pic': 'saladCrispyChicken.png',
                'name': 'Crispy Chicken Caesar',
                'desc': 'Fresh crisp romaine lettuce, crispy chicken, parmesan cheese, and croutons. Comes with a salad dressing of your choice.',
                'price': 6.99,
              },
              'options': [],
            },
            {
              'id': 'caesar',
              'briefDetail': {
                'pic': 'saladCeasar.png',
                'name': 'Caesar Salad',
                'desc': 'Fresh crisp romaine lettuce, parmesan cheese, and croutons. Comes with a salad dressing of your choice.',
                'price': 5.75,
              },
              'options': [],
            },
            {
              'id': 'garden',
              'briefDetail': {
                'pic': 'saladGarden.png',
                'name': 'Garden Salad',
                'desc': 'Cucumber slices, and ripe red grape tomatoes on a bed of fresh crisp iceberg lettuce. Comes with a salad dressing of your choice.',
                'price': 5.75,
              },
              'options': [],
            },
            {
              'id': 'greek',
              'briefDetail': {
                'pic': 'saladGreek.png',
                'name': 'Mediterranean Greek Salad',
                'desc': 'Iceberg and romaine lettuce, grape tomatoes, red onions, cucumber slices, kalamata black olives and feta cheese. Comes with a salad dressing of your choice.',
                'price': 6.99,
              },
              'options': [],
            },
          ],
        },
        {
          'category': 'Panzos & Quesadillas',
          'foodOptions': [
            {
              'id': 'panzerottiCheese',
              'briefDetail': {
                'pic': 'panzosPanzerotti.png',
                'name': 'Cheese Panzerotti',
                'desc': '12-inch panzerotti stuffed with cheese.',
                'price': 6.79,
              },
              'options': [],
            },
            {
              'id': 'panzerottiPepperoni',
              'briefDetail': {
                'pic': 'panzosPanzerotti.png',
                'name': 'Pepperoni Panzerotti',
                'desc': '12-inch panzerotti stuffed with cheese and pepperoni.',
                'price': 6.79,
              },
              'options': [],
            },
            {
              'id': 'chickenQuesadilla',
              'briefDetail': {
                'pic': 'panzosChickenQuesa.png',
                'name': 'Chicken Quesadilla',
                'desc': 'Mozzarella cheese, chicken, green peppers and roasted red peppers, wrapped in a 12-inch flour tortilla.',
                'price': 6.49,
              },
              'options': [],
            },
            {
              'id': 'steakQuesadilla',
              'briefDetail': {
                'pic': 'panzosSteakQuesa.png',
                'name': 'Steak Quesadilla',
                'desc': 'Mozzarella cheese, steak, and red onions, wrapped in a 12-inch flour tortilla.',
                'price': 6.49,
              },
              'options': [],
            },
            {
              'id': 'veggieQuesadilla',
              'briefDetail': {
                'pic': 'panzosVeggieQuesa.png',
                'name': 'Veggie Quesadilla',
                'desc': 'Feta cheese, goat cheese and spinach, wrapped in a 12-inch flour tortilla.',
                'price': 6.49,
              },
              'options': [],
            },
          ],
        },
        {
          'category': 'Apps & Sides',
          'foodOptions': [
            {
              'id': 'jpoppers',
              'briefDetail': {
                'pic': 'sidesJPopper.png',
                'name': 'Jalapeno Poppers',
                'desc': '',
                'price': 5.99,
              },
              'options': [],
            },
            {
              'id': 'dillPickle',
              'briefDetail': {
                'pic': 'sidesDillPickle.png',
                'name': '10 Deep Fried Pickles',
                'desc': '',
                'price': 5.99,
              },
              'options': [],
            },
            {
              'id': 'meatballs',
              'briefDetail': {
                'pic': 'sidesMeatballs.png',
                'name': '8 Italian Meatballs',
                'desc': '',
                'price': 5.99,
              },
              'options': [],
            },
            {
              'id': 'bocci',
              'briefDetail': {
                'pic': 'sidesBocci.png',
                'name': 'Bocci Bits',
                'desc': 'Get a Mini-bucket of our new garlic-infused dough balls, sprinkled with parmesan cheese and seasoning.',
                'price': 2.99,
              },
              'options': [],
            },
            {
              'id': 'chickenBites',
              'briefDetail': {
                'pic': 'wings6Bites.png',
                'name': '6 Sauced & Tossed Chicken Bites',
                'desc': 'Boneless chunks of 100% white breast meat, raised without antibiotics and sourced from Canadian farms. Includes your choice of sauce.',
                'price': 5.99,
              },
              'options': [],
            },
            {
              'id': 'friesSmall',
              'briefDetail': {
                'pic': 'sidesFries.png',
                'name': 'Box of Fries (Small)',
                'desc': 'Box of golden brown fries cooked in trans fat free oil.',
                'price': 3.79,
              },
              'options': [],
            },
            {
              'id': 'friesBig',
              'briefDetail': {
                'pic': 'sidesFries.png',
                'name': 'Box of Fries (Big)',
                'desc': 'Box of golden brown fries cooked in trans fat free oil.',
                'price': 4.79,
              },
              'options': [],
            },
            {
              'id': 'onionRingsSmall',
              'briefDetail': {
                'pic': 'sidesOnionRings.png',
                'name': 'Box of Onion Rings (Small)',
                'desc': 'Box of golden onion rings cooked in trans fat free oil.',
                'price': 4.29,
              },
              'options': [],
            },
            {
              'id': 'onionRingsBig',
              'briefDetail': {
                'pic': 'sidesOnionRings.png',
                'name': 'Box of Onion Rings (Big)',
                'desc': 'Box of golden onion rings cooked in trans fat free oil.',
                'price': 5.29,
              },
              'options': [],
            },
            {
              'id': 'wedgesSmall',
              'briefDetail': {
                'pic': 'sidesWedges.png',
                'name': 'Box of Potato Wedges (Small)',
                'desc': 'Box of potato wedges seasoned with a delicious blend of herbs and spices.',
                'price': 3.79,
              },
              'options': [],
            },
            {
              'id': 'wedgesBig',
              'briefDetail': {
                'pic': 'sidesWedges.png',
                'name': 'Box of Potato Wedges (Big)',
                'desc': 'Box of potato wedges seasoned with a delicious blend of herbs and spices.',
                'price': 4.79,
              },
              'options': [],
            },
            {
              'id': 'sweetPotatoSmall',
              'briefDetail': {
                'pic': 'sidesSweetPotato.png',
                'name': 'Box of Sweet Potato Fries (Small)',
                'desc': 'Naturally ripened sweet potatoes, cut into plank strips.',
                'price': 4.99,
              },
              'options': [],
            },
            {
              'id': 'sweetPotatoSmall',
              'briefDetail': {
                'pic': 'sidesSweetPotato.png',
                'name': 'Box of Sweet Potato Fries (Big)',
                'desc': 'Naturally ripened sweet potatoes, cut into plank strips.',
                'price': 5.99,
              },
              'options': [],
            },
            {
              'id': 'chips',
              'briefDetail': {
                'pic': 'sidesChips.png',
                'name': '3 Small Bag of Chips',
                'desc': '',
                'price': 2.29,
              },
              'options': [],
            },
          ],
        },
        {
          'category': 'Drinks',
          'foodOptions': [
            {
              'id': 'cokeClassic',
              'briefDetail': {
                'pic': 'drinksCoke.png',
                'name': 'Coca Cola Classic',
                'desc': '355ml Can',
                'price': 1.29,
              },
              'options': [],
            },
            {
              'id': 'cokeZero',
              'briefDetail': {
                'pic': 'drinksCokeZero.png',
                'name': 'Coca Cola Zero',
                'desc': '355ml Can',
                'price': 1.29,
              },
              'options': [],
            },
            {
              'id': 'dietCoke',
              'briefDetail': {
                'pic': 'drinksDietCoke.png',
                'name': 'Coca Cola Diet',
                'desc': '355ml Can',
                'price': 1.29,
              },
              'options': [],
            },
            {
              'id': 'brio',
              'briefDetail': {
                'pic': 'drinksBrio.png',
                'name': 'Brio',
                'desc': 'Can',
                'price': 1.29,
              },
              'options': [],
            },
            {
              'id': 'barqCreamSoda',
              'briefDetail': {
                'pic': 'drinksBarqCreamSoda.png',
                'name': 'Barq Cream Soda',
                'desc': 'Can',
                'price': 1.29,
              },
              'options': [],
            },
            {
              'id': 'fanta',
              'briefDetail': {
                'pic': 'drinksFanta.png',
                'name': 'Fanta Orange',
                'desc': 'Can',
                'price': 1.29,
              },
              'options': [],
            },
            {
              'id': 'canadaDry',
              'briefDetail': {
                'pic': 'drinksCanadaDry.png',
                'name': 'Canada Dry',
                'desc': 'Can',
                'price': 1.29,
              },
              'options': [],
            },
            {
              'id': 'nestea',
              'briefDetail': {
                'pic': 'drinksNestea.png',
                'name': 'Nestea Iced Tea',
                'desc': 'Can',
                'price': 1.29,
              },
              'options': [],
            },
            {
              'id': 'barqRootBeer',
              'briefDetail': {
                'pic': 'drinksBarqRootbeer.png',
                'name': 'Barq Root Beer',
                'desc': 'Can',
                'price': 1.29,
              },
              'options': [],
            },
            {
              'id': 'sprite',
              'briefDetail': {
                'pic': 'drinksSprite.png',
                'name': 'Sprite',
                'desc': 'Can',
                'price': 1.29,
              },
              'options': [],
            },
            {
              'id': 'milk',
              'briefDetail': {
                'pic': 'drinksMilk.png',
                'name': 'White Milk',
                'desc': '',
                'price': 2.09,
              },
              'options': [],
            },
            {
              'id': 'chocoMilk',
              'briefDetail': {
                'pic': 'drinksChocoMilk.png',
                'name': 'Chocolate Milk',
                'desc': '',
                'price': 2.09,
              },
              'options': [],
            },
            {
              'id': 'water',
              'briefDetail': {
                'pic': 'drinksDasani.png',
                'name': 'Dasani Bottled Water',
                'desc': '',
                'price': 1.99,
              },
              'options': [],
            },
          ],
        },
        {
          'category': 'Dipping Sauces',
          'foodOptions': [
            {
              'id': 'blueCheese',
              'briefDetail': {
                'pic': 'dippingBlueCheese.png',
                'name': 'Blue Cheese',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'buffaloBlueCheese',
              'briefDetail': {
                'pic': 'dippingBuffaloBlueCheese.png',
                'name': 'Buffalo Blue Cheese',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'cheddarJalapeno',
              'briefDetail': {
                'pic': 'dippingCheddarJalapeno.png',
                'name': 'Cheddar Jalapeno',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'creamyDill',
              'briefDetail': {
                'pic': 'dippingCreamyDill.png',
                'name': 'Creamy Dill',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'honeyGarlic',
              'briefDetail': {
                'pic': 'dippingHoneyGarlic.png',
                'name': 'Honey Garlic',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'creamyGarlic',
              'briefDetail': {
                'pic': 'dippingCreamyGarlic.png',
                'name': 'Creamy Garlic',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'hot',
              'briefDetail': {
                'pic': 'dippingFranksRedHot.png',
                'name': 'Franks Red Hot Sauce',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'marinara',
              'briefDetail': {
                'pic': 'dippingMarinera.png',
                'name': 'Italian Marinara',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'mild',
              'briefDetail': {
                'pic': 'dippingCreamyGarlic.png',
                'name': 'Mild Sauce',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'ranch',
              'briefDetail': {
                'pic': 'dippingPeppercornRanch.png',
                'name': 'Peppercorn Ranch',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'srirachaGarlic',
              'briefDetail': {
                'pic': 'dippingSrirachaCreamyGarlic.png',
                'name': 'Sriracha Creamy Garlic',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'sweetChili',
              'briefDetail': {
                'pic': 'dippingSweetChiliThai.png',
                'name': 'Sweet Chili Thai Sauce',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
            {
              'id': 'bbq',
              'briefDetail': {
                'pic': 'dippingFranksRedHot.png',
                'name': 'Texas BBQ (Contains Gluten)',
                'desc': '',
                'price': 0.89,
              },
              'options': [],
            },
          ],
        },
        {
          'category': 'Sweet Treats',
          'foodOptions': [
            {
              'id': 'brownies',
              'briefDetail': {
                'pic': 'dessertBrownies.png',
                'name': 'Two Bite Brownies',
                'desc': 'Package of fudgy brownies for the chocaholics.',
                'price': 6.29,
              },
              'options': [],
            },
            {
              'id': 'brownies',
              'briefDetail': {
                'pic': 'dessertFunnel.png',
                'name': 'Funnel Cake Stix',
                'desc': 'Strips of delicious funnel cake topped with sugar and cinnamon. It\'s a fun and flavourful way to enjoy Canada\'s favourite dessert!',
                'price': 4.29,
              },
              'options': [],
            },
          ],
        },

      ],
    },
  },
};
