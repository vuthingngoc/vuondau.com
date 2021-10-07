import React from 'react';

import { Card, CardHeader, CardBody, CardTitle, Collapse, Label, FormGroup, Input, Container, Row, Col, Button } from 'reactstrap';

const dataHavest = [
  {
    havestName: 'Nông Trại đà lạt vụ mùa xuân',
    ordered: 200,
    heart: 56,
    image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-2.jpg',
    description: 'Các loại rau củ của nông trại đà lạc mùa xuân',
    src: '/havest/havestdetail/',
  },
  {
    havestName: 'Nông Trại đà lạt vụ mùa hạ',
    ordered: 352,
    image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-4.jpg',
    description: 'Các loại rau củ của nông trại đà lạc mùa hạ',
    src: '/havest/havestdetail/',
  },
  {
    havestName: 'Nông Trại đà lạt vụ mùa thu',
    ordered: 123,
    image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-3.jpg',
    description: 'Các loại rau củ của nông trại đà lạc mùa đông',
    src: '/havest/havestdetail/',
  },
  {
    havestName: 'Nông Trại đà lạt vụ mùa đông',
    ordered: 431,
    image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-cau-dat-farm-3.jpg',
    description: 'Các loại rau củ của nông trại đà lạc mùa đông',
    src: '/havest/havestdetail/',
  },
];

const dataSeason = [
  {
    name: 'Spring',
    checked: false,
  },
  {
    name: 'Summer',
    checked: false,
  },
  {
    name: 'Fall',
    checked: false,
  },
  {
    name: 'Winter',
    checked: false,
  },
];

const dataLocation = [
  {
    name: 'Miền Nam',
    checked: false,
  },
  {
    name: 'Miền Trung',
    checked: false,
  },
  {
    name: 'Miền Bắc',
    checked: false,
  },
];

const dataCategory = [
  {
    name: 'Vegetable',
    checked: false,
  },
  {
    name: 'Fruit',
    checked: false,
  },
  {
    name: 'Meat',
    checked: false,
  },
  {
    name: 'Fish',
    checked: false,
  },
];

export default function HavestBody() {
  // states for collapses
  const [season, setSeason] = React.useState(false);
  const [location, setLocation] = React.useState(false);
  const [category, setCategory] = React.useState(false);
  return (
    <>
      <div className="section section-gray">
        <Container>
          <h3 className="section-title">Havest List</h3>
          <Row>
            <Col md="3">
              <Card className="card-refine">
                <div aria-expanded={true} aria-multiselectable={true} className="panel-group" id="accordion">
                  <CardHeader className="card-collapse" id="seasonGear" role="tab">
                    <h5 className="mb-0 panel-title">
                      <a
                        aria-expanded={season}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setSeason(!season);
                        }}
                      >
                        Season <i className="nc-icon nc-minimal-down" />
                      </a>
                    </h5>
                  </CardHeader>
                  <Collapse isOpen={season}>
                    <CardBody>
                      {dataSeason.map((ele) => {
                        return (
                          <FormGroup check>
                            <Label check>
                              <Input checked={ele.checked} defaultValue="" type="checkbox" />
                              {ele.name} <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        );
                      })}
                    </CardBody>
                  </Collapse>
                  <CardHeader className="card-collapse" id="location" role="tab">
                    <h5 className="mb-0 panel-title">
                      <a
                        aria-expanded={location}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setLocation(!location);
                        }}
                      >
                        Location <i className="nc-icon nc-minimal-down" />
                      </a>
                    </h5>
                  </CardHeader>
                  <Collapse isOpen={location}>
                    <CardBody>
                      {dataLocation.map((ele) => {
                        return (
                          <FormGroup check>
                            <Label check>
                              <Input checked={ele.checked} defaultValue="" type="checkbox" />
                              {ele.name} <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        );
                      })}
                    </CardBody>
                  </Collapse>
                  <CardHeader className="card-collapse" id="category" role="tab">
                    <h5 className="mb-0 panel-title">
                      <a
                        aria-expanded={category}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setCategory(!category);
                        }}
                      >
                        Category <i className="nc-icon nc-minimal-down" />
                      </a>
                    </h5>
                  </CardHeader>
                  <Collapse isOpen={category}>
                    <CardBody>
                      {dataCategory.map((ele) => {
                        return (
                          <FormGroup check>
                            <Label check>
                              <Input checked={ele.checked} defaultValue="" type="checkbox" />
                              {ele.name} <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        );
                      })}
                    </CardBody>
                  </Collapse>
                </div>
              </Card>
              <Button className="btn-round" color="default" outline style={{ marginLeft: '80px' }}>
                Filter
              </Button>
              {/* end card */}
            </Col>
            <Col md="9">
              <div className="products">
                <Row>
                  {dataHavest.map((ele) => {
                    return (
                      <Col md="4">
                        <Card className="card-product card-plain">
                          <div className="card-image">
                            <a href={ele.src}>
                              <img alt="..." src={ele.image} />
                            </a>
                            <CardBody>
                              <div className="card-description">
                                <CardTitle tag="h5">
                                  <a href={ele.src} class="mr-1 btn btn-link">
                                    {ele.havestName}
                                  </a>
                                </CardTitle>
                                <p className="card-description">{ele.description}</p>
                              </div>
                              <h6 style={{ textAlign: 'right' }}>
                                Đã đặt <i className="fa fa-handshake-o" /> {ele.ordered}
                              </h6>
                            </CardBody>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
