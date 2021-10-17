import { Card, FormGroup, Container, Row, Col, Carousel, CarouselItem, CarouselIndicators } from 'reactstrap';
import React from 'react';
import Select from 'react-select';
import { ultilities } from 'utils/services.ultils';
import { getItem } from 'services/data.service';

export default class FarmDetailBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataloaded: false,
      colorSelect: {
        value: '1',
        label: 'Cà chua',
      },
      data: [],
      activeIndex: 0,
      animating: false,
      _util: new ultilities(),
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let url = 'api/v1/farms';
    let id = this.props?.match?.params?.id;
    if (!this.state._util.isNullOrUndefined(id)) {
      let get_item = getItem(url, id);
      Promise.all([get_item])
        .then((values) => {
          if (values[0]?.status === 200) {
            this.setState({
              data: values[0].data,
              isDataloaded: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                    <Carousel
                      activeIndex={this.state.activeIndex}
                      next={() => {
                        this.next();
                      }}
                      previous={() => {
                        this.previous();
                      }}
                    >
                      <CarouselIndicators
                        items={carouselItems}
                        activeIndex={this.state.activeIndex}
                        onClickHandler={() => {
                          this.goToIndex();
                        }}
                      />
                      {carouselItems.map((item) => {
                        return (
                          <CarouselItem
                            onExiting={() => {
                              this.onExiting();
                            }}
                            onExited={() => {
                              this.onExited();
                            }}
                            key={item.src}
                          >
                            <img src={item.src} alt={item.altText} />
                            {/* <CarouselCaption captionText={item.caption} captionHeader="" /> */}
                          </CarouselItem>
                        );
                      })}
                      <span
                        className="left carousel-control carousel-control-prev"
                        data-slide="prev"
                        onClick={(e) => {
                          this.previous();
                        }}
                        role="button"
                      >
                        <span className="fa fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </span>
                      <span
                        className="right carousel-control carousel-control-next"
                        data-slide="next"
                        onClick={(e) => {
                          this.next();
                        }}
                        role="button"
                      >
                        <span className="fa fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </span>
                    </Carousel>
                  </Card>
                </div>
                {/* end carousel */}
              </Col>
              <Col md="5" sm="6" style={{ color: '#000000' }}>
                <h2>{!this.state._util.isNullOrUndefined(this.state.data) ? this.state.data.name : ''}</h2>
                <hr />
                <p>{!this.state._util.isNullOrUndefined(this.state.data) ? `Địa chỉ: ${this.state.data.address}` : 'Địa chỉ: '}</p>
                <p style={{ minHeight: 100 }}>
                  {!this.state._util.isNullOrUndefined(this.state.data) ? `Mô tả: ${this.state.data.description}` : 'Mô tả: '}
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
                {/* <Row>
                  <Col className="offset-md-5" md="7" sm="8">
                    <Button block className="btn-round" color="danger">
                      Add to Cart <i className="fa fa-chevron-right" />
                    </Button>
                  </Col>
                </Row> */}
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
