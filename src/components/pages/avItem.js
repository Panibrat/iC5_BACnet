import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Well, Col, Row, Button, Badge} from 'react-bootstrap';

import PropTypes from 'prop-types';

import {setAV} from '../../actions/AVsActions';

// NumbersList.propTypes = {
//   x: React.PropTypes.number,
//   y: React.PropTypes.string .isRequired 
// }; 


class AvItem extends React.Component {
  // static PropTypes = {
  //   value: PropTypes.number.isRequired,
    
  // };


  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);

    this.state = {
      //set: (this.props.value).toFixed(0),
      //Number(this.props.value.toFixed(0))

      set: Number(this.props.value.toFixed(0)),
      showProps: true
    }
  }
  handlePlusClick() {   
    this.setState(
      {
        set: this.state.set + 0.5,
        showProps: false
      }
    ); 
    
    console.log('this.state.set', this.state.set);
    
  }
  handleMinusClick() {   
    this.setState(
      {
        set: this.state.set - 0.5,
        showProps: false
      }
    ); 

    console.log('this.state.set', this.state.set);
    
  }
  handleClick() {   
    const data = {
      _id: this.props._id,
      title: this.props.title,      
      value: this.state.set
    };
    this.props.setAV(data);
    this.setState(
      {        
        showProps: true
      });
  }

  render() {
      //console.log('AvItem props', this.props);
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <Badge className="badge">{this.props.title}</Badge>
            <p> {this.props.description} <b>{ this.state.showProps ? this.props.value.toPrecision(3) : this.state.set.toPrecision(3)  }</b> {this.props.units}</p>
               
                     
          </Col>             

        </Row>
        {(this.props.readOnly) || 
        <Row>
        <Col xs={3}>
              <Button 
                onClick={this.handleMinusClick} 
                bsStyle='info'
                bsSize="small"
              >
                  -
              </Button>
          </Col>              
          <Col xs={3}>
              <Button 
                onClick={this.handlePlusClick} 
                bsStyle='warning'
                bsSize="small"
              >
                  +
              </Button>
          </Col>
          <Col xs={6}>
              <Button 
                onClick={this.handleClick} 
                bsStyle='success'
                bsSize="small"
              >
                  SET
              </Button>
          </Col>
        </Row>       
        
        }
        
      </Well>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setAV: setAV
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(AvItem);