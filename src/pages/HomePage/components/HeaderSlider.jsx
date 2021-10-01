import React from 'react';
// reactstrap components
import { Button, Container, Carousel, CarouselItem, CarouselIndicators, Col, Row } from 'reactstrap';

//Fake data
const items = [
  {
    src: 'url(' + require('assets/img/sections/section-header-1.jpg').default + ')',
    content: (
      <Container>
        <Row>
          <Col className="text-left" md="6">
            <h1 className="title">Khan hiếm rau tại TPHCM</h1>
            <h5>
              Trong khi giá rau, củ, thịt tại các chợ truyền thống và điểm bán nhỏ lẻ tại TP.HCM tăng chóng mặt thì tại các nhà vườn, hộ chăn nuôi lại
              điêu đứng vì giá thấp và không có đầu ra. Giải pháp của bạn là đây hãy đặt rau trực tiếp tại vườn ...
            </h5>
            <br />
            <div className="buttons">
              <Button className="btn-round" color="danger" href="#pablo" onClick={(e) => e.preventDefault()} size="lg">
                Xem thêm
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    ),
    altText: '',
    caption: '',
  },
  {
    src: 'url(' + require('assets/img/sections/HeaderSlider-2.jpg').default + ')',
    content: (
      <Container>
        <Row>
          <Col className="ml-auto mr-auto text-center" md="8">
            <h1 className="title">Bạn muốn sản phẩm của mình được bán với giá tốt hơn</h1>
            <h5>
              Nếu bạn là chủ nông trại và muốn tự tìm cho mình những nguồn khách hàng tiềm năng trong tương lai, hãy liên hệ với chúng tôi. Sản phẩm
              của bạn sẽ trực tiếp đến tay người dùng và mang nguồn thu nhập tốt hơn cho bản thân.
            </h5>
            <br />
            <h6>Connect with us:</h6>
            <div className="buttons">
              <Button className="btn-neutral btn-just-icon" color="link" href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="fa fa-twitter" />
              </Button>
              <Button className="btn-neutral btn-just-icon" color="link" href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="fa fa-facebook-square" />
              </Button>
              <Button className="btn-neutral btn-just-icon" color="link" href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="fa fa-instagram" />
              </Button>
              <Button className="btn-neutral btn-just-icon" color="link" href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="fa fa-google-plus" />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    ),
    altText: '',
    caption: '',
  },
  {
    src: 'url(' + require('assets/img/sections/HeaderSlider-3.jpg').default + ')',
    content: (
      <Container>
        <Row>
          <Col className="ml-auto text-right" md="7">
            <h2 className="title">Nông Trại Thủy Canh Đồng Tháp</h2>
            <h5>
              Chuyên cup cấp các loại rau tươi mới đến cho gia đình bạn. Nông trại sử dụng phương pháp thủy canh giúp rau phát triển sạch và an toàn.
            </h5>
            <br />
            <div className="buttons">
              <Button className="btn-neutral" color="link" href="/" onClick={(e) => e.preventDefault()} size="lg">
                Chi tiết ...
              </Button>
              <Button className="btn-round" color="success" href="/" onClick={(e) => e.preventDefault()} size="lg">
                <i className="fa fa-shopping-cart" />
                Đặt hàng ngay
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    ),
    altText: '',
    caption: '',
  },
];

export default function HeaderSlider() {
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
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <div className="header-3">
      <div className="page-carousel">
        <div className="filter" />
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {items.map((item) => {
            return (
              <CarouselItem onExiting={onExiting} onExited={onExited} key={item.src}>
                <div className="page-header" style={{ backgroundImage: item.src }}>
                  <div className="filter" />
                  <div className="content-center">{item.content}</div>
                </div>
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
      </div>
    </div>
  );
}
