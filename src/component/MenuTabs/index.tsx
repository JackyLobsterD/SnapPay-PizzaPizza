import React, { Component, Fragment } from 'react';
import styles from './index.css';
import { connect } from 'react-redux';

interface IMenuTabsProps {
  menuList: Array<string>,
  callbackFunc: any,
  visible?: boolean,
  restaurants:any,
}

interface IMenuTabsStates {
  activeTab: number
}

class MenuTabs extends Component<IMenuTabsProps, IMenuTabsStates> {
  constructor(props: any) {
    super(props);
    const { tabIndex}= this.props.restaurants
    this.state = { activeTab: tabIndex };
    this.props.callbackFunc(this.props.menuList[tabIndex], tabIndex);
  }

  clickAction = (item: any, key: any, e: any) => {
    this.setState({ activeTab: key });
    this.props.callbackFunc(item, key);
  };

  render() {
    const { menuList } = this.props;
    const { activeTab } = this.state;
    const myStyle = { 'backgroundColor': 'black', 'color': 'white' };
    return (
      <Fragment>
        <div className={styles.tab} id={'tabs'}>
          {
            menuList.map((item, key) => {

              return (
                <div onClick={(e) => this.clickAction(item, key, e)} key={key} style={key === activeTab ? myStyle : {}}>
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


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(MenuTabs);
