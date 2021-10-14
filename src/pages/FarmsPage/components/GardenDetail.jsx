import React from 'react';
import ColorNavbar from 'components/Navbars/ColorNavbar';
import FooterEcommerce from 'components/Footers/FooterEcommerce';

import { Button, Card, FormGroup, Container, Row, Col, Carousel, CarouselItem, CarouselIndicators, CarouselCaption } from 'reactstrap';

import Select from 'react-select';

const carouselItems = [
  {
    src: require('assets/img/sections/farms/MamNon.jpg').default,
    altText: 'Somewhere',
    caption: 'Somewhere',
  },
  {
    src: require('assets/img/sections/farms/VuonCaChua2.jpg').default,
    altText: 'Somewhere else',
    caption: 'Somewhere else',
  },
  {
    src: require('assets/img/sections/farms/GieoHanh.jpg').default,
    altText: 'Here it is',
    caption: 'Here it is',
  },
  {
    src: require('assets/img/sections/farms/ThuHoachRau.jpg').default,
    altText: 'Here it is',
    caption: 'Here it is',
  },
];

export default function GardenDetail(props) {
  // react-select states
  const [colorSelect, setColorSelect] = React.useState({
    value: '1',
    label: 'Cà chua ',
  });
  // carousel states and functions
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('register-page');
    document.body.classList.add('full-screen');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('register-page');
      document.body.classList.remove('full-screen');
    };
  });
  return (
    <>
      <ColorNavbar />
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage: 'url(' + require('assets/img/sections/FarmsPage2.jpg').default + ')',
          }}
        >
          <div className="main">
            <div>
              <Container>
                <Row className="title-row">
                  <br />
                </Row>
                <Row>
                  <Col md="7" sm="6">
                    <div className="ml-auto mr-auto" id="carousel">
                      <Card className="page-carousel">
                        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
                          <CarouselIndicators items={carouselItems} activeIndex={activeIndex} onClickHandler={goToIndex} />
                          {carouselItems.map((item) => {
                            return (
                              <CarouselItem onExiting={onExiting} onExited={onExited} key={item.src}>
                                <img src={item.src} alt={item.altText} />
                                <CarouselCaption captionText={item.caption} captionHeader="" />
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
                  <Col md="5" sm="6" style={{ color: '#000000' }}>
                    <h2>Nông Trại Thảo Điền</h2>
                    {/* <h4 className="price">
                                            <strong>€ 2,900.00</strong>
                                        </h4> */}
                    <hr />
                    <p>
                      Nông trại Thảo Điền hiện có một vườn rau canh tác theo kỹ thuật hữu cơ rộng 5.000m2 tại huyện ..., Tỉnh .... Tất cả sản phẩm rau
                      hữu cơ đều do Farmers Market tự trồng và kiểm soát chất lượng theo tiêu chuẩn canh tác hữu cơ tại nông trại này. .
                    </p>
                    <hr />
                    <p>
                      Với mục tiêu mang thực phẩm sạch quay lại bữa ăn của người Việt, chúng tôi cam kết tự trồng tất cả các sản phẩm rau hữu cơ với 4
                      tiêu chí: - Không thuốc bảo vệ thực vật - Không phân bón hóa học - Không thuốc kích thích tăng trưởng - Không chất bảo quản sau
                      thu hoạch
                    </p>
                    <hr />
                    <span className="label label-default shipping">Những loại nông sản hiện đang bán trong mùa:</span>
                    <Row>
                      <Col md="12" sm="5">
                        <label>Chọn nông sản</label>
                        <FormGroup>
                          <Select
                            className="react-select react-select-default"
                            classNamePrefix="react-select"
                            name="colorSelect"
                            value={colorSelect}
                            onChange={(value) => setColorSelect(value)}
                            options={[
                              { value: '1', label: 'Cà chua ' },
                              { value: '2', label: 'Rau cải' },
                              { value: '3', label: 'Hành' },
                            ]}
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col md="6" sm="6">
                                                <label>Select size</label>
                                                <FormGroup>
                                                    <Select
                                                        className="react-select react-select-default"
                                                        classNamePrefix="react-select"
                                                        name="sizeSelect"
                                                        value={sizeSelect}
                                                        onChange={(value) => setSizeSelect(value)}
                                                        options={[
                                                            { value: "1", label: "Small " },
                                                            { value: "2", label: "Medium" },
                                                            { value: "3", label: "Large" },
                                                        ]}
                                                    />
                                                </FormGroup>
                                            </Col> */}
                    </Row>
                    <hr />
                    <Row>
                      <Col className="offset-md-5" md="7" sm="8">
                        <Button block className="btn-round" color="danger">
                          Add to Cart  <i className="fa fa-chevron-right" />
                        </Button>
                      </Col>
                    </Row>
                    <br />
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
      <FooterEcommerce />
    </>
  );
}