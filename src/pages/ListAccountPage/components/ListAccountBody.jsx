import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { UncontrolledTooltip, Button, Container, Row, Col, Table } from 'reactstrap';
import { updateDataByPath } from 'services/data.service';
import { deleteDataByPath } from 'services/data.service';

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
      let path = 'api/v1/customers/';
      if (view) {
        path = 'api/v1/farmers/';
      }
      const res = await deleteDataByPath(`${path}${id}`, id);
      console.log(res);
      if (res.status === 204) {
        await loadData(view);
        NotificationManager.success('Deactive Success', 'Your data has been deactive success', 3000);
      } else {
        NotificationManager.warning('Deactive Failed', 'Something wrongs when deactive', 3000);
      }
    }
  }

  async function approveAccount(data) {
    console.log(data);
    if (data !== null) {
      const approveData = {
        email: data.email,
        full_name: data.full_name,
        password: '...',
        phone: data.phone,
        birth_day: data.birth_day,
        gender: data.gender,
        status: 1,
      };
      const path = 'api/v1/farmers/';
      const res = await updateDataByPath(`${path}${data.id}`, approveData);
      if (res.status === 200) {
        await loadData(view);
        NotificationManager.success('Approve Success', 'This account has been approve', 3000);
      } else {
        NotificationManager.warning('Approve Failed', 'Something wrongs when approve', 3000);
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
                      <th>Fullname</th>
                      <th>Email</th>
                      <th className="text-right">Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((ele, index) => {
                      return (
                        <tr key={`table-${index}`}>
                          <td className="text-center">{index + 1}</td>
                          <td>{ele.full_name}</td>
                          <td>{ele.email}</td>
                          <td className="text-right">{ele.status === 1 ? 'Avaiable' : ele.status === 0 ? 'Unavaiable' : 'Need Approve'}</td>
                          {ele.status === 2 ? (
                            <td className="td-actions text-center">
                              <Button
                                className="btn-link mr-1"
                                color="success"
                                data-toggle="tooltip"
                                id="tooltip123"
                                size="sm"
                                type="button"
                                onClick={() => {
                                  approveAccount(ele);
                                }}
                              >
                                <i className="fa fa-check-circle-o fa-2x" />
                              </Button>
                              <UncontrolledTooltip delay={0} placement="top" target="tooltip123">
                                Approve
                              </UncontrolledTooltip>
                              <Button
                                className="btn-link mr-1"
                                color="danger"
                                data-toggle="tooltip"
                                id="tooltip345"
                                size="sm"
                                type="button"
                                onClick={() => deleteData(ele.id)}
                              >
                                <i className="fa fa-ban fa-2x" />
                              </Button>
                              <UncontrolledTooltip delay={0} placement="top" target="tooltip456">
                                Deny
                              </UncontrolledTooltip>
                            </td>
                          ) : (
                            <td className="td-actions text-center">
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
                          )}
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
