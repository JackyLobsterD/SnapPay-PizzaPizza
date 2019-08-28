import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import MenuTabs from '@/component/MenuTabs';
import MenuItems from '@/component/MenuItems';
import { isEmpty, getFromStorage } from '@/utils/tools';
import router from 'umi/router';
import { Button} from 'antd'
import styles from './index.css';
import { storeList } from '@/constants/stores';


interface HomePageProps {
  restaurants: any;
  dispatch: any;
  // location: any;
  // fetching: any;
}

interface HomePageStates {
  menuItemTitle: string;
  menuItemTitleIndex: number;
  currentMenu: any;
  visible: boolean,
  displayCart: true
}


class HomePage extends Component<HomePageProps, HomePageStates> {
  constructor(props: any) {
    super(props);
    this.props.dispatch({ type: 'restaurants/fetchPizzaPizzaTemplate' });
    this.state = {
      menuItemTitle: '',
      menuItemTitleIndex: 0,
      currentMenu: {},
      visible: false,
      displayCart: true,
    };
    // this.handleChange = this.handleChange.bind(this);


    /*this.showCartInstance = (
      <div onClick={this.handleChange}>
        <Button className={styles.viewCart} onClick={this.goToCart.bind(this)} >View Cart</Button>
      </div>
    )*/
  }

/*  toggleBtn = () =>{
    const {displayCart} = this.state;
    this.setState({
      displayCart: !displayCart
    })
  }*/

  handleChange(event:any){
    this.setState({
      visible: true
    })
  }

  tabOnClick = (menuItemTitle: string, menuItemTitleIndex: number) => {

    // const { pizzaPizzaTemplate } = this.props.restaurants;
    const pizzaPizzaTemplate = getFromStorage('pizzaPizzaTemplate');


    const currentMenu = pizzaPizzaTemplate.data.menuPage.details[menuItemTitleIndex];
    this.setState({ menuItemTitle, menuItemTitleIndex, currentMenu});
  };

  itemOnClick = (itemId: string, itemIndex:number) => {
    const { currentMenu } = this.state;
    console.log(currentMenu.foodOptions[itemIndex]);
    this.props.dispatch({ type: 'restaurants/fetchCurrentItemDetails' , payload: currentMenu.foodOptions[itemIndex]});
    router.push('/ItemInfo');

  };

  showCart = () => {
    this.setState({
      visible: true
    });
    if(this.goToCart() === null){
      styles.viewCart.display = "none";
    }
  };





  clearCart() {
    this.props.dispatch({ type: 'restaurants/fetchCartList', payload: [] });
  }

  goToCart(){
    let cartList= getFromStorage('cartList')
    if (!cartList||!cartList[0]){
      alert('No item in cart')
    } else{
      router.push('/CartPage')
    }
  }

  render() {
    const { pizzaPizzaTemplate } = this.props.restaurants;
    const { currentMenu } = this.state;
    // console.log(getFromStorage('cartList'))
    // console.log(this.state.visible )
    if(!isEmpty(getFromStorage('cartList'))&&!this.state.visible){
      this.setState({visible:true})
    }
    let menuList = [];
    if (!isEmpty(pizzaPizzaTemplate)) {
      menuList = pizzaPizzaTemplate.data.menuPage.details.map((item: any) => {
        return item.category;
      });
    }
    return (
      <Fragment>
        <div className={styles.background}>
          <MenuTabs menuList={menuList} callbackFunc={this.tabOnClick}/>
          <MenuItems currentMenu={currentMenu} callbackFunc={this.itemOnClick}/>
          <div className={styles.footer}>
            <div className={styles.footerTitle}>Pizza Pizza Customer Service:</div>
            <span><a href="Tel:(604)-277-1111">(604)-277-1111</a></span>
            <div className={styles.footerTitle}>Store Locations:</div>
            {
              storeList.map((item, key)=>{
                if(key===0){
                  return null
                }else{
                  return(
                    <div className={styles.footerInfo}>{item.city}: {item.street}, {item.postalCode}</div>
                  )
                }
              })
            }
            <div className={styles.footerTitle}>Snappay Customer Service:</div>
            <span><a href="Tel:1(888)-660-7729">1(888)-660-7729</a></span>

            <div className={styles.copyright}>© 2019 Snappay Inc. All Rights Reserved.</div>
          </div>
        </div>

        {this.state.visible&&<Button className={styles.viewCart} onClick={this.goToCart.bind(this)} >View Cart</Button>}


      </Fragment>
    );
  }
}


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(HomePage);
