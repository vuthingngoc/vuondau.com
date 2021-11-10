import React, { useState, useEffect } from 'react';

import { Card, CardHeader, CardBody, CardTitle, Collapse, Label, FormGroup, Input, Container, Row, Col, Button } from 'reactstrap';
import { getDataByPath } from 'services/data.service';

const dataLocation = [
  {
    id: '2155c809-bdfe-48ef-a56d-726360143c9a',
    name: 'Miền Nam',
    checked: false,
  },
  {
    id: '5b786a02-e1fb-4db5-b5b5-9eebac46ebf6',
    name: 'Miền Trung',
    checked: false,
  },
  {
    id: 'c4b80051-a91e-402a-89d1-e68d5218fe5e',
    name: 'Miền Bắc',
    checked: false,
  },
];

const dataCategory = [
  {
    id: '0c62b9c6-10ac-465e-99c4-3dff07279c93',
    name: 'Trái cây',
    checked: false,
  },
  {
    id: '408cb360-eccd-40c8-ae73-c8143994ce84',
    name: 'Rau',
    checked: false,
  },
  {
    id: 'aae688f7-d8aa-4ef7-b42e-5c69d3a2fe27',
    name: 'Củ',
    checked: false,
  },
];

export default function HavestBody(props) {
  // states for collapses
  const [location, setLocation] = useState(false);
  const [category, setCategory] = useState(false);
  const [defaultCategory, setDefaultCategory] = useState('');
  const [dataFarmHarvest, setDataFarmHarvest] = useState(null);
  // const [listHarvestID, setListHarvestID] = useState(null);

  const convertPrice = (price) => {
    return new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(price);
  };

  async function loadDataFarmHarvest() {
    const path = 'api/v1/harvest-sellings';
    const tmpImg = 'https://giaoducthuydien.vn/wp-content/themes/consultix/images/no-image-found-360x250.png';
    const res = await getDataByPath(path);
    if (res.status === 200) {
      let data = [];
      for (let ele of res.data) {
        let checkedType = false;
        let checkedLocation = false;
        dataCategory.forEach((e) => {
          if (e.checked && e.id === ele.harvest.product.product_type.id) {
            checkedType = true;
          }
        });
        if (!dataCategory[0].checked && !dataCategory[1].checked && !dataCategory[2].checked) {
          checkedType = true;
        }

        dataLocation.forEach((e) => {
          if (e.checked && e.id === ele.harvest.farm.area.id) {
            checkedLocation = true;
          }
        });
        if (!dataLocation[0].checked && !dataLocation[1].checked && !dataLocation[2].checked) {
          checkedLocation = true;
        }
        if (checkedType && checkedLocation) {
          const resImage = await getDataByPath(`api/v1/harvest-pictures/${ele.harvest.id}`);
          if (resImage.status === 200) {
            if (resImage.data.length > 0) {
              ele.harvest = { ...ele.harvest, image: resImage.data[0].src };
            } else {
              ele.harvest = { ...ele.harvest, image: tmpImg };
            }
          }

          const resPrice = await getDataByPath(`api/v1/harvest-selling-prices/${ele.id}`);
          if (resPrice.status === 200) {
            if (resPrice.data.length > 0) {
              ele.harvest = { ...ele.harvest, price: resPrice.data[0].price };
            } else {
              ele.harvest = { ...ele.harvest, price: 0 };
            }
          } else {
            ele.harvest = { ...ele.harvest, price: 0 };
          }
          data.push(ele);
        }
      }
      const listHarvestByFarm = [];
      data.forEach((ele) => {
        let check = false;
        if (listHarvestByFarm.find((obj) => obj.id === ele.harvest.farm.id)) {
          check = true;
        }
        if (!check) {
          listHarvestByFarm.push({
            id: ele.harvest.farm.id,
            name: ele.harvest.farm.name,
            location: ele.harvest.farm.address,
            src: `/farms/farmdetail/${ele.harvest.farm.id}`,
            harvest: [
              {
                harvestID: ele.harvest.id,
                havestName: ele.harvest.name,
                image: ele.harvest.image,
                description: ele.harvest.description,
                price: ele.harvest.price,
                src: `/harvests/harvestdetail/${ele.id}`,
              },
            ],
          });
        } else {
          listHarvestByFarm.forEach((farm, index) => {
            if (farm.id === ele.harvest.farm.id) {
              listHarvestByFarm[index].harvest.push({
                havestName: ele.harvest.name,
                image: ele.harvest.image,
                price: ele.harvest.price,
                description: ele.harvest.description,
                src: `/harvests/harvestdetail/${ele.id}`,
              });
            }
          });
        }
      });
      setDataFarmHarvest(listHarvestByFarm);
    }
  }

  // useEffect(() => {
  //   if (dataFarmHarvest === null) {
  //     loadDataFarmHarvest();
  //   }
  // });

  useEffect(() => {
    if (defaultCategory !== props.match.params.id) {
      dataCategory.forEach((element) => {
        element.checked = false;
      });
      switch (props.match.params.id) {
        case 'trai-cay':
          dataCategory[0].checked = true;
          break;
        case 'rau':
          dataCategory[1].checked = true;
          break;
        case 'cu':
          dataCategory[2].checked = true;
          break;
        default:
          break;
      }
      setDefaultCategory(props.match.params.id);
      if (dataFarmHarvest === null) {
        loadDataFarmHarvest();
      }
    }
  }, [props.match.params.id, defaultCategory, dataFarmHarvest]);
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
                  <CardHeader className="card-collapse" id="location" role="tab">
                    <h5 className="mb-0 panel-title">
                      <a
                        aria-expanded={location}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          loadDataFarmHarvest();
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
                                  dataLocation[index].checked = e.target.checked;
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
                                  dataCategory[index].checked = e.target.checked;
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
              <Button className="btn-round" color="default" outline style={{ marginLeft: '80px' }} onClick={() => loadDataFarmHarvest()}>
                Filter
              </Button>
              {/* end card */}
            </Col>

            {/* Havest List */}
            {dataFarmHarvest !== null ? (
              <Col md="9">
                {dataFarmHarvest?.map((ele) => {
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
                          {ele?.harvest.map((e) => {
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
                                        <p
                                          className="card-description"
                                          style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                                        >
                                          {e.description}
                                          <br />
                                          <span className="text-danger" style={{ fontWeight: 'bold' }}>
                                            {convertPrice(e.price)} vnđ/kg
                                          </span>
                                        </p>
                                      </div>
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
            ) : (
              <div className="uil-reload-css reload-background" style={{ display: 'block', margin: 'auto' }}>
                <div />
              </div>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}
