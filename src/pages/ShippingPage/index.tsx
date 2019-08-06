import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Modal, Select } from 'antd';
import styles from './index.css';
// @ts-ignore
import geocoder from 'google-geocoder';
// @ts-ignore
import classifyPoint from 'robust-point-in-polygon';
import { getFromStorage } from '@/utils/tools';
import router from 'umi/router';
import { placeholder } from '@babel/types';

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
  currentStore: string;
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
      currentStore: 'NOT AVAILABLE'
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

  checkAvailablility(){
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
  render() {
    const outputEntranceData = entranceData;
    const { cartList } = this.state;
    const hiddenFormType = 'text';

    const inputSection=(name:string, value:string|undefined, placeholder:string, isReadOnly:boolean)=>{
      return(
        <tr>
          <td className={styles.leftCell}>
            <span>{name}:</span>
          </td>
          <td colSpan={2}>
            <input type="text" placeholder={placeholder} value={value} className={styles.inputStyle} readOnly={isReadOnly}/>
          </td>
        </tr>
      )
    }
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
            <tr>
              <td colSpan={3}>
                <div>Enter Shipping Information</div>
              </td>
            </tr>
            {/*{inputSection('NameTest',undefined, 'input name',false)}*/}
            <tr>
              <td className={styles.leftCell}>
                <span>Name:</span>
              </td>
              <td colSpan={2}>
                <input pattern="[A-Za-z]{3}" type="text" name={'name'} placeholder={'input name'} className={styles.inputStyle} />
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}>
                <span>Phone:</span>
              </td>
              <td colSpan={2}>
                <input type="tel" name={'phone'} placeholder={'phone'} className={styles.inputStyle}/>
              </td>
            </tr>
            <tr>
              <td className={styles.leftCell}>
                <span>Email:</span>
              </td>
              <td colSpan={2}>
                <input type="email" name={'email'} placeholder={'email'} className={styles.inputStyle}/>
              </td>
            </tr>

            <tr>
              <td className={styles.leftCell}>
                <span>Street:</span>
              </td>
              <td colSpan={2}>
                <input type="text"
                       name={'street'}
                       value={this.state.street}
                       onChange={this.handleChange.bind(this)}
                       placeholder={'street'}
                       className={styles.inputStyle}/></td>
            </tr>

            <tr>
              <td className={styles.leftCell}>
                <span>City:</span>
              </td>
              <td colSpan={2}>
                <input type="text"
                       name={'city'}
                       value={this.state.city}
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
                       value={this.state.postalCode}
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
                <span>{this.state.currentStore}</span>
              </td>
              <td>
                <Button size={'small'} onClick={()=>this.checkAvailablility()}> check available</Button>
              </td>
            </tr>
          </table>

          <div className={styles.inline}>
            <Button className={styles.cancel} onClick={() => this.clearCart()}>Clear Cart</Button>
            <Button className={styles.next} onClick={()=>this.goPay()}>Next</Button>
          </div>

          <input type={hiddenFormType} name={'currentStore'} value={this.state.currentStore} readOnly/>

          <input type={hiddenFormType} name={'projectId'} value={outputEntranceData.projectId} readOnly/>
          <input type={hiddenFormType} name={'merchantId'} value={outputEntranceData.merchantId} readOnly/>
          <input type={hiddenFormType} name={'merchantName'} value={outputEntranceData.merchantName} readOnly/>
          <input type={hiddenFormType} name={'payType'} value={outputEntranceData.payType} readOnly/>
          <input type={hiddenFormType} name={'openId'} value={outputEntranceData.openId} readOnly/>
          <input type={hiddenFormType} name={'cartList'} value={2222} readOnly/>
          {/*<input type={hiddenFormType} name="email" value={'jacky.duan@snappay.ca'}/>*/}
          <input type={hiddenFormType} name="amount" value={1}/>

        </form>
      </Fragment>
    );
  }
}


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(ShippingPage);
