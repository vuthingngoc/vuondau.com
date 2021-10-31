import React from 'react';
// import { Card, Col, Container, Row } from 'react-bootstrap';
import { CardBody, CardTitle, Card, Col, Container, Row } from 'reactstrap';
// import styled from 'styled-components';

const dataProduct = [
  {
    productName: 'Cà chua',
    image: 'https://bonmuaminimart.vn/upload/product/ca-chua-beef-4652_500x500.jpg',
    originPrice: '50,000 vnđ/kg',
    salePrice: '41,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Dưa leo',
    image: 'https://bonmuaminimart.vn/upload/product/dua-leo-9895_500x500.jpg',
    originPrice: '20,000 vnđ',
    salePrice: '15,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Rau cải thìa',
    image: 'https://bonmuaminimart.vn/upload/product/cai-thia-8501_500x500.jpg',
    originPrice: '41,800 vnđ',
    salePrice: '33,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
];

const dataFruit = [
  {
    productName: 'Dưa hấu rằn',
    image: 'https://bonmuaminimart.vn/upload/product/dua-hau-5860_500x500.jpg',
    salePrice: '36,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Ổi lê',
    image: 'https://bonmuaminimart.vn/upload/product/oi-le-9781_500x500.jpg',
    salePrice: '20,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Chuối sứ',
    image: 'https://bonmuaminimart.vn/upload/product/chuoi-su-3291_500x500.jpg',
    salePrice: '30,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
];

const dataHavest = [
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
];

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
                <Col md="9">
                  <h4 className="section-title" style={{ fontWeight: 'bold' }}>
                    Best Deal Today
                  </h4>
                </Col>
                <Col md="3">
                  <h6 style={{ marginTop: '20px' }}>
                    <a href="/production" className="mr-1 btn btn-link">
                      More information &gt;&gt;
                    </a>
                  </h6>
                </Col>
              </Row>
              <br />
              <Row>
                {dataProduct.map((ele) => {
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
                                  {ele.productName}
                                </a>
                              </CardTitle>
                            </div>
                            <div className="price">
                              <s className="mr-1">{ele.originPrice}</s>
                              <span className="text-danger" style={{ fontWeight: 'bold' }}>
                                {ele.salePrice}
                              </span>
                            </div>
                          </CardBody>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              <Row style={{ borderBottom: '3px groove' }}>
                <Col md="9">
                  <h4 className="section-title" style={{ fontWeight: 'bold' }}>
                    Top Harvest Ordered
                  </h4>
                </Col>
                <Col md="3">
                  <h6 style={{ marginTop: '20px' }}>
                    <a href="/harvests" className="mr-1 btn btn-link">
                      More information &gt;&gt;
                    </a>
                  </h6>
                </Col>
              </Row>
              <br />
              <Row>
                {dataHavest.map((ele) => {
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
                                  {ele.havestName}
                                </a>
                              </CardTitle>
                              <p className="card-description" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                {ele.description}
                              </p>
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

              <Row style={{ borderBottom: '3px groove' }}>
                <Col md="9">
                  <h4 className="section-title" style={{ fontWeight: 'bold' }}>
                    Vegetable
                  </h4>
                </Col>
                <Col md="3">
                  <h6 style={{ marginTop: '20px' }}>
                    <a href="/production#vegetable" className="mr-1 btn btn-link">
                      More information &gt;&gt;
                    </a>
                  </h6>
                </Col>
              </Row>
              <br />
              <Row>
                {dataProduct.map((ele) => {
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
                                  {ele.productName}
                                </a>
                              </CardTitle>
                            </div>
                            <div className="price">
                              <span className="text-danger" style={{ fontWeight: 'bold' }}>
                                {ele.salePrice}
                              </span>
                            </div>
                          </CardBody>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>

              <Row style={{ borderBottom: '3px groove' }}>
                <Col md="9">
                  <h4 className="section-title" style={{ fontWeight: 'bold' }}>
                    Fruits
                  </h4>
                </Col>
                <Col md="3">
                  <h6 style={{ marginTop: '20px' }}>
                    <a href="/production#fruit" className="mr-1 btn btn-link">
                      More information &gt;&gt;
                    </a>
                  </h6>
                </Col>
              </Row>
              <br />
              <Row>
                {dataFruit.map((ele) => {
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
                                  {ele.productName}
                                </a>
                              </CardTitle>
                            </div>
                            <div className="price">
                              <span className="text-danger" style={{ fontWeight: 'bold' }}>
                                {ele.salePrice}
                              </span>
                            </div>
                          </CardBody>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Container>
          {/* <div style={{ paddingBottom: '2000px' }}>test</div> */}
        </div>
      </div>
    </>
  );
}
