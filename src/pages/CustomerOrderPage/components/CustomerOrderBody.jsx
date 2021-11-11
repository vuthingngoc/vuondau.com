import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';

import { Button, Table, Container, Modal, Col, Row, Badge, Input } from 'reactstrap';
import { createDataByPath } from 'services/data.service';
import { getDataByPath } from 'services/data.service';

export default function CustomerOrderBody() {
  const [modelOpen, setModelOpen] = useState(false);
  const [modelFeedbackOpen, setModelFeedbackOpen] = useState(false);
  const [dataOrder, setDataOrder] = useState(null);
  const [dataOrderDetail, setDataOrderDetail] = useState(null);
  const [totalPriceOrderDetail, settotalPriceOrderDetail] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [harvestNameFeedback, setHavestNameFeedback] = useState('');
  const [productNameFeedback, setProductNameFeedback] = useState('');
  const [orderIDFeedback, setOrderIDFeedback] = useState('');
  const [harvestIDFeedback, setHarvestIDFeedback] = useState('');
  const [dataFeedback, setDataFeedback] = useState(null);
  const [yourFeedback, setYourFeedback] = useState('');

  async function loadDataOrder(id) {
    if (id !== null) {
      const path = 'api/v1/orders/';
      const res = await getDataByPath(`${path}${id}`);
      if (res?.status === 200) {
        setDataOrder(res.data);
      }
    }
  }

  async function getDataFeedback(orderID, harvestID) {
    if (orderID !== '' && harvestID !== '') {
      const res = await getDataByPath(`api/v1/feedbacks/${orderID}`);
      console.log(res);
      if (res.status === 200) {
        const feedbackTmp = [];
        if (res.data.length > 0) {
          console.log(1);
          res.data.forEach((ele) => {
            if (ele.harvest.id === harvestID) {
              feedbackTmp.push(ele);
            }
          });
        }
        setDataFeedback(feedbackTmp);
      } else if (res.status === 404) {
        setDataFeedback([]);
      }
    }
  }

  async function createFeedback(feedback) {
    if (feedback !== '') {
      if (orderIDFeedback !== '' && harvestIDFeedback !== '') {
        const data = {
          order_id: orderIDFeedback,
          harvest_id: harvestIDFeedback,
          farmer_id: null,
          description: feedback,
        };
        const res = await createDataByPath('api/v1/feedbacks', data);
        if (res.status === 201) {
          setModelFeedbackOpen(false);
          NotificationManager.success('Feedback Success', 'Success', 3000);
        } else {
          NotificationManager.warning('Server is busy now, please try later', 'Something went wrong', 3000);
        }
      } else {
        NotificationManager.warning('Error', 'Something went wrong', 3000);
      }
    } else {
      NotificationManager.warning('Pleasy input your feedback', 'Don not let your feedback empty', 3000);
    }
  }

  const getFeedbackCustomer = (data) => {
    if (data.length === 1 || data[0].farmer === null) {
      return data[0].description;
    } else {
      return data[1].description;
    }
  };

  const getFeedbackFarmer = (data) => {
    if (data[0].farmer !== null) {
      return data[0].description;
    } else {
      return data[1].description;
    }
  };

  async function loadDataOrderDetail(orderID) {
    if (orderID !== null) {
      const path = 'api/v1/order-details/';
      const res = await getDataByPath(`${path}${orderID}`);
      if (res?.status === 200) {
        setDataOrderDetail(res.data);
      }
    }
  }

  const convertPrice = (price) => {
    return new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(price);
  };

  useEffect(() => {
    let customerID = '';
    if (localStorage) {
      customerID = jwtDecode(localStorage.getItem('accessToken')).ID;
    }
    if (dataOrder === null && customerID !== '') {
      loadDataOrder(customerID);
    }
  });

  const convertDateTime = (dateTime) => {
    const dateTimeTmp = dateTime.split('T');
    const dateTmp = dateTimeTmp[0].split('-');
    const date = `${dateTmp[2]}/${dateTmp[1]}/${dateTmp[0]}`;
    const time = dateTimeTmp[1].slice(0, 5);
    return `${date} ${time}`;
  };

  return (
    <>
      <div className="section section-gray">
        <Container className="tim-container">
          <div className="title text-center">
            <h3 style={{ fontWeight: 'bold' }}>Order's History</h3>
          </div>
          <Row>
            <Col
              md="2"
              style={{
                color: 'red',
                backgroundColor: 'white',
                fontWeight: 'bold',
                fontSize: 'large',
                textAlign: 'center',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}
            >
              Vuon dau
            </Col>
          </Row>
          <Row style={{ backgroundColor: 'white' }}>
            <Col md="12">
              <h5>
                {dataOrder !== null ? (
                  <Table responsive style={{ backgroundColor: 'white', borderTop: '2px solid white' }}>
                    <thead style={{ color: 'red' }}>
                      <tr style={{ borderTopStyle: 'none' }}>
                        <th style={{ fontWeight: 'bold' }} className="text-center">
                          STT
                        </th>
                        <th style={{ fontWeight: 'bold' }}>Thời gian đặt</th>
                        <th style={{ fontWeight: 'bold' }}>Thông tin nhận</th>
                        <th style={{ fontWeight: 'bold' }} className="text-center">
                          Tổng tiền
                        </th>
                        <th style={{ fontWeight: 'bold' }} className="text-center">
                          Tình trạng
                        </th>
                        <th style={{ fontWeight: 'bold' }} className="text-center">
                          Chi tiết
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataOrder?.map((ele, index) => {
                        return (
                          <tr>
                            <td className="text-center">{index + 1}</td>
                            <td>{convertDateTime(ele.date_of_create)}</td>
                            <td>
                              <Row style={{ fontWeight: 'bold' }}>{`${ele.phone} - ${ele.full_name}`}</Row>
                              <Row>{ele.address}</Row>
                            </td>
                            <td className="text-center" style={{ fontWeight: 'bold' }}>{`${convertPrice(ele.total_price)}đ`}</td>
                            <td className="text-center">
                              {ele.status === 0 ? (
                                <Badge className="mr-1" color="danger" pill>
                                  Đã Hủy
                                </Badge>
                              ) : ele.status === 1 ? (
                                <Badge className="mr-1" color="info" pill>
                                  Đã Đặt
                                </Badge>
                              ) : ele.status === 2 ? (
                                <Badge className="mr-1" color="primary" pill>
                                  Đang Giao
                                </Badge>
                              ) : (
                                <Badge className="mr-1" color="success" pill>
                                  Đã Nhận
                                </Badge>
                              )}
                            </td>
                            <td className="text-center">
                              <Button
                                color="danger"
                                onClick={() => {
                                  settotalPriceOrderDetail(ele.total_price);
                                  setDataOrderDetail(null);
                                  loadDataOrderDetail(ele.id);
                                  setModelOpen(true);
                                  if (ele.status === 3) {
                                    setShowFeedback(true);
                                  } else {
                                    setShowFeedback(false);
                                  }
                                }}
                              >
                                Xem
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <Row className="text-center">
                    <h3 style={{ margin: 'auto', fontWeight: 'bold' }}>Lịch sử đơn hàng trống</h3>
                  </Row>
                )}
              </h5>
            </Col>
          </Row>
          <Modal size="lg" isOpen={modelOpen} toggle={() => setModelOpen(false)}>
            <div className="modal-header no-border-header">
              <button className="close" type="button" onClick={() => setModelOpen(false)}>
                ×
              </button>
              <Row>
                <Col md="8">
                  <h6 className="modal-title" id="myModalLabel">
                    Chi tiết đơn hàng
                  </h6>
                </Col>
                <Col>
                  <h6 className="modal-title" id="myModalLabel" style={{ color: 'red' }}>
                    Tổng cộng: {convertPrice(totalPriceOrderDetail)}
                  </h6>
                </Col>
              </Row>
            </div>
            <div className="modal-body">
              {dataOrderDetail !== null ? (
                <Table responsive style={{ backgroundColor: 'white', borderTop: '2px solid white' }}>
                  <thead style={{ color: 'red' }}>
                    <tr style={{ borderTopStyle: 'none' }}>
                      <th className="text-center" style={{ fontWeight: 'bold' }}>
                        STT
                      </th>
                      <th style={{ fontWeight: 'bold' }}>Sản Phẩm</th>
                      <th style={{ fontWeight: 'bold' }} className="text-center">
                        Khối lượng
                      </th>
                      <th style={{ fontWeight: 'bold' }} className="text-center">
                        Giá
                      </th>
                      <th style={{ fontWeight: 'bold' }} className="text-center">
                        Phí
                      </th>
                      <th style={{ fontWeight: 'bold' }} className="text-center">
                        Giảm giá
                      </th>
                      <th style={{ fontWeight: 'bold' }} className="text-center">
                        Tổng cộng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOrderDetail?.map((ele, index) => {
                      return (
                        <tr>
                          <th className="text-center">{index + 1}</th>
                          <th>
                            <Row>{ele.harvestselling.harvest.name}</Row>
                            <Row style={{ color: 'gray' }}>{`Sản phẩm: ${ele.harvestselling.harvest.product.name}`}</Row>
                          </th>
                          <th className="text-center">{`${ele.weight} kg`}</th>
                          <th className="text-center">{`${convertPrice(ele.price)}đ`}</th>
                          <th className="text-center">0đ</th>
                          <th className="text-center">0đ</th>
                          <th className="text-center">
                            {`${convertPrice(ele.price * ele.weight)}đ`}
                            {showFeedback && (
                              <Button
                                className="btn-link mr-1"
                                color="info"
                                onClick={() => {
                                  setModelFeedbackOpen(true);
                                  setHavestNameFeedback(ele.harvestselling.harvest.name);
                                  setProductNameFeedback(ele.harvestselling.harvest.product.name);
                                  setOrderIDFeedback(ele.order.id);
                                  setHarvestIDFeedback(ele.harvestselling.harvest.id);
                                  setYourFeedback('');
                                  getDataFeedback(ele.order.id, ele.harvestselling.harvest.id);
                                }}
                              >
                                Đánh giá
                              </Button>
                            )}
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <Row>
                  <div className="uil-reload-css reload-background" style={{ display: 'block', margin: 'auto' }}>
                    <div />
                  </div>
                </Row>
              )}
            </div>
            <div className="modal-footer">
              <Button className="btn-link" color="danger" type="button" onClick={() => setModelOpen(false)}>
                Đóng
              </Button>
            </div>
          </Modal>
          <Modal size="md" isOpen={modelFeedbackOpen} toggle={() => setModelFeedbackOpen(false)}>
            <div className="modal-header no-border-header">
              <button className="close" type="button" onClick={() => setModelFeedbackOpen(false)}>
                ×
              </button>
              <h6 className="modal-title" id="myModalLabel">
                Đánh giá sản phẩm
              </h6>
            </div>
            <div className="modal-body">
              <Row>
                <h6>{`${harvestNameFeedback}`}</h6>
              </Row>
              <Row>
                <h6 style={{ color: 'grey' }}>{`Sản phẩm: ${productNameFeedback}`}</h6>
              </Row>
              {dataFeedback?.length > 0 ? (
                <Col>
                  <h6 style={{ color: 'grey', marginTop: '20px' }}>{`Đánh giá của bạn:`}</h6>
                  <Input
                    style={{ backgroundColor: 'white', borderWidth: '5px' }}
                    value={getFeedbackCustomer(dataFeedback)}
                    rows="3"
                    type="textarea"
                    disabled
                  />
                  {dataFeedback?.length === 2 && (
                    <Col md="12">
                      <h6 style={{ color: 'grey', marginTop: '10px' }}>{`Phản hồi:`}</h6>
                      <Input value={getFeedbackFarmer(dataFeedback)} rows="3" type="textarea" disabled />
                    </Col>
                  )}
                </Col>
              ) : (
                <Col>
                  <h6 style={{ color: 'grey', marginTop: '20px' }}>{`Đánh giá của bạn:`}</h6>
                  <Input
                    style={{ backgroundColor: 'white', borderWidth: '5px' }}
                    value={yourFeedback}
                    onChange={(e) => setYourFeedback(e.target.value)}
                    rows="3"
                    type="textarea"
                  />
                </Col>
              )}
            </div>
            <div className="modal-footer">
              <Row>
                <Col md="3">
                  <Button className="btn-link" color="danger" type="button" onClick={() => setModelFeedbackOpen(false)}>
                    Đóng
                  </Button>
                </Col>
                {dataFeedback?.length === 0 && (
                  <Col md="9">
                    <Button className="btn-link" color="success" type="button" onClick={() => createFeedback(yourFeedback)}>
                      Lưu đánh giá
                    </Button>
                  </Col>
                )}
              </Row>
            </div>
          </Modal>
        </Container>
      </div>
    </>
  );
}
