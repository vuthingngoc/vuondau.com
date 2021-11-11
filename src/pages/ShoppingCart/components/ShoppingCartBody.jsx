import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Table, Container, Row, Col } from 'reactstrap';
import { deleteDataByPath } from 'services/data.service';
import { updateDataByPath } from 'services/data.service';
import { getDataByPath } from 'services/data.service';

export default function ShoppingCartBody() {
  const [data, setData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const calTotal = () => {
    let total = 0;
    data?.forEach((e) => {
      total += e.salePrice * e.weight;
    });
    setTotalPrice(total);
    return totalPrice;
  };

  async function updateData(dataItem, customerID) {
    const dataUpdate = {
      customer_id: customerID,
      harvest_selling_id: dataItem.harvest_selling_id,
      price: dataItem.salePrice,
      quantity: dataItem.weight,
      status: 1,
    };
    const res = await updateDataByPath(`api/v1/productInCarts/${dataItem.id}`, dataUpdate);
    if (res.status === 200) {
      const dataTmp = data;
      dataTmp.forEach((ele, i) => {
        if (ele.id === dataItem.id) {
          dataTmp[i].weight = dataItem.weight;
        }
      });
      setData(dataTmp);
    } else {
      NotificationManager.warning('Update Weight Failed', 'Server is busy now, please try later', 3000);
    }
  }

  async function deleteItem(itemID, customerID) {
    if (customerID !== '' && itemID !== '') {
      const res = await deleteDataByPath(`api/v1/productInCarts/${itemID}`);
      console.log(res);
      if (res?.status === 204) {
        loadData(customerID);
        NotificationManager.success('Remove Item Success', 'Your item has been remove success', 3000);
      } else {
        NotificationManager.warning('Remove Item Failed', 'Something wrongs when remove', 3000);
      }
    }
  }

  async function increateWeight(id) {
    let userID = '';
    if (localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== '') {
      userID = jwtDecode(localStorage.getItem('accessToken')).ID;
    }
    let tmpData = data;
    let index = -1;
    tmpData.forEach((ele, i) => {
      if (ele.id === id) {
        tmpData[i].weight += 1;
        index = i;
      }
    });
    await updateData(tmpData[index], userID);
    calTotal();
  }

  async function decreaseWeight(id) {
    let userID = '';
    if (localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== '') {
      userID = jwtDecode(localStorage.getItem('accessToken')).ID;
    }
    let tmpData = data;
    let index = -1;
    tmpData.forEach((ele, i) => {
      if (ele.id === id) {
        index = i;
        if (ele.weight >= 0) {
          tmpData[i].weight -= 1;
        }
      }
    });
    if (tmpData[index].weight === 0) {
      await deleteItem(tmpData[index].id, userID);
    } else {
      await updateData(tmpData[index], userID);
    }
    calTotal();
  }

  async function loadData(customerID) {
    const res = await getDataByPath(`api/v1/productInCarts/${customerID}`);
    const dataItem = [];
    if (res.status === 200) {
      for (let ele of res.data) {
        let cartItemTmp = {
          id: ele.id,
          productName: ele.harvest_selling.harvest.product.name,
          harvestName: ele.harvest_selling.harvest.name,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
          alt: '...',
          description: ele.harvest_selling.harvest.description,
          salePrice: ele.price,
          src: `/harvests/harvestdetail/${ele.harvest_selling.id}`,
          harvest_selling_id: ele.harvest_selling.id,
          weight: ele.quantity,
          status: ele.status,
        };
        const resProductPic = await getDataByPath(`api/v1/product-pictures/${ele.harvest_selling.harvest.product.id}`);
        if (resProductPic?.status === 200) {
          if (resProductPic.data[0]) {
            cartItemTmp.image = resProductPic.data[0].src;
          }
        }
        dataItem.push(cartItemTmp);
      }
      let total = 0;
      dataItem?.forEach((e) => {
        total += e.salePrice * e.weight;
      });
      setTotalPrice(total);
    }
    setData(dataItem);
  }

  const convertPrice = (price) => {
    return new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(price);
  };

  useEffect(() => {
    let userInfo = '';
    if (localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== '') {
      userInfo = jwtDecode(localStorage.getItem('accessToken'));
    }
    if (data === null) {
      loadData(userInfo.ID);
    }
  });

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
                  <th className="text-center" style={{ fontWeight: 'bold' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((ele, index) => {
                  return (
                    <tr key={`item-${index}`}>
                      <td>
                        <div className="img-container">
                          <Link to={ele.src}>
                            <img alt="..." src={ele.image} />
                          </Link>
                        </div>
                      </td>
                      <td className="td-product">
                        <Link to={ele.src}>
                          <strong>{ele.harvestName}</strong> <br />
                          <h6>{`Sản phẩm: ${ele.productName}`}</h6>
                        </Link>
                        <p>{ele.description}</p>
                      </td>
                      <td className="td-price">
                        {convertPrice(ele.salePrice)}
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
                        <br />
                      </td>
                      <td className="td-number">
                        {convertPrice(ele.salePrice * ele.weight)}
                        <small> vnđ</small>
                      </td>
                      <td className="text-right">
                        <Button
                          className="btn-link mr-1"
                          color="danger"
                          onClick={() => {
                            let userID = '';
                            if (localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== '') {
                              userID = jwtDecode(localStorage.getItem('accessToken')).ID;
                            }
                            deleteItem(ele.id, userID);
                            calTotal();
                          }}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="2" />
                  <td />
                  <td />
                  <td className="td-total">Total:</td>
                  <td className="td-total">
                    {data?.length > 0 ? convertPrice(totalPrice) : 0}
                    <small> vnđ</small>
                  </td>
                </tr>
                <tr className="tr-actions">
                  <td colSpan="3" />
                  <td className="text-right" colSpan="2">
                    <Button color="danger" size="lg" type="button" href="/shoppingcart/checkout/17f65276-a1ef-470a-a15a-1422a23ceb0f">
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
