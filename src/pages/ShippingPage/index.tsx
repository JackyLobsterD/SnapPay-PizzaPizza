import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { getFromStorage } from '@/utils/tools';
import { number, string } from 'prop-types';
import { Button } from 'antd'
import router from 'umi/router';

interface ShippingPageProps {
  restaurants: any;
  dispatch: any;
  // location: any;
  // fetching: any;
}

interface ShippingPageStates {
}


class ShippingPage extends Component<ShippingPageProps, ShippingPageStates> {
  constructor(props: any) {
    super(props);
    this.state = {
    };

  }

  goPay() {
    router.push('/ShippingPage');
  }

  render() {
    return (
      <Fragment>

        <form action="">
          <input type="text" placeholder={'input name'}/>
          <input type="text" placeholder={'phone'}/>
          <input type="text" placeholder={'email'}/>
          <input type="text" placeholder={'street'}/>
          <input type="text" placeholder={'city'}/>
          <input type="text" placeholder={'province'}/>
          <input type="text" placeholder={'postal code'}/>

          <input type="text" placeholder={'Choose a store.'}/>


        </form>
        <Button onClick={this.goPay}>go Pay</Button>
      </Fragment>
    );
  }
}


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(ShippingPage);
