import React from 'react';

import { Container, Row } from 'reactstrap';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType as ElemType, Dropdown } from 'office-ui-fabric-react';
import { Col } from 'react-bootstrap';
import ListFarm from './ListFarmItem';
import { getItems } from 'services/data.service';


const dataLocation = [
  {
    key: 'nam',
    text: 'Miền Nam',
  },
  {
    key: 'trung',
    text: 'Miền Trung',
  },
  {
    key: 'bac',
    text: 'Miền Bắc',
  },
];

export default class FarmDetailBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataloaded: false,
      data: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <>
        <div className="section section-gray">
          <Container>
            <Row>
              <Col sm="3">
                <Dropdown
                  placeholder="Select your location"
                  options={dataLocation}
                  style={{ width: '70%' }}
                  onChange={(event, value) => {
                    this.onDropDownChanged(value);
                  }}
                  styles={{
                    root: { borderRadius: 4, color: "red" },
                  }}
                />
              </Col>
              <Col xs="9">
                <Shimmer width="100%" isDataLoaded={this.state.isDataloaded} customElementsGroup={this.getShimmerElements()}>
                  <ListFarm items={this.state.data} />
                </Shimmer>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }

  getShimmerElements() {
    return (
      <>
        <div style={{ display: 'flex' }}>
          <ShimmerElementsGroup
            width={'25%'}
            shimmerElements={[
              { type: ElemType.gap, width: '5%', height: 200 },
              { type: ElemType.line, width: '90%', height: 180 },
              { type: ElemType.gap, width: '5%', height: 200 },
            ]}
          />
          <ShimmerElementsGroup
            width={'100%'}
            flexWrap
            shimmerElements={[
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
            ]}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <ShimmerElementsGroup
            width={'25%'}
            shimmerElements={[
              { type: ElemType.gap, width: '5%', height: 200 },
              { type: ElemType.line, width: '90%', height: 180 },
              { type: ElemType.gap, width: '5%', height: 200 },
            ]}
          />
          <ShimmerElementsGroup
            width={'100%'}
            flexWrap
            shimmerElements={[
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
            ]}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <ShimmerElementsGroup
            width={'25%'}
            shimmerElements={[
              { type: ElemType.gap, width: '5%', height: 200 },
              { type: ElemType.line, width: '90%', height: 180 },
              { type: ElemType.gap, width: '5%', height: 200 },
            ]}
          />
          <ShimmerElementsGroup
            width={'100%'}
            flexWrap
            shimmerElements={[
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
              { type: ElemType.line, width: '98%', height: 25 },
              { type: ElemType.gap, width: '2%', height: 50 },
            ]}
          />
        </div>
      </>
    );
  }

  loadData() {
    let url = "api/v1/farms";
    let get_items = getItems(url);
    Promise.all([get_items]).then(values => {
      if (values[0]?.status === 200) {
        this.setState({
          data: values[0].data,
          isDataloaded: true,
        });
      }
    })
    // setTimeout(() => {
    //   this.setState({
    //     isDataloaded: true,
    //     data: dataFarms,
    //   });
    // }, 3000);
  }
}


