const drinkId = 'drink';
const drinkName = 'Drink';
const drinkOptions = [
  {
    'id': 'coke',
    'name': 'Coca-Cola',
    'price': 1.99,
    'cal': 150,
  },
  {
    'id': 'sprite',
    'name': 'Sprite',
    'price': 1.99,
    'cal': 150,
  },

  {
    'id': 'orangeJuice',
    'name': 'Orange Juice',
    'price': 1.99,
    'cal': 200,
  },
  {
    'id': 'appleJuice',
    'name': 'Apple Juice',
    'price': 1.99,
    'cal': 200,
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
    'id': 'honeyMustard',
    'name': 'Honey Mustard',
    'price': 0.89,
    'cal': 80,
  },
  {
    'id': 'hot',
    'name': 'Hot Sauce',
    'price': 0.89,
    'cal': 40,
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
const pizzaSizeOption = (priceSmall: number, priceMedium: number, priceLarge: number) => {
  return {
    'id': 'size',
    'name': 'size',
    'type': 'single',
    'rules': {
      'required': true,
    },
    'options': [{
      'id': 'small',
      'name': 'Small',
      'price': priceSmall,
      'cal': '',
    },
      {
        'id': 'medium',
        'name': 'Medium',
        'price': priceMedium,
        'cal': '',
      },
      {
        'id': 'large',
        'name': 'Large',
        'price': priceLarge,
        'cal': '',
      }],
  };
};
const pizza_staples_pic_url = 'https://snappay-ext.s3-us-west-2.amazonaws.com/pizzapizza/pics/hello/12700.png';


const pizza_staples = {
  'id': 'theStaples',
  'briefDetail': {
    'pic': pizza_staples_pic_url,
    'name': 'The Staples',
    'desc': 'Topped with grilled chicken, roasted garlic, Italiano blend seasoning, bruschetta, parmesan and mozzarella. A little taste of Italy.',
    'cal': '200-270 Cal/slice',
    'price': 14.49,
  },
  'options': [
    pizzaSizeOption(0, 2, 4),
    pizzaSauceOption,
    pizzaDrinkOption,
  ],
};
const pizza_mushroom_pic_url = 'https://snappay-ext.s3-us-west-2.amazonaws.com/pizzapizza/pics/hello/13920.png';

const pizza_mushroom = {
  'id': 'theStaples',
  'briefDetail': {
    'pic': pizza_mushroom_pic_url,
    'name': 'The Staples',
    'desc': 'mushroom chicken',
    'cal': '200-270 Cal/slice',
    'price': 14.49,
  },
  'options': [
    pizzaSizeOption(0, 2, 4),
    pizzaSauceOption,
    pizzaDrinkOption,
  ],
};


export const pizzaPizzaTemplate = {
  'data': {
    'menuPage': {
      'details': [
        {
          'category': 'Popular',
          'foodOptions': [
            pizza_staples,
            pizza_mushroom
          ],
        },
        {
          'category': 'Pizza',
          'foodOptions': [
            pizza_staples,
            pizza_mushroom
          ],
        },
        {
          'category': 'Wings',
          'foodOptions': [
            {
              'id': 'buffaloChicken',
              'briefDetail': {
                'pic': 'BChicken.jpg',
                'name': 'The B',
                'desc': '1 Mediums + 1 Dipping Sauce',
                'price': '$12.99',
              },
              'details': {
                'title': 'Buffalo Chicken (Hot N Spicy Chicken)',
                'desc': 'Made with our Buffalo Blue Cheese sauce, grilled chicken, red onions and fire roasted red peppers',
                'cals': '220-260',
                'options': [
                  {
                    'title': 'Size of Pizza',
                    'type': 'radio',
                    'options': [
                      {
                        'name': 'Small',
                        'cal': '220',
                        'price': '12.99',
                      },
                      {
                        'name': 'Medium',
                        'cal': '230',
                        'price': '14.99',
                      },
                      {
                        'name': 'Large',
                        'cal': '260',
                        'price': '17.99',
                      },
                      {
                        'name': 'X-Large',
                        'cal': '280',
                        'price': '20.99',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          'category': 'Drinks',
          'foodOptions': [
            {
              'id': 'buffaloChicken',
              'briefDetail': {
                'pic': 'BChicken.jpg',
                'name': 'The B',
                'desc': '1 Mediums + 1 Dipping Sauce',
                'price': '$12.99',
              },
              'details': {
                'title': 'Buffalo Chicken (Hot N Spicy Chicken)',
                'desc': 'Made with our Buffalo Blue Cheese sauce, grilled chicken, red onions and fire roasted red peppers',
                'cals': '220-260',
                'options': [
                  {
                    'title': 'Size of Pizza',
                    'type': 'radio',
                    'options': [
                      {
                        'name': 'Small',
                        'cal': '220',
                        'price': '12.99',
                      },
                      {
                        'name': 'Medium',
                        'cal': '230',
                        'price': '14.99',
                      },
                      {
                        'name': 'Large',
                        'cal': '260',
                        'price': '17.99',
                      },
                      {
                        'name': 'X-Large',
                        'cal': '280',
                        'price': '20.99',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },

      ],
    },
  },
};
