import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Container, Input, Row, Col, Form, Button, CardBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getDataByPath } from 'services/data.service';
import jwtDecode from 'jwt-decode';
import { createDataByPath } from 'services/data.service';
import { NotificationManager } from 'react-notifications';

const Step = styled.span`
  background-color: white;
  border-style: groove;
  display: inline-block;
  position: absolute;
  left: 70px;
  padding-top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  font-weight: bold;
`;

const RightBar = styled.div`
  display: inline-block;
  position: absolute;
  border-top: 1px black groove;
  left: 80px;
  border-bottom: 1px black groove;
  margin-top: 17px;
  width: 100%;
  height: 5px;
`;

const CenterSpan = styled.span`
  display: block;
  text-align: center;
`;

export default function CheckoutBody() {
  const [step, setStep] = useState(1);
  const [dataCart, setDataCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState(null);
  const [paymentID, setPaymentID] = useState('');

  async function loadData(customerID) {
    const res = await getDataByPath(`api/v1/productInCarts/${customerID}`);
    const dataItem = [];
    if (res.status === 200) {
      for (let ele of res.data) {
        let cartItemTmp = {
          id: ele.id,
          productName: ele.harvest_selling.harvest.product.name,
          harvestName: ele.harvest_selling.harvest.name,
          description: ele.harvest_selling.harvest.description,
          salePrice: ele.price,
          src: `/harvests/harvestdetail/${ele.harvest_selling.id}`,
          harvest_selling_id: ele.harvest_selling.id,
          weight: ele.quantity,
          status: ele.status,
        };
        dataItem.push(cartItemTmp);
      }
      let total = 0;
      dataItem?.forEach((e) => {
        total += e.salePrice * e.weight;
      });
      setTotalPrice(total);
    }

    const path = 'api/v1/payments';
    const resPayment = await getDataByPath(path);
    if (resPayment.status === 200) {
      setPayment(resPayment.data);
      if (resPayment.data[0]?.id) {
        setPaymentID(resPayment.data[0].id);
      }
    }

    setDataCart(dataItem);
  }

  async function createOrder() {
    let userInfo = '';
    if (localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== '') {
      userInfo = jwtDecode(localStorage.getItem('accessToken'));
    }
    if (userInfo !== '') {
      const createOrder = {
        customer_id: userInfo.ID,
        campaign_id: '',
        payment_id: paymentID,
        full_name: fullname,
        message: '',
        phone: phone,
        address: address,
        total_price: totalPrice,
      };
      console.log(createOrder);
      const res = await createDataByPath('api/v1/orders', createOrder);
      console.log(res);
      if (res.status === 201) {
        NotificationManager.success('Checkout Success', 'Your cart has been checkout success', 3000);
        setStep(3);
      } else {
        NotificationManager.warning('Checkout Failed', 'Server is busy please try againt', 3000);
      }
    } else {
      NotificationManager.warning('Login Session Invalid', 'Your login has been expired', 3000);
    }
  }

  const convertPrice = (price) => {
    return new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(price);
  };

  useEffect(() => {
    let userInfo = '';
    if (localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== '') {
      userInfo = jwtDecode(localStorage.getItem('accessToken'));
    }
    if (dataCart === null) {
      loadData(userInfo.ID);
    }
  });

  return (
    <>
      <Container>
        <Row>
          <Col className="ml-auto mr-auto text-center" md="10">
            <Row style={{ marginTop: '20px' }}>
              <Col md="3">
                <CenterSpan>Đặt hàng</CenterSpan>
              </Col>
              <Col md="3">Địa Chỉ Giao Hàng</Col>
              <Col md="3">Thanh Toán & Đặt Mua</Col>
              <Col md="3">Hoàn tất đặt hàng</Col>
            </Row>
            <Row style={{ marginTop: '10px', marginLeft: '15px' }}>
              {/* Step 1 */}
              <Col md="3">
                <Row>
                  <RightBar style={{ backgroundColor: 'red' }} />
                  <Step style={{ backgroundColor: 'red', color: 'white' }}>1</Step>
                </Row>
              </Col>
              {/* Step 2 */}
              <Col md="3">
                {step >= 2 ? (
                  <Row>
                    <RightBar style={{ backgroundColor: 'red' }} />
                    <Step style={{ backgroundColor: 'red', color: 'white' }}>2</Step>
                  </Row>
                ) : (
                  <Row>
                    <RightBar />
                    <Step style={{ backgroundColor: 'red', color: 'white' }}>2</Step>
                  </Row>
                )}
              </Col>
              {/* Step 3 */}
              <Col md="3">
                {step >= 3 ? (
                  <Row>
                    <RightBar style={{ backgroundColor: 'red' }} />
                    <Step style={{ backgroundColor: 'red', color: 'white' }}>3</Step>
                  </Row>
                ) : step >= 2 ? (
                  <Row>
                    <RightBar />
                    <Step style={{ backgroundColor: 'red', color: 'white' }}>3</Step>
                  </Row>
                ) : (
                  <Row>
                    <RightBar />
                    <Step style={{ color: 'black' }}>3</Step>
                  </Row>
                )}
              </Col>
              {/* Step 4 */}
              <Col md="3">
                <Row>{step >= 3 ? <Step style={{ backgroundColor: 'red', color: 'white' }}>4</Step> : <Step style={{ color: 'black' }}>4</Step>}</Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: '50px' }}>
          {/*User Info Input*/}
          {step === 1 && (
            <Col className="ml-auto mr-auto text-center" md="8">
              <h3 className="title" style={{ fontWeight: 'bolder' }}>
                Chọn địa chỉ giao hàng
              </h3>
              <Form
                className="contact"
                onSubmit={(e) => {
                  setStep(2);
                  e.preventDefault();
                }}
              >
                <Row style={{ marginTop: '20px' }}>
                  <Col md="8">
                    <Input
                      value={fullname}
                      placeholder="Fullname"
                      type="text"
                      onChange={(e) => {
                        setFullname(e.target.value);
                      }}
                      required
                    />
                  </Col>
                  <Col md="4">
                    <Input
                      value={phone}
                      placeholder="Phone"
                      type="text"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      required
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <Col md="12">
                    <Input
                      value={address}
                      placeholder="Address"
                      type="text"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      required
                    />
                  </Col>
                </Row>
                <Input placeholder="Message" rows="7" type="textarea" style={{ marginTop: '20px' }} />
                <Row style={{ marginTop: '20px' }}>
                  <Col className="ml-auto mr-auto" md="6">
                    <Button block className="btn-round" color="primary">
                      Giao đến địa chỉ này
                    </Button>
                  </Col>
                </Row>
              </Form>
              <h3 className="visit">
                <small>Or come and visit</small>
              </h3>
            </Col>
          )}
          {/*Thanh toán và Đặt Mua*/}
          {step === 2 && (
            <Col className="ml-auto mr-auto" md="8">
              <h3 className="text-center" style={{ fontWeight: 'bolder', marginBottom: '10px' }}>
                Chọn hình thức thanh toán
              </h3>
              <Col md="12" style={{ border: '1px solid black', borderRadius: '5px', padding: '10px', width: '100%' }}>
                {payment?.map((ele, index) => {
                  return (
                    <div className="form-check-radio">
                      <Label check style={{ color: 'black', fontWeight: 'bolder' }}>
                        <Input
                          value={ele.id}
                          id={index}
                          name="exampleRadios"
                          type="radio"
                          defaultChecked={index === 0}
                          onChange={(e) => {
                            setPaymentID(e.target.value);
                          }}
                        />
                        {ele.method} <span className="form-check-sign" />
                      </Label>
                    </div>
                  );
                })}
              </Col>
              <Row style={{ marginTop: '20px' }}>
                <Col className="ml-auto mr-auto" md="6">
                  <Button
                    block
                    className="btn-round"
                    color="success"
                    onClick={() => {
                      createOrder();
                    }}
                  >
                    Đặt hàng
                  </Button>
                </Col>
              </Row>
              <h3 className="visit text-center">
                <small>Vuondau.com</small>
              </h3>
            </Col>
          )}
          {/* hoàn tất đặt hàng*/}
          {step === 3 && (
            <Col className="ml-auto mr-auto text-center" md="8">
              <Col md="12">
                <div className="info">
                  <div className="icon icon-danger">
                    <i className="fa fa-check-circle-o" />
                  </div>

                  <h4 className="info-title" style={{ fontWeight: 'bold' }}>
                    Đơn hàng đã được đặt thành công{' '}
                  </h4>
                  <p className="description">Chúng tôi sẽ cố gắng gửi đơn hàng cho bạn sớm nhất có thể.</p>
                  <Button className="btn-link" color="success" href="/order">
                    Lịch sử đặt hàng
                  </Button>
                  <Button className="btn-link" color="danger" href="/home">
                    Trang chủ
                  </Button>
                </div>
              </Col>
              <h3 className="visit">
                <small>Vuondau.com</small>
              </h3>
            </Col>
          )}

          <Col md="4" style={{ marginTop: '65px' }}>
            {/*User Info*/}
            {step >= 2 && (
              <CardBody style={{ border: '1px solid grey', borderRadius: '5px', marginBottom: '10px' }}>
                <h6 className="author pull-left" style={{ marginTop: '15px' }}>
                  Giao hàng đến địa chỉ
                </h6>
                <span className="category-social text-info pull-right">
                  {step !== 3 && (
                    <Button
                      className="mr-1"
                      color="link"
                      onClick={() => {
                        setStep(1);
                      }}
                    >
                      Sửa
                    </Button>
                  )}
                </span>
                <div className="clearfix" style={{ borderBottomStyle: 'solid' }} />
                <Col md="12">
                  <Row>
                    <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Họ tên: </span>
                    <span style={{ fontWeight: 'bolder' }}>{fullname}</span>
                  </Row>
                  <Row>
                    <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Số điện thoại: </span>
                    <span style={{ fontWeight: 'bolder' }}>{phone}</span>
                  </Row>
                  <Row>
                    <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Địa chỉ: </span>
                    <span style={{ fontWeight: 'bolder' }}>{address}</span>
                  </Row>
                </Col>
              </CardBody>
            )}
            {/*Shopping Cart*/}
            <CardBody style={{ border: '1px solid grey', borderRadius: '5px', marginBottom: '10px' }}>
              <h6 className="author pull-left" style={{ marginTop: '15px' }}>
                Giỏ hàng
              </h6>
              <span className="category-social text-info pull-right">
                {step !== 3 && (
                  <Button className="mr-1" color="link" href="/shoppingcart">
                    Sửa
                  </Button>
                )}
              </span>
              <div className="clearfix" style={{ borderBottomStyle: 'solid' }} />
              <Col md="12">
                {dataCart?.map((e) => {
                  return (
                    <div>
                      <Row style={{ marginLeft: '1px' }}>
                        <span style={{ fontWeight: 'bold', marginTop: '7px' }}>{e.weight} kg x </span>
                        <Link className="btn-link mr-1" color="info" to={e.src}>
                          {e.productName}
                        </Link>
                      </Row>
                      <span style={{ fontWeight: 'bolder', color: 'red' }}>{convertPrice(e.salePrice)}đ </span>
                      <div className="clearfix" style={{ borderBottomStyle: 'solid', borderBottomWidth: '1px' }} />
                    </div>
                  );
                })}
                <Row>
                  <Col md="7" style={{ fontWeight: 'bolder' }}>
                    Tạm tính:
                  </Col>
                  <Col md="5" style={{ fontWeight: 'bold' }}>
                    {convertPrice(totalPrice)}đ
                  </Col>
                </Row>
                <div className="clearfix" style={{ borderBottomStyle: 'solid', borderBottomWidth: '1px' }} />
                <Row>
                  <Col md="4" style={{ fontWeight: 'bolder' }}>
                    Phụ phí:
                  </Col>
                  <Col md="8" style={{ fontWeight: 'bold' }}>
                    Nhân viên kinh doanh báo phí vận chuyển theo đơn hàng
                  </Col>
                </Row>
                <Row style={{ marginTop: '5px' }}>
                  <Col md="7" style={{ fontWeight: 'bolder' }}>
                    Tổng cộng:
                  </Col>
                  <Col md="5" style={{ fontWeight: 'bold', color: 'red' }}>
                    {totalPrice} vnđ
                  </Col>
                </Row>
              </Col>
            </CardBody>
          </Col>
        </Row>
      </Container>
    </>
  );
}
