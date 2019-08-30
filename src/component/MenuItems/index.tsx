import React, { Component, Fragment } from 'react';
import styles from './index.css';
import { isEmpty } from '@/utils/tools';
import loadingPizza from '@/assets/spinning_med.gif';


interface IMenuItemsProps {
  currentMenu: any,
  callbackFunc: any
}

interface IMenuItemsStates {
}

const awsS3baseUrl = 'https://snappay-ext.s3-us-west-2.amazonaws.com/pizzapizza/pics/menuPics/';

class MenuItems extends Component<IMenuItemsProps, IMenuItemsStates> {
  constructor(props: any) {
    super(props);
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
                        <LoadingPics picName={item.briefDetail.name} picUrl={awsS3baseUrl + item.briefDetail.pic}/>
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

interface ILoadingPicsProps {
  picUrl: string,
  picName: string
}

interface ILoadingPicsStates {
  loaded: boolean,
}

class LoadingPics extends Component<ILoadingPicsProps, ILoadingPicsStates> {
  constructor(props: any) {
    super(props);
    this.state = { loaded: false };
  }

  shouldComponentUpdate(nextProps:any, nextState:any){
    if (this.props.picUrl!== nextProps.picUrl){
      this.setState({loaded:false})
    }
    return true
  }
    render() {
    const isShowStyle = { 'display': 'inline-block' };
    const isHiddenStyle = { 'display': 'none' };
    return (
      <div className={styles.picArea}>
        <img src={this.props.picUrl} alt={this.props.picName}
             onLoad={() => {
               this.setState({ loaded: true });
             }}
             className={styles.pic} style={this.state.loaded?isShowStyle:isHiddenStyle}/>
        <img src={loadingPizza} alt="" style={!this.state.loaded ? isShowStyle : isHiddenStyle}/>
      </div>

    );
  }
}

export default MenuItems;
