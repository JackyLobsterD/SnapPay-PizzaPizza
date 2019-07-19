import React, { Component, Fragment } from 'react';
import styles from './index.css';
import pizzaCombo from '@/assets/offlinePics/pizza-combo.png';
import { isEmpty } from '@/utils/tools';


interface IMenuItemsProps {
  currentMenu: any,
  callbackFunc: any
}

interface IMenuItemsStates {
}

class MenuItems extends Component<IMenuItemsProps, IMenuItemsStates> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { currentMenu } = this.props;
    // console.log(currentMenu);
    return (
      <Fragment>
        <div className={styles.tab}>
          {
            <div className={styles.tabContent}>
              {
                !isEmpty(currentMenu)&& currentMenu.foodOptions.map((item: any, key: any) => {
                  return (
                    <div className={styles.pizzaMenu} key={key} onClick={()=>{this.props.callbackFunc(item.id, key)}}>
                      <img src={pizzaCombo} alt={item.briefDetail.name}/>
                      <div>{item.briefDetail.name}</div>
                      <div>{item.briefDetail.desc}</div>
                      <div className={styles.pizzaMenuPrice}>${item.briefDetail.price}</div>
                    </div>
                  );
                })
              }
              {
                JSON.stringify(currentMenu)
              }
              this is menuItems


            </div>
          }


        </div>


      </Fragment>


    );

  }
}

export default MenuItems;
