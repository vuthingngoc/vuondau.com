import React, { useState, useEffect } from 'react';

import { Card, CardHeader, CardBody, CardTitle, Collapse, Label, FormGroup, Input, Container, Row, Col, Button } from 'reactstrap';

const dataFarmHavest = [
  {
    name: 'Nông Trại Đà Lạt',
    location: 'Miền Nam',
    src: '/havestsgroupfarm',
    havests: [
      {
        havestName: 'Vụ cà chua Đà Lạt Mùa Đông',
        ordered: 200,
        image:
          'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
        description: 'Cà chua đà lạt vụ mùa xuân',
        src: '/harvests/harvestdetail/ca-chua-da-lat',
      },
      {
        havestName: 'Vụ rau cải thảo đà lạt Mùa Đông',
        ordered: 352,
        image:
          'https://images.unsplash.com/photo-1486328228599-85db4443971f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        description: 'Rau cải thảo đà lạt vụ mùa đông',
        src: '/harvests/harvestdetail/ca-chua-da-lat',
      },
      {
        havestName: 'Vụ dâu Đà Lạt Mùa Đông',
        ordered: 123,
        image:
          'https://images.unsplash.com/photo-1605056545110-c2ef2253aa8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1120&q=80',
        description: 'Dâu Đà Lạt mùa đông giá cực rẻ, ngọt ngon',
        src: '/harvests/harvestdetail/ca-chua-da-lat',
      },
    ],
  },
  {
    name: 'Nông Trại Lâm Đồng',
    location: 'Miền Nam',
    src: '/harvestgroupfarm',
    havests: [
      {
        havestName: 'Dưa leo Lâm Đồng vụ Mùa Đông',
        ordered: 431,
        image:
          'https://images.unsplash.com/photo-1627738670355-45970f19bcd9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
        description: 'Dưa leo Lâm Đồng mùa đông',
        src: '/harvests/harvestdetail/',
      },
    ],
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

export default function HavestBody(props) {
  // states for collapses
  const [season, setSeason] = useState(false);
  const [location, setLocation] = useState(false);
  const [category, setCategory] = useState(false);
  const [defaultSeason, setDefaultSeason] = useState('');

  useEffect(() => {
    if (defaultSeason !== props.match.params.id) {
      dataSeason.forEach((element) => {
        element.checked = false;
      });
      switch (props.match.params.id) {
        case 'spring':
          dataSeason[0].checked = true;
          break;
        case 'summer':
          dataSeason[1].checked = true;
          break;
        case 'fall':
          dataSeason[2].checked = true;
          break;
        case 'winter':
          dataSeason[3].checked = true;
          break;
        default:
          break;
      }
      setDefaultSeason(props.match.params.id);
    }
  }, [props.match.params.id, defaultSeason]);
  return (
    <>
      <div className="section section">
        <Container>
          <h3 className="section-title" style={{ fontWeight: 'bold' }}>
            Harvest List
          </h3>
          <Row>
            <Col md="3">
              <Card className="card-refine">
                <div aria-expanded={true} aria-multiselectable={true} className="panel-group" id="accordion">
                  <CardHeader className="card-collapse" id="seasonGear" role="tab">
                    <h5 className="mb-0 panel-title">
                      <a
                        href="#pablo"
                        aria-expanded={season}
                        onClick={(e) => {
                          e.preventDefault();
                          setSeason(!season);
                        }}
                        style={{ fontWeight: 'bold' }}
                      >
                        Season
                      </a>
                    </h5>
                  </CardHeader>
                  <Collapse isOpen={true}>
                    <CardBody>
                      {dataSeason.map((ele, index) => {
                        return (
                          <FormGroup check>
                            <Label check style={{ fontWeight: 'bolder' }}>
                              <Input
                                checked={ele.checked}
                                defaultValue=""
                                type="checkbox"
                                onClick={(e) => {
                                  dataSeason[index].checked = e.checked;
                                  setSeason(!season);
                                }}
                              />
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
                        style={{ fontWeight: 'bold' }}
                      >
                        Location
                      </a>
                    </h5>
                  </CardHeader>
                  <Collapse isOpen={true}>
                    <CardBody>
                      {dataLocation.map((ele, index) => {
                        return (
                          <FormGroup check>
                            <Label check style={{ fontWeight: 'bolder' }}>
                              <Input
                                checked={ele.checked}
                                defaultValue=""
                                type="checkbox"
                                onClick={(e) => {
                                  dataLocation[index].checked = e.checked;
                                  setLocation(!location);
                                }}
                              />
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
                        style={{ fontWeight: 'bold' }}
                      >
                        Category
                      </a>
                    </h5>
                  </CardHeader>
                  <Collapse isOpen={true}>
                    <CardBody>
                      {dataCategory.map((ele, index) => {
                        return (
                          <FormGroup check>
                            <Label check style={{ fontWeight: 'bolder' }}>
                              <Input
                                checked={ele.checked}
                                defaultValue=""
                                type="checkbox"
                                onClick={(e) => {
                                  dataCategory[index].checked = e.checked;
                                  setCategory(!category);
                                }}
                              />
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

            {/* Havest List */}
            <Col md="9">
              {dataFarmHavest.map((ele) => {
                return (
                  <>
                    <Row style={{ borderBottom: '2px groove black', marginBottom: '10px' }}>
                      <Col md="9">
                        <h4 style={{ fontWeight: 'bold' }}>{ele.name}</h4>
                      </Col>
                      <Col md="3">
                        <a href={ele.src} className="mr-1 btn btn-link" style={{ fontWeight: 'bold', marginTop: '25px', marginLeft: '50px' }}>
                          Xem thêm {'>>'}
                        </a>
                      </Col>
                    </Row>
                    <div className="products">
                      <Row>
                        {ele.havests.map((e) => {
                          return (
                            <Col md="4">
                              <Card className="card-product card-plain-custom">
                                <div className="card-image">
                                  <a href={e.src}>
                                    <img alt="..." src={e.image} />
                                  </a>
                                  <CardBody>
                                    <div className="card-description">
                                      <CardTitle tag="h5">
                                        <a href={e.src} class="mr-1 btn btn-link">
                                          {e.havestName}
                                        </a>
                                      </CardTitle>
                                      <p className="card-description" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        {e.description}
                                      </p>
                                    </div>
                                    <h6 style={{ textAlign: 'right' }}>
                                      Đã đặt <i className="fa fa-handshake-o" /> {e.ordered}
                                    </h6>
                                  </CardBody>
                                </div>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  </>
                );
              })}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
