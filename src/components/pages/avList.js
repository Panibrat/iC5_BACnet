import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAVs} from '../../actions/AVsActions';
import { Grid, Row, Col } from 'react-bootstrap';
import avItem from './avItem';

export class AVsList extends React.Component {
  componentDidMount() {
    this.props.getAVs();
  }

  render() {

      if(this.props.avs[0]) {
          var avs_array = this.props.avs[0];
      } else {
          var avs_array = [];
      }
      const avsList = avs_array.map((AV) => {
          return (
              <Col xs={12} sm={6} md={4} key={AV._id}>
                  <avItem
                      title={AV.title}
                      description={AV.description}
                      status={AV.status}
                      value={AV.value}
                      units={AV.units}
                  />
              </Col>
          )
      })

    return (
      <Grid style={{marginTop:'50px'}}>
        <Row>
          <h1> Analog Values </h1>
            {avsList}
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state){
  return {
   avs: state.avs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAVs: getAVs
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AVsList);
