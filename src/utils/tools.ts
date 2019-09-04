import { geoPolygon } from '@/constants/location';
// @ts-ignore
import classifyPoint from 'robust-point-in-polygon';


export function isEmpty(obj: object) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export function getFromStorage(key: string) {
  const stringContent = sessionStorage.getItem(key);
  // @ts-ignore
  return JSON.parse(stringContent);
}

export function getStoreIndex(coordinates: any) {
  const regValue = (array1: any) => array1.map((x: any) => Math.round(x * geoPolygon.multiplier));
  const regValueArray = (array2: any) => array2.map((array1: any) => regValue(array1));
  const arrayDot = regValue([coordinates.lat, coordinates.lng]);
  let westIndicator = 1;
  geoPolygon.westminsterArray.forEach((item) => {
    westIndicator = westIndicator * classifyPoint(regValueArray(item), arrayDot);
  });
  const inSurrey = classifyPoint(regValueArray(geoPolygon.surreyArray), arrayDot) < 0;
  const inBurnaby = classifyPoint(regValueArray(geoPolygon.burnabyArray), arrayDot) < 0;
  const inWest = westIndicator < 0;
  if (inSurrey) return 1;
  else if (inBurnaby) return 2;
  else if (inWest) return 3;
  else return 0;

}

export function printCartListEmailFormat(cartListString: string) {
  console.log(cartListString);
  let cartList = cartListString;
  for (let i = 0; i < 50; i++) {
    let midNum1 = cartList.indexOf('/');
    let midNum2 = midNum1 - 1;
    let midNum3 = midNum1 + 1;


    let endNum = cartList.length;
    let mark = cartList.substring(midNum2, midNum1);
    let val = cartList.substring(0, midNum2);
    cartList = cartList.substring(midNum3, endNum);
    if (mark === '%') {
      console.log('%%%%' + val);
    } else if (mark === '$') {
      console.log('$$$$' + val);
    } else if (mark === '#') {
      console.log('----------');
      console.log('$$$$' + val);
    } else {
      console.log(val);
    }
    console.log(mark);
    if (cartList === '') {
      break;
    }
  }

  console.log(cartList);
}

export function getCartListEmailFormatString(newCartList: any, subtotalString: string) {
  let cartListString = '';
  for (let [key, value] of Object.entries(newCartList)) {
    for (let [key2, value2] of Object.entries(value)) {
      if (key2 === 'name') {
        // @ts-ignore
        cartListString += value2 + ' x' + value.quantity + '%' + '$' + (value.basePrice * value.quantity).toFixed(2) + '*/';
      } else if (key2 === 'basePrice' || key2 === 'quantity') {

      } else if (key2 === 'itemTotalPrice') {
        // @ts-ignore
        cartListString += subtotalString + '%' + '$' + (value2 * value.quantity).toFixed(2) + '@/';
      } else if (key2 !== 'options') {
        cartListString += key2 + '%' + value2 + '*/';
      } else {
        let optionValueString = '';
        value2.forEach((optionItem: any) => {
          optionItem.options.forEach((optionItemOptions: any) => {
            //honey mustered    0.99
            // @ts-ignore
            optionValueString += optionItemOptions.name + ' x' + value.quantity + '%' + '+$' + (optionItemOptions.price * value.quantity).toFixed(2) + '*/';
          });
        });
        cartListString += optionValueString;
      }
    }
    cartListString += '!/';
  }
  return cartListString;
}
