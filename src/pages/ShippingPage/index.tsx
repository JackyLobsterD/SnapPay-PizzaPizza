import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Modal, Select, Icon } from 'antd';
import styles from './index.css';
// @ts-ignore
import geocoder from 'google-geocoder';
// @ts-ignore
import classifyPoint from 'robust-point-in-polygon';
import { getFromStorage } from '@/utils/tools';
import router from 'umi/router';

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
  storeList: any;
}


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
      email: '',
      storeList:[
        {
          merchantId: '0000',
          name: 'NOT AVAILABLE',
          detail: 'no detail'
        },
        {
          merchantId: 'pizza001',
          name: 'p1',
          detail: 'ppppp1'

        },
        {
          merchantId: 'pizza002',
          name: 'p2',
          detail: 'ppppp2'
        },
        {
          merchantId: 'pizza003',
          name: 'p3',
          detail: 'ppppp3'
        }
      ]
    };

  }

  goPay() {

    // @ts-ignore
    document.getElementById('myForm').submit();


    // const geo = geocoder({ key: 'AIzaSyCuNeDQfFowGcMhp3CeE5LxYN6eR5XjqTE' });
    // let coordinates;
    // const currentAddress = `${this.state.street},${this.state.city},${this.state.province},${this.state.postalCode}`;
    // geo.find(currentAddress, function(err: any, res: any) {
    //   if (res && res.length > 0) {
    //     let coordinatesArray = [];
    //     coordinates = res[0].location;
    //     coordinatesArray.push(coordinates.lat, coordinates.lng);
    //     console.log(coordinatesArray);
    //     const area1 = [[1, 1], [1, 2], [2, 2], [2, 1]];
    //     if (classifyPoint(area1, [1.11111, 3.4444234]) > 0) {
    //       // @ts-ignore
    //       document.getElementById('myForm').submit();
    //       console.log('document.getElementById(\'myForm\').submit();\n');
    //     } else {
    //       console.log('not in area');
    //     }
    //   } else {
    //     confirm({
    //       content: 'invalid address',
    //     });
    //   }
    // });
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
    this.setState({currentStore:1});

    const geo = geocoder({ key: 'AIzaSyCuNeDQfFowGcMhp3CeE5LxYN6eR5XjqTE' });
    let coordinates;
    const currentAddress = `${this.state.street},${this.state.city},${this.state.province},${this.state.postalCode}`;
    geo.find(currentAddress, function(err: any, res: any) {
      if (res && res.length > 0) {
        let coordinatesArray = [];
        coordinates = res[0].location;
        coordinatesArray.push(coordinates.lat, coordinates.lng);
        console.log(coordinatesArray);
        const area1 = [[1, 1], [1, 2], [2, 2], [2, 1]];
        if (classifyPoint(area1, [1.11111, 3.4444234]) > 0) {
          // document.getElementById('myForm').submit();
          console.log('document.getElementById(\'myForm\').submit();\n');
        } else {
          console.log('not in area');
        }
      } else {
        confirm({
          content: 'invalid address',
        });
      }
    });
  }

  checkValid() {

  }

  render() {
    const outputEntranceData = entranceData;
    const priceList = getFromStorage('priceList');
    console.log(priceList);

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
        amountInDollar:priceList.total,
        projectId: outputEntranceData.projectId,
        merchantId: outputEntranceData.merchantId,
        merchantName: outputEntranceData.merchantName,
        payType: outputEntranceData.payType,
        openId: outputEntranceData.openId,
        cartList: this.state.cartList
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
                <span>{this.state.storeList[this.state.currentStore].name}</span>
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
                 name={'currentStore'}
                 value={this.state.storeList[this.state.currentStore].detail}
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
                 name={'sub_merchantId'}
                 value={this.state.storeList[this.state.currentStore].merchantId}
                 readOnly/>
          <input type={hiddenFormType} name={'amount'} value={1} readOnly/>


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
