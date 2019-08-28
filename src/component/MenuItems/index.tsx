import React, { Component, Fragment } from 'react';
import styles from './index.css';
import { isEmpty } from '@/utils/tools';
import { Spin } from 'antd';

interface IMenuItemsProps {
  currentMenu: any,
  callbackFunc: any
}

interface IMenuItemsStates {
  aa:any,
}

const awsS3baseUrl = 'https://snappay-ext.s3-us-west-2.amazonaws.com/pizzapizza/pics/menuPics/';

class MenuItems extends Component<IMenuItemsProps, IMenuItemsStates> {
  constructor(props: any) {
    super(props);
    this.state=({aa:[]})
  }


  handleOnLoading(key:number) {
    let aa = this.props.currentMenu.foodOptions.map((item:any, z:any) =>{
      return key === z? true:this.state.aa[z];
    });
    this.setState({ aa: aa });
}


  render() {
    const { currentMenu } = this.props;
    return (
      <Fragment>
        <div className={styles.tab}>
          {
            <div className={styles.tabContent}>
              {
                !isEmpty(currentMenu) && currentMenu.foodOptions.map((item: any, key: any) => {
                  return (
                    <div className={styles.pizzaMenu} key={key} onClick={() => {
                      this.props.callbackFunc(item.id, key);
                    }}>


                      <div className={styles.picArea}>
                        {/*<Spin spinning={!this.state.aa[key]}>*/}
                          <img src={awsS3baseUrl + item.briefDetail.pic} alt={item.briefDetail.name}
                               onLoad={() => {
                                 this.handleOnLoading(key)
                               }}
                               className={styles.pic}/>
                        {/*</Spin>*/}
                      </div>

                      <div className={styles.textArea}>
                        <div>
                          <div className={styles.pizzaName}>{item.briefDetail.name}</div>
                          <div
                            className={styles.blockWithText}>{item.briefDetail.desc.length < 53 ? item.briefDetail.desc : item.briefDetail.desc.slice(0, 52).concat('...')}</div>
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
