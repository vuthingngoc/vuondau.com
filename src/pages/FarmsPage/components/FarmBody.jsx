import React from 'react';

import { Container, Row } from 'reactstrap';
import { Col } from 'react-bootstrap';
import ListFarm from './ListFarmItem';
import { getItems } from 'services/data.service';

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
            <Row className="section-row">
              <Col md="9">
                <h4 className="section-title" style={{ fontWeight: 'bold' }}>
                  Miền Bắc
                </h4>
              </Col>
              <Col md="3" className="see-more">
                <span>
                  <a href="/farms/mien-bac" className="mr-1 btn btn-link">
                    Xem thêm &gt;&gt;
                  </a>
                </span>
              </Col>
            </Row>
            <Row>
              <ListFarm items={this.state.data} />
            </Row>
            <Row className="section-row">
              <Col md="9">
                <h4 className="section-title" style={{ fontWeight: 'bold' }}>
                  Miền Trung
                </h4>
              </Col>
              <Col md="3" className="see-more">
                <span>
                  <a href="/farms/mien-trung" className="mr-1 btn btn-link">
                    Xem thêm &gt;&gt;
                  </a>
                </span>
              </Col>
            </Row>
            <Row>
              <ListFarm items={this.state.data} />
            </Row>
            <Row className="section-row">
              <Col md="9">
                <h4 className="section-title" style={{ fontWeight: 'bold' }}>
                  Miền Nam
                </h4>
              </Col>
              <Col md="3" className="see-more">
                <span>
                  <a href="/farms/mien-nam" className="mr-1 btn btn-link">
                    Xem thêm &gt;&gt;
                  </a>
                </span>
              </Col>
            </Row>
            <Row>
              <ListFarm items={this.state.data} />
            </Row>
          </Container>
        </div>
      </>
    );
  }

  loadData() {
    let url = "api/v1/farms";
    let get_items = getItems(url);
    Promise.all([get_items]).then(values => {
      if (values[0]?.status === 200) {
        let _data = []
        if(values[0].data.length > 3) {
          _data.push(values[0].data[0]);
          _data.push(values[0].data[1]);
          _data.push(values[0].data[2]);
        } else {
          _data = values[0].data;
        }
        this.setState({
          data: _data,
        });
      }
    })
  }
}


