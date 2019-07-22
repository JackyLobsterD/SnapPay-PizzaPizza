import { pizzaPizzaTemplate } from '@/constants/template';
import { getFromStorage, isEmpty } from '@/utils/tools';

export default {
  namespace: 'restaurants',
  state: {
    pizzaPizzaTemplate: {},
    currentItemDetails: {},
    cartList: [],
  },
  reducers: {
    savePizzaPizzaTemplate: (state: any, { payload }: any) => {
      saveToStorage('pizzaPizzaTemplate', payload);
      return {
        ...state,
        pizzaPizzaTemplate: payload,
      };
    },
    saveCurrentItemDetails: (state: any, { payload }: any) => {
      saveToStorage('currentItemDetails', payload);
      return {
        ...state,
        currentItemDetails: payload,
      };
    },

    saveToCartList: (state: any, { payload }: any) => {
      let cartList = [];
      if (!payload || isEmpty(payload) || !getFromStorage('cartList')) {
        saveToStorage('cartList', []);
      } else {
        if (!getFromStorage('cartList')) saveToStorage('cartList', []);
        cartList = getFromStorage('cartList');
        cartList.push(payload);
        saveToStorage('cartList', cartList);
      }
      return {
        ...state,
        cartList,
      };
    },
  },
  effects: {
    * fetchPizzaPizzaTemplate({ payload }: any, { call, put }: any) {
      // console.log(pizzaPizzaTemplate);
      yield put({ type: 'savePizzaPizzaTemplate', payload: pizzaPizzaTemplate });
    },

    * fetchCurrentItemDetails({ payload }: any, { call, put }: any) {
      console.log(payload);
      yield put({ type: 'saveCurrentItemDetails', payload: payload });
    },

    * fetchCartList({ payload }: any, { call, put }: any) {
      yield put({ type: 'saveToCartList', payload: payload });
    },
  },
};

function saveToStorage(key: string, content: any) {
  const stringContent = JSON.stringify(content);
  sessionStorage.setItem(key, stringContent);
}

function cleanStorage(key?: string) {
  if (key) {
    sessionStorage.removeItem(key);
  } else {
    sessionStorage.clear();
  }
}
