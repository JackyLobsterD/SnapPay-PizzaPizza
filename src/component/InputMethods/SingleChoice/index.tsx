import React, { Component, Fragment } from 'react';
import styles from './index.css'

interface ISingleChoiceProps {
  data:any;
}

interface ISingleChoiceStates {
}

class SingleChoice extends Component<ISingleChoiceProps, ISingleChoiceStates> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const {data}=this.props
    return (
      <Fragment>

        {JSON.stringify(data)}

      </Fragment>
    );
  }
}

export default SingleChoice;
