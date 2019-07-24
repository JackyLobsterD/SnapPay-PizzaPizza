import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { getFromStorage } from '@/utils/tools';
import BriefDetail from '@/component/briefDetail';
import ExtraList from '@/component/ExtraList';
import { Button, Select } from 'antd';
import router from 'umi/router';

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
    if (extraListError.length === 0) {
      const newItemWithQuantity = Object.assign({}, newItem, { quantity });
      this.props.dispatch({ type: 'restaurants/fetchCartList', payload: newItemWithQuantity });
      router.goBack();
    }else{
      this.setState({extraListError})
    }

    // console.log(this.state.newItem);
  }

  clearCart() {
    this.props.dispatch({ type: 'restaurants/fetchCartList', payload: [] });
  }

  handleQuantityChange(value: number) {
    this.setState({
      quantity: value,
    });
  }

  render() {
    const { currentItemDetails } = this.state;
    const { briefDetail, options } = currentItemDetails;
    const { Option } = Select;
    const quantityCombo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // console.log(currentItemDetails);
    return (
      <Fragment>
        <BriefDetail briefDetailData={briefDetail}/>
        <ExtraList options={options} callbackFunc={this.getExtraList.bind(this)} extraListError={this.state.extraListError}/>


        <Select defaultValue={1} onChange={this.handleQuantityChange.bind(this)}>
          {quantityCombo.map((item, key) => {
            return (
              <Option value={item} key={key}>{item}</Option>
            );
          })}
        </Select>
        <br/>
        <div>
          <Button onClick={this.addToCart.bind(this)}>add to cart</Button>
        </div>
        <div>
          <Button onClick={this.clearCart.bind(this)}>clear</Button>
        </div>
      </Fragment>
    );
  }
}


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(ItemInfo);
