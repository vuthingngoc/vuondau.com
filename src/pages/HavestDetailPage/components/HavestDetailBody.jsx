import React, { useEffect, useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
// import { Link } from 'react-router-dom';

import { Badge, Button, Card, Media, Container, Row, Col, CardTitle } from 'reactstrap';
import { getDataByPath } from 'services/data.service';

export default function HavestDetailBody(props) {
  const [dataHarvest, setDataHarvest] = useState(null);
  const [dataFarm, setDataFarm] = useState(null);
  const [dataProduct, setdataProduct] = useState(null);
  const [dataHarvestSimilar, setDataHarvestSimilar] = useState(null);
  const [weight, setWeight] = React.useState(1);

  const increateWeight = () => {
    setWeight(weight + 1);
  };

  const decreaseWeight = () => {
    if (weight > 1) {
      setWeight(weight - 1);
    }
  };

  const addToCartHandle = () => {
    const item = dataProduct;
    item['weight'] = weight;
    let dataCart = JSON.parse(localStorage.getItem('CART'));
    if (dataCart === null) {
      const array = [item];
      localStorage.setItem('CART', JSON.stringify(array));
    } else {
      let checkAvaiableItem = false;
      let pos = -1;
      dataCart.forEach((e, index) => {
        if (e.id === item.id) {
          checkAvaiableItem = true;
          pos = index;
        }
      });
      if (checkAvaiableItem) {
        dataCart[pos] = item;
      } else {
        dataCart.push(item);
      }
      localStorage.setItem('CART', JSON.stringify(dataCart));
    }
    NotificationManager.success('Add to Cart Success', 'Your item has been add to cart', 3000);
  };

  async function loadData(id) {
    const path = `api/v1/harvest-sellings/${id}`;
    const res = await getDataByPath(path);
    if (res?.status === 200) {
      const img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
      const imgHarvestTmp = 'https://giaoducthuydien.vn/wp-content/themes/consultix/images/no-image-found-360x250.png';
      const data = res.data;
      const dataHarvestTmp = {
        id: data.id,
        harvestName: data.harvest.name,
        image: imgHarvestTmp,
        description: data.harvest.description,
        status: data.status,
        orderDay: data.date_of_create.slice(0, 10),
        price: 0,
        havestDay: data.end_date.slice(0, 10),
      };
      const resHarvestPic = await getDataByPath(`api/v1/harvest-pictures/${data.harvest.id}`);
      if (resHarvestPic?.status === 200) {
        if (resHarvestPic.data[0]) {
          dataHarvestTmp.image = resHarvestPic.data[0].src;
        }
      }
      const resHarvestSelling = await getDataByPath(`api/v1/harvest-selling-prices/${data.id}`);
      if (resHarvestSelling?.status === 200) {
        if (resHarvestSelling.data[0]) {
          dataHarvestTmp.price = resHarvestSelling.data[0].price;
        }
      }

      setDataHarvest(dataHarvestTmp);
      const dataFarmApi = data.harvest.farm;
      const dataFarmTmp = {
        farmName: dataFarmApi.name,
        image: img,
        description: dataFarmApi.description,
        src: `/farms/farmdetail/${dataFarmApi.id}`,
      };
      const resFarmPic = await getDataByPath(`api/v1/farm-pictures/${dataFarmApi.id}`);
      if (resFarmPic?.status === 200) {
        if (resFarmPic.data[0]) {
          dataFarmTmp.image = resFarmPic.data[0].src;
        }
      }
      setDataFarm(dataFarmTmp);

      const dataProductApi = data.harvest.product;
      const dataProductTmp = {
        id: dataProductApi.id,
        productName: dataProductApi.name,
        image: img,
        alt: 'none',
        description: dataProductApi.description,
        salePrice: '41000',
        src: `/product/productdetail/${dataProductApi.id}`,
      };
      const resProductPic = await getDataByPath(`api/v1/product-pictures/${dataProductApi.id}`);
      if (resProductPic?.status === 200) {
        if (resProductPic.data[0]) {
          dataProductTmp.image = resProductPic.data[0].src;
          dataProductTmp.alt = '...';
          setDataFarm(dataFarmTmp);
        }
      }
      setdataProduct(dataProductTmp);

      const tmpImg = 'https://giaoducthuydien.vn/wp-content/themes/consultix/images/no-image-found-360x250.png';
      const resSimular = await getDataByPath(`api/v1/harvest-sellings?product-type-id=${data.harvest.product.product_type.id}`);
      const simularDataTmp = [];
      for (let e of resSimular.data) {
        if (simularDataTmp.length < 3) {
          if (e.id !== data.id) {
            const dataTmp = {
              havestName: e.harvest.name,
              image: tmpImg,
              price: 0,
              description: e.harvest.description,
              src: `/harvests/harvestdetail/${e.id}`,
            };
            const resImage = await getDataByPath(`api/v1/harvest-pictures/${e.harvest.id}`);
            if (resImage.status === 200) {
              if (resImage.data.length > 0) {
                dataTmp.image = resImage.data[0].src;
              }
            }

            const resPrice = await getDataByPath(`api/v1/harvest-selling-prices/${e.id}`);
            if (resPrice.status === 200) {
              if (resPrice.data.length > 0) {
                dataTmp.price = resPrice.data[0].price;
              }
            }
            simularDataTmp.push(dataTmp);
          }
        }
      }
      setDataHarvestSimilar(simularDataTmp);
    }
  }

  const convertPrice = (price) => {
    return new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(price);
  };

  useEffect(() => {
    if (dataHarvest === null) {
      loadData(props.match.params.id);
    }
  });
  return (
    <>
      <div className="wrapper">
        <div className="main">
          <div className="section section-white">
            <Container>
              <Col className="ml-auto mr-auto" md="10">
                <div className="text-center">
                  <Badge className="main-tag" color={dataHarvest?.status === 1 ? 'success' : 'danger'}>
                    {dataHarvest?.status === 1 ? 'Avaiable' : 'Closed'}
                  </Badge>
                  <a href="javascrip: void(0);">
                    <h3 className="title" style={{ fontWeight: 'bold' }}>
                      {dataHarvest?.harvestName}
                    </h3>
                  </a>
                  <h6 className="title-uppercase">Order start day: {dataHarvest?.orderDay} </h6>
                  <h6 className="title-uppercase">Expect harvest day: {dataHarvest?.havestDay} </h6>
                </div>
              </Col>
              <Col className="ml-auto mr-auto" md="12">
                <Col className="ml-auto mr-auto" md="8">
                  <Card data-radius="none">
                    {dataHarvest === null ? (
                      <div className="uil-reload-css reload-background" style={{ display: 'block', margin: 'auto' }}>
                        <div />
                      </div>
                    ) : (
                      <img alt="..." className="img-rounded img-responsive" src={dataHarvest?.image} />
                    )}
                  </Card>
                  <div className="article-content">
                    <h4 style={{ fontWeight: 'bold' }}>Description</h4>
                    <p style={{ fontWeight: 'bolder' }}>{dataHarvest?.description}</p>
                  </div>
                </Col>
                <h3 className="section-title" style={{ fontWeight: 'bolder' }}>
                  Harvest's Products
                </h3>
                <br />
                <Row>
                  <Col md="8">
                    <Row>
                      <Col md="6">
                        <Card className="card-product card-plain">
                          <div className="card-image">
                            <a href={dataProduct?.src}>
                              <img alt="..." src={dataProduct?.image} />
                            </a>
                          </div>
                        </Card>
                      </Col>
                      <Col md="6">
                        <Col md="8" className="ml-auto mr-auto">
                          <h3 style={{ fontWeight: 'bolder' }}>{dataProduct?.productName}</h3>
                          <p className="card-description">{dataProduct?.description}</p>
                          <div className="price">
                            <h6 className="text-default">{`${convertPrice(dataHarvest?.price)} vnđ/kg`}</h6>
                          </div>
                          <Row>
                            <Col md="8" sm="8">
                              <label>Select weight:</label>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6" sm="6">
                              <h5>
                                {weight} {' kg '}
                              </h5>
                            </Col>
                            <Col md="6" sm="6">
                              <ButtonGroup>
                                <Button className="btn-border btn-round" onClick={decreaseWeight} color="default" size="sm">
                                  -
                                </Button>
                                <Button className="btn-border btn-round" onClick={increateWeight} color="default" size="sm">
                                  +
                                </Button>
                              </ButtonGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Button className="btn-round" color="danger" onClick={addToCartHandle}>
                              Add to cart
                            </Button>
                          </Row>
                        </Col>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="4">
                    <Media>
                      <a className="pull-left" href="#pablo" onClick={(e) => e.preventDefault()}>
                        <div className="avatar big-avatar">
                          {dataFarm === null ? (
                            <div className="uil-reload-css reload-small" style={{ marginTop: '10px', marginLeft: '10px' }}>
                              <div />
                            </div>
                          ) : dataFarm?.alt !== 'none' ? (
                            <Media alt="..." object src={dataFarm?.image} style={{ width: '60px', height: '60px' }} />
                          ) : (
                            <Media alt="..." object src={dataFarm?.image} style={{ width: '80px', height: '80px' }} />
                          )}
                        </div>
                      </a>
                      <Media body>
                        <Media heading>{dataFarm?.farmName}</Media>
                        <p>{dataFarm?.description}</p>
                        <Button className="btn-round" color="default" href={dataFarm?.src}>
                          <i className="fa fa-reply mr-1" />
                          Check Info
                        </Button>
                      </Media>
                    </Media>
                  </Col>
                </Row>
                <hr />
              </Col>
              <Row>
                <div className="related-articles">
                  <h3 className="title">Simular harvests</h3>
                  <Container>
                    <Row>
                      {dataHarvestSimilar?.map((ele, index) => {
                        return (
                          <Col md="4" key={`similar-${index}`}>
                            <Card>
                              <a href={ele.src}>
                                <img alt="..." className="img-rounded img-responsive" src={ele.image} />
                              </a>
                              <CardTitle tag="h5">
                                <a href={ele.src} className="mr-1 btn btn-link">
                                  {ele.havestName}
                                </a>
                              </CardTitle>
                              <p
                                className="blog-title"
                                style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginLeft: '10px' }}
                              >
                                {ele.description}
                              </p>
                              <span className="text-danger" style={{ fontWeight: 'bold' }}>
                                {convertPrice(ele.price)} vnđ/kg
                              </span>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  </Container>
                </div>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
