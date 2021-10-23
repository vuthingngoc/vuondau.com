import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Table, Container, Row, Col } from 'reactstrap';

export default function ShoppingCartBody() {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const calTotal = () => {
    let total = 0;
    data.forEach((e) => {
      total += e.salePrice * e.weight;
    });
    setTotalPrice(total);
    return totalPrice;
  };

  const updateData = (data) => {
    setData(data);
    if (localStorage) {
      localStorage.setItem('CART', JSON.stringify(data));
    }
  };

  const increateWeight = (id) => {
    let tmpData = data;
    tmpData.forEach((ele, i) => {
      if (ele.id === id) {
        tmpData[i].weight += 1;
      }
    });
    updateData(tmpData);
    calTotal();
  };

  const decreaseWeight = (id) => {
    let tmpData = data;
    tmpData.forEach((ele, i) => {
      if (ele.id === id) {
        if (ele.weight > 1) {
          tmpData[i].weight -= 1;
        } else if ((ele.weight = 1)) {
          tmpData.splice(i, 1);
        }
      }
    });
    updateData(tmpData);
    calTotal();
  };

  useEffect(() => {
    const cartItem = JSON.parse(localStorage.getItem('CART'));
    setData(cartItem);
    let total = 0;
    cartItem.forEach((e) => {
      total += e.salePrice * e.weight;
    });
    setTotalPrice(total);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col md="12">
            <h4 className="title" style={{ fontWeight: 'bold' }}>
              Your Cart Table
            </h4>
          </Col>
          <Col className="ml-auto mr-auto" md="12">
            <Table className="table-shopping" responsive>
              <thead>
                <tr>
                  <th className="text-center" />
                  <th />
                  <th className="text-right" style={{ fontWeight: 'bold' }}>
                    Price
                  </th>
                  <th className="text-right" style={{ fontWeight: 'bold' }}>
                    Weight
                  </th>
                  <th className="text-right" style={{ fontWeight: 'bold' }}>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((ele) => {
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
                          <Button className="btn-border btn-round" onClick={() => decreaseWeight(ele.id)} color="default" size="sm">
                            -
                          </Button>
                          <Button className="btn-border btn-round" onClick={() => increateWeight(ele.id)} color="default" size="sm">
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
                    {totalPrice}
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
