import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Table, Container, Row, Col } from 'reactstrap';

const data = [
  {
    productName: 'Cà chua không hạt',
    image: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11894_ca-chua-kg.jpg',
    description: 'Hàng limited edition đến từ nông trại Đà Lạt.',
    weight: 1,
    salePrice: 41000,
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Dưa leo ruột vàng',
    image: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11896_dua-leo-lon-kg.jpg',
    description: 'Sản phẩm đặc sản của Nông Trại Vĩnh Long. Dưa ngọt, nhiều nước và bảo quản được thời gian lâu trong tủ lạnh.',
    weight: 2,
    salePrice: 15000,
    src: '/product/productdetail/ca-chua',
  },
  {
    productName: 'Rau cải thìa',
    image: 'https://hoayeuthuong.com/hinh-hoa-tuoi/moingay/11918_cai-thia-kg.jpg',
    description: 'Sản phẩm đặc sản của Nông Trại Vĩnh Long. Dưa ngọt, nhiều nước và bảo quản được thời gian lâu trong tủ lạnh.',
    weight: 1,
    salePrice: 33000,
    src: '/product/productdetail/ca-chua',
  },
];
export default function ShoppingCartBody() {
  const calTotal = () => {
    let total = 0;
    data.forEach((e) => {
      total += e.salePrice * e.weight;
    });
    return total;
  };
  return (
    <>
      <Container>
        <Row>
          <Col md="12">
            <h4 className="title">Your Cart Table</h4>
          </Col>
          <Col className="ml-auto mr-auto" md="12">
            <Table className="table-shopping" responsive>
              <thead>
                <tr>
                  <th className="text-center" />
                  <th />
                  <th className="text-right">Price</th>
                  <th className="text-right">Weight</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((ele) => {
                  return (
                    <tr>
                      <td>
                        <div className="img-container">
                          <Link to={ele.src}>
                            <img alt="..." src={ele.image} />
                          </Link>
                        </div>
                      </td>
                      <td className="td-product">
                        <Link to={ele.src}>
                          <strong>{ele.productName}</strong>
                        </Link>
                        <p>{ele.description}</p>
                      </td>
                      <td className="td-price">
                        {ele.salePrice}
                        <small> vnđ</small>
                      </td>
                      <td className="td-number td-quantity">
                        {ele.weight}
                        {' kg '}
                        <ButtonGroup>
                          <Button className="btn-border btn-round" color="default" size="sm">
                            -
                          </Button>
                          <Button className="btn-border btn-round" color="default" size="sm">
                            +
                          </Button>
                        </ButtonGroup>
                      </td>
                      <td className="td-number">
                        {ele.salePrice * ele.weight}
                        <small> vnđ</small>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="2" />
                  <td />
                  <td className="td-total">Total:</td>
                  <td className="td-total">
                    {calTotal()}
                    <small> vnđ</small>
                  </td>
                </tr>
                <tr className="tr-actions">
                  <td colSpan="3" />
                  <td className="text-right" colSpan="2">
                    <Button color="danger" size="lg" type="button">
                      Complete Purchase <i className="fa fa-chevron-right" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
