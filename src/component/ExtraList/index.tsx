import React, { Component, Fragment } from 'react';
import styles from './index.css'
import MultipleChoice from '@/component/InputMethods/MultipleChioce'
import SingleChoice from '@/component/InputMethods/SingleChoice'

interface IExtraListProps {
  options: Array<any>
}

interface IExtraListStates {
}

class ExtraList extends Component<IExtraListProps, IExtraListStates> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { options}=this.props
    return (
      <Fragment>
        {
          options.map((item, key)=>{
            if(item.type==='single'){
              return(<SingleChoice data={item} key={key}/>)
            } else if (item.type==='multiple'){
              return (<MultipleChoice key={key}/>)
            }else {
              return(<div>coming soon</div>)
            }
          })
        }


        {JSON.stringify(options)}
      </Fragment>
    )
  }
}

export default ExtraList;
