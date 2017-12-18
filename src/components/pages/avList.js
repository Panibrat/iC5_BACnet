import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAVs} from '../../actions/AVsActions';
import { Grid, Row, Col } from 'react-bootstrap';
import AvItem from './AvItem';

export class AVsList extends React.Component {
  componentDidMount() {
    this.props.getAVs();
  }

  render() {
      const renderedList = this.props.avs.map((AV) => {
        return (
            <Col xs={12} sm={6} md={4} key={AV._id}>
                <AvItem
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
             {renderedList} 
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state){
  return {
   avs: state.analog
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAVs: getAVs
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AVsList);
