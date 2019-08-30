import React, { Component, Fragment } from 'react';
import styles from './index.css';
import { Collapse, Icon } from 'antd';

interface IMultipleChoiceProps {
  data: any;
  catIndex: number;
  callBackFunc: any;
  itemError: any;
}

interface IMultipleChoiceStates {
  selectedIndexes: Array<number>;
}

class MultipleChoice extends Component<IMultipleChoiceProps, IMultipleChoiceStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedIndexes: [],
    };
  }

  handleChange(event: any) {
    const thisIndex: number = this.props.data.options.findIndex((item: any) => {
      return item.id === event.target.id;
    });
    const selectedIndexes: Array<number> = this.state.selectedIndexes;
    const findElementIndex = selectedIndexes.indexOf(thisIndex);
    if (findElementIndex < 0) {
      selectedIndexes.push(thisIndex);
    } else {
      selectedIndexes.splice(findElementIndex, 1);
    }
    this.setState({ selectedIndexes });

    this.props.callBackFunc(selectedIndexes, this.props.catIndex);

  }

  render() {
    const { data } = this.props;
    const { Panel } = Collapse;
    const errorMessage=(itemError:number, name:string)=>
    {if (!itemError) {
        return (
          <div>{name}</div>
        );
      } else if (itemError === 1) {
        return (
          <div>{name} <span className={styles.errorMessage}>(Required 2)</span></div>
        );
      } else if (itemError === 2) {
        return (
          <div>{name} <span className={styles.errorMessage}>(Required 2)</span></div>
        );
      } else if (itemError === 3) {
        return (
          <div>{name} <span className={styles.errorMessage}>(Too Many Selected)</span></div>
        );
      }
    };
    return (
      <Fragment>
        <Collapse expandIconPosition={'right'} bordered={true}
                  expandIcon={
                    ({ isActive }) =>
                    <Icon type="caret-right" rotate={isActive ? 90 : 180}/>
                  }
                  defaultActiveKey={['1', '2']}
                  className={styles.sizeOption}>
          <Panel header={errorMessage(this.props.itemError, data.name)} key="1">
            {
              data.options.map((item: any, key: number) => {
                return (
                  <div key={key}>
                    <label className={styles.font}>
                      <input type="checkbox"
                             value={JSON.stringify(item)}
                             id={item.id}
                             name={data.id}
                             onChange={this.handleChange.bind(this)}
                             className={styles.formRadio}
                      />
                      {item.name}
                      <div className={styles.sizeOptionPrice}>+${item.price.toFixed(2)}</div>
                    </label>

                  </div>
                );
              })
            }
          </Panel>
        </Collapse>
      </Fragment>
    );
  }
}

export default MultipleChoice;
