import React, { useState, useEffect } from 'react';

import { Card, CardHeader, CardBody, CardTitle, Collapse, Label, FormGroup, Input, Container, Row, Col, Button } from 'reactstrap';
import { getDataByPath } from 'services/data.service';

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
    name: 'Trái cây',
    checked: false,
  },
  {
    name: 'Rau',
    checked: false,
  },
  {
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

  async function loadDataFarmHarvest() {
    const path = 'api/v1/harvest-sellings';
    const res = await getDataByPath(path);
    const tmpImg = 'https://giaoducthuydien.vn/wp-content/themes/consultix/images/no-image-found-360x250.png';
    if (res.status === 200) {
      let data = [];
      for (let ele of res.data) {
        const resImage = await getDataByPath(`api/v1/harvest-pictures/${ele.harvest.id}`);
        if (resImage.status === 200) {
          if (resImage.data.length > 0) {
            ele.harvest = { ...ele.harvest, image: resImage.data[0].src };
            data.push(ele);
          } else {
            ele.harvest = { ...ele.harvest, image: tmpImg };
            data.push(ele);
          }
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
                description: ele.harvest.description,
                src: `/harvests/harvestdetail/${ele.id}`,
              });
            }
          });
        }
      });
      setDataFarmHarvest(listHarvestByFarm);
      // await loadImage(listHarvest, listHarvestByFarm);
      // await setDataFarmHarvest(listHarvestByFarm);
    }
  }

  // async function loadImage(harvestIDList, listHarvestByFarm) {
  //   // const tmpImage = 'https://giaoducthuydien.vn/wp-content/themes/consultix/images/no-image-found-360x250.png';
  //   const tmpListHarvest = listHarvestByFarm;
  //   for (const id of harvestIDList) {
  //     console.log(id);
  //     const resImage = await getDataByPath(`api/v1/harvest-pictures/${id}`);
  //     if (resImage === 200 && resImage.data.length > 0) {
  //       tmpListHarvest.forEach((ele, index1) => {
  //         ele.harvest.forEach((e, index2) => {
  //           if (e.id === id) {
  //             tmpListHarvest[index1].harvest[index2].image = resImage[0].src;
  //           }
  //         });
  //       });
  //     }
  //   }
  //   console.log('test', tmpListHarvest);
  //   setDataFarmHarvest(tmpListHarvest);
  // }

  useEffect(() => {
    if (dataFarmHarvest === null) {
      loadDataFarmHarvest();
    }
  });

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
    }
  }, [props.match.params.id, defaultCategory]);
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
                                      <p className="card-description" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        {e.description}
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
          </Row>
        </Container>
      </div>
    </>
  );
}
