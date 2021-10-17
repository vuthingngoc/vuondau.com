import React from 'react';

import { Card, CardHeader, CardBody, CardTitle, Collapse, Label, FormGroup, Input, Container, Row, Col, Button } from 'reactstrap';
import styled from 'styled-components';

const ZoomImage = styled.img`
  :hover {
    transform: scale(1.2);
  }
`;

const dataProduct = [
  {
    productName: 'Cà chua',
    image: 'https://bonmuaminimart.vn/upload/product/ca-chua-beef-4652_500x500.jpg',
    description: 'Hàng limited edition đến từ nông trại Đà Lạt.',
    originPrice: '50,000 vnđ/kg',
    salePrice: '41,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Dưa leo',
    image: 'https://bonmuaminimart.vn/upload/product/dua-leo-9895_500x500.jpg',
    description: 'Sản phẩm đặc sản của Nông Trại Vĩnh Long. Dưa ngọt, nhiều nước và bảo quản được thời gian lâu trong tủ lạnh.',
    originPrice: '20,000 vnđ',
    salePrice: '15,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Rau cải thìa',
    image: 'https://bonmuaminimart.vn/upload/product/cai-thia-8501_500x500.jpg',
    description: 'Sản phẩm đặc sản của Nông Trại Vĩnh Long. Dưa ngọt, nhiều nước và bảo quản được thời gian lâu trong tủ lạnh.',
    originPrice: '41,800 vnđ',
    salePrice: '33,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Dưa hấu rằn',
    image: 'https://bonmuaminimart.vn/upload/product/dua-hau-5860_500x500.jpg',
    description: 'Sản phẩm đặc sản của Nông Trại Vĩnh Long. Dưa ngọt, nhiều nước và bảo quản được thời gian lâu trong tủ lạnh.',
    salePrice: '36,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Ổi lê',
    image: 'https://bonmuaminimart.vn/upload/product/oi-le-9781_500x500.jpg',
    description: 'Ổi Ổi Ổi',
    salePrice: '20,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Chuối sứ',
    image: 'https://bonmuaminimart.vn/upload/product/chuoi-su-3291_500x500.jpg',
    description: 'Chuối chuối chuối',
    salePrice: '30,000 vnđ/kg',
    src: '/product/productdetail/ca-chua',
  },
];

const dataCategory = [
  {
    name: 'Vegetable',
    checked: false,
  },
  {
    name: 'Fruit',
    checked: false,
  },
];

export default function ProductBody() {
  const [category, setCategory] = React.useState(false);
  document.documentElement.classList.remove('nav-open');
  return (
    <>
      <div className="section section-gray">
        <Container>
          <h3 className="section-title">Products List</h3>
          <Row>
            <Col md="3">
              <Card className="card-refine">
                <div aria-expanded={true} aria-multiselectable={true} className="panel-group" id="accordion">
                  <CardHeader className="card-collapse" id="categoryGear" role="tab">
                    <h5 className="mb-0 panel-title">
                      <a
                        aria-expanded={category}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setCategory(!category);
                        }}
                      >
                        Category <i className="nc-icon nc-minimal-down" />
                      </a>
                    </h5>
                  </CardHeader>
                  <Collapse isOpen={true}>
                    <CardBody>
                      {dataCategory.map((ele, index) => {
                        return (
                          <FormGroup check>
                            <Label check>
                              <Input
                                checked={ele.checked}
                                defaultValue=""
                                type="checkbox"
                                onClick={() => {
                                  dataCategory[index].checked = !dataCategory[index].checked;
                                  setCategory(!category);
                                }}
                              />
                              {ele.name} <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        );
                      })}
                    </CardBody>
                  </Collapse>
                </div>
              </Card>
              <Button className="btn-round" color="default" outline style={{ marginLeft: '80px' }}>
                Filter
              </Button>
              {/* end card */}
            </Col>
            <Col md="9">
              <div className="products">
                <Row>
                  {dataProduct.map((ele) => {
                    return (
                      <Col md="4">
                        <Card className="card-product card-plain">
                          <div className="card-image">
                            <a href={ele.src}>
                              <ZoomImage alt="..." src={ele.image} />
                            </a>
                            <CardBody>
                              <div className="card-description">
                                <CardTitle tag="h5">
                                  <a href={ele.src} class="mr-1 btn btn-link">
                                    {ele.productName}
                                  </a>
                                </CardTitle>
                                <p className="card-description" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                  {ele.description}
                                </p>
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
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
