import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button, Checkbox} from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postAV, getAVs, deleteAVs} from '../actions/AVsActions';
import {postBV, getBVs, deleteBVs} from '../actions/BVsActions';

export class AdminForm extends React.Component {
  constructor(props) {
      super(props);
      this.handleAVSubmit = this.handleAVSubmit.bind(this);      
      this.handleBVSubmit = this.handleBVSubmit.bind(this);      
      this.onDelete = this.onDelete.bind(this);    
      this.onBVDelete = this.onBVDelete.bind(this);    
      this.onChangePointType = this.onChangePointType.bind(this);    
      this.state = {
        point: 'AV',
        error: ''
      };  
    }
  componentDidMount(){
    this.props.getAVs();
    this.props.getBVs();
  }
  onChangePointType() {
    const typeOfpoint = findDOMNode(this.refs.pointtype).value
    // Correct
  this.setState((prevState, props) => {
    console.log('prevState', prevState);
    return {
      point: typeOfpoint 
    };
  });      
  }
  handleBVSubmit() {    
    const networkBVPoint =
      {
        title: 'BV' + findDOMNode(this.refs.title).value,
        description:  findDOMNode(this.refs.description).value,        
        readOnly: findDOMNode(this.refs.check_me).checked ,
        value: undefined
      };
    findDOMNode(this.refs.title).value = "";
    findDOMNode(this.refs.description).value = '';
    this.props.postBV(networkBVPoint);

  }
  handleAVSubmit(){
      const networkPoint =
      {
        title: 'AV' + findDOMNode(this.refs.title).value,
        description:  findDOMNode(this.refs.description).value,
        units: findDOMNode(this.refs.units).value,
        readOnly: findDOMNode(this.refs.check_me).checked ,
        value: 0       

      };
    findDOMNode(this.refs.title).value = "";
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.units).value = '';
    //console.log('networkPoint', networkPoint);
    this.props.postAV(networkPoint);
  }

  onDelete(){           
    var title = findDOMNode(this.refs.delete).value;
    console.log('title', title);
    const avToDelete = {title: title};
    this.props.deleteAVs(avToDelete);
  }
  onBVDelete(){           
    var title = findDOMNode(this.refs.deleteBV).value;
    //console.log('title', title);
    const bvToDelete = {title: title};
    this.props.deleteBVs(bvToDelete);
  }

  render() {
    const pointsList = this.props.pointsAV.map((avItem)=> {
      return   <option key={avItem.title} > {avItem.title}</option>      
    })
    const pointsBVList = this.props.pointsBV.map((bvItem)=> {
      return   <option key={bvItem.title} > {bvItem.title}</option>      
    })
    return (
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Type of point</ControlLabel>
            <FormControl ref="pointtype" componentClass="select"  onChange={this.onChangePointType}>
              <option value='AV' key={'AV'}> AV</option>
              <option key={'BV'}> BV</option>
            </FormControl>
            <FormControl
              type="number"
              ref="title"
              placeholder="0"                           
             />            
          </FormGroup>
        </Panel>

        <Panel>
          <FormGroup controlId="readonly">
            <input type="checkbox" ref="check_me" defaultChecked  /> Read Only
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            {
              this.state.point == 'AV' ? 
              <FormControl
              type="text"
              ref="description"
              placeholder="Температура в комнате"
             /> 
              : 
              <FormControl
              type="text"
              ref="description"
              placeholder="Старт приточки"
             />
            }           
            
            </FormGroup>
          {
            this.state.point == 'AV' && 
            <FormControl ref="units" componentClass="select" >
              <option value='deg C' key={'1'}>deg C</option>
              <option key={'2'}>%</option>
              <option key={'3'}>A</option>
              <option key={'4'}>V</option>
              <option key={'5'}>kW</option>
            </FormControl>
          }
          
          {
            this.state.point == 'AV' ? 
          <Button onClick={this.handleAVSubmit} bsStyle="primary">SAVE AV</Button> 
          :
          <Button onClick={this.handleBVSubmit} bsStyle="primary">SAVE BV</Button>           
           }  
        </Panel>
          {
            this.state.point == 'AV' && 
              <Panel>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select AV to delete</ControlLabel>
                  <FormControl ref="delete" componentClass="select" placeholder="select">
                    <option value="select">select</option>
                    {pointsList}
                  </FormControl>
                </FormGroup>
                <Button onClick={this.onDelete} bsStyle="danger">
                  Delete AV
                </Button>
              </Panel>            
          }  

          {
            this.state.point == 'BV' && 
              <Panel>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select BV to delete</ControlLabel>
                  <FormControl ref="deleteBV" componentClass="select" placeholder="select">
                    <option value="select">select</option>
                    {pointsBVList}
                  </FormControl>
                </FormGroup>
                <Button onClick={this.onBVDelete} bsStyle="danger">
                  Delete BV
                </Button>
            </Panel>            
        }

        

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
    deleteAVs: deleteAVs,
    postBV: postBV,
    getBVs: getBVs,
    deleteBVs: deleteBVs
    
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminForm);