import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button, Checkbox} from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postAV, getAVs, deleteAVs} from '../actions/AVsActions';

export class AdminForm extends React.Component {
  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);      
    }
  componentDidMount(){
    this.props.getAVs();
  }

  handleSubmit(){
    //console.log('this.props', this.props);
    //console.log('this.refs', this.refs);
    //console.log('this.refs.check_me.checked', this.refs.check_me.checked);

      const networkPoint =
      {
        title: findDOMNode(this.refs.title).value,
        description:  findDOMNode(this.refs.description).value,
        units: findDOMNode(this.refs.units).value,
        readOnly: findDOMNode(this.refs.check_me).checked ,
        value: 0

      };
    findDOMNode(this.refs.title).value = "";
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.units).value = '';

    this.props.postAV(networkPoint);
  }

    onDelete(){

      //const id = findDOMNode(this.refs.delete).value;
      //console.log('this.refs', id);
      //const avToDelete = {_id: id};
      //this.props.deleteAVs(avToDelete);
  }

  render() {
    const pointsList = this.props.pointsAV.map((avItem)=> {
      return   <option key={avItem.title} > {avItem.title}</option>
    })
    return (
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Type of point</ControlLabel>
            <FormControl
              type="text"
              ref="title"
              placeholder="AV0"
          />
          </FormGroup>
          <FormGroup controlId="readonly">
            <input type="checkbox" ref="check_me" defaultChecked  /> Read Only
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
            <ControlLabel>Select AV to delete</ControlLabel>
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
    getAVs: getAVs,
    deleteAVs: deleteAVs
    
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminForm);
