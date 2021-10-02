import React from 'react';

import { Card, Container, Row, Col, CardBody, CardTitle } from 'reactstrap';

const data = [
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

export default function SimilarProduct() {
  return (
    <>
      <div className="section section-grey">
        <Container>
          <Row>
            <Col md="12">
              <h2>Sản phẩm tương tự</h2>
              <br />
            </Col>
            {data.map((ele) => {
              return (
                <Col md="4" sm="4">
                  <Card className="card-product card-plain">
                    <div className="card-image">
                      <a href={ele.src}>
                        <img alt="..." className="img-rounded img-responsive" src={ele.image} />
                      </a>
                      <CardBody>
                        <div className="card-description">
                          <CardTitle tag="h5">{ele.productName}</CardTitle>
                          <p className="card-description">{ele.description}</p>
                        </div>
                        <div className="actions">
                          <h5 className="text-white">{ele.salePrice}</h5>
                        </div>
                      </CardBody>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
}
