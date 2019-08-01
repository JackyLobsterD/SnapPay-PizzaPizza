import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './index.css';
// @ts-ignore
import geocoder from 'google-geocoder';
// @ts-ignore
import classifyPoint from 'robust-point-in-polygon';

interface ShippingPageProps {
  restaurants: any;
  dispatch: any;
  // location: any;
  // fetching: any;
}

interface ShippingPageStates {
  street: string;
  province: string;
  city: string;
  postalCode: string;
}


class ShippingPage extends Component<ShippingPageProps, ShippingPageStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      street: '',
      province: '',
      city: '',
      postalCode: '',
    };

  }

  goPay() {
    const geo = geocoder({ key: 'AIzaSyCuNeDQfFowGcMhp3CeE5LxYN6eR5XjqTE' });
    let coordinates;
    const currentAddress = `${this.state.street},${this.state.city},${this.state.province},${this.state.postalCode}`;
    geo.find(currentAddress, function(err: any, res: any) {
      let coordinatesArray = [];
      coordinates = res[0].location;
      // console.log(coordinates);
      coordinatesArray.push(coordinates.lat, coordinates.lng);
      console.log(coordinatesArray);
      const area1 = [[1, 1], [1, 2], [2, 2], [2, 1]];
      // console.log(classifyPoint(area1, [1.11111, 3.4444234]));


      if (classifyPoint(area1, [1.11111, 3.4444234]) > 0) {
        console.log('gopay');
      } else {
        console.log('not in area');
      }

    });
  }

  handleChange(event: any) {
    // @ts-ignore
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Fragment>

        <form action="">
          <input type="text" placeholder={'input name'} className={styles.inputStyle}/>
          <input type="text" placeholder={'phone'} className={styles.inputStyle}/>
          <input type="text" placeholder={'email'} className={styles.inputStyle}/>
          <input type="text"
                 name={'street'}
                 value={this.state.street}
                 onChange={this.handleChange.bind(this)}
                 placeholder={'street'}
                 className={styles.inputStyle}/>
          <input type="text"
                 name={'city'}
                 value={this.state.city}
                 onChange={this.handleChange.bind(this)}
                 placeholder={'city'}
                 className={styles.inputStyle}/>
          <input type="text"
                 name={'province'}
                 value={this.state.province}
                 onChange={this.handleChange.bind(this)}
                 placeholder={'province'}
                 className={styles.inputStyle}/>
          <input type="text"
                 name={'postalCode'}
                 value={this.state.postalCode}
                 onChange={this.handleChange.bind(this)}
                 placeholder={'postal code'}
                 className={styles.inputStyle}/>
          <input type="text"
                 placeholder={'Choose a store.'}
                 className={styles.inputStyle}/>


        </form>
        <Button onClick={()=>this.goPay()}>go Pay</Button>

        {/*<MapContainer/>*/}
      </Fragment>
    );
  }
}


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(ShippingPage);
