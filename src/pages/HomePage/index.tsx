import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import MenuTabs from '@/component/MenuTabs';
import MenuItems from '@/component/MenuItems';
import { isEmpty, getFromStorage } from '@/utils/tools';
import router from 'umi/router';
import { Button} from 'antd'

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
}


class HomePage extends Component<HomePageProps, HomePageStates> {
  constructor(props: any) {
    super(props);
    this.props.dispatch({ type: 'restaurants/fetchPizzaPizzaTemplate' });
    this.state = {
      menuItemTitle: '',
      menuItemTitleIndex: 0,
      currentMenu: {},
    };
  }

  tabOnClick = (menuItemTitle: string, menuItemTitleIndex: number) => {

    // const { pizzaPizzaTemplate } = this.props.restaurants;
    const pizzaPizzaTemplate = getFromStorage('pizzaPizzaTemplate');


    const currentMenu = pizzaPizzaTemplate.data.menuPage.details[menuItemTitleIndex];
    this.setState({ menuItemTitle, menuItemTitleIndex, currentMenu });
  };

  itemOnClick = (itemId: string, itemIndex:number) => {
    const { currentMenu } = this.state;
    console.log(currentMenu.foodOptions[itemIndex]);
    this.props.dispatch({ type: 'restaurants/fetchCurrentItemDetails' , payload: currentMenu.foodOptions[itemIndex]});
    router.push('/ItemInfo');

  };

  clearCart() {
    this.props.dispatch({ type: 'restaurants/fetchCartList', payload: [] });
  }

  goToCart(){
    router.push('/CartPage')
  }
  render() {
    const { pizzaPizzaTemplate } = this.props.restaurants;
    const { currentMenu } = this.state;
    let menuList = [];
    if (!isEmpty(pizzaPizzaTemplate)) {
      menuList = pizzaPizzaTemplate.data.menuPage.details.map((item: any) => {
        return item.category;
      });
    }
    return (
      <Fragment>
        <MenuTabs menuList={menuList} callbackFunc={this.tabOnClick}/>
        <MenuItems currentMenu={currentMenu} callbackFunc={this.itemOnClick}/>
        <Button onClick={this.goToCart.bind(this)}>go to Cart</Button>
        <Button onClick={this.clearCart.bind(this)}>Clear</Button>


      </Fragment>
    );
  }
}


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(HomePage);
