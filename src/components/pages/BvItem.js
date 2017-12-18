import React from 'react';
import {Well, Col,  Row} from 'react-bootstrap';

class BvItem extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
     
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <p>{this.props.title} { (this.props.value) ? 'ON' : 'OFF' } </p>
            <p>{this.props.description}</p>           
          </Col>
        </Row>
      </Well>
    )
  }
}

export default BvItem;