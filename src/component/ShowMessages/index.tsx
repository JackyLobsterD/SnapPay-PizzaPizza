import { Col, Modal, Row } from 'antd';
import React from 'react';

export function storeClosedMessage() {
  Modal.error({
    title: 'Sorry, store is closed',
    content: (
      <div>
        <Row>

          <Col span={12}>
            Sunday
            <br/>
            Monday
            <br/>
            Tuesday
            <br/>
            Wednesday
            <br/>
            Thursday
            <br/>
            Friday
            <br/>
            Saturday
          </Col>
          <Col span={12}>
            11a.m.–12a.m.
            <br/>
            11a.m.–12a.m.
            <br/>
            11a.m.–12a.m.
            <br/>
            11a.m.–12a.m.
            <br/>
            11a.m.–12a.m.
            <br/>
            11a.m.–2a.m.
            <br/>
            11a.m.–2a.m.
          </Col>
        </Row>
        <br/>
        <b>EXCEPT Holidays</b>
      </div>
    ),
  });
}
