import React, { Component, Fragment } from 'react';
import styles from './index.css';
import { isEmpty } from '@/utils/tools';


interface IMenuItemsProps {
  currentMenu: any,
  callbackFunc: any
}

interface IMenuItemsStates {
}

const awsS3baseUrl='https://snappay-ext.s3-us-west-2.amazonaws.com/pizzapizza/pics/menuPics/'
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
                      <div className={styles.picArea}>
                        <img src={awsS3baseUrl+item.briefDetail.pic} alt={item.briefDetail.name}/>
                      </div>

                      <div className={styles.textArea}>
                        <div style={{verticalAlign:'top'}}>
                          <div className={styles.pizzaName}>{item.briefDetail.name}</div>

                          <div className={styles.pizzaDetail}>{item.briefDetail.desc}</div>

                          <div className={styles.pizzaMenuPrice}>${item.briefDetail.price}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>}
        </div>
      </Fragment>
    );
  }
}

export default MenuItems;
