import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { getFromStorage, isEmpty } from '@/utils/tools';
import { number, string } from 'prop-types';
import { Button } from 'antd';
import router from 'umi/router';
import styles from './index.css';


interface CartPageProps {
  restaurants: any;
  dispatch: any;
}

interface CartPageStates {
  cartList: any | undefined,
  newCartList: any,
  totalPrice: number | undefined
}


class CartPage extends Component<CartPageProps, CartPageStates> {
  constructor(props: any) {
    super(props);
    console.log(getFromStorage('cartList'));
    let reformed: any = {};
    if (getFromStorage('cartList') !== null) {
      console.log(111);
      reformed = this.reformer(getFromStorage('cartList'));
    }
    this.props.dispatch({ type: 'restaurants/fetchSaveNewCartList', payload: reformed.newCartList });
    this.props.dispatch({ type: 'restaurants/fetchSaveTotalPrice', payload: reformed.totalPrice });

    this.state = {
      cartList: getFromStorage('cartList'),
      newCartList: reformed.newCartList,
      totalPrice: reformed.totalPrice,
    };

  }

  clearCart() {
    this.props.dispatch({ type: 'restaurants/fetchCartList', payload: [] });
    router.push('/HomePage');
  }

  reformer(cartList: Array<any>) {
    let newCartList: Array<any> = [];
    let totalPrice = 0;
    for (let i = 0; i < cartList.length; i++) {
      const cartItem = cartList[i];
      let newCartItem = {
        name: string,
        basePrice: number,
        options: [],
        itemTotalPrice: 0,
        quantity: 0,
      };
      newCartItem.name = cartItem.briefDetail.name;
      newCartItem.basePrice = cartItem.briefDetail.price;
      newCartItem.itemTotalPrice += cartItem.briefDetail.price;
      newCartItem.quantity = cartItem.quantity;
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
          newCartItem.itemTotalPrice += target.price;
          // @ts-ignore
          cartItemOption.options.push(cartItemOptionOption);
        } else if (cartItem.options[index].type === 'multiple') {
          for (let index2 = 0; index2 < cartItem.optionsChoosed[index].length; index2++) {
            const target = cartItem.options[index].options[cartItem.optionsChoosed[index][index2]];
            cartItemOptionOption = {
              name: target.name,
              price: target.price,
            };
            newCartItem.itemTotalPrice += target.price;
            // @ts-ignore
            cartItemOption.options.push(cartItemOptionOption);
          }
        }
        // @ts-ignore
        newCartItem.options.push(cartItemOption);
      }
      totalPrice += newCartItem.itemTotalPrice * newCartItem.quantity;
      newCartList.push(newCartItem);
    }
    console.log((newCartList));
    return {
      newCartList,
      totalPrice,
    };
  }

  goShipping() {
    router.push('/ShippingPage');
  }

  goBack(){
    router.goBack()
  }
  render() {
    const { newCartList, totalPrice } = this.state;
    console.log(newCartList);
    return (
      <Fragment>

        <div className={styles.headerCanvas}>
          <div className={styles.headerCanvasBackButton} onClick={()=>this.goBack()}>&lt;&nbsp;Back</div>

          <div className={styles.headerCanvasTitle}>Review the cart
          </div>
        </div>
        <hr className={styles.titleDivider}/>
        <div className={styles.subheader}>Your Order</div>
        {
          !isEmpty(newCartList) && newCartList.map((el1: any, index1: any) => {
            return (
              <div className={styles.background} key={index1}>
                <table className={styles.tableStyle}>
                  <tr>
                    <td className={styles.leftCell}>
                      <div className={styles.nameLabel} key={index1}>
                        {`${el1.name} * ${el1.quantity}`}
                      </div>
                    </td>
                    <td className={styles.rightCell}>
                      <div className={styles.highlightBlue}>
                        {`$${el1.itemTotalPrice * el1.quantity}`}
                      </div>
                    </td>
                  </tr>
                </table>
                {
                  el1.options.map((el2: any, index2: any) => {
                    return (
                      <div key={index2}>
                        {
                          el2.options.map((el3: any, index3: any) => {
                            return (
                              <table className={styles.tableStyle} key={index3}>
                                <tr>
                                  <td className={styles.leftCell}>
                                    <div>
                                      {el3.name}
                                    </div>
                                  </td>
                                  <td className={styles.rightCell}>
                                    <div className={styles.highlightBlue}>
                                      {`$${el3.price * el1.quantity}`}
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            );
                          })
                        }
                      </div>
                    );
                  })
                }
                <div className={styles.separateLine}>
                </div>
              </div>
            );
          })
        }

        <div className={styles.summaryArea}>
          <div className={styles.total}>Subtotal
            <div className={styles.totalPrice}>
              {this.state.totalPrice}
            </div>
          </div>
          <div className={styles.total}>Tax
            <div className={styles.totalPrice}>
              {this.state.totalPrice && parseFloat(String(this.state.totalPrice * 0.13)).toFixed(2)}
            </div>
          </div>
          <div className={styles.total}>
            Delivery Fee
            <div className={styles.totalPrice}>
              {1234}
            </div>
          </div>
          <div className={styles.total}>
            Total
            <div className={styles.totalPrice}>
              {this.state.totalPrice && parseFloat(String(this.state.totalPrice * 1.13)).toFixed(2)}
            </div>
          </div>
        </div>


        <div style={{ width: '90%', textAlign: 'left', margin: '0 5%' }}>
          <div className={styles.separateLine}>
          </div>
          {/*<Button type={'primary'}>delete</Button>*/}
          <div className={styles.notesText}>Additional Notes:</div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <input className={styles.textarea}
                   placeholder="Hello PizzaPizza, I need..."/>
          </div>
        </div>

        <div className={styles.inline}>
          <Button className={styles.cancel} onClick={()=>this.clearCart()}>Clear Cart</Button>
          <Button className={styles.next} onClick={() => this.goShipping()}>Next</Button>
        </div>
      </Fragment>
    );
  }
}


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(CartPage);
