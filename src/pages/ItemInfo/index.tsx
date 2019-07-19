import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { isEmpty } from '@/utils/tools';
import BriefDetail from '@/component/briefDetail'
import ExtraList from '@/component/ExtraList'
interface HomePageProps {
  restaurants: any;
  dispatch: any;
  // location: any;
  // fetching: any;
}

interface HomePageStates {
}


class ItemInfo extends Component<HomePageProps, HomePageStates> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props);


   const {briefDetail, options}= this.props.restaurants.currentItemDetails

    return (
      <Fragment>
        <BriefDetail briefDetailData={briefDetail}/>
        <ExtraList  options={options}/>

        this is itemDetail page!!!!!!!
      </Fragment>
    );
  }
}


function mapStateToProps({ restaurants }: any) {
  return { restaurants };
}

export default connect(mapStateToProps)(ItemInfo);
