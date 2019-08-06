import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { getFromStorage, isEmpty } from '@/utils/tools';
import BriefDetail from '@/component/briefDetail';
import ExtraList from '@/component/ExtraList';
import { Button, Select } from 'antd';
import router from 'umi/router';
import styles from './index.css';

interface HomePageProps {
  restaurants: any;
  dispatch: any;
  // location: any;
  // fetching: any;
}

interface HomePageStates {
  currentItemDetails: any;
  newItem: any;
  quantity: number;
  extraListError: any;
}


class ItemInfo extends Component<HomePageProps, HomePageStates> {
  constructor(props: any) {
    super(props);
    const currentItemDetails = getFromStorage('currentItemDetails');
    this.state = { currentItemDetails, newItem: {}, quantity: 1, extraListError: {}};
  }

  getExtraList(value: any) {
    const { currentItemDetails } = this.state;
    const newItem = Object.assign({}, currentItemDetails, { optionsChoosed: value });
    // console.log(newItem);
    this.setState({ newItem });
  }


  addToCart() {
    const error = { error: '1' };
    const { newItem, quantity } = this.state;
    const { optionsChoosed } = newItem;
    let extraListError:any = {};
    newItem.options.forEach((item: any, index: any) => {
      if (item.type === 'multiple' && item.rules && item.rules.required === true) {
        if (!optionsChoosed[index]|| optionsChoosed[index].length===0) {
          const errorObj = { [index]: 1 };
          extraListError=Object.assign({}, extraListError, errorObj)
        }else if (item.rules.maxNum && item.rules.maxNum > 0 && optionsChoosed[index].length < item.rules.maxNum) {
          const errorObj = { [index]: 2 };
          extraListError = Object.assign({}, extraListError, errorObj)
        }else if (item.rules.minNum && item.rules.maxNum > 0 && optionsChoosed[index].length > item.rules.maxNum) {
          const errorObj = { [index]: 3 };
          extraListError = Object.assign({}, extraListError, errorObj)
        }
      }
    });

    if (isEmpty(extraListError)) {
      console.log(222);
      const newItemWithQuantity = Object.assign({}, newItem, { quantity });
      this.props.dispatch({ type: 'restaurants/fetchCartList', payload: newItemWithQuantity });
      console.log(newItemWithQuantity);
      router.goBack();
    }else{
      this.setState({extraListError})
    }

    // console.log(this.state.newItem);
  }

  clearCart() {
    this.props.dispatch({ type: 'restaurants/fetchCartList', payload: [] });
  }

  increaseValue() {
    this.setState({
      quantity: this.state.quantity+1,
    });
  }

  decreaseValue() {
    if(this.state.quantity>1){
      this.setState({
        quantity: this.state.quantity - 1,
      });
    }
  }

  goBack() {
    router.goBack()
  }

  render() {
    const { currentItemDetails } = this.state;
    const { briefDetail, options } = currentItemDetails;
    const { Option } = Select;
    const quantityCombo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // console.log(currentItemDetails);
    return (
      <Fragment>
        <div className={styles.background}>
          <div className={styles.headerCanvas}>
            <div className={styles.headerCanvasBackButton} onClick={() => this.goBack()}>&lt;&nbsp;Back</div>

            <div className={styles.headerCanvasTitle}>
            </div>
          </div>

        <BriefDetail briefDetailData={briefDetail}/>
        <ExtraList options={options} callbackFunc={this.getExtraList.bind(this)} extraListError={this.state.extraListError}/>

          <form className={styles.quantity}>
            <div className={styles.valueButton} onClick={()=>this.decreaseValue()}>-
            </div>
            <div className={styles.valueNumber}>
              {this.state.quantity}
            </div>
            <div className={styles.valueButton} onClick={()=>this.increaseValue()}>+
            </div>
          </form>
        <br/>
          <div>
            <Button onClick={this.addToCart.bind(this)} className={styles.addCart}>Add To Cart</Button>
          </div>
        {/*<div>*/}
        {/*  <Button onClick={this.addToCart.bind(this)}>add to cart</Button>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <Button onClick={this.clearCart.bind(this)}>clear</Button>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <Button onClick={this.clearCart.bind(this)}>go back</Button>*/}
        {/*</div>*/}
        </div>
      </Fragment>
    );
  }
}


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(ItemInfo);
