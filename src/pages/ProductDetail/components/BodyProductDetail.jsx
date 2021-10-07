import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Button, Card, Container, Row, Col, Carousel, CarouselItem, CarouselIndicators, CardBody, CardFooter, CardTitle } from 'reactstrap';

// carousel items
const dataProduct = {
  id: 1,
  productName: 'Cà chua',
  description: 'Hàng limited edition đến từ nông trại Đà Lạt.',
  salePrice: 41000,
  originPrice: 50000,
  image: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11894_ca-chua-kg.jpg',
};
const dataFarm = {
  farmName: 'Đà Lạc Farm',
  description:
    'Tọa lạc tại Đà Lạc, Đà Lạc Farm chuyên cung cấp các rau củ đà lạt chất lượng cao. Các sản phẩm chủ yếu là rau và các loại trái cây đà lạc',
  src: 'farm/farmdetail/dalacfarm',
};
const dataComment = [
  {
    username: 'Nigger',
    image: 'assets/img/faces/ayo-ogunseinde-2.jpg',
    description: 'Cà chua rất tươi, ngon và ship nhanh',
    userSrc: '/',
    color: 'blue',
    rating: '4.5',
  },
  {
    username: 'Doremon',
    image: 'assets/img/faces/clem-onojeghuo-2.jpg',
    description: 'Cà chua rất tươi, ngon và ship nhanh',
    userSrc: '/',
    color: 'green',
    rating: '5.0',
  },
  {
    username: 'Pikachu',
    image: 'assets/img/faces/kaci-baum-2.jpg',
    description: 'Cà chua rất tươi, ngon và ship nhanh',
    userSrc: '/',
    color: 'orange',
    rating: '3.0',
  },
];
const Items = [
  {
    src: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11894_ca-chua-kg.jpg',
    altText: '...',
  },
  {
    src: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/12048_ca-chua-socola-g.jpg',
    altText: '...',
  },
  {
    src: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/12000_ca-chua-than-go-kg.jpg',
    altText: '...',
  },
];

export default function BodyProductDetail() {
  const [weight, setWeight] = React.useState(1);
  // carousel states and functions
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === Items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? Items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

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
  };

  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('product-page');
    return function cleanup() {
      document.body.classList.remove('product-page');
    };
  });
  return (
    <>
      <div className="main">
        <div className="section">
          <Container>
            <Row className="title-row">
              <Col md="4">
                <h2 className="shop">Product Detail</h2>
              </Col>
              <Col className="ml-auto" md="4">
                <div className="pull-right">
                  <span className="text-muted">Product Status</span>
                  <Button color="link">
                    <i className="fa fa-check" />
                    Items Avaiable
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="7" sm="6">
                <div className="ml-auto mr-auto" id="carousel">
                  <Card className="page-carousel">
                    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                      <CarouselIndicators items={Items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                      {Items.map((item) => {
                        return (
                          <CarouselItem onExiting={onExiting} onExited={onExited} key={item.src}>
                            <img src={item.src} alt={item.altText} />
                          </CarouselItem>
                        );
                      })}
                      <a
                        className="left carousel-control carousel-control-prev"
                        data-slide="prev"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          previous();
                        }}
                        role="button"
                      >
                        <span className="fa fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </a>
                      <a
                        className="right carousel-control carousel-control-next"
                        data-slide="next"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          next();
                        }}
                        role="button"
                      >
                        <span className="fa fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </a>
                    </Carousel>
                  </Card>
                </div>
                {/* end carousel */}
              </Col>
              <Col md="5" sm="6">
                <h2>{dataProduct.productName}</h2>
                <h4 className="price">
                  <strong>{`${dataProduct.salePrice} vnđ/kg`}</strong>
                  <s className="mr-1" style={{ marginLeft: '10px' }}>
                    {`${dataProduct.originPrice} vnđ/kg`}
                  </s>
                </h4>
                <hr />
                <p>{dataProduct.description}</p>
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
                <hr />
                <Row>
                  <Col className="offset-md-5" md="7" sm="8">
                    <Button block className="btn-round" color="danger" onClick={addToCartHandle}>
                      Add to Cart  <i className="fa fa-chevron-right" />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section">
          <Container>
            <Row className="card-body-row">
              <Col md="4" sm="4">
                <div className="info">
                  <div className="icon icon-warning">
                    <i className="nc-icon nc-delivery-fast" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">7 Days Delivery</h4>
                    <p>Giao hàng nhanh đến tận cửa nhà bạn trong vòng 1 tuần.</p>
                  </div>
                </div>
              </Col>
              <Col md="4" sm="4">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="nc-icon nc-credit-card" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Chính sách đổi trả</h4>
                    <p>Hỗ trợ đổi trả trực tiếp cho chủ trang trại đối với các sản phẩm không đúng với quảng cáo.</p>
                  </div>
                </div>
              </Col>
              <Col md="4" sm="4">
                <div className="info">
                  <div className="icon icon-success">
                    <i className="nc-icon nc-bulb-63" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Cập nhật thông tin</h4>
                    <p>Giúp bạn cập nhật thông tin về sản phẩm mình đặt trực tiếp tại nông trại đến khi giao tận tay.</p>
                  </div>
                </div>
              </Col>
            </Row>
            <hr />
            <h2 className="text-center creators" style={{ marginBottom: '20px' }}>
              Đánh giá
            </h2>
            <Row>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <CardBody>
                    <div className="card-avatar">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img alt="..." src={require('assets/img/sections/FarmPicture.jpg').default} />
                      </a>
                    </div>
                    <a href={dataFarm.src} onClick={(e) => e.preventDefault()}>
                      <CardTitle tag="h4">{dataFarm.farmName}</CardTitle>
                    </a>
                    <p className="card-description text-center">{dataFarm.description}</p>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-just-icon mr-1" color="google" href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fa fa-google-plus" />
                    </Button>
                    <Button className="btn-just-icon mr-1" color="facebook" href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fa fa-facebook" />
                    </Button>
                    <Button className="btn-just-icon" color="instagram" href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fa fa-instagram" />
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col className="mr-auto" md="8">
                {dataComment.map((ele) => {
                  return (
                    <Col className="mr-auto" md="12">
                      <Card data-background="color" data-color={ele.color}>
                        <CardBody>
                          <div className="author">
                            <a href={ele.userSrc} onClick={(e) => e.preventDefault()}>
                              <img alt="..." className="avatar img-raised" src={require('assets/img/faces/clem-onojeghuo-2.jpg').default} />
                              <span>
                                {ele.username} <i className="fa fa-star" style={{ color: 'yellow' }} /> {ele.rating}
                              </span>
                            </a>
                          </div>
                          <span className="category-social pull-right">
                            <i className="fa fa-quote-right" />
                          </span>
                          <div className="clearfix" />
                          <p className="card-description">{ele.description}</p>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
