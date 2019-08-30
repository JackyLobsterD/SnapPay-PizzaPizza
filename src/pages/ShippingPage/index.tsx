import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Icon, Modal } from 'antd';
import styles from './index.css';
// @ts-ignore
import geocoder from 'google-geocoder';
// @ts-ignore
import { getCartListEmailFormatString, getFromStorage, getStoreIndex, isEmpty } from '@/utils/tools';
import { storeList } from '@/constants/stores';
import router from 'umi/router';
import { geoPolygon, isOpen } from '@/constants/location';
import loadingPizzaBig from '@/assets/spinning.gif';
import { storeClosedMessage } from '@/component/ShowMessages';
import { ValidateRegex } from '@/constants/rules';


interface ShippingPageProps {
  restaurants: any;
  dispatch: any;
  // location: any;
  // fetching: any;
}

interface ShippingPageStates {
  cartListStringMerchant: string,
  cartListStringCustomer: string,
  street: string;
  province: string;
  city: string;
  postalCode: string;
  name: string;
  phone: string;
  email: string;
  isSpinning: boolean;
}

class ShippingPage extends Component<ShippingPageProps, ShippingPageStates> {
  constructor(props: any) {
    super(props);
    if (isEmpty(getFromStorage('newCartList'))) {
      router.push('/HomePage');
    }
    let cartListStringMerchant = getCartListEmailFormatString(getFromStorage('newCartList'), 'Subtotal');
    let cartListStringCustomer = getCartListEmailFormatString(getFromStorage('newCartList'), '小计');
    // printCartListEmailFormat(cartListString);

    this.state = {
      cartListStringMerchant,
      cartListStringCustomer,
      street: '',
      province: 'BC',
      city: '',
      postalCode: '',
      name: '',
      phone: '',
      email: '',
      isSpinning: false,
    };
  }

  handleChange(event: any) {
    // @ts-ignore
    this.setState({ [event.target.name]: event.target.value });
  }

  verifiyInput() {
    if (!this.state.name || !ValidateRegex.LetterOrIntOrSpace.test(this.state.name.trim())) {
      Modal.error({ title: '请输入正确格式姓名' });
    } else if (!this.state.phone || !ValidateRegex.Phone.test(this.state.phone.trim())) {
      Modal.error({ title: '请输入正确格式 电话号码' });
    } else if (!this.state.email || !ValidateRegex.Email.test(this.state.email.trim())) {
      Modal.error({ title: '请输入正确格式的 E-mail' });
    } else if (!this.state.postalCode || !ValidateRegex.PostalCode.test(this.state.postalCode.trim())) {
      Modal.error({ title: '请输入正确格式的 Postal Code' });
    } else {
      // console.log('should be true');
      return true;
    }
    return false;
  }

  goPay() {
    const _this = this;
    if (!isOpen()) {
      storeClosedMessage();
    } else if (this.verifiyInput()) {
      const geo = geocoder({ key: geoPolygon.key });
      const currentAddress = `${this.state.street},${this.state.city},${this.state.province},${this.state.postalCode}`;
      geo.find(currentAddress, function(err: any, res: any) {
        // @ts-ignore
        const makePayment = () => {
          _this.setState({ isSpinning: true });
          _this.props.dispatch({ type: 'restaurants/fetchCartList', payload: [] });
          document.getElementById('myForm').submit();
        };

        if (!isEmpty(res)) {
          const storeNumber = getStoreIndex(res[0].location);
          if (storeNumber !== 0) {
            let currentStore = storeList[storeNumber];
            const inputCurrentStore = document.getElementById('currentStore');
            const inputSubMerchantId = document.getElementById('sub_merchantId');
            // @ts-ignore
            inputCurrentStore.setAttribute('value', currentStore.detail);
            // @ts-ignore
            inputSubMerchantId.setAttribute('value', currentStore.merchantId);
            // console.log('should be true');
            makePayment();
          } else {
            Modal.error({ title: '您所在的位置无法送餐' });
          }
        }
      });
    }
  }

  render() {
    const outputEntranceData = entranceData;
    const priceList = getFromStorage('priceList');
    const hiddenFormType = 'hidden';
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
        comment: getFromStorage('comment'),
      },
    );
    return (
      <div key={'ShippingPage'}>
        {this.state.isSpinning && <div className={styles.spinningCover}>
          <img src={loadingPizzaBig} alt="" className={styles.spinningLogo}/>
        </div>}
        <form id="myForm" name="mainForm" action="putorder" method="post" className={styles.background}>

          <div className={styles.headerCanvas}>
            <div className={styles.headerCanvasTitle}>
              <div className={styles.headerCanvasBackButton} onClick={() => {
                router.goBack();
              }}>
                <Icon type="left"/>Back
              </div>
              <div>
                Shipping Info
              </div>

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
            <tr>
              <td className={styles.leftCell}><span>Name:</span></td>
              <td colSpan={2}>
                <input type="text" name={'name'} placeholder={'Jon Snow'} className={styles.inputStyle}
                       onChange={(e) => this.setState({ name: e.target.value })} maxLength={30}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}><span>Phone:</span></td>
              <td colSpan={2}>
                <input type="tel" name={'phone'} placeholder={'(888)888-8888'} className={styles.inputStyle}
                       onChange={(e) => this.setState({ phone: e.target.value })} maxLength={14}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}><span>Email:</span></td>
              <td colSpan={2}>
                <input type="email" name={'email'} placeholder={'jon.snow@gmail.com'} className={styles.inputStyle}
                       onChange={(e) => this.setState({ email: e.target.value })}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}><span>Street:</span></td>
              <td colSpan={2}>
                <input type="text" name={'4307 Winterfell Street'} onChange={this.handleChange.bind(this)}
                       placeholder={'street'}
                       className={styles.inputStyle} maxLength={70}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}><span>City:</span></td>
              <td colSpan={2}>
                <input type="text" name={'city'} onChange={this.handleChange.bind(this)} placeholder={'Winterfell'}
                       className={styles.inputStyle} maxLength={20}/>
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
                       placeholder={'A9A 9A9'} className={styles.inputStyle} maxLength={7}/>
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
          <input type={hiddenFormType} name={'cartList'} value={this.state.cartListStringCustomer} readOnly/>
          <input type={hiddenFormType} name={'cartListMerchant'} value={this.state.cartListStringMerchant} readOnly/>
          <input type={hiddenFormType} name={'order_desc'} value={'PizzaPizza'} readOnly/>
          <input type={hiddenFormType} name={'currentStore'} id={'currentStore'} readOnly/>
          <input type={hiddenFormType} name={'sub_merchantId'} id={'sub_merchantId'} readOnly/>
          <div className={styles.inline}>
            <Button className={styles.next} onClick={() => this.goPay()}>Go Pay</Button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(ShippingPage);
