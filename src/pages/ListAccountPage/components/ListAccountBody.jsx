import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { UncontrolledTooltip, Button, Container, Row, Col, Table } from 'reactstrap';
import { deleteDataAccount } from 'services/data.service';

import { getDataByPath } from 'services/data.service';

export default function ListAccountbody() {
  const [data, setData] = useState(null);
  const [view, setView] = useState(false);
  async function loadData(viewCheck) {
    if (localStorage) {
      const accessToken = localStorage.getItem('accessToken');
      let path = 'api/v1/customers';
      if (viewCheck) {
        path = 'api/v1/farmers';
      }
      const res = await getDataByPath(path, accessToken);
      if (res?.status === 200) {
        setData(res.data);
      }
    }
  }

  async function deleteData(id) {
    if (data !== null) {
      const res = await deleteDataAccount(`api/v1/customers/${id}`, id);
      if (res.status === 204) {
        await loadData();
        NotificationManager.success('Deactive Success', 'Your data has been deactive success', 3000);
      } else {
        NotificationManager.warning('Deactive Failed', 'Something wrongs when deactive', 3000);
      }
    }
  }

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
                <h2>{!view ? 'Manage Customer Account' : 'Manage Farmer Account'}</h2>
              </Col>
              <Col md="3">
                <Button
                  style={{ marginTop: '25px' }}
                  onClick={() => {
                    loadData(!view);
                    setView(!view);
                  }}
                >
                  <i className="nc-icon nc-refresh-69" />
                  {!view ? ' Switch To Farmer' : ' Switch to Customer'}
                </Button>
              </Col>
            </Row>
          </div>
          <Row>
            <Col className="ml-auto mr-auto" md="12">
              <h4 className="title" style={{ fontWeight: 'bold' }}>
                List Account
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th className="text-right">Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((ele, index) => {
                      return (
                        <tr key={`table-${index}`}>
                          <td className="text-center">{index + 1}</td>
                          <td>{ele.first_name}</td>
                          <td>{ele.last_name}</td>
                          <td>{ele.email}</td>
                          <td className="text-right">{ele.status === 1 ? 'Avaiable' : 'Unavaiable'}</td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-link mr-1"
                              href={`/admin/manageaccount/${view ? 'farmer' : 'customer'}/${ele.id}/view`}
                              color="info"
                              data-toggle="tooltip"
                              id="tooltip542628903"
                              size="sm"
                              type="button"
                            >
                              <i className="fa fa-user fa-2x" />
                            </Button>
                            <UncontrolledTooltip delay={0} placement="top" target="tooltip542628903">
                              View Profile
                            </UncontrolledTooltip>
                            <Button
                              className="btn-link mr-1"
                              href={`/admin/manageaccount/${view ? 'farmer' : 'customer'}/${ele.id}/edit`}
                              color="success"
                              data-toggle="tooltip"
                              id="tooltip278266693"
                              size="sm"
                              type="button"
                            >
                              <i className="fa fa-edit fa-2x" />
                            </Button>
                            <UncontrolledTooltip delay={0} placement="top" target="tooltip278266693">
                              Edit Profile
                            </UncontrolledTooltip>
                            <Button
                              className="btn-link"
                              color="danger"
                              data-toggle="tooltip"
                              id="tooltip16493734"
                              size="sm"
                              type="button"
                              onClick={() => {
                                if (ele.status === 0) window.alert('This Account has been Unavaible');
                                else if (window.confirm('Are you sure you wish to deactive this account?')) deleteData(ele.id);
                              }}
                            >
                              <i className="fa fa-times fa-2x" />
                            </Button>
                            <UncontrolledTooltip delay={0} placement="top" target="tooltip16493734">
                              Delete
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
