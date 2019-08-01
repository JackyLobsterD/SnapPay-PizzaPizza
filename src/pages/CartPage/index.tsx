import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { getFromStorage } from '@/utils/tools';
import { number, string } from 'prop-types';
import{Button} from 'antd'
import router from 'umi/router';
interface CartPageProps {
  restaurants: any;
  dispatch: any;
  // location: any;
  // fetching: any;
}

interface CartPageStates {
  cartList: any|undefined,
  newCartList: any,
  totalPrice: number| undefined
}


class CartPage extends Component<CartPageProps, CartPageStates> {
  constructor(props: any) {
    super(props);
    console.log(getFromStorage('cartList'));
    let reformed:any={}
    if(getFromStorage('cartList')!==null){
      console.log(111);
      reformed = this.reformer(getFromStorage('cartList'));
    }





    this.state = {
      cartList: getFromStorage('cartList'),
      newCartList: reformed.newCartList,
      totalPrice: reformed.totalPrice
    };

  }

  clearCart() {
    this.props.dispatch({ type: 'restaurants/fetchCartList', payload: [] });
  }

  reformer(cartList: Array<any>) {
    let newCartList: Array<any> = [];
    let totalPrice=0
    for (let i = 0; i < cartList.length; i++) {
      const cartItem = cartList[i];
      let newCartItem = {
        name: string,
        basePrice: number,
        options: [],
        itemTotalPrice: 0,
      };
      newCartItem.name = cartItem.briefDetail.name;
      newCartItem.basePrice = cartItem.briefDetail.price;
      newCartItem.itemTotalPrice += cartItem.briefDetail.price;
      for (let index in cartItem.optionsChoosed) {
        let cartItemOption = { name: '', options: [] };
        let cartItemOptionOption = {};
        cartItemOption.name = cartItem.options[index].name;
        if (cartItem.options[index].type === 'single') {
          const target = cartItem.options[index].options[cartItem.optionsChoosed[index]];
          cartItemOptionOption = {
            name: target.name,
            price: target.price,
          };
          newCartItem.itemTotalPrice += target.price
          // @ts-ignore
          cartItemOption.options.push(cartItemOptionOption);
        } else if (cartItem.options[index].type === 'multiple') {
          for (let index2 = 0; index2 < cartItem.optionsChoosed[index].length; index2++) {
            const target = cartItem.options[index].options[cartItem.optionsChoosed[index][index2]];
            cartItemOptionOption = {
              name: target.name,
              price: target.price,
            };
            newCartItem.itemTotalPrice += target.price
            // @ts-ignore
            cartItemOption.options.push(cartItemOptionOption);
          }
        }
        // @ts-ignore
        newCartItem.options.push(cartItemOption);
      }
      totalPrice += newCartItem.itemTotalPrice
      newCartList.push(newCartItem);
    }
    console.log((newCartList));
    return {
      newCartList,
      totalPrice
    };
  }

  goShipping(){
    router.push('/ShippingPage');
  }
  render() {
    const { cartList , newCartList, totalPrice} = this.state;
    // const {briefDetail}=cartList;
    // console.log(cartList);
    // console.log(briefDetail);
    // console.log(briefDetail.name);

    return (
      <Fragment>
        {
          newCartList&&newCartList.map((el1:any, index1: any)=>{
            return(
              <div key={index1}>
                {el1.name} {`$${el1.itemTotalPrice}`}
                {
                  el1.options.map((el2: any, index2: any)=>{
                    return(
                      <div key={index2}>
                        {el2.name}:
                        {
                          el2.options.map((el3:any, index3:any)=>{
                            return(
                              <div key={index3}>
                                {el3.name}
                                {el3.price!==0&& `$${el3.price}`}
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }

              </div>
            )
          })
        }
        {
          !newCartList&&<div>EMPTY</div>
        }
        $$${
          totalPrice
        }

        <Button onClick={this.goShipping}>go input Info</Button>
      </Fragment>
    );
  }
}


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(CartPage);
