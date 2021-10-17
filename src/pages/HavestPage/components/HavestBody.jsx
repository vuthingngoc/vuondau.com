import React from 'react';

import { Card, CardHeader, CardBody, CardTitle, Collapse, Label, FormGroup, Input, Container, Row, Col, Button } from 'reactstrap';

const dataHavest = [
  {
    havestName: 'Vụ cà chua Đà Lạt Mùa Đông',
    ordered: 200,
    image:
      'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    description: 'Cà chua đà lạt vụ mùa xuân',
    src: '/havests/havestdetail/',
  },
  {
    havestName: 'Vụ rau cải thảo đà lạt Mùa Đông',
    ordered: 352,
    image:
      'https://images.unsplash.com/photo-1486328228599-85db4443971f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: 'Rau cải thảo đà lạt vụ mùa đông',
    src: '/havests/havestdetail/',
  },
  {
    havestName: 'Vụ dâu Đà Lạt Mùa Đông',
    ordered: 123,
    image:
      'https://images.unsplash.com/photo-1605056545110-c2ef2253aa8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1120&q=80',
    description: 'Dâu Đà Lạt mùa đông giá cực rẻ, ngọt ngon',
    src: '/havests/havestdetail/',
  },
  {
    havestName: 'Dưa leo Đà Lạc vụ Mùa Đông',
    ordered: 431,
    image:
      'https://images.unsplash.com/photo-1627738670355-45970f19bcd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    description: 'Dưa leo Đà Lạt mùa đông',
    src: '/havests/havestdetail/',
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
