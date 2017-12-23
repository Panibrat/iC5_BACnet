import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button, Checkbox} from 'react-bootstrap';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
//import {postBooks, deleteBooks} from '../../actions/booksActions';
import {postAV, getAVs} from '../actions/AVsActions';

export class AdminForm extends React.Component {
  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);      
    }
  componentDidMount(){
    this.props.getAVs();
  }

  handleSubmit(){
    console.log('this.props', this.props);
    console.log('this.refs', this.refs);
    
    
    // description: String,    
    // units: String,    
    // readOnly: Boolean

    const networkPoint = 
      {
        //id: 12121,
        title: findDOMNode(this.refs.title).value,
        //title: this.refs.title.value + '!?!?', - doesn't work with react-bootstrap component
        description:  findDOMNode(this.refs.description).value,
        units: findDOMNode(this.refs.units).value,
        readOnly: findDOMNode(this.refs.readOnly)
      };
    findDOMNode(this.refs.title).value = "";
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.units).value = '';   
    this.props.postAV(networkPoint);
  }

    onDelete(){
      // var id = findDOMNode(this.refs.delete).value
      // var bookToDelete = {_id: id}
      // this.props.deleteBooks(bookToDelete);
  }

  render() {
    const pointsList = this.props.pointsAV.map((avItem)=> {
      return   <option key={avItem.title} > {avItem.title}</option>
    })
    return (
      <Well>
        <Panel>
          <FormGroup>
            <Checkbox inline>
              1
            </Checkbox>
            {' '}
            <Checkbox inline>
              2
            </Checkbox>
            {' '}
            <Checkbox inline>
              3
            </Checkbox>
          </FormGroup>
          <FormGroup controlId="title">
            <ControlLabel>Type of point</ControlLabel>
            <FormControl
              type="text"
              ref="title"
              placeholder="AV0"
          />
          </FormGroup>
          
          <FormGroup controlId="readOnly">
            <Checkbox defaultChecked inline >
              Read Only
             </Checkbox>             
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              ref="description"
              placeholder="Температура в комнате"
          />
          </FormGroup>
          <FormGroup controlId="units">
            <ControlLabel>Units</ControlLabel>
            <FormControl
              type="text"
              ref="units"
              placeholder="deg C"
          />
          </FormGroup>
          <Button onClick={this.handleSubmit} bsStyle="primary">SAVE</Button>
        </Panel>
        <Panel>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select book to deleteeee</ControlLabel>
            <FormControl ref="delete" componentClass="select" placeholder="select">
              <option value="select">select</option>
              {pointsList}
            </FormControl>
          </FormGroup>
          <Button onClick={this.onDelete} bsStyle="danger">
            Delete book
          </Button>
        </Panel>
      </Well>
    )
  }
}

function mapStateToProps(state) {
  return {
    pointsAV: state.analog,
    pointsBV: state.binary
  } 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postAV: postAV,
    getAVs: getAVs
    
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminForm);
