import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBVs} from '../../actions/BVsActions';
import { Grid, Row, Col } from 'react-bootstrap';
import BvItem from './BvItem';

export class BVsList extends React.Component {
  componentDidMount() {
    this.props.getBVs();
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
    getBVs: getBVs
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BVsList);
