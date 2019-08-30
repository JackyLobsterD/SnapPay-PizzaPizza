import { pizzaPizzaTemplate } from '@/constants/template';
import { getFromStorage, isEmpty } from '@/utils/tools';

export default {
  namespace: 'restaurants',
  state: {
    pizzaPizzaTemplate: {},
    currentItemDetails: {},
    cartList: [],
    newCartList:[],
    tabIndex:0
  },
  reducers: {
    saveTabIndex: (state: any, { payload }: any) => {
      return {
        ...state,
        tabIndex: payload,
      };
    },
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

    saveToCartListAddOne: (state: any, { payload }: any) => {
      let cartList = [];
      if (!payload || isEmpty(payload)) {
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
    saveToCartList: (state: any, { payload }: any) => {
      saveToStorage('cartList', payload);
      return {
        ...state,
        cartList: payload,
      };
    },
    savePriceList: (state: any, { payload }: any) => {
      saveToStorage('priceList', payload);
      return {
        ...state,
        payload,
      };
    },
    saveComment: (state: any, { payload }: any) => {
      saveToStorage('comment', payload);
      return {
        ...state,
        comment:payload,
      };
    },
    saveToNewCartList: (state: any, { payload }: any) => {
      saveToStorage('newCartList', payload);
      return {
        ...state,
        newCartList:payload,
      };
    }
  },
  effects: {
    * fetchPizzaPizzaTemplate({ payload }: any, { call, put }: any) {
      yield put({ type: 'savePizzaPizzaTemplate', payload: pizzaPizzaTemplate });
    },

    * fetchCurrentItemDetails({ payload }: any, { call, put }: any) {
      yield put({ type: 'saveCurrentItemDetails', payload: payload });
    },

    * fetchCartListAddOne({ payload }: any, { call, put }: any) {
      yield put({ type: 'saveToCartListAddOne', payload: payload });
    },
    * fetchCartList({ payload }: any, { call, put }: any) {
      yield put({ type: 'saveToCartList', payload: payload });
    },
    * fetchNewCartList({ payload }: any, { call, put }: any) {
      yield put({ type: 'saveToNewCartList', payload: payload });
    }
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
