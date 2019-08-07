import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Icon, Modal, Select } from 'antd';
import styles from './index.css';
// @ts-ignore
import geocoder from 'google-geocoder';
// @ts-ignore
import classifyPoint from 'robust-point-in-polygon';
import { getFromStorage, isEmpty } from '@/utils/tools';
import router from 'umi/router';
import moment from 'moment'


const { confirm } = Modal;
const { Option, OptGroup } = Select;


interface ShippingPageProps {
  restaurants: any;
  dispatch: any;
  // location: any;
  // fetching: any;
}

interface ShippingPageStates {
  cartList: string;
  street: string;
  province: string;
  city: string;
  postalCode: string;
  isStoreExist: boolean;
  currentStore: number;
  name: string;
  phone: string;
  email: string;
}

const storeList= [
    {
      merchantId: '0000',
      name: 'NOT AVAILABLE',
      detail: 'no detail',
    },
    {
      merchantId: 'pizza001',
      name: 'Store# 551',
      detail: '2370 152 St, Surrey, BC V4A 4N9\n',

    },
    {
      merchantId: 'pizza002',
      name: 'Store# 555',
      detail: '527 6th St, New Westminster, BC V3L 3B9',
    },
    {
      merchantId: 'pizza003',
      name: 'Store# 553',
      detail: '4461 Lougheed Hwy #3, Burnaby, BC V5C 3Z2',
    },
    ]

class ShippingPage extends Component<ShippingPageProps, ShippingPageStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      cartList: JSON.stringify(getFromStorage('cartList')),
      street: '',
      province: 'BC',
      city: '',
      postalCode: '',
      isStoreExist: false,
      currentStore: 0,
      name: '',
      phone: '',
      email: ''

    };

  }

  makePayment() {
    // @ts-ignore
    document.getElementById('myForm').submit();
  }

  goPay() {

    this.makePayment();
  }

  handleChange(event: any) {
    // @ts-ignore
    this.setState({ [event.target.name]: event.target.value });
  }

  goBack() {
    router.goBack();
  }

  clearCart() {
    this.props.dispatch({ type: 'restaurants/fetchCartList', payload: [] });
    router.push('/HomePage');
  }

  checkAvailablility() {
    const geo = geocoder({ key: 'AIzaSyCuNeDQfFowGcMhp3CeE5LxYN6eR5XjqTE' });
    const currentAddress = `${this.state.street},${this.state.city},${this.state.province},${this.state.postalCode}`;
    console.log(currentAddress);
    const setStore = (value: number) => {
      this.setState({ currentStore: value });

    };
    geo.find(currentAddress, function(err: any, res: any) {

      const multiplier = 10000000;
      const regValue = (array1: any) => {
        return array1.map((x: any) => {
            return Math.round(x * multiplier);
          },
        );
      };
      const regValueArray = (array2: any) => {
        return array2.map((array1: any) => {
          return regValue(array1);
        });
      };
      // @ts-ignore
      const _this: any = this;
      if (!isEmpty(res)) {
        let coordinatesArray = [];
        const coordinates = res[0].location;
        coordinatesArray.push(coordinates.lat, coordinates.lng);
        const arrayDot = regValue(coordinatesArray);

        const surreyArray = [[49.02668312, -122.8344321], [49.06879746, -122.8343196], [49.07023136, -122.827539], [49.07505373, -122.822586], [49.07471167, -122.779141], [49.0408184, -122.779531], [49.01568869, -122.7571589], [49.01591386, -122.7937227], [49.02047331, -122.8086573], [49.0222941, -122.8342555]];
        const burnabyArray = [[49.29270678, -123.0261679], [49.2761344, -123.0316611], [49.26258088, -123.025482], [49.26192573, -122.9812667], [49.27909841, -122.9810092], [49.27923839, -122.9747007], [49.29025547, -122.9744861], [49.29525882, -122.9876114], [49.29075259, -123.0025889]];
        const westminsterA1 = [[49.2135164, -122.9378256], [49.20768496, -122.9307017], [49.19865609, -122.9492411], [49.19618829, -122.9466233], [49.21173298, -122.9186303], [49.21896552, -122.9276425]];
        const westminsterA2 = [[49.19606729, -122.9467131], [49.19859118, -122.939632], [49.19679643, -122.9162432], [49.20139012, -122.9052159], [49.21179223, -122.9186055]];
        const westminsterB1 = [[49.21890945, -122.9276355], [49.21167691, -122.9186662], [49.21821714, -122.9067691], [49.22536464, -122.9158242]];
        const westminsterB2 = [[49.2117642, -122.9187343], [49.20127796, -122.9050014], [49.20890454, -122.8942725], [49.21832398, -122.9068467]];
        const westminsterC1 = [[49.22536114, -122.9158936], [49.21880229, -122.9073106], [49.22496875, -122.8955518], [49.23186306, -122.9038344]];
        const westminsterC2 = [[49.21841802, -122.906945], [49.209307, -122.8947141], [49.22496067, -122.8956637], [49.21890633, -122.888926]];
        const westminsterD1 = [[49.23180702, -122.9038215], [49.22502481, -122.8958392], [49.23469338, -122.8782221], [49.23469338, -122.8782221], [49.23469338, -122.8782221], [49.23828007, -122.8859898]];
        const westminsterD2 = [[49.2250262, -122.8958067], [49.21972871, -122.8893694], [49.23464584, -122.8784849], [49.23077863, -122.8715755], [49.22466895, -122.870803]];
        const westminsterArray = [westminsterA1, westminsterA2, westminsterB1, westminsterB2, westminsterC1, westminsterC2, westminsterD1, westminsterD2];
        let westIndicator = 1;
        westminsterArray.forEach((item) => {
          westIndicator = westIndicator * classifyPoint(regValueArray(item), arrayDot);
        });

        const inputCurrentStore= document.getElementById('currentStore');
        const inputSubMerchantId= document.getElementById('sub_merchantId');
        let currentStore
        if (classifyPoint(regValueArray(surreyArray), arrayDot) < 0) {
          setStore(1);
          currentStore=storeList[1]
          // @ts-ignore
          inputCurrentStore.setAttribute('value', currentStore.detail);
          // @ts-ignore
          inputSubMerchantId.setAttribute('value', currentStore.merchantId);
        } else if (classifyPoint(regValueArray(burnabyArray), arrayDot)<0) {
          setStore(3);
          currentStore = storeList[3]
          // @ts-ignore
          inputCurrentStore.setAttribute('value', currentStore.detail);
          // @ts-ignore
          inputSubMerchantId.setAttribute('value', currentStore.merchantId);
        } else if (westIndicator<0){
          setStore(2);
          currentStore = storeList[2]
          // @ts-ignore
          inputCurrentStore.setAttribute('value', currentStore.detail);
          // @ts-ignore
          inputSubMerchantId.setAttribute('value', currentStore.merchantId);
        }else{
          setStore(0);
          currentStore = storeList[0]
          alert("Store is not available in your location!");
        }


        let open = false;
        const time = '09.00-18.59'
        const now = moment();

        const dow = now.day();
        console.log(dow);

        const combine = time.split('-')
        const opening_time = moment(combine[0], 'hh:mm:ss')
        const closing_time = moment(combine[1], 'hh:mm:ss')

        if (opening_time.isValid() && closing_time.isValid()) {
          console.log(opening_time.isValid() && closing_time.isValid()) // shows always true
          if (now.isBetween(opening_time, closing_time)) {
            open = true
          }
        }
        console.log(open)


        // const westminsterArray = [[westminsterA1], [westminsterA2], [westminsterB1], [westminsterB2], [westminsterC1], [westminsterC2], [westminsterD1], [westminsterD2]];
        // let newArray = [[surreyArray], [burnabyArray], [westminsterArray]];
        // const numNewArray =
        //   console.log(regValueArray(surreyArray))
        //
        // console.log(numCoordsArray);

          }
    });


  }

  checkValid() {

  }

  render() {
    const outputEntranceData = entranceData;
    const priceList = getFromStorage('priceList');
    // console.log(priceList);

    const { cartList } = this.state;
    const hiddenFormType = 'text';

    // const inputSection = (name: string, value: string | undefined, placeholder: string, isReadOnly: boolean) => {
    //   return (
    //     <tr>
    //       <td className={styles.leftCell}>
    //         <span>{name}:</span>
    //       </td>
    //       <td colSpan={2}>
    //         <input type="text" placeholder={placeholder} value={value} className={styles.inputStyle}
    //                readOnly={isReadOnly}/>
    //       </td>
    //     </tr>
    //   );
    // };

    console.log(
      {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        street: this.state.street,
        city: this.state.city,
        province: this.state.province,
        postalCode: this.state.postalCode,
        currentStore: this.state.currentStore,
        subtotal: priceList.subtotal,
        tax: priceList.tax,
        deliveryFee: priceList.deliveryFee,
        amountInDollar: priceList.total,
        projectId: outputEntranceData.projectId,
        merchantId: outputEntranceData.merchantId,
        merchantName: outputEntranceData.merchantName,
        payType: outputEntranceData.payType,
        openId: outputEntranceData.openId,
        cartList: this.state.cartList,
      },
    );
    return (
      <Fragment>

        <form id="myForm" name="mainForm" action="putorder" method="post" className={styles.background}>

          <div className={styles.headerCanvas}>
            <div className={styles.headerCanvasTitle}>Shipping Info
              <button className={styles.headerCanvasBack} onClick={() => {
                this.goBack();
              }}>Back</button>
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
              <td className={styles.leftCell}>
                <span>Name:</span>
              </td>
              <td colSpan={2}>
                <input type="text" name={'name'}
                       placeholder={'input name'}
                       className={styles.inputStyle}
                       onChange={(e) => this.setState({ name: e.target.value })}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}>
                <span>Phone:</span>
              </td>
              <td colSpan={2}>
                <input type="tel"
                       name={'phone'}
                       placeholder={'phone'}
                       className={styles.inputStyle}
                       onChange={(e) => this.setState({ phone: e.target.value })}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}>
                <span>Email:</span>
              </td>
              <td colSpan={2}>
                <input type="email"
                       name={'email'}
                       placeholder={'email'}
                       className={styles.inputStyle}
                       onChange={(e) => this.setState({ email: e.target.value })}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}>
                <span>Street:</span>
              </td>
              <td colSpan={2}>
                <input type="text"
                       name={'street'}
                  // value={this.state.street}
                       onChange={this.handleChange.bind(this)}
                       placeholder={'street'}
                       className={styles.inputStyle}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}>
                <span>City:</span>
              </td>
              <td colSpan={2}>
                <input type="text"
                       name={'city'}
                  // value={this.state.city}
                       onChange={this.handleChange.bind(this)}
                       placeholder={'city'}
                       className={styles.inputStyle}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}>
                <span>Province:</span>
              </td>
              <td colSpan={2}>
                <input type="text"
                       name={'province'}
                       onChange={this.handleChange.bind(this)}
                       value={'BC'}
                       className={styles.inputStyle}
                       readOnly
                />
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}>
                <span>Postal Code:</span>
              </td>
              <td colSpan={2}>
                <input type="text"
                       name={'postalCode'}
                  // value={this.state.postalCode}
                       onChange={this.handleChange.bind(this)}
                       placeholder={'postal code'}
                       className={styles.inputStyle}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}>
                <span>Store:</span>
              </td>
              <td>
                <span>{storeList[this.state.currentStore].name}</span>
              </td>
              <td>
                <Button size={'small'} onClick={() => this.checkAvailablility()}> check available</Button>
              </td>
            </tr>
            </tbody>
          </table>

          <input type={hiddenFormType}
                 name={'comment'}
                 value={getFromStorage('comment')}
                 readOnly
          />
          <input type={hiddenFormType}
                 id={'currentStore'}
                 name={'currentStore'}
                 readOnly
          />
          <input type={hiddenFormType} name={'subtotal'} value={priceList.subtotal} readOnly/>
          <input type={hiddenFormType} name={'tax'} value={priceList.tax} readOnly/>
          <input type={hiddenFormType} name={'deliveryFee'} value={priceList.deliveryFee} readOnly/>
          <input type={hiddenFormType} name={'amountInDollar'} value={priceList.total} readOnly/>

          <input type={hiddenFormType} name={'project_id'} value={outputEntranceData.projectId} readOnly/>
          <input type={hiddenFormType} name={'merchant_id'} value={outputEntranceData.merchantId} readOnly/>
          <input type={hiddenFormType} name={'merchantName'} value={outputEntranceData.merchantName} readOnly/>
          <input type={hiddenFormType} name={'pay_type'} value={outputEntranceData.payType} readOnly/>
          <input type={hiddenFormType} name={'openId'} value={outputEntranceData.openId} readOnly/>
          <input type={hiddenFormType} name={'cartList'} value={this.state.cartList} readOnly/>
          <input type={hiddenFormType} name={'order_desc'} value={'pizzapizza'} readOnly/>
          <input type={hiddenFormType}
                 id={'sub_merchantId'}
                 name={'sub_merchantId'}
                 value={storeList[this.state.currentStore].merchantId}
                 readOnly/>
          <input type={hiddenFormType} name={'amount'} value={1} readOnly/>

          <input type={hiddenFormType} name={'merchantName'} value={outputEntranceData.merchantName} readOnly/>

          <div className={styles.inline}>
            <Button className={styles.cancel} onClick={() => this.clearCart()}>Clear Cart</Button>
            <Button className={styles.next} onClick={() => this.goPay()}>Next</Button>
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
