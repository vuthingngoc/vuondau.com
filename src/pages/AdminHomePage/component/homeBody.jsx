import React, { useEffect, useState } from 'react';
import { Icon } from 'office-ui-fabric-react';
import { Table, Button, UncontrolledTooltip } from 'reactstrap';
import { Col, Row } from 'react-bootstrap';
import { getDataByPath } from 'services/data.service';
import { updateDataByPath } from 'services/data.service';
import { deleteDataByPath } from 'services/data.service';
import { NotificationManager } from 'react-notifications';

export default function HomePageBody() {
  const [dataApproveFarm, setDataApproveFarm] = useState(null);

  async function loadData() {
    const path = 'api/v1/farms';
    const res = await getDataByPath(path, '', 'status=2');
    if (res.status === 200) {
      console.log(res.data);
      const tmpData = [];
      res.data.forEach((ele) => {
        const farm = {
          id: ele.id,
          farmName: ele.name,
          farmType: ele.farm_type.name,
          farm_type_id: ele.farm_type.id,
          farmerName: ele.farmer.full_name,
          farmer_id: ele.farmer.id,
          area_id: ele.area.id,
          address: ele.address,
          description: ele.description,
          status: ele.status,
        };
        tmpData.push(farm);
      });
      setDataApproveFarm(tmpData);
    }
  }

  async function approveFarm(farm) {
    const path = 'api/v1/farms';
    const updateData = {
      farm_type_id: farm.farm_type_id,
      farmer_id: farm.farmer_id,
      area_id: farm.area_id,
      name: farm.farmName,
      address: farm.address,
      description: farm.address,
      status: 1,
    };
    const res = await updateDataByPath(`${path}/${farm.id}`, updateData);
    if (res.status === 200) {
      await loadData();
      NotificationManager.success('Approve Success', 'This farm has been approved', 3000);
    } else {
      NotificationManager.warning('Approve Failed', 'Something wrongs when approve', 3000);
    }
  }

  async function denyFarm(id) {
    let path = 'api/v1/farms/';
    const res = await deleteDataByPath(`${path}${id}`, id);
    console.log(res);
    if (res.status === 204) {
      await loadData();
      NotificationManager.success('Deny Success', 'This farm has been denied', 3000);
    } else {
      NotificationManager.warning('Deny Failed', 'Something wrongs when deny', 3000);
    }
  }

  useEffect(() => {
    if (dataApproveFarm === null) {
      loadData();
    }
  });

  return (
    <div className="section section-gray-custom">
      <div className="app-block-container">
        <a href="/admin/manageaccount" class="app-appBlockLink">
          <div className="app-appStatusDetail">
            <div className="app-appStatusText">Quản lý Người dùng</div>
            <div className="app-appStatusImg">
              <Icon iconName="Contact" style={{ marginTop: '8px' }} />
            </div>
          </div>
        </a>
        <a href="/admin/farmManagement" class="app-appBlockLink" style={{ backgroundColor: '#FFB53E' }}>
          <div className="app-appStatusDetail">
            <div className="app-appStatusText">Quản lý Nông trại</div>
            <div className="app-appStatusImg">
              <Icon iconName="Home" style={{ marginTop: '8px' }} />
            </div>
          </div>
        </a>
        <a href="/admin/manageproduct" class="app-appBlockLink" style={{ backgroundColor: '#088A4B' }}>
          <div className="app-appStatusDetail">
            <div className="app-appStatusText">Quản lý Sản phẩm</div>
            <div className="app-appStatusImg">
              <Icon iconName="AllApps" style={{ marginTop: '8px' }} />
            </div>
          </div>
        </a>
        <a href="/#" class="app-appBlockLink" style={{ backgroundColor: '#DC392D' }}>
          <div className="app-appStatusDetail">
            <div className="app-appStatusText">Quản lý Hóa đơn</div>
            <div className="app-appStatusImg">
              <Icon iconName="TrackersMirrored" style={{ marginTop: '8px' }} />
            </div>
          </div>
        </a>
      </div>
      <br />
      <div style={{ margin: '24px' }}>
        <h3 className="app-title" style={{ fontWeight: 'bold', marginLeft: '20px' }}>
          Thông báo:
        </h3>
        <br />
        <Row>
          <Col md="12">
            <h4 style={{ fontWeight: 'bold', marginLeft: '30px' }}>Nông trại cần duyệt:</h4>
          </Col>
          <Col md="11" className="ml-auto mr-auto">
            {dataApproveFarm?.length !== 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th className="text-center" style={{ fontWeight: 'bold' }}>
                      #
                    </th>
                    <th style={{ fontWeight: 'bold' }}>Tên nông trại</th>
                    <th style={{ fontWeight: 'bold' }}>Loại nông trại</th>
                    <th style={{ fontWeight: 'bold' }}>Chủ nông trại</th>
                    <th style={{ fontWeight: 'bold' }}>Địa chỉ</th>
                    <th style={{ fontWeight: 'bold' }} className="text-center">
                      Trạng thái
                    </th>
                    <th style={{ fontWeight: 'bold' }} className="text-center">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataApproveFarm?.map((ele, index) => {
                    return (
                      <tr>
                        <td style={{ fontWeight: 'bolder' }} className="text-center">
                          {index + 1}
                        </td>
                        <td style={{ fontWeight: 'bolder' }}>{ele.farmName}</td>
                        <td style={{ fontWeight: 'bolder' }}>{ele.farmType}</td>
                        <td style={{ fontWeight: 'bolder' }}>{ele.farmerName}</td>
                        <td style={{ fontWeight: 'bolder' }}>{ele.address}</td>
                        <td style={{ fontWeight: 'bolder' }} className="text-center">
                          {ele.status === 2 ? 'Need Approve' : 'Active'}
                        </td>
                        <td className="td-actions text-center">
                          <Button
                            className="btn-link mr-1"
                            color="info"
                            data-toggle="tooltip"
                            id="tooltip542628903"
                            size="sm"
                            type="button"
                            onClick={() => {
                              approveFarm(ele);
                            }}
                          >
                            <i className="fa fa-check-circle-o fa-2x" />
                          </Button>
                          <UncontrolledTooltip delay={0} placement="top" target="tooltip542628903">
                            Approve
                          </UncontrolledTooltip>
                          <Button
                            className="btn-link"
                            color="danger"
                            data-toggle="tooltip"
                            id="tooltip16493734"
                            size="sm"
                            type="button"
                            onClick={() => {
                              denyFarm(ele.id);
                            }}
                          >
                            <i className="fa fa-ban fa-2x" />
                          </Button>
                          <UncontrolledTooltip delay={0} placement="top" target="tooltip16493734">
                            Deny
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <h3 style={{ fontWeight: 'bold' }}>No Farm Need To Approve</h3>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
