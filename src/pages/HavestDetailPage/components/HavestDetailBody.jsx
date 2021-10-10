import React from 'react';

import { Badge, Button, Card, Media, Container, Row, Col, CardBody, CardTitle } from 'reactstrap';

const dataHavest = {
  havestName: 'Nông Trại Đà Lạt vụ mùa xuân',
  ordered: 200,
  heart: 56,
  image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-2.jpg',
  imageAlt: 'imageAlt',
  imageTitle: 'Photo by Farmer',
  description: 'Các loại rau củ của nông trại đà lạc mùa xuân',
  src: '/havests/havestdetail/',
  status: 1,
  orderDay: 'OCTOBER 10, 2021',
};

const dataSimularHavest = [
  {
    havestName: 'Nông Trại đà lạt vụ mùa hạ',
    ordered: 352,
    image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-4.jpg',
    description: 'Các loại rau củ của nông trại đà lạc mùa hạ',
    src: '/havests/havestdetail/',
  },
  {
    havestName: 'Nông Trại đà lạt vụ mùa thu',
    ordered: 123,
    image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-3.jpg',
    description: 'Các loại rau củ của nông trại đà lạc mùa đông',
    src: '/havests/havestdetail/',
  },
  {
    havestName: 'Nông Trại đà lạt vụ mùa đông',
    ordered: 431,
    image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-cau-dat-farm-3.jpg',
    description: 'Các loại rau củ của nông trại đà lạc mùa đông',
    src: '/havests/havestdetail/',
  },
];

const dataProduct = [
  {
    productName: 'Cà chua không hạt',
    image: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11894_ca-chua-kg.jpg',
    description: 'Hàng limited edition đến từ nông trại Đà Lạt.',
    salePrice: '41,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Dưa leo ruột vàng',
    image: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11896_dua-leo-lon-kg.jpg',
    description: 'Sản phẩm đặc sản của Nông Trại Vĩnh Long. Dưa ngọt, nhiều nước và bảo quản được thời gian lâu trong tủ lạnh.',
    salePrice: '15,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Rau cải thìa',
    image: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11918_cai-thia-kg.jpg',
    description: 'Sản phẩm đặc sản của Nông Trại Vĩnh Long. Dưa ngọt, nhiều nước và bảo quản được thời gian lâu trong tủ lạnh.',
    salePrice: '33,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Cà chua không hạt',
    image: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11894_ca-chua-kg.jpg',
    description: 'Hàng limited edition đến từ nông trại Đà Lạt.',
    salePrice: '41,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Dưa leo ruột vàng',
    image: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11896_dua-leo-lon-kg.jpg',
    description: 'Sản phẩm đặc sản của Nông Trại Vĩnh Long. Dưa ngọt, nhiều nước và bảo quản được thời gian lâu trong tủ lạnh.',
    salePrice: '15,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Rau cải thìa',
    image: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11918_cai-thia-kg.jpg',
    description: 'Sản phẩm đặc sản của Nông Trại Vĩnh Long. Dưa ngọt, nhiều nước và bảo quản được thời gian lâu trong tủ lạnh.',
    salePrice: '33,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
];

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
                  </div>
                </Col>
                <Col className="ml-auto mr-auto" md="8">
                  <a href="javascrip: void(0);">
                    <Card data-radius="none">
                      <img alt={dataHavest.imageAlt} className="img-rounded img-responsive" src={dataHavest.image} />
                    </Card>
                    <p className="image-thumb text-center">{dataHavest.imageTitle}</p>
                  </a>
                  <div className="article-content">
                    <h4>Description</h4>
                    <p>{dataHavest.description}</p>
                  </div>
                  <h3 className="section-title">Havest's Products</h3>
                  <br />
                  <Row>
                    {dataProduct.map((ele) => {
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
                                      {ele.productName}
                                    </a>
                                  </CardTitle>
                                  <p className="card-description">{ele.description}</p>
                                </div>
                                <div className="price">
                                  <h6 className="text-default">{ele.salePrice}</h6>
                                </div>
                              </CardBody>
                            </div>
                          </Card>
                        </Col>
                      );
                    })}
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
