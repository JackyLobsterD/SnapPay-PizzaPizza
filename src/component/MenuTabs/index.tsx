import React, { Component, Fragment } from 'react';
import styles from './index.css';

interface IMenuTabsProps {
  menuList: Array<string>,
  callbackFunc: any,
  visible?: boolean,
}

interface IMenuTabsStates {
  activeTab: number
}

class MenuTabs extends Component<IMenuTabsProps, IMenuTabsStates> {
  constructor(props: any) {
    super(props);
    this.state = { activeTab: 0 };
    this.props.callbackFunc(this.props.menuList[0], 0);
  }

  clickAction = (item: any, key: any) => {
    this.setState({ activeTab: key });
    this.props.callbackFunc(item, key);
  };

  render() {
    const { menuList } = this.props;
    const { activeTab } = this.state;
    const myStyle = { 'backgroundColor': 'black', 'color': 'white' };
    return (
      <Fragment>
        <div className={styles.tab}>
          {
            menuList.map((item, key) => {
              return (
                <div onClick={() => this.clickAction(item, key)} key={key} style={key === activeTab ? myStyle : {}}>
                  {item}
                </div>
              );
            })
          }
        </div>
      </Fragment>
    );
  }
}

export default MenuTabs;
