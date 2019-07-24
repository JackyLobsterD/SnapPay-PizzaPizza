export default [
  {
    'path': '/',
    'component': '../layouts/PageLayout',

    'routes': [
      {
        'path': '/',
        redirect: '/HomePage',
      },
      {
        'path': '/HomePage',
        'component': '../pages/HomePage',
      },
      {
        'path': '/ItemInfo',
        'component': '../pages/ItemInfo',
      },
      {
        'path': '/CartPage',
        'component': '../pages/CartPage',
      },
      {
        'path': '/ShippingPage',
        'component': '../pages/ShippingPage',
      },
    ],
  },
];
