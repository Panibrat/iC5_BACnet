import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import AvList from './AvList';
import BvList from './BvList';

export class MainList extends React.Component {
  render() {
    return (
      <Grid style={{marginTop:'50px'}}>
        <Row>
          {/* <h3> Analog Values </h3> */}
          <AvList />
        </Row>
        <Row>
          {/* <h3> Binary Values </h3> */}
          <BvList />
        </Row>
      </Grid>
    )
  }
}
export default MainList;
