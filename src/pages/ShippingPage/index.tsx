import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { Modal } from 'antd-mobile';
import styles from './index.css';
// @ts-ignore
import geocoder from 'google-geocoder';
// @ts-ignore
import { getCartListEmailFormatString, getFromStorage, getStoreIndex, isEmpty } from '@/utils/tools';
import router from 'umi/router';
import { geoPolygon, isOpen } from '@/constants/location';
import loadingPizzaBig from '@/assets/spinning.gif';
import { storeClosedMessage } from '@/component/ShowMessages';
import { ValidateRegex } from '@/constants/rules';
import moment from 'moment';
import { storeList } from '@/constants/stores';


const alert = Modal.alert;

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

  componentDidMount() {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }

  handleChange(event: any) {
    // @ts-ignore
    this.setState({ [event.target.name]: event.target.value });
  }

  verifiyInput() {
    if (!this.state.name || !ValidateRegex.LetterOrIntOrSpace.test(this.state.name.trim())) {
      alert('输入提示', <div>请输入正确格式姓名</div>, [
        {
          text: '好', onPress: () => {
            this.setState({ isSpinning: false });
          },
        },
      ]);
    } else if (!this.state.phone || !ValidateRegex.Phone.test(this.state.phone.trim())) {
      alert('输入提示', <div>请输入正确格式电话号码</div>, [
        {
          text: '好', onPress: () => {
            this.setState({ isSpinning: false });
          },
        },
      ]);
    } else if (!this.state.email || !ValidateRegex.Email.test(this.state.email.trim())) {
      alert('输入提示', <div>请输入正确格式的E-mail</div>, [
        {
          text: '好', onPress: () => {
            this.setState({ isSpinning: false });
          },
        },
      ]);
    } else if (!this.state.street) {
      alert('输入提示', <div>请输入街道信息</div>, [
        {
          text: '好', onPress: () => {
            this.setState({ isSpinning: false });
          },
        },
      ]);
    } else if (!this.state.city || !ValidateRegex.LetterEn.test(this.state.city.trim())) {
      alert('输入提示', <div>请输入正确的城市名</div>, [
        {
          text: '好', onPress: () => {
            this.setState({ isSpinning: false });
          },
        },
      ]);
    } else if (!this.state.postalCode || !ValidateRegex.PostalCode.test(this.state.postalCode.trim())) {
      alert('输入提示', <div>请输入正确格式的邮编</div>, [
        {
          text: '好', onPress: () => {
            this.setState({ isSpinning: false });
          },
        },
      ]);
    } else {
      // console.log('should be true');
      return true;
    }
    return false;
  }

  goPay() {
    const _this = this;
    _this.setState({ isSpinning: true });

    let inputValidated = this.verifiyInput();
    if (!isOpen()) {
      storeClosedMessage();
    } else if (inputValidated) {
      const geo = geocoder({ key: geoPolygon.key });
      const currentAddress = `${this.state.street},${this.state.city},${this.state.province},${this.state.postalCode}`;
      console.log(123);

      geo.find(currentAddress, function(err: any, res: any) {
        console.log(123);
        // @ts-ignore
        const makePayment = () => {
          _this.setState({ isSpinning: true });
          _this.props.dispatch({ type: 'restaurants/fetchCartList', payload: [] });
          // @ts-ignore
          document.getElementById('myForm').submit();
        };

        const processPayment = (respond: any) => {
          const storeNumber = getStoreIndex(respond.location);
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
            alert('输入提示',
              <div>
                此位置无法送餐
                <br/>
              </div>, [
                {
                  text: '好', onPress: () => {
                    _this.setState({ isSpinning: false });
                  },
                },
              ]);
          }
        };

        if (!isEmpty(res)) {
          alert('请确认您的地址',
            <div>
              您输入的地址：
              <br/>
              {`${_this.state.street} ${_this.state.city}, ${_this.state.province}, ${_this.state.postalCode}`}
              <br/>
              <br/>
              建议地址：
              <br/>
              {res[0].formatted_address}
              <br/>
            </div>, [
              {
                text: '使用我输入的地址', onPress: () => {
                  processPayment(res[0]);
                },
              },
              {
                text: '使用建议地址', onPress: () => {
                  let street = '', city = '', postalCode = '';
                  if (res[0].street_number) street += res[0].street_number.long_name;
                  if (res[0].route) street += ' ' + res[0].route.short_name;
                  if (res[0].city) city = res[0].city.long_name;
                  if (res[0].postal_code) postalCode = res[0].postal_code.long_name;
                  _this.setState({
                    street, city, postalCode,
                  });
                  // @ts-ignore
                  document.getElementById('street').value = street;
                  // @ts-ignore
                  document.getElementById('city').value = city;
                  // @ts-ignore
                  document.getElementById('postalCode').value = postalCode;
                  processPayment(res[0]);
                },
              },
              {
                text: '重新输入', onPress: () => {
                  _this.setState({ isSpinning: false });

                },
              },
            ]);
        } else {
          alert('输入提示', <div>请输入正确地址</div>, [
            {
              text: '好', onPress: () => {
              },
            },
          ]);
        }


      });
      // geo.find(currentAddress, function(err: any, res: any) {
      //   // @ts-ignore
      //   const makePayment = () => {
      //     _this.setState({ isSpinning: true });
      //     _this.props.dispatch({ type: 'restaurants/fetchCartList', payload: [] });
      //     document.getElementById('myForm').submit();
      //   };
      //
      //   if (!isEmpty(res)) {
      //     const storeNumber = getStoreIndex(res[0].location);
      //     if (storeNumber !== 0) {
      //       let currentStore = storeList[storeNumber];
      //       const inputCurrentStore = document.getElementById('currentStore');
      //       const inputSubMerchantId = document.getElementById('sub_merchantId');
      //       // @ts-ignore
      //       inputCurrentStore.setAttribute('value', currentStore.detail);
      //       // @ts-ignore
      //       inputSubMerchantId.setAttribute('value', currentStore.merchantId);
      //       // console.log('should be true');
      //       makePayment();
      //     } else {
      //       console.log(res[0].formatted_address);
      //       alert('输入提示', <div>
      //         您所在的位置无法送餐
      //       </div>, [
      //         {
      //           text: '好', onPress: () => {
      //           }
      //         }
      //       ])
      //     }
      //   }
      // });
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
        amountInCents: priceList.amountInCents,
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
                <input id={'street'} type="text" name={'street'} onChange={this.handleChange.bind(this)}
                       placeholder={'4307 Winterfell Street'}
                       className={styles.inputStyle} maxLength={70}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}><span>City:</span></td>
              <td colSpan={2}>
                <input id={'city'} type="text" name={'city'} onChange={this.handleChange.bind(this)}
                       placeholder={'Winterfell'}
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
                <input id={'postalCode'} type="text" name={'postalCode'} onChange={this.handleChange.bind(this)}
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
          <input type={hiddenFormType} name={'clickTime'} value={moment().format('YYYY-MM-DD HH:mm:ss')} readOnly/>

          <input type={hiddenFormType} name={'amount'} value={priceList.amountInCents} readOnly/>
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
            <div className={styles.next} onClick={() => this.goPay()}><span className={styles.nextText}>Go Pay</span>
            </div>
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
