import React from 'react';

import { Container, Row } from 'reactstrap';
import { Col } from 'react-bootstrap';
import ListFarm from './ListFarmItem';
import { getItems, getItem } from 'services/data.service';

export default class FarmDetailBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataloaded: false,
      data: {
        northern: [],
        central: [],
        southern: []
      },
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
              <ListFarm items={this.state.data.northern} displayItem={3} />
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
              <ListFarm items={this.state.data.central} displayItem={3} />
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
              <ListFarm items={this.state.data.southern} displayItem={3} />
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
        let _temp = [];
        let request$ = [];
        for (let item of values[0].data) {
          _temp.push(item)
          request$.push(getItem("api/v1/farm-pictures", item.id))
        }
        Promise.all(request$).then(images => {
          for (let i = 0; i < images.length; i++) {
            let result = images[i].data;
            if (result.length > 0) {
              _temp[i]["src"] = result[0].src;
              _temp[i]["alt"] = result[0].alt;
            }
          }
          let _data = null;
          let northern = _temp.filter(item => {
            return item.area.name.toLowerCase().indexOf('bắc') > -1 && item.status === 1;
          });
          let central = _temp.filter(item => {
            return item.area.name.toLowerCase().indexOf('trung') > -1 && item.status === 1;
          });
          let southern = _temp.filter(item => {
            return item.area.name.toLowerCase().indexOf('nam') > -1 && item.status === 1;
          });
          _data = {
            northern: northern,
            central: central,
            southern: southern
          }
          this.setState({
            data: _data,
          });
        })
      }
    })
  }
}


