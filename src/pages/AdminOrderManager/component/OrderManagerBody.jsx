import { Container, Row } from 'reactstrap';
import React from 'react';
import { DetailsList, SelectionMode, IconButton, CommandBar, SearchBox } from 'office-ui-fabric-react';
import { getItems, updateItem } from 'services/data.service';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class OrderManagerBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDataloaded: false,
            data: [],
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        let url = 'api/v1/orders';
        let get_data = getItems(url);
        Promise.all([get_data])
            .then((values) => {
                if (values[0]?.status === 200) {
                    this.setState({
                        isDataloaded: true,
                        data: values[0].data,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _onRenderItemColumn(item, index, column) {
        //define UI hiển của từng cột mong muốn
        switch (column.fieldName) {
            case 'no': return (<>{index}</>)
            case 'name':
                return (
                    <div className="app-grid-main-column">
                        <div className="app-column-text" style={{ width: '85%' }} >{item['name']}</div>
                        {/* <IconButton style={{ width: '10%' }} menuIconProps={{ iconName: "More" }} title="More actions" menuProps={_menuProps} /> */}
                    </div>
                );
            case 'status':
                switch (item.status) {
                    case 0: return 'Đã hủy';
                    case 1: return 'Đã đặt';
                    case 2: return 'Đang giao';
                    case 3: return 'Đã nhận';
                    default: return '';
                }
            case 'command':
                let _menuProps = {
                    items: [],
                };
                if (item.status !== 0) {
                    _menuProps.items.push({
                        key: '0',
                        text: 'Hủy đơn',
                        onClick: () => {
                            let approvedFarm = updateItem("api/v1/orders/status", item.id, { status: 0 });
                            Promise.all([approvedFarm]).then(values => {
                                if (values[0].status === 200 || values[0].status === 204) {
                                    NotificationManager.success('Approved', 'Approved', 3000);
                                    this.loadData();
                                }
                            })
                        },
                    });
                }
                if (item.status !== 1) {
                    _menuProps.items.push({
                        key: '1',
                        text: 'Đặt lại đơn',
                        onClick: () => {
                            let approvedFarm = updateItem("api/v1/orders/status", item.id, { status: 1 });
                            Promise.all([approvedFarm]).then(values => {
                                if (values[0].status === 200 || values[0].status === 204) {
                                    NotificationManager.success('Approved', 'Approved', 3000);
                                    this.loadData();
                                }
                            })
                        },
                    });
                }
                if (item.status !== 2) {
                    _menuProps.items.push({
                        key: '2',
                        text: 'Đang giao',
                        onClick: () => {
                            let approvedFarm = updateItem("api/v1/orders/status", item.id, { status: 2 });
                            Promise.all([approvedFarm]).then(values => {
                                if (values[0].status === 200 || values[0].status === 204) {
                                    NotificationManager.success('Approved', 'Approved', 3000);
                                    this.loadData();
                                }
                            })
                        },
                    });
                }
                if (item.status !== 3) {
                    _menuProps.items.push({
                        key: '3',
                        text: 'Đã nhận',
                        onClick: () => {
                            let approvedFarm = updateItem("api/v1/orders/status", item.id, { status: 3 });
                            Promise.all([approvedFarm]).then(values => {
                                if (values[0].status === 200 || values[0].status === 204) {
                                    NotificationManager.success('Approved', 'Approved', 3000);
                                    this.loadData();
                                }
                            })
                        },
                    });
                }
                return (
                    <div>
                        <IconButton
                            menuIconProps={{ iconName: 'Edit' }}
                            menuProps={_menuProps}
                        />
                    </div>
                )
            default:
                return item[column.fieldName];
        }
    }

    render() {
        return (
            <>
                <div className="section section-gray-custom">
                    <Container>
                        <Row className="title-row">
                            <br />
                        </Row>
                        <Row>
                            <CommandBar className="commandbar" items={commandBarItems} farItems={commandBarfarItems} />
                        </Row>
                        <Row>
                            <DetailsList
                                className="detail-list"
                                items={this.state.data}
                                columns={columns}
                                selectionMode={SelectionMode.none}
                                onRenderItemColumn={this._onRenderItemColumn}
                            ></DetailsList>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

const columns = [
    {
        key: 'no',
        name: 'Stt',
        fieldName: 'no',
        minWidth: 40,
        maxWidth: 40,
    },
    {
        key: 'full_name',
        name: 'Người đặt hàng',
        fieldName: 'full_name',
        minWidth: 180,
    },
    {
        key: 'message',
        name: 'Tin nhắn',
        fieldName: 'message',
        minWidth: 180,
    },
    {
        key: 'phone',
        name: 'Số điện thoại',
        fieldName: 'phone',
        minWidth: 100,
    },
    {
        key: 'address',
        name: 'Địa chỉ',
        fieldName: 'address',
        minWidth: 140,
    },
    {
        key: 'total_price',
        name: 'Tổng giá',
        fieldName: 'total_price',
        minWidth: 100,
    },
    {
        key: 'status',
        name: 'Trạng thái',
        fieldName: 'status',
        minWidth: 100,
    },
    {
        key: 'command',
        name: '',
        fieldName: 'command',
        minWidth: 40,
    },
];

const commandBarItems = [
    {
        key: 'create',
        text: 'Tạo mới',
        iconProps: { iconName: 'Add' },
        onClick: () => { },
    },
];

const commandBarfarItems = [
    {
        key: 'search',
        text: '',
        onRender: () => {
            return <SearchBox className="search-box" placeholder="Search" onSearch={(newValue) => console.log('value is ' + newValue)} disableAnimation />;
        },
    },
];
