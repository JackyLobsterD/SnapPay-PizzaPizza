export const pizzaPizzaTemplate = {
  "data": {
    "menuPage": {
      "details": [
        {
          "category": 'Popular',
          "foodOptions": [
            {
              "id": "theStaples",
              "briefDetail": {
                "pic": "staples.jpg",
                "name": "The Staples",
                "desc": "Topped with grilled chicken, roasted garlic, Italiano blend seasoning, bruschetta, parmesan and mozzarella. A little taste of Italy.",
                "cal": "200-270 Cal/slice",
                "price": 14.49,
              },
              "options": [
                {
                  "id": "size",
                  "name": "size",
                  "type": "single",
                  "rules": {
                    "required": true,
                  },
                  "options": [{
                    "id": "small",
                    "name": "Small",
                    "price": 0,
                    "cal": ""
                  },
                    {
                      "id": "medium",
                      "name": "Medium",
                      "price": 2,
                      "cal": ""
                    }]
                },
                {
                  "id": "sauce",
                  "name": "Sauce",
                  "type": "multiple",
                  "rules": {
                    "required": false,
                  },
                  "options": [
                    {
                      "id": "honeyMustard",
                      "name": "Honey Mustard",
                      "price": 0.89,
                      "cal": 80
                    },
                    {
                      "id": "hot",
                      "name": "Hot Sauce",
                      "price": 0.89,
                      "cal": 40
                    }
                  ]
                },
                {
                  "id": "drink",
                  "name": "Drink",
                  "type": "multiple",
                  "rules": {
                    "required": true,
                    // "minNum": 2
                  },
                  "options": [
                    {
                      "id": "coke",
                      "name": "Coca-Cola",
                      "price": 1.99,
                      "cal": 150
                    },
                    {
                      "id": "sprite",
                      "name": "Sprite",
                      "price": 1.99,
                      "cal": 150
                    }
                  ]
                }
              ],
            },
            {
              "id": "megaMunch",
              "briefDetail": {
                "name": "Mega Munch",
                "desc": "Large Pizza + 3 Toppings + 10 Pcs Wings + 4 Coke + 2 Dips",
                "price": 99.99,
              }
            },
            {
              "id": "Example",
              "briefDetail": {
                "name": "Mega Munch",
                "desc": "Large Pizza + 3 Toppings + 10 Pcs Wings + 4 Coke + 2 Dips",
                "price": "$25.99",
              }
            }
          ]
        },
        {
          "category": 'Pizza',
          "foodOptions": [
            {
              "id": "buffaloChicken",
              "briefDetail": {
                "pic": "BChicken.jpg",
                "name": "The B",
                "desc": "1 Mediums + 1 Dipping Sauce",
                "price": "$12.99",
              },
              "details": {
                "title": "Buffalo Chicken (Hot N Spicy Chicken)",
                "desc": "Made with our Buffalo Blue Cheese sauce, grilled chicken, red onions and fire roasted red peppers",
                "cals": "220-260",
                "options": [
                  {
                    "title": "Size of Pizza",
                    "type": "radio",
                    "options": [
                      {
                        "name": "Small",
                        "cal": "220",
                        "price": "12.99"
                      },
                      {
                        "name": "Medium",
                        "cal": "230",
                        "price": "14.99"
                      },
                      {
                        "name": "Large",
                        "cal": "260",
                        "price": "17.99"
                      },
                      {
                        "name": "X-Large",
                        "cal": "280",
                        "price": "20.99"
                      },
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          "category": 'Wings',
          "foodOptions": [
            {
              "id": "buffaloChicken",
              "briefDetail": {
                "pic": "BChicken.jpg",
                "name": "The B",
                "desc": "1 Mediums + 1 Dipping Sauce",
                "price": "$12.99",
              },
              "details": {
                "title": "Buffalo Chicken (Hot N Spicy Chicken)",
                "desc": "Made with our Buffalo Blue Cheese sauce, grilled chicken, red onions and fire roasted red peppers",
                "cals": "220-260",
                "options": [
                  {
                    "title": "Size of Pizza",
                    "type": "radio",
                    "options": [
                      {
                        "name": "Small",
                        "cal": "220",
                        "price": "12.99"
                      },
                      {
                        "name": "Medium",
                        "cal": "230",
                        "price": "14.99"
                      },
                      {
                        "name": "Large",
                        "cal": "260",
                        "price": "17.99"
                      },
                      {
                        "name": "X-Large",
                        "cal": "280",
                        "price": "20.99"
                      },
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          "category": 'Drinks',
          "foodOptions": [
            {
              "id": "buffaloChicken",
              "briefDetail": {
                "pic": "BChicken.jpg",
                "name": "The B",
                "desc": "1 Mediums + 1 Dipping Sauce",
                "price": "$12.99",
              },
              "details": {
                "title": "Buffalo Chicken (Hot N Spicy Chicken)",
                "desc": "Made with our Buffalo Blue Cheese sauce, grilled chicken, red onions and fire roasted red peppers",
                "cals": "220-260",
                "options": [
                  {
                    "title": "Size of Pizza",
                    "type": "radio",
                    "options": [
                      {
                        "name": "Small",
                        "cal": "220",
                        "price": "12.99"
                      },
                      {
                        "name": "Medium",
                        "cal": "230",
                        "price": "14.99"
                      },
                      {
                        "name": "Large",
                        "cal": "260",
                        "price": "17.99"
                      },
                      {
                        "name": "X-Large",
                        "cal": "280",
                        "price": "20.99"
                      },
                    ]
                  }
                ]
              }
            }
          ]
        },

      ]
    }
  }
}
