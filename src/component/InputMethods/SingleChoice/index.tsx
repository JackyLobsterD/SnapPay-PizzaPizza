import React, { Component, Fragment } from 'react';
import styles from './index.css';
import { Collapse, Icon } from 'antd';

interface ISingleChoiceProps {
  data: any;
  catIndex: number;
  callBackFunc: any;
}

interface ISingleChoiceStates {
  selectedID: string;
  selectedIndex: number;
}

class SingleChoice extends Component<ISingleChoiceProps, ISingleChoiceStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedID: this.props.data.options[0].id,
    };
    this.props.callBackFunc(0, this.props.catIndex);
  }

  handleChange(event: any) {
    const selectedIndex= this.props.data.options.findIndex((item: any) => {
      return item.id === event.target.id
    })

    this.setState({
      selectedID: event.target.id,
      selectedIndex
    });
    this.props.callBackFunc(selectedIndex, this.props.catIndex);

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
            {data.options.map((item: any, key: number) => {
              return (
                <div key={key}>
                  <input type="radio" value={JSON.stringify(item)}
                         id={item.id}
                         name={data.id}
                         key={key}
                         onChange={this.handleChange.bind(this)}
                         checked={item.id === this.state.selectedID}
                         />
                  <label htmlFor={item.id}>{JSON.stringify(item)}</label>
                </div>
              );
            })}
          </Panel>
        </Collapse>
      </Fragment>
    );
  }
}

export default SingleChoice;
