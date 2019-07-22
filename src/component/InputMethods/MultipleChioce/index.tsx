import React, { Component, Fragment } from 'react';
import styles from './index.css';
import { Collapse, Icon } from 'antd';

interface IMultipleChoiceProps {
  data: any;
  catIndex: number;
  callBackFunc: any;
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
    return (
      <Fragment>
        <Collapse expandIconPosition={'right'} bordered={true}
                  expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 180}/>}
                  defaultActiveKey={['1', '2']}
                  className={styles.list}>
          <Panel header={data.name} key="1">

            {
              data.options.map((item: any, key: number) => {
                return (
                  <div key={key}>
                    <label>
                      <input type="checkbox"
                             value={JSON.stringify(item)}
                             id={item.id}
                             name={data.id}
                             onChange={this.handleChange.bind(this)}
                      />{item.name}
                    </label>
                    {/*{JSON.stringify(item)}*/}
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
