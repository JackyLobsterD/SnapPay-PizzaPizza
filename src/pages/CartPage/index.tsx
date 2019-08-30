import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { getFromStorage, isEmpty } from '@/utils/tools';
import { number, string } from 'prop-types';
import { Button, Icon } from 'antd';
import router from 'umi/router';
import styles, {example} from './index.css';
interface CartPageProps {
  restaurants: any;
  dispatch: any;
}

interface CartPageStates {
  newCartList: any,
  priceList: any,
  comment: string
}


class CartPage extends Component<CartPageProps, CartPageStates> {
  constructor(props: any) {
    super(props);
    this.operateCartList();
    this.state = {
      newCartList: getFromStorage('newCartList'),
      priceList: getFromStorage('priceList'),
      comment: '',
    };

  }

  operateCartList() {
    const deliveryFee = 5;
    let reformed: any = {};
    if (getFromStorage('cartList') !== null) {
      reformed = this.reformer(getFromStorage('cartList'));
    }
    this.props.dispatch({ type: 'restaurants/saveToNewCartList', payload: reformed.newCartList });
    const subtotal = parseFloat(String(reformed.totalPrice * 1));
    const priceList = {
      subtotal: subtotal.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      tax: parseFloat(String((reformed.totalPrice + deliveryFee) * 0.12)).toFixed(2),
      total: parseFloat(String((reformed.totalPrice + deliveryFee) * 1.12)).toFixed(2),
    };
    this.props.dispatch({ type: 'restaurants/savePriceList', payload: priceList });
    return { newCartList: reformed.newCartList, priceList };
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
          newCartItem.itemTotalPrice = Math.round(newCartItem.itemTotalPrice * 100) / 100;
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
            newCartItem.itemTotalPrice = Math.round(newCartItem.itemTotalPrice * 100) / 100;
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
    totalPrice = Math.round(totalPrice * 100) / 100;

    return {
      newCartList,
      totalPrice,
    };
  }

  goShipping() {
    router.push('/ShippingPage');
  }

  render() {
    const { newCartList } = this.state;
    if (isEmpty(this.state.newCartList)) {
      router.push('/HomePage');
    }
    return (
      <div key={'CartPage'}>


        <div className={styles.headerCanvas}>
          <div className={styles.headerCanvasBackButton} onClick={() => router.goBack()}><Icon type="left"/>Back</div>

          <div className={styles.headerCanvasTitle}>Review Cart
          </div>
        </div>
        <hr className={styles.titleDivider}/>
        <div className={styles.subheader}>Your Order</div>

        <div className={styles.background}>
          <div className={styles.separateLine}>
          </div>
        </div>


          {
            !isEmpty(newCartList) && newCartList.map((el1: any, index1: any) => {
              return (
                <div className={styles.background} key={index1}>
                  <table className={styles.tableStyle}>
                    <tr>
                      <td className={styles.leftCell}>
                        <div className={styles.nameLabel} key={index1}>
                          <span>{el1.name} </span>
                          <span style={{ color: '#2e94e4' }}>x {el1.quantity}</span>
                        </div>
                      </td>
                      <td className={styles.rightCell}>
                        <div className={styles.highlightBlue}>
                          {`$${(el1.basePrice * el1.quantity).toFixed(2)}`}
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
                                        {`+ $${(el3.price * el1.quantity).toFixed(2)}`}
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

                  <div className={styles.deleteButton}>
                    <Button style={{ 'float': 'right' }} type={'danger'} onClick={() => {
                        const tempCartList = getFromStorage('cartList');
                        tempCartList.splice(index1, 1);
                        this.props.dispatch({ type: 'restaurants/saveToCartList', payload: tempCartList });
                        const { newCartList, priceList } = this.operateCartList();
                        this.setState({ newCartList, priceList });
                    }}>Remove</Button>
                  </div>


                  <div className={styles.separateLineShort}>
                  </div>

                </div>
              );
            })
          }
        <div className={styles.summaryArea}>
          <div className={styles.total}>Subtotal
            <div className={styles.totalPrice}>
              ${this.state.priceList.subtotal}
            </div>
          </div>

          <div className={styles.total}>
            Delivery Fee
            <div className={styles.totalPrice}>
              ${this.state.priceList.deliveryFee}
            </div>
          </div>

          <div className={styles.total}>Tax (PST/GST)
            <div className={styles.totalPrice}>
              ${this.state.priceList.tax}
            </div>
          </div>

          <div className={styles.completeTotal}>
            Total
            <div className={styles.completeTotalPrice}>
              ${this.state.priceList.total}
            </div>
          </div>
        </div>

        <div className={styles.commentArea}>
          <div className={styles.separateLine}>
          </div>
          <div className={styles.notesText}>Additional Notes:</div>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <textarea className={styles.textarea}
                      placeholder="Instructions you'd like us to know"
                      onChange={(e) => {
                        this.setState({ comment: e.target.value });
                        this.props.dispatch({ type: 'restaurants/saveComment', payload: e.target.value });
                      }} maxLength={150}/>
          </div>
        </div>

        <div className={styles.buttonArea}>
          <Button className={styles.next} onClick={() => this.goShipping()}>Next</Button>
        </div>
      </div>
    );
  }
}


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(CartPage);
