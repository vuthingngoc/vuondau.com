import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { UncontrolledTooltip, Button, Container, Row, Col, Table } from 'reactstrap';
import { deleteDataByPath } from 'services/data.service';

import { getDataByPath } from 'services/data.service';

export default function ProductManagerBody() {
  const [data, setData] = useState(null);
  async function loadData() {
    if (localStorage) {
      const accessToken = localStorage.getItem('accessToken');
      let path = 'api/v1/products';
      const res = await getDataByPath(path, accessToken);
      if (res?.status === 200) {
        setData(res.data);
      }
    }
  }

  async function deleteData(id) {
    if (data !== null) {
      const res = await deleteDataByPath(`api/v1/products/${id}`, id);
      if (res.status === 204) {
        await loadData();
        NotificationManager.success('Deactive Success', 'Your data has been deactive success', 3000);
      } else {
        NotificationManager.warning('Deactive Failed', 'Something wrongs when deactive', 3000);
      }
    }
  }

  const convertDateToShow = (date) => {
    return date.slice(0, 10);
  };

  useEffect(() => {
    if (data === null) {
      loadData();
    }
  });
  return (
    <>
      <div className="section section-gray">
        <Container className="tim-container">
          <div className="title">
            <Row>
              <Col md="9">
                <h2>Manage Products</h2>
              </Col>
            </Row>
          </div>
          <Row>
            <Col className="ml-auto mr-auto" md="12">
              <h4 className="title" style={{ fontWeight: 'bold' }}>
                <Row style={{ marginBottom: '10px' }}>
                  <Col md="8">List Products</Col>
                  <Col md="4">
                    <Button color="success" href="/admin/manageproduct/productdetail/addnew/newproduct">
                      <i class="fa fa-plus" />
                      Create New Product
                    </Button>
                  </Col>
                </Row>
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Product Name</th>
                      <th>Product Type</th>
                      <th>Date of create</th>
                      <th className="text-right">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((ele, index) => {
                      return (
                        <tr key={`table-${index}`}>
                          <td className="text-center">{index + 1}</td>
                          <td>{ele.name}</td>
                          <td>{ele.product_type.name}</td>
                          <td>{ele.data_of_create && convertDateToShow(ele.data_of_create)}</td>
                          <td className="text-right">{ele.status === 1 ? 'Avaiable' : 'Unavaiable'}</td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-link mr-1"
                              href={`/admin/manageproduct/productdetail/${ele.id}/view`}
                              color="info"
                              data-toggle="tooltip"
                              id="tooltip542628903"
                              size="sm"
                              type="button"
                            >
                              <i className="fa fa-user fa-2x" />
                            </Button>
                            <UncontrolledTooltip delay={0} placement="top" target="tooltip542628903">
                              View Product
                            </UncontrolledTooltip>
                            <Button
                              className="btn-link mr-1"
                              href={`/admin/manageproduct/productdetail/${ele.id}/edit`}
                              color="success"
                              data-toggle="tooltip"
                              id="tooltip278266693"
                              size="sm"
                              type="button"
                            >
                              <i className="fa fa-edit fa-2x" />
                            </Button>
                            <UncontrolledTooltip delay={0} placement="top" target="tooltip278266693">
                              Edit Product
                            </UncontrolledTooltip>
                            <Button
                              className="btn-link"
                              color="danger"
                              data-toggle="tooltip"
                              id="tooltip16493734"
                              size="sm"
                              type="button"
                              onClick={() => {
                                if (ele.status === 0) window.alert('This product has been Unavaible');
                                else if (window.confirm('Are you sure you wish to deactive this product?')) deleteData(ele.id);
                              }}
                            >
                              <i className="fa fa-times fa-2x" />
                            </Button>
                            <UncontrolledTooltip delay={0} placement="top" target="tooltip16493734">
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </h4>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
