import React from 'react';
import {Well, Col,  Row} from 'react-bootstrap';

class avItem extends React.Component {
  render() {
      console.log(this.props);
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <p>{this.props.title}</p>
            <p>{this.props.description}</p>
            <p>{this.props.status}</p>
            <p>{this.props.value}</p>
            <p>{this.props.units}</p>
          </Col>
        </Row>
      </Well>
    )
  }
}

export default avItem;
