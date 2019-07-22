import React, { Component, Fragment } from 'react';
import styles from './index.css'

interface IMenuTabsProps {
  menuList: Array<string>,
  callbackFunc: any
}

interface IMenuTabsStates {
}

class MenuTabs extends Component<IMenuTabsProps, IMenuTabsStates> {
  constructor(props: any) {
    super(props);
    this.props.callbackFunc(this.props.menuList[0], 0)
  }

  render() {
    const { menuList } = this.props;
    return (
      <Fragment>
        <div className={styles.tab}>
          {
            menuList.map((item, key) => {
              return (
                <button onClick={()=>this.props.callbackFunc(item, key)} key={key}>{item}</button>
              );
            })
          }
        </div>
      </Fragment>
    );
  }
}

export default MenuTabs;
