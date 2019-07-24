import React, { Component, Fragment } from 'react';
import MultipleChoice from '@/component/InputMethods/MultipleChioce';
import SingleChoice from '@/component/InputMethods/SingleChoice';

interface IExtraListProps {
  options: Array<any>;
  callbackFunc: any;
  extraListError: Array<any>;
}

interface IExtraListStates {
  extraList: any;
}

class ExtraList extends Component<IExtraListProps, IExtraListStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      extraList: {},
    };
  }

  getSingleChoice(itemIndex: string, catIndex: number) {
    const newItem = { [catIndex]: itemIndex };
    const { extraList } = this.state;
    const newExtraList = Object.assign({}, extraList, newItem);
    this.setState({
      extraList: newExtraList,
    });
    this.props.callbackFunc(newExtraList);
  }

  getMultipleChoice(itemIndexes: Array<string>, catIndex: number) {
    const newItem = { [catIndex]: itemIndexes };
    const { extraList } = this.state;
    const newExtraList = Object.assign({}, extraList, newItem);
    this.setState({
      extraList: newExtraList,
    });
    this.props.callbackFunc(newExtraList);
  }

  render() {
    const { options } = this.props;
    return (
      <Fragment>
        {
          options.map((item, key) => {
            if (item.type === 'single') {
              return (
                <SingleChoice data={item} callBackFunc={this.getSingleChoice.bind(this)} catIndex={key} key={key}/>);
            } else if (item.type === 'multiple') {
              return (
                <MultipleChoice data={item} callBackFunc={this.getMultipleChoice.bind(this)} catIndex={key}
                                key={key} itemError={this.props.extraListError[key]}/>);
            } else {
              return (<div>coming soon</div>);
            }
          })
        }
      </Fragment>
    );
  }
}

// @ts-ignore
export default ExtraList;
