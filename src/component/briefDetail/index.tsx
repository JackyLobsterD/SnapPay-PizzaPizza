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
        <div className={styles.picArea}>
          <img className={styles.pizzaImage} src={briefDetailData.pic} alt={briefDetailData.name}/>
        </div>
        <div className={styles.textArea}>
          <div className={styles.textAreaInner}>
            <div className={styles.pizzaName}>{briefDetailData.name}</div>
            <div className={styles.pizzaDesc}>{briefDetailData.desc}</div>
            <div className={styles.pizzaCal}>{briefDetailData.cal}</div>
            <div className={styles.pizzaPrice}>${briefDetailData.price}</div>
          </div>
        </div>
      </Fragment>
    ):(<Fragment/>);
  }
}

export default BriefDetail;
