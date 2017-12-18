import React from 'react';
import {Well, Col,  Row} from 'react-bootstrap';

class AvItem extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
      //console.log('AvItem props', this.props);
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <p>{this.props.title} {this.props.value} {this.props.units}</p>
            <p>{this.props.description}</p>
            <p>{this.props.status}</p>
          </Col>
        </Row>
      </Well>
    )
  }
}

export default AvItem;
