import React from 'react';
// import { Link } from 'react-router-dom';

import { Badge, Button, Card, Media, Container, Row, Col, CardTitle } from 'reactstrap';

const dataHavest = {
  havestName: 'Vụ cà chua Đà Lạt Mùa đông',
  ordered: 200,
  heart: 56,
  image:
    'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
  imageAlt: 'imageAlt',
  imageTitle: 'Photo by Farmer',
  description: 'Cà chua đà lạt vụ mùa đông',
  src: '/havests/havestdetail/',
  status: 1,
  orderDay: 'OCTOBER 10, 2021',
  havestDay: 'DECEMBER 15, 2021',
};

const dataSimularHavest = [
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

const dataProduct = {
  productName: 'Cà chua không hạt',
  image: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11894_ca-chua-kg.jpg',
  description: 'Hàng limited edition đến từ nông trại Đà Lạt.',
  salePrice: '41,000 vnđ/kg',
  src: '/product/productdetail/ca-chua',
};

const dataFarm = {
  farmName: 'Nông Trại Thảo Điền',
  image: require('assets/img/sections/farms/MamNon.jpg').default,
  description:
    'Nông trại Thảo Điền hiện có một vườn rau canh tác theo kỹ thuật hữu cơ rộng 5.000m2 tại huyện ..., Tỉnh .... Tất cả sản phẩm rau hữu cơ đều do Farmers Market tự trồng và kiểm soát chất lượng theo tiêu chuẩn canh tác hữu cơ tại nông trại này.',
  src: '/farms/farmdetail',
};

export default function HavestDetailBody() {
  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('blog-post');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('blog-post');
    };
  });
  return (
    <>
      <div className="wrapper">
        <div className="main">
          <div className="section section-white">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto" md="10">
                  <div className="text-center">
                    <Badge className="main-tag" color={dataHavest.status === 1 ? 'success' : 'danger'}>
                      {dataHavest.status === 1 ? 'Avaiable' : 'Closed'}
                    </Badge>
                    <a href="javascrip: void(0);">
                      <h3 className="title">{dataHavest.havestName}</h3>
                    </a>
                    <h6 className="title-uppercase">Order start day: {dataHavest.orderDay} </h6>
                    <h6 className="title-uppercase">Expect havest day: {dataHavest.havestDay} </h6>
                  </div>
                </Col>
                <Col className="ml-auto mr-auto" md="8">
                  <Card data-radius="none">
                    <img alt={dataHavest.imageAlt} className="img-rounded img-responsive" src={dataHavest.image} />
                  </Card>
                  <p className="image-thumb text-center">{dataHavest.imageTitle}</p>
                  <div className="article-content">
                    <h4>Description</h4>
                    <p>{dataHavest.description}</p>
                  </div>
                  <h3 className="section-title">Havest's Products</h3>
                  <br />
                  <Row>
                    <Col md="6">
                      <Card className="card-product card-plain">
                        <div className="card-image">
                          <a href={dataProduct.src}>
                            <img alt="..." src={dataProduct.image} />
                          </a>
                        </div>
                      </Card>
                    </Col>
                    <Col md="6">
                      <h3>{dataProduct.productName}</h3>
                      <p className="card-description">{dataProduct.description}</p>
                      <div className="price">
                        <h6 className="text-default">{dataProduct.salePrice}</h6>
                      </div>
                      <Row>
                        <Button className="btn-round" color="info" href={dataProduct.src}>
                          View Product
                        </Button>
                        <h6 style={{ textAlign: 'right', marginLeft: '100px', marginTop: '10px' }}>
                          Đã đặt <i className="fa fa-handshake-o" /> {dataHavest.ordered}
                        </h6>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                  <Container>
                    <Row>
                      <Media>
                        <a className="pull-left" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <div className="avatar big-avatar">
                            <Media alt="..." object src={dataFarm.image} />
                          </div>
                        </a>
                        <Media body>
                          <Media heading>{dataFarm.farmName}</Media>
                          <div className="pull-right">
                            <Button className="btn-round" color="default" href={dataFarm.src}>
                              <i className="fa fa-reply mr-1" />
                              Check Info
                            </Button>
                          </div>
                          <p>{dataFarm.description}</p>
                        </Media>
                      </Media>
                    </Row>
                  </Container>
                </Col>
              </Row>
              <Row>
                <div className="related-articles">
                  <h3 className="title">Simular havests</h3>
                  <legend />
                  <Container>
                    <Row>
                      {dataSimularHavest.map((ele) => {
                        return (
                          <Col md="4">
                            <a href={ele.src}>
                              <img alt="..." className="img-rounded img-responsive" src={ele.image} />
                            </a>
                            <CardTitle tag="h5">
                              <a href={ele.src} class="mr-1 btn btn-link">
                                {ele.havestName}
                              </a>
                            </CardTitle>
                            <p className="blog-title">{ele.description}</p>
                            <h6 style={{ textAlign: 'right' }}>
                              Đã đặt <i className="fa fa-handshake-o" /> {ele.ordered}
                            </h6>
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
