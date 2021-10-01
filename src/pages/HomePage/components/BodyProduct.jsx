import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { CardBody, CardTitle } from 'reactstrap';

export default function BodyProduction() {
  return (
    <>
      <div className="wrapper">
        <div className="section latest-offers">
          <Container>
            <h3 className="section-title">Best Deal Today</h3>
            <Row>
              <Col md="4">
                <Card className="card-product card-plain">
                  <div className="card-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img-rounded img-responsive"
                        src="https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11894_ca-chua-kg.jpg"
                      />
                    </a>
                    <CardBody>
                      <div className="card-description">
                        <CardTitle tag="h5">Cà chua không hạt</CardTitle>
                        <p className="card-description">Hàng limited edition đến từ nông trại Đà Lạt.</p>
                      </div>
                      <div className="price">
                        <s className="mr-1">50,000 vnđ/kg</s>
                        <span className="text-danger">41,000 vnđ/kg</span>
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-product card-plain">
                  <div className="card-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img-rounded img-responsive"
                        src="https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11896_dua-leo-lon-kg.jpg"
                      />
                    </a>
                    <CardBody>
                      <div className="card-description">
                        <CardTitle tag="h5">Dưa leo ruột vàng</CardTitle>
                        <p className="card-description">
                          Sản phẩm đặc sản của Nông Trại Vĩnh Long. Dưa ngọt, nhiều nước và bảo quản được thời gian lâu trong tủ lạnh.
                        </p>
                      </div>
                      <div className="price">
                        <s className="mr-1">20,000 vnđ</s>
                        <span className="text-danger">15,000 vnđ</span>
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-product card-plain">
                  <div className="card-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img-rounded img-responsive"
                        src="https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11918_cai-thia-kg.jpg"
                      />
                    </a>
                    <CardBody>
                      <div className="card-description">
                        <CardTitle tag="h5">Rau cải thìa</CardTitle>
                        <p className="card-description">
                          Sản phẩm từ nông trại Đà Lạt.Cải thìa không chỉ là loại rau quen thuộc để chế biến nên những món ăn ngon mà còn chứa nhiều
                          thành phần dinh dưỡng có lợi cho sức khỏe.
                        </p>
                      </div>
                      <div className="price">
                        <s className="mr-1">41.800 vnđ/kg</s>
                        <span className="text-danger">33.000 vnđ/kg</span>
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
