import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Icon, Modal, Select } from 'antd';
import styles from './index.css';
// @ts-ignore
import geocoder from 'google-geocoder';
// @ts-ignore
import classifyPoint from 'robust-point-in-polygon';
import { getFromStorage, isEmpty } from '@/utils/tools';
import { storeList } from '@/constants/stores';
import router from 'umi/router';
import { geoPolygon, isOpen } from '@/constants/location';

const { confirm } = Modal;
const { Option, OptGroup } = Select;


interface ShippingPageProps {
  restaurants: any;
  dispatch: any;
  // location: any;
  // fetching: any;
}

interface ShippingPageStates {
  cartListString: string;
  street: string;
  province: string;
  city: string;
  postalCode: string;
  isStoreExist: boolean;
  name: string;
  phone: string;
  email: string;
}

class ShippingPage extends Component<ShippingPageProps, ShippingPageStates> {
  constructor(props: any) {
    super(props);
    let cartListString = '';
    for (let [key, value] of Object.entries(getFromStorage('newCartList'))) {
      for (let [key2, value2] of Object.entries(value)) {
        if (key2 !== 'options') {
          cartListString += key2 + '%' + value2 + '@/';
        } else {
          //option:
          cartListString += key2 + '`/';
          let optionValueString = '';
          value2.forEach((optionItem: any) => {
            //sauce:
            optionValueString += optionItem.name + '~/';
            optionItem.options.forEach((optionItemOptions: any) => {
              //honey mustered    0.99
              optionValueString += optionItemOptions.name + '%' + optionItemOptions.price + '*/';
            });
            // optionValueString += '^/';
          });
          cartListString += optionValueString + '@/';
        }
      }
      cartListString += '!/';
    }
    console.log(cartListString);
    let cartList = cartListString;

    for (let i=0; i<50; i++) {
      let midNum1 = cartList.indexOf('/');
      let midNum2 = midNum1 - 1;
      let midNum3 = midNum1 + 1;



      let endNum = cartList.length;
      let mark= cartList.substring(midNum2, midNum1)
      let val = cartList.substring(0, midNum2);
      cartList = cartList.substring(midNum3, endNum);
      if (mark==='%'){
        console.log('%%%%'+val);
      } else if (mark === '$') {
        console.log('$$$$' + val);
      } else if (mark === '#') {
        console.log('----------');
        console.log('$$$$' + val);
      }
      else {
        console.log(val);
      }
      console.log(mark);
      if (cartList===''){
        break;
      }
    }

    console.log(cartList);
    this.state = {
      cartListString: cartListString,
      street: '',
      province: 'BC',
      city: '',
      postalCode: '',
      isStoreExist: false,
      name: '',
      phone: '',
      email: '',
    };
  }

  handleChange(event: any) {
    // @ts-ignore
    this.setState({ [event.target.name]: event.target.value });
  }

  clearCart() {
    this.props.dispatch({ type: 'restaurants/fetchCartList', payload: [] });
    router.push('/HomePage');
  }

  goBack() {
    router.goBack();
  }

  goPay() {
    if (!isOpen()) {
      alert('store is closed');
    } else {
      const geo = geocoder({ key: geoPolygon.key });
      const currentAddress = `${this.state.street},${this.state.city},${this.state.province},${this.state.postalCode}`;
      geo.find(currentAddress, function(err: any, res: any) {
        // @ts-ignore
        const makePayment = () => document.getElementById('myForm').submit();
        const regValue = (array1: any) => array1.map((x: any) => Math.round(x * geoPolygon.multiplier));
        const regValueArray = (array2: any) => array2.map((array1: any) => regValue(array1));
        if (!isEmpty(res)) {
          const coordinates = res[0].location;
          const arrayDot = regValue([coordinates.lat, coordinates.lng]);
          let westIndicator = 1;
          geoPolygon.westminsterArray.forEach((item) => {
            westIndicator = westIndicator * classifyPoint(regValueArray(item), arrayDot);
          });
          const inputCurrentStore = document.getElementById('currentStore');
          const inputSubMerchantId = document.getElementById('sub_merchantId');
          const inSurrey = classifyPoint(regValueArray(geoPolygon.surreyArray), arrayDot) < 0;
          const inBurnaby = classifyPoint(regValueArray(geoPolygon.burnabyArray), arrayDot) < 0;
          const inWest = westIndicator < 0;
          if (inSurrey || inBurnaby || inWest) {
            let currentStore = storeList[inSurrey ? 1 : inBurnaby ? 3 : 2];
            // @ts-ignore
            inputCurrentStore.setAttribute('value', currentStore.detail);
            // @ts-ignore
            inputSubMerchantId.setAttribute('value', currentStore.merchantId);
            makePayment();
          } else {
            alert('Store is not available in your location!');
          }
        }
      });
    }
  }

  render() {
    const outputEntranceData = entranceData;
    const priceList = getFromStorage('priceList');
    const hiddenFormType = 'text';
    console.log('==============================');
    console.log(
      {
        cartListString: this.state.cartListString,
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        street: this.state.street,
        city: this.state.city,
        province: this.state.province,
        postalCode: this.state.postalCode,
        subtotal: priceList.subtotal,
        tax: priceList.tax,
        deliveryFee: priceList.deliveryFee,
        amountInDollar: priceList.total,
        projectId: outputEntranceData.projectId,
        merchantId: outputEntranceData.merchantId,
        merchantName: outputEntranceData.merchantName,
        payType: outputEntranceData.payType,
        openId: outputEntranceData.openId,
        cartListString: this.state.cartListString,
      },
    );
    return (
      <Fragment>

        <form id="myForm" name="mainForm" action="putorder" method="post" className={styles.background}>

          <div className={styles.headerCanvas}>
            <div className={styles.headerCanvasTitle}>Shipping Info
              <div className={styles.headerCanvasBackButton} onClick={() => {
                this.goBack();
              }}>&lt;&nbsp;Back</div>
            </div>
          </div>
          <hr className={styles.titleDivider}/>
          <table className={styles.tableStyle}>
            <tbody>
            <tr>
              <td colSpan={3}>
                <Icon type="shop" style={{ display: 'inline-block', color: '#2e94e4' }}/>
                <div className={styles.enterTitle}>Enter Shipping Information</div>
              </td>
            </tr>
            {/*{inputSection('NameTest',undefined, 'input name',false)}*/}
            <tr>
              <td className={styles.leftCell}><span>Name:</span></td>
              <td colSpan={2}>
                <input type="text" name={'name'} placeholder={'input name'} className={styles.inputStyle}
                       onChange={(e) => this.setState({ name: e.target.value })}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}><span>Phone:</span></td>
              <td colSpan={2}>
                <input type="tel" name={'phone'} placeholder={'phone'} className={styles.inputStyle}
                       onChange={(e) => this.setState({ phone: e.target.value })}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}><span>Email:</span></td>
              <td colSpan={2}>
                <input type="email" name={'email'} placeholder={'email'} className={styles.inputStyle}
                       onChange={(e) => this.setState({ email: e.target.value })}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}><span>Street:</span></td>
              <td colSpan={2}>
                <input type="text" name={'street'} onChange={this.handleChange.bind(this)} placeholder={'street'}
                       className={styles.inputStyle}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}><span>City:</span></td>
              <td colSpan={2}>
                <input type="text" name={'city'} onChange={this.handleChange.bind(this)} placeholder={'city'}
                       className={styles.inputStyle}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}><span>Province:</span></td>
              <td colSpan={2}>
                <input type="text" name={'province'} onChange={this.handleChange.bind(this)} value={'BC'}
                       className={styles.inputStyle} readOnly/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}><span>Postal Code:</span></td>
              <td colSpan={2}>
                <input type="text" name={'postalCode'} onChange={this.handleChange.bind(this)}
                       placeholder={'postal code'} className={styles.inputStyle}/>
              </td>
            </tr>
            </tbody>
          </table>

          <input type={hiddenFormType} name={'comment'} value={getFromStorage('comment') || 'N/A'} readOnly/>
          <input type={hiddenFormType} name={'subtotal'} value={priceList.subtotal} readOnly/>
          <input type={hiddenFormType} name={'tax'} value={priceList.tax} readOnly/>
          <input type={hiddenFormType} name={'deliveryFee'} value={priceList.deliveryFee} readOnly/>
          <input type={hiddenFormType} name={'amountInDollar'} value={priceList.total} readOnly/>

          <input type={hiddenFormType} name={'amount'} value={1} readOnly/>
          <input type={hiddenFormType} name={'project_id'} value={outputEntranceData.projectId} readOnly/>
          <input type={hiddenFormType} name={'merchant_id'} value={outputEntranceData.merchantId} readOnly/>
          <input type={hiddenFormType} name={'merchantName'} value={outputEntranceData.merchantName} readOnly/>
          <input type={hiddenFormType} name={'pay_type'} value={outputEntranceData.payType} readOnly/>
          <input type={hiddenFormType} name={'openId'} value={outputEntranceData.openId} readOnly/>
          <input type={hiddenFormType} name={'cartList'} value={this.state.cartListString} readOnly/>
          <input type={hiddenFormType} name={'order_desc'} value={'PizzaPizza'} readOnly/>
          <input type={hiddenFormType} name={'currentStore'} id={'currentStore'} readOnly/>
          <input type={hiddenFormType} name={'sub_merchantId'} id={'sub_merchantId'} readOnly/>
          <div className={styles.inline}>
            <Button className={styles.cancel} onClick={() => this.clearCart()}>Clear Cart</Button>
            <Button className={styles.next} onClick={() => this.goPay()}>Go Pay</Button>
          </div>
        </form>
      </Fragment>
    );
  }
}

function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(ShippingPage);
