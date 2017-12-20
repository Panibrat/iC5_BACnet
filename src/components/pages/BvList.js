import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBVs, toggleBV} from '../../actions/BVsActions';
import { Grid, Row, Col } from 'react-bootstrap';
import BvItem from './BvItem';

import { subscribeToData } from '../../../api/socket-client';

export class BVsList extends React.Component {
  componentDidMount() {
    this.props.getBVs();
    subscribeToData( () => { console.log('BV UPDATE!!!') } );
  }

  render() {
    console.log('binary props', this.props);
    
      const renderedList = this.props.bvs.map((BV) => {
        return (
            <Col xs={12} sm={6} md={4} key={BV._id}>
                <BvItem
                    title={BV.title}
                    description={BV.description}                    
                    value={BV.value} 
                    _id={BV._id}                   
                />
            </Col>
        )
    })

    return (
      <Grid style={{marginTop:'50px'}}>
        <Row>
          <h1> Binary Values </h1>
             { renderedList }
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state){
  return {
   bvs: state.binary
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBVs: getBVs,
    toggleBV: toggleBV
    
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BVsList);
