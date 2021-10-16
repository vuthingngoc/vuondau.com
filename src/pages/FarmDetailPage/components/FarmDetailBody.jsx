import { Button, Card, FormGroup, Container, Row, Col, Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';
import React from 'react';
import Select from 'react-select';

export default class FarmDetailBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataloaded: false,
      colorSelect: {
        value: '1',
        label: 'Cà chua',
      },
      activeIndex: 0,
      animating: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    //to do
  }

  goToIndex(newIndex) {
    if (this.state.animating) return;
    this.setState({
      activeIndex: newIndex,
    });
  }

  onExiting() {
    this.setState({
      animating: true,
    });
  }
  onExited() {
    this.setState({
      animating: false,
    });
  }
  next() {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === carouselItems.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({
      activeIndex: nextIndex,
    });
  }
  previous() {
    if (this.state.animating) return;
    const previus = this.state.activeIndex === 0 ? carouselItems.length - 1 : this.state.activeIndex - 1;
    this.setState({
      activeIndex: previus,
    });
  }

  render() {
    return (
      <>
        <div className="section section-gray">
          <Container>
            <Row className="title-row">
              <br />
            </Row>
            <Row>
              <Col md="7" sm="6">
                <div className="ml-auto mr-auto" id="carousel">
                  <Card className="page-carousel">
                    <Carousel activeIndex={this.state.activeIndex} next={this.next} previous={this.previous}>
                      <CarouselIndicators items={carouselItems} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                      {carouselItems.map((item) => {
                        return (
                          <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
                            <img src={item.src} alt={item.altText} />
                            {/* <CarouselCaption captionText={item.caption} captionHeader="" /> */}
                          </CarouselItem>
                        );
                      })}
                      <a
                        className="left carousel-control carousel-control-prev"
                        data-slide="prev"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          this.previous();
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
                          this.next();
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
                  Nông trại Thảo Điền hiện có một vườn rau canh tác theo kỹ thuật hữu cơ rộng 5.000m2 tại huyện ..., Tỉnh .... Tất cả sản phẩm rau hữu
                  cơ đều do Farmers Market tự trồng và kiểm soát chất lượng theo tiêu chuẩn canh tác hữu cơ tại nông trại này. .
                </p>
                <hr />
                <p>
                  Với mục tiêu mang thực phẩm sạch quay lại bữa ăn của người Việt, chúng tôi cam kết tự trồng tất cả các sản phẩm rau hữu cơ với 4
                  tiêu chí: - Không thuốc bảo vệ thực vật - Không phân bón hóa học - Không thuốc kích thích tăng trưởng - Không chất bảo quản sau thu
                  hoạch
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
                        value={this.state.colorSelect}
                        onChange={(value) => {
                          this.setState({ colorSelect: value });
                        }}
                        options={[
                          { value: '1', label: 'Cà chua ' },
                          { value: '2', label: 'Rau cải' },
                          { value: '3', label: 'Hành' },
                        ]}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="offset-md-5" md="7" sm="8">
                    <Button block className="btn-round" color="danger">
                      Add to Cart <i className="fa fa-chevron-right" />
                    </Button>
                  </Col>
                </Row>
                <br />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

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
