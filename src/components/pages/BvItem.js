import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Well, Col, Row, Button} from 'react-bootstrap';

import {toggleBV} from '../../actions/BVsActions';

class BvItem extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {    
    const data = {
      _id: this.props._id,
      value: !this.props.value
    };
    this.props.toggleBV(data);
  }

  render() {     
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <p>{this.props.title} { (this.props.value) ? 'ON' : 'OFF' } </p>
            <p>{this.props.description}</p>    
            <Button 
              onClick={this.handleClick} 
              bsStyle={ (this.props.value) ? 'danger' : 'primary' }
              bsSize="small"
            >
                { (this.props.value) ? 'OFF' : 'ON' }
            </Button>       
          </Col>
        </Row>
      </Well>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleBV: toggleBV
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(BvItem);