import React from 'react';
import { Layout } from 'antd';

export interface BasicLayoutProps {
  history?: History;
  location?: Location;
}

class myLayouts extends React.Component <BasicLayoutProps> {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  render() {
    const { children } = this.props;
    return (
      <Layout style={{backgroundColor:'white'}}>
        <div>
        </div>
        {children}
        <div>
        </div>
      </Layout>
    );
  }
}

export default myLayouts;
