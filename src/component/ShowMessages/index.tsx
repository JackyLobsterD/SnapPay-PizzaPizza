import { Col, Row } from 'antd';
import { Modal } from 'antd-mobile'
import React from 'react';

const alert = Modal.alert;


export function storeClosedMessage() {
  alert('Sorry, store is closed.', <div>
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
  </div>,
    [
    {
      text: '好', onPress: () => {
      }
    }
  ])
}
