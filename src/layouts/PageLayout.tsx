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
      <Layout>
        <div>
          asdfasdf
        </div>
        {children}
        <div>alskdjf;laskjdf</div>
      </Layout>
    );
  }
}

export default myLayouts;
