import React, { Component } from 'react';
import styles from './index.css';
import {awsS3baseUrl} from '@/constants/env'
import loadingPizzaBig from '../../assets/spinning_med.gif';


interface IMenuTabsProps {
  briefDetailData: any
}

interface IMenuTabsStates {
}

class BriefDetail extends Component<IMenuTabsProps, IMenuTabsStates> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { briefDetailData } = this.props;
    return briefDetailData ? (
      <div>
          <LoadingPics picUrl={awsS3baseUrl + briefDetailData.pic} picName={briefDetailData.name}/>
        <div className={styles.textArea}>
          <div className={styles.textAreaInner}>
            <div className={styles.pizzaName}>{briefDetailData.name}</div>
            <div className={styles.pizzaDesc}>{briefDetailData.desc}</div>
            <div className={styles.pizzaCal}>{briefDetailData.cal}</div>
            <div className={styles.pizzaPrice}>${briefDetailData.price}</div>
          </div>
        </div>
      </div>
    ) : (<div/>);
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

  render() {
    const isShowStyle = { 'display': 'inline-block' };
    const isHiddenStyle = { 'display': 'none' };
    return (
      <div className={styles.picArea}>
        <img src={this.props.picUrl} alt={this.props.picName}
             onLoad={() => {
               this.setState({ loaded: true });
             }}
             className={styles.pizzaImage} style={this.state.loaded ? isShowStyle : isHiddenStyle}/>
        <img src={loadingPizzaBig} className={styles.pizzaImage} alt="" style={!this.state.loaded ? isShowStyle : isHiddenStyle}/>
      </div>

    );
  }
}


export default BriefDetail;
