import React, { Component, Fragment } from 'react';
import styles from './index.css'

interface IMultipleChoiceProps {
}

interface IMultipleChoiceStates {
}

class MultipleChoice extends Component<IMultipleChoiceProps, IMultipleChoiceStates> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        ok this is a multiple choice
      </Fragment>
    );
  }
}

export default MultipleChoice;
