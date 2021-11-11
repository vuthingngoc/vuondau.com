import React, { useEffect, useState } from 'react';
// import { Card, Col, Container, Row } from 'react-bootstrap';
import { CardBody, CardTitle, Card, Col, Container, Row } from 'reactstrap';
import { getDataByPath } from 'services/data.service';
// import styled from 'styled-components';

const dataNew = [
  {
    title: 'Đi chợ online tăng mạnh trong những ngày giản cách',
    image: 'https://bonmuaminimart.vn/upload/baiviet/di-cho-online-tang-manh,-giam-tai-cho-sieu-thi-8722_600x440.jpg',
    src: '/home',
    createDate: '2021-07-08 21:47:17',
  },
  {
    title: 'Những loại thực phẩm không nên hâm nóng bằng lò vi sóng',
    image: 'https://bonmuaminimart.vn/upload/baiviet/ham-nong-thuc-an-9100_600x440.jpg',
    src: '/home',
    createDate: '2021-03-15 16:45:51',
  },
];

export default function BodyProduction() {
  const [dataHarvest, setDataHarvest] = useState(null);
  const [dataHarvestTraiCay, setDataHarvestTraiCay] = useState(null);
  const [dataHarvestRau, setDataHarvestRau] = useState(null);
  const [dataHarvestCu, setDataHarvestCu] = useState(null);

  const convertPrice = (price) => {
    return new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(price);
  };

  async function loadDataHarvest() {
    let path = 'api/v1/harvest-sellings';
    const res = await getDataByPath(path);
    const tmpImg = 'https://giaoducthuydien.vn/wp-content/themes/consultix/images/no-image-found-360x250.png';
    const traicayCategory = '0c62b9c6-10ac-465e-99c4-3dff07279c93';
    const rauCategory = '408cb360-eccd-40c8-ae73-c8143994ce84';
    const cuCategory = 'aae688f7-d8aa-4ef7-b42e-5c69d3a2fe27';
    if (res?.status === 200) {
      const data = res.data;
      const dataHarvestTmp = [];
      const dataHarvestTraiCayTmp = [];
      const dataHarvestRauTmp = [];
      const dataHarvestCuTmp = [];
      for (const [index, ele] of data.entries()) {
        if (index < 3) {
          const harvest = {
            harvestName: ele.harvest.name,
            price: 0,
            status: ele.status,
            image: tmpImg,
            src: `/harvests/harvestdetail/${ele.id}`,
          };
          const resImage = await getDataByPath(`api/v1/harvest-pictures/${ele.harvest.id}`);
          if (resImage.status === 200) {
            if (resImage.data[0]) {
              harvest.image = resImage.data[0].src;
            }
          }
          const resPrice = await getDataByPath(`api/v1/harvest-selling-prices/${ele.id}`);
          if (resPrice.status === 200) {
            if (resPrice.data[0]) {
              harvest.price = resPrice.data[0].price;
            }
          }
          dataHarvestTmp.push(harvest);
        }

        if (dataHarvestTraiCayTmp.length < 3) {
          if (ele.harvest.product.product_type.id === traicayCategory) {
            const harvest = {
              harvestName: ele.harvest.name,
              price: 0,
              status: ele.status,
              image: tmpImg,
              src: `/harvests/harvestdetail/${ele.id}`,
            };
            const resImage = await getDataByPath(`api/v1/harvest-pictures/${ele.harvest.id}`);
            if (resImage.status === 200) {
              if (resImage.data[0]) {
                harvest.image = resImage.data[0].src;
              }
            }
            const resPrice = await getDataByPath(`api/v1/harvest-selling-prices/${ele.id}`);
            if (resPrice.status === 200) {
              if (resPrice.data[0]) {
                harvest.price = resPrice.data[0].price;
              }
            }
            dataHarvestTraiCayTmp.push(harvest);
          }
        }

        if (dataHarvestCuTmp.length < 3) {
          if (ele.harvest.product.product_type.id === cuCategory) {
            const harvest = {
              harvestName: ele.harvest.name,
              price: 0,
              status: ele.status,
              image: tmpImg,
              src: `/harvests/harvestdetail/${ele.id}`,
            };
            const resImage = await getDataByPath(`api/v1/harvest-pictures/${ele.harvest.id}`);
            if (resImage.status === 200) {
              if (resImage.data[0]) {
                harvest.image = resImage.data[0].src;
              }
            }
            const resPrice = await getDataByPath(`api/v1/harvest-selling-prices/${ele.id}`);
            if (resPrice.status === 200) {
              if (resPrice.data[0]) {
                harvest.price = resPrice.data[0].price;
              }
            }
            dataHarvestCuTmp.push(harvest);
          }
        }

        if (dataHarvestRauTmp.length < 3) {
          if (ele.harvest.product.product_type.id === rauCategory) {
            const harvest = {
              harvestName: ele.harvest.name,
              price: 0,
              status: ele.status,
              image: tmpImg,
              src: `/harvests/harvestdetail/${ele.id}`,
            };
            const resImage = await getDataByPath(`api/v1/harvest-pictures/${ele.harvest.id}`);
            if (resImage.status === 200) {
              if (resImage.data[0]) {
                harvest.image = resImage.data[0].src;
              }
            }
            const resPrice = await getDataByPath(`api/v1/harvest-selling-prices/${ele.id}`);
            if (resPrice.status === 200) {
              if (resPrice.data[0]) {
                harvest.price = resPrice.data[0].price;
              }
            }
            dataHarvestRauTmp.push(harvest);
          }
        }
      }

      setDataHarvest(dataHarvestTmp);
      setDataHarvestTraiCay(dataHarvestTraiCayTmp);
      setDataHarvestCu(dataHarvestCuTmp);
      setDataHarvestRau(dataHarvestRauTmp);
    }
  }

  useEffect(() => {
    if (dataHarvest === null) {
      loadDataHarvest();
    }
  });

  return (
    <>
      <div className="wrapper">
        <div className="section latest-offers" style={{ display: 'inline-flex' }}>
          {/* Left Sticky */}
          <Container
            style={{
              position: 'sticky',
              width: '15%',
              float: 'left',
              top: '100px',
              maxHeight: '80vh',
              borderStyle: 'groove',
            }}
          >
            <Row>
              <Col md="10">
                <h5 className="section-title" style={{ fontWeight: 'bold', marginTop: '10px', marginLeft: '10px' }}>
                  New
                </h5>
              </Col>
              <Col md="2">
                <i className="fa fa-list" style={{ marginTop: '20px' }} />
              </Col>
            </Row>
            <Col md="12">
              {dataNew?.map((ele) => {
                return (
                  <Card className="card-product card-plain">
                    <div className="card-image">
                      <a href={ele.src}>
                        <img alt="..." src={ele.image} />
                      </a>
                      <CardTitle tag="h6">
                        <h6>
                          <a href={ele.src} style={{ fontWeight: 'bold' }}>
                            {ele.title}
                          </a>
                        </h6>
                      </CardTitle>
                      <CardBody>
                        <div className="card-description">
                          <p className="card-description">
                            <i className="fa fa-calendar" /> {ele.createDate}
                          </p>
                        </div>
                      </CardBody>
                    </div>
                  </Card>
                );
              })}
            </Col>
          </Container>
          {/* Center Sticky*/}
          <Container style={{ width: '70%', float: 'center' }}>
            <Col md="12">
              <Row style={{ borderBottom: '3px groove' }}>
                <Col md="10">
                  <h4 className="section-title" style={{ fontWeight: 'bold' }}>
                    Nhiều người đặt
                  </h4>
                </Col>
                <Col md="2">
                  <h6 style={{ marginTop: '20px' }}>
                    <a href="/harvests/tat-ca" className="mr-1 btn btn-link">
                      Xem thêm &gt;&gt;
                    </a>
                  </h6>
                </Col>
              </Row>
              <br />
              <Row>
                {dataHarvest?.map((ele) => {
                  return (
                    <Col md="4">
                      <Card className="card-product card-plain-custom">
                        <div className="card-image">
                          <a href={ele.src}>
                            <img alt="..." src={ele.image} />
                          </a>
                          <CardBody>
                            <div className="card-description">
                              <CardTitle tag="h5">
                                <a href={ele.src} class="mr-1 btn btn-link">
                                  {ele.harvestName}
                                </a>
                              </CardTitle>
                              <span className="text-danger" style={{ fontWeight: 'bold' }}>
                                {convertPrice(ele.price)} vnđ/kg
                              </span>
                            </div>
                            {/* <h6 style={{ textAlign: 'right' }}>
                              Đã đặt <i className="fa fa-handshake-o" /> {ele.ordered}
                            </h6> */}
                          </CardBody>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>

              <Row style={{ borderBottom: '3px groove' }}>
                <Col md="10">
                  <h4 className="section-title" style={{ fontWeight: 'bold' }}>
                    Trái cây
                  </h4>
                </Col>
                <Col md="2">
                  <h6 style={{ marginTop: '20px' }}>
                    <a href="/harvests/trai-cay" className="mr-1 btn btn-link">
                      Xem thêm &gt;&gt;
                    </a>
                  </h6>
                </Col>
              </Row>
              <br />
              {dataHarvestTraiCay !== null ? (
                <Row>
                  {dataHarvestTraiCay?.map((ele) => {
                    return (
                      <Col md="4">
                        <Card className="card-product card-plain-custom">
                          <div className="card-image">
                            <a href={ele.src}>
                              <img alt="..." src={ele.image} />
                            </a>
                            <CardBody>
                              <div className="card-description">
                                <CardTitle tag="h5">
                                  <a href={ele.src} class="mr-1 btn btn-link">
                                    {ele.harvestName}
                                  </a>
                                </CardTitle>
                              </div>
                              <div className="price">
                                <span className="text-danger" style={{ fontWeight: 'bold' }}>
                                  {convertPrice(ele.price)} vnđ/kg
                                </span>
                              </div>
                            </CardBody>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <div className="uil-reload-css reload-background" style={{ display: 'block', margin: 'auto' }}>
                  <div />
                </div>
              )}

              <Row style={{ borderBottom: '3px groove' }}>
                <Col md="10">
                  <h4 className="section-title" style={{ fontWeight: 'bold' }}>
                    Rau
                  </h4>
                </Col>
                <Col md="2">
                  <h6 style={{ marginTop: '20px' }}>
                    <a href="/harvests/rau" className="mr-1 btn btn-link">
                      Xem thêm &gt;&gt;
                    </a>
                  </h6>
                </Col>
              </Row>
              <br />
              {dataHarvestRau !== null ? (
                <Row>
                  {dataHarvestRau?.map((ele) => {
                    return (
                      <Col md="4">
                        <Card className="card-product card-plain-custom">
                          <div className="card-image">
                            <a href={ele.src}>
                              <img alt="..." src={ele.image} />
                            </a>
                            <CardBody>
                              <div className="card-description">
                                <CardTitle tag="h5">
                                  <a href={ele.src} class="mr-1 btn btn-link">
                                    {ele.harvestName}
                                  </a>
                                </CardTitle>
                              </div>
                              <div className="price">
                                <span className="text-danger" style={{ fontWeight: 'bold' }}>
                                  {convertPrice(ele.price)} vnđ/kg
                                </span>
                              </div>
                            </CardBody>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <div className="uil-reload-css reload-background" style={{ display: 'block', margin: 'auto' }}>
                  <div />
                </div>
              )}

              <Row style={{ borderBottom: '3px groove' }}>
                <Col md="10">
                  <h4 className="section-title" style={{ fontWeight: 'bold' }}>
                    Củ
                  </h4>
                </Col>
                <Col md="2">
                  <h6 style={{ marginTop: '20px' }}>
                    <a href="/harvests/cu" className="mr-1 btn btn-link">
                      Xem thêm &gt;&gt;
                    </a>
                  </h6>
                </Col>
              </Row>
              <br />
              {dataHarvest !== null ? (
                <Row>
                  {dataHarvestCu?.map((ele) => {
                    return (
                      <Col md="4">
                        <Card className="card-product card-plain-custom">
                          <div className="card-image">
                            <a href={ele.src}>
                              <img alt="..." src={ele.image} />
                            </a>
                            <CardBody>
                              <div className="card-description">
                                <CardTitle tag="h5">
                                  <a href={ele.src} class="mr-1 btn btn-link">
                                    {ele.harvestName}
                                  </a>
                                </CardTitle>
                              </div>
                              <div className="price">
                                <span className="text-danger" style={{ fontWeight: 'bold' }}>
                                  {convertPrice(ele.price)} vnđ/kg
                                </span>
                              </div>
                            </CardBody>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <div className="uil-reload-css reload-background" style={{ display: 'block', margin: 'auto' }}>
                  <div />
                </div>
              )}
            </Col>
          </Container>
          {/* <div style={{ paddingBottom: '2000px' }}>test</div> */}
        </div>
      </div>
    </>
  );
}
