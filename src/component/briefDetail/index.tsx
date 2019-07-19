import React, { Component, Fragment } from 'react';
import styles from './index.css'

interface IMenuTabsProps {
  briefDetailData:any
}

interface IMenuTabsStates {
}

class BriefDetail extends Component<IMenuTabsProps, IMenuTabsStates> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { briefDetailData}=this.props
    return briefDetailData?(
      <Fragment>
        <div>
          <img className={styles.pizzaImage} src="../../assets/buffalo-chicken-pizza.png" alt={briefDetailData.name}/>
        </div>
        <div className={styles.pizzaName}>{briefDetailData.name}</div>
        <div className={styles.pizzaDesc}>{briefDetailData.desc}</div>
        <div className={styles.pizzaCal}>{briefDetailData.cal}</div>
        <div className={styles.pizzaPrice}>${briefDetailData.price}</div>
      </Fragment>
    ):(<Fragment/>);
  }
}

export default BriefDetail;
