import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Well, Col, Row, Button, Badge} from 'react-bootstrap';

import {setBV} from '../../actions/BVsActions';

class BvItem extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {    
    //TOGGLE BV
    const data = {
      _id: this.props._id,
      title: this.props.title,
      value: !this.props.value
    };
    this.props.setBV(data);
  }

  render() {     
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <Badge className="badge">{this.props.title}</Badge>
            <p>{this.props.description} <b>{ (this.props.value) ? 'ON' : 'OFF' } </b></p>             
             {(this.props.readOnly) || 
                <Button 
                onClick={this.handleClick} 
                bsStyle={ (this.props.value) ? 'danger' : 'primary' }
                bsSize="small"
              >
                  { (this.props.value) ? 'OFF' : 'ON' }
              </Button>
            }           
             
                  
          </Col>
        </Row>
      </Well>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setBV: setBV
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(BvItem);