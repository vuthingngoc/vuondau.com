import React from 'react';
import { Icon } from 'office-ui-fabric-react';
import { DetailsList, SelectionMode } from 'office-ui-fabric-react';

export default function HomePageBody() {
    const dummyData = [
        { id: 1, title: "Farmer 1 tạo nông trại đang chờ trình duyệt" },
        { id: 2, title: "Farmer 2 tạo nông trại đang chờ trình duyệt" },
        { id: 3, title: "Farmer 3 tạo nông trại đang chờ trình duyệt" }
    ]
    const columns = [
        {
            key: 'no',
            name: 'Stt',
            fieldName: 'no',
            minWidth: 40,
            maxWidth: 40,
        },
        {
            key: 'title',
            name: 'Tiêu đề',
            fieldName: 'title',
            minWidth: 200,
        }
    ];

    const _onRenderItemColumn = (item, index, column) => {
        switch (column.fieldName) {
            case 'no': return (<>{index}</>)
            default: return item[column.fieldName];
        }
    }

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
          <a href="/#" class="app-appBlockLink" style={{ backgroundColor: '#088A4B' }}>
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
          <h3 className="app-title">Thông báo:</h3>
          <br />
          <DetailsList
            className="detail-list"
            items={dummyData}
            columns={columns}
            selectionMode={SelectionMode.none}
            onRenderItemColumn={_onRenderItemColumn}
          ></DetailsList>
        </div>
      </div>
    );
}