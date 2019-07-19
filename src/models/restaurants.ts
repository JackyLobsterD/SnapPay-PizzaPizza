import { pizzaPizzaTemplate } from '@/constants/template';

export default {
  namespace: 'restaurants',
  state: {
    pizzaPizzaTemplate: {},
    currentItemDetails:{}
  },
  reducers: {
    savePizzaPizzaTemplate: (state: any, { payload }: any) => {
      // console.log(111);
      // console.log(payload);
      return {
        ...state,
        pizzaPizzaTemplate: payload };
    },
    saveCurrentItemDetails:(state: any, { payload }: any)=>{
      return {
        ...state,
        currentItemDetails: payload
      };
    }
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

  }
}
